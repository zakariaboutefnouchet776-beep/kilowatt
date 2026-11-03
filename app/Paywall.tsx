"use client";

import { useState } from "react";
import {
  CANCEL_DELAY,
  GUARANTEE_DAYS,
  PLANS,
  PUBLISHER,
  REFUND_DELAY,
  STRIPE_LINKS,
  type PlanId,
} from "./config";
import { Field } from "./Todo";

const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;

export function Paywall({ low, high }: { low: number; high: number }) {
  const [planId, setPlanId] = useState<PlanId>("yearly");
  const plan = PLANS.find((p) => p.id === planId)!;
  const yearly = PLANS.find((p) => p.id === "yearly")!;
  const link = STRIPE_LINKS[planId];

  // Si l'écart estimé ne couvre pas le prix de l'abonnement, on ne vend pas.
  if (high < yearly.price) {
    return (
      <div className="mt-6 rounded-lg border border-stone-300 bg-white p-4">
        <h3 className="font-bold">Ton contrat semble correct</h3>
        <p className="mt-2 text-sm text-stone-700">
          L&apos;écart estimé ({eur(low)} à {eur(high)} par an) est trop faible
          pour que la surveillance soit rentable pour toi. Laisse ton e-mail
          ci-dessus : je te préviens si une offre nettement meilleure apparaît.
        </p>
      </div>
    );
  }

  const coversPrice = low >= yearly.price;

  return (
    <section
      aria-labelledby="paywall-title"
      className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4"
    >
      {/* 1. Ce qui a été fait */}
      <h3 id="paywall-title" className="text-xl font-extrabold">
        Ton estimation est prête. Garde-la à l&apos;œil.
      </h3>
      <p className="mt-2 text-sm text-stone-700">
        Les offres changent chaque mois. Avec la surveillance, tu reçois une
        alerte par e-mail quand un contrat moins cher apparaît pour ton profil,
        et la marche à suivre pour changer sans coupure.
      </p>

      {/* 2. Le gain comparé au prix */}
      <p className="mt-4 rounded-md bg-white p-3 text-sm">
        Économie estimée :{" "}
        <strong>
          {eur(low)} à {eur(high)} par an
        </strong>
        .{" "}
        {coversPrice ? (
          <>
            L&apos;abonnement annuel coûte {yearly.priceLabel}, soit moins de{" "}
            <strong>{Math.max(1, Math.ceil((yearly.price / low) * 100))} %</strong>{" "}
            de l&apos;économie minimale estimée.
          </>
        ) : (
          <>
            L&apos;abonnement annuel coûte {yearly.priceLabel} : il est couvert
            si tu te situes dans le haut de la fourchette.
          </>
        )}
      </p>

      {/* 3. Les formules */}
      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-bold">Choisis ta formule</legend>
        <div className="grid gap-3">
          {PLANS.map((p) => {
            const selected = p.id === planId;
            return (
              <label
                key={p.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 bg-white p-3 ${
                  selected ? "border-stone-900" : "border-stone-300"
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  value={p.id}
                  checked={selected}
                  onChange={() => setPlanId(p.id)}
                  className="mt-1 h-5 w-5 accent-stone-900"
                />
                <span className="flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-bold">{p.name}</span>
                    <span className="font-extrabold">
                      {p.priceLabel}{" "}
                      <span className="text-sm font-medium text-stone-600">
                        {p.period}
                      </span>
                    </span>
                  </span>
                  <span className="block text-xs text-stone-600">
                    soit {p.perDay} par jour
                  </span>
                  {p.highlight && (
                    <span className="mt-1 inline-block rounded bg-amber-200 px-2 py-0.5 text-xs font-bold">
                      {p.highlight}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 4. Garantie, visible sans défiler */}
      <div className="mt-5 rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-900">
        <p className="font-bold">Satisfait ou remboursé, {GUARANTEE_DAYS} jours</p>
        <p className="mt-1">
          Si Kilowatt ne te convient pas, écris à{" "}
          <Field value={PUBLISHER.email} label="e-mail de contact" /> dans les{" "}
          {GUARANTEE_DAYS} jours qui suivent ton paiement. Tu es remboursé
          intégralement sous {REFUND_DELAY}, sans avoir à te justifier.
        </p>
      </div>

      {/* 5 + 6. Sans engagement, et paiement sur le même écran */}
      {link ? (
        <a
          href={link}
          className="mt-5 block w-full rounded-lg bg-stone-900 px-5 py-4 text-center text-lg font-bold text-white hover:bg-stone-700"
        >
          Activer la surveillance : {plan.priceLabel} {plan.period}
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-5 block w-full rounded-lg bg-stone-400 px-5 py-4 text-center text-lg font-bold text-white"
        >
          Paiement bientôt disponible
        </button>
      )}
      <p className="mt-2 text-center text-xs text-stone-700">
        Sans engagement, résiliable à tout moment. Paiement sécurisé par Stripe.
      </p>

      {/* 7. Questions fréquentes */}
      <div className="mt-6">
        <h4 className="mb-2 font-bold">Questions fréquentes</h4>
        <div className="divide-y divide-stone-300 rounded-md border border-stone-300 bg-white">
          <details className="p-3">
            <summary className="cursor-pointer font-medium">
              Est-ce que ça marche pour mon cas ?
            </summary>
            <p className="mt-2 text-sm text-stone-700">
              Kilowatt s&apos;adresse aux foyers et aux petits locaux
              professionnels en France, pour l&apos;électricité et le gaz. Si
              ton contrat est déjà bon, ton estimation le montre et on ne te
              propose pas l&apos;abonnement.
            </p>
          </details>
          <details className="p-3">
            <summary className="cursor-pointer font-medium">
              Combien de temps ça me prend ?
            </summary>
            <p className="mt-2 text-sm text-stone-700">
              L&apos;estimation prend une minute. Pour changer de fournisseur,
              compte une dizaine de minutes : ton nouveau fournisseur se charge
              de résilier l&apos;ancien contrat, sans coupure de courant.
            </p>
          </details>
          <details className="p-3">
            <summary className="cursor-pointer font-medium">
              Et si je veux arrêter ?
            </summary>
            <p className="mt-2 text-sm text-stone-700">
              Tu peux arrêter quand tu veux : écris à{" "}
              <Field value={PUBLISHER.email} label="e-mail de contact" />, et
              l&apos;abonnement est stoppé sous {CANCEL_DELAY}. Dans les{" "}
              {GUARANTEE_DAYS} premiers jours, tu es remboursé.
            </p>
          </details>
          <details className="p-3">
            <summary className="cursor-pointer font-medium">
              À quoi sert exactement ce que je paie ?
            </summary>
            <p className="mt-2 text-sm text-stone-700">
              À la surveillance régulière des offres d&apos;énergie, à
              l&apos;alerte par e-mail quand un contrat moins cher apparaît pour
              ton profil, et à la marche à suivre pour changer.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
