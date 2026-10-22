"use client";

import { useEffect, useState } from "react";

const SUPABASE_URL = "https://mfhwrokeslqdbbkczbdv.supabase.co";
const SUPABASE_KEY = "sb_publishable_jdtI2oVIdZrBdQlFHOoXlQ_nIpNtsWU";
const STRIPE_LINK = "https://buy.stripe.com/test_14AfZi4VmeIvgPx0lP7IY00";
const FACTURE_MIN = 20;
const FACTURE_MAX = 500;

async function insertRow(table: string, row: Record<string, unknown>) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    return res.ok;
  } catch {
    return false;
  }
}

type Answers = {
  profil: string;
  energie: string;
  facture: string;
  anciennete: string;
  offre: string;
  chauffage: string;
};

const EMPTY: Answers = {
  profil: "",
  energie: "",
  facture: "",
  anciennete: "",
  offre: "",
  chauffage: "",
};

type Question = {
  key: keyof Answers;
  label: string;
  options?: { value: string; label: string }[];
};

const QUESTIONS: Question[] = [
  {
    key: "profil",
    label: "Le contrat est pour :",
    options: [
      { value: "foyer", label: "Mon foyer" },
      { value: "pro", label: "Un petit local pro" },
    ],
  },
  {
    key: "energie",
    label: "Quelle énergie veux-tu comparer ?",
    options: [
      { value: "elec", label: "Électricité" },
      { value: "gaz", label: "Gaz" },
      { value: "both", label: "Les deux" },
    ],
  },
  {
    key: "facture",
    label: "Combien paies-tu par mois en moyenne (en €) ?",
  },
  {
    key: "anciennete",
    label: "Depuis quand as-tu ton contrat actuel ?",
    options: [
      { value: "moins1", label: "Moins d'un an" },
      { value: "1a3", label: "1 à 3 ans" },
      { value: "plus3", label: "Plus de 3 ans" },
      { value: "jamais", label: "Je n'ai jamais changé" },
    ],
  },
  {
    key: "offre",
    label: "Quel type d'offre as-tu ?",
    options: [
      { value: "reglementee", label: "Tarif réglementé" },
      { value: "marche", label: "Offre de marché" },
      { value: "nesaispas", label: "Je ne sais pas" },
    ],
  },
  {
    key: "chauffage",
    label: "Comment te chauffes-tu ?",
    options: [
      { value: "elec", label: "Électricité" },
      { value: "gaz", label: "Gaz" },
      { value: "autre", label: "Autre / je ne sais pas" },
    ],
  },
];

// Estimation prudente : fourchette d'économie annuelle en euros.
function estimate(a: Answers): { low: number; high: number } {
  const annuel = Number(a.facture) * 12;

  let low = 0.03;
  let high = 0.08;
  if (a.anciennete === "1a3") {
    low = 0.05;
    high = 0.11;
  } else if (a.anciennete === "plus3") {
    low = 0.07;
    high = 0.14;
  } else if (a.anciennete === "jamais") {
    low = 0.08;
    high = 0.16;
  }

  if (a.offre === "reglementee") {
    low += 0.01;
    high += 0.02;
  }
  if (a.energie === "both") {
    low += 0.01;
    high += 0.01;
  }
  if (a.chauffage === "gaz" || a.chauffage === "elec") {
    low += 0.005;
    high += 0.01;
  }

  return {
    low: Math.round((annuel * low) / 10) * 10,
    high: Math.round((annuel * high) / 10) * 10,
  };
}

function isValidEmail(v: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

export default function Home() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [result, setResult] = useState<{ low: number; high: number } | null>(
    null
  );
  const [estimationId, setEstimationId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("paiement") === "ok") setPaid(true);
    } catch {
      // ignore
    }
  }, []);

  const question = step >= 0 && step < QUESTIONS.length ? QUESTIONS[step] : null;
  const value = question ? answers[question.key] : "";

  const factureNum = Number(answers.facture);
  const factureOk =
    answers.facture !== "" &&
    factureNum >= FACTURE_MIN &&
    factureNum <= FACTURE_MAX;

  async function finish(finalAnswers: Answers) {
    const est = estimate(finalAnswers);
    const id = crypto.randomUUID();
    setResult(est);
    setEstimationId(id);
    setStep(QUESTIONS.length);
    await insertRow("estimations", {
      id,
      answers: finalAnswers,
      estimate_low: est.low,
      estimate_high: est.high,
    });
  }

  function choose(key: keyof Answers, v: string) {
    const next = { ...answers, [key]: v };
    setAnswers(next);
    if (step === QUESTIONS.length - 1) {
      finish(next);
    } else {
      setStep(step + 1);
    }
  }

  function nextFacture() {
    if (factureOk) setStep(step + 1);
  }

  async function sendEmail() {
    if (!isValidEmail(email)) {
      setEmailError("Entre une adresse e-mail valide.");
      return;
    }
    setEmailError("");
    const ok = await insertRow("leads", {
      email: email.trim(),
      estimation_id: estimationId,
    });
    if (ok) setEmailSent(true);
    else setEmailError("Impossible d'enregistrer ton e-mail, réessaie.");
  }

  function restart() {
    setAnswers(EMPTY);
    setResult(null);
    setEstimationId(null);
    setEmail("");
    setEmailSent(false);
    setEmailError("");
    setStep(-1);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6">
      <header className="mb-10 text-sm font-bold">⚡ Kilowatt</header>

      {paid && (
        <div className="mb-6 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-900">
          Merci ! Ton paiement (mode test) est bien passé. Je te recontacte très
          vite pour activer ta surveillance.
        </div>
      )}

      <div className="flex-1">
        {step === -1 && (
          <section>
            <h1 className="text-3xl font-extrabold leading-tight">
              Combien te coûte ton contrat d&apos;énergie de trop ?
            </h1>
            <p className="mt-4 text-stone-700">
              6 questions, 1 minute. Tu obtiens une estimation prudente de ce
              que tu pourrais économiser chaque année.
            </p>
            <button
              onClick={() => setStep(0)}
              className="mt-8 w-full rounded-lg bg-amber-500 px-5 py-3 font-bold text-white hover:bg-amber-600"
            >
              Faire mon estimation
            </button>
            <p className="mt-4 text-xs text-stone-500">
              Gratuit, sans inscription. Pensé pour les foyers et petits locaux
              pro qui n&apos;ont jamais changé de contrat.
            </p>
          </section>
        )}

        {question && (
          <section>
            <p className="mb-2 text-xs text-stone-500">
              Question {step + 1} sur {QUESTIONS.length}
            </p>
            <h2 className="mb-6 text-2xl font-bold">{question.label}</h2>

            {question.options ? (
              <div className="flex flex-col gap-3">
                {question.options.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => choose(question.key, o.value)}
                    className={`rounded-lg border px-4 py-3 text-left font-medium hover:border-amber-500 ${
                      value === o.value
                        ? "border-amber-500 bg-amber-100"
                        : "border-stone-300 bg-white"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={FACTURE_MIN}
                    max={FACTURE_MAX}
                    value={answers.facture}
                    onChange={(e) =>
                      setAnswers({ ...answers, facture: e.target.value })
                    }
                    placeholder="ex. 120"
                    className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3"
                  />
                  <span className="font-bold">€</span>
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  Entre {FACTURE_MIN} et {FACTURE_MAX} € par mois.
                </p>
                <button
                  onClick={nextFacture}
                  disabled={!factureOk}
                  className="mt-6 w-full rounded-lg bg-amber-500 px-5 py-3 font-bold text-white hover:bg-amber-600 disabled:opacity-40"
                >
                  Continuer
                </button>
              </div>
            )}

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 text-sm text-stone-500 underline"
              >
                Retour
              </button>
            )}
          </section>
        )}

        {result && step === QUESTIONS.length && (
          <section>
            <p className="text-sm text-stone-600">Ton estimation</p>
            <h2 className="mt-1 text-3xl font-extrabold leading-tight">
              Tu pourrais économiser entre {result.low} € et {result.high} € par
              an.
            </h2>
            <p className="mt-3 text-xs text-stone-500">
              Estimation prudente basée sur tes réponses, ce n&apos;est pas une
              offre ferme d&apos;un fournisseur.
            </p>

            <div className="mt-8 rounded-lg border border-stone-300 bg-white p-4">
              <h3 className="font-bold">Reçois ton détail par e-mail</h3>
              {emailSent ? (
                <p className="mt-2 text-sm text-green-800">
                  C&apos;est noté, merci ! Je reviens vers toi par e-mail.
                </p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    className="mt-3 w-full rounded-lg border border-stone-300 px-4 py-3"
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-700">{emailError}</p>
                  )}
                  <button
                    onClick={sendEmail}
                    className="mt-3 w-full rounded-lg bg-amber-500 px-5 py-3 font-bold text-white hover:bg-amber-600"
                  >
                    Je veux le détail
                  </button>
                </>
              )}
            </div>

            <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4">
              <h3 className="font-bold">Surveillance et alertes — 5 €/mois</h3>
              <p className="mt-2 text-sm text-stone-700">
                Je surveille les offres à ta place et je te préviens dès qu&apos;un
                meilleur contrat apparaît. (Paiement en mode test pour
                l&apos;instant.)
              </p>
              <a
                href={STRIPE_LINK}
                className="mt-3 block w-full rounded-lg bg-stone-900 px-5 py-3 text-center font-bold text-white hover:bg-stone-700"
              >
                Activer la surveillance — 5 €/mois
              </a>
            </div>

            <button
              onClick={restart}
              className="mt-6 text-sm text-stone-500 underline"
            >
              Refaire une estimation
            </button>
          </section>
        )}
      </div>

      <footer className="mt-10 text-center text-xs text-stone-400">
        © Kilowatt
      </footer>
    </main>
  );
}
