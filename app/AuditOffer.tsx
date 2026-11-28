import { AUDIT, PUBLISHER } from "./config";

const MAILTO = `mailto:${PUBLISHER.email}?subject=${encodeURIComponent(
  "Diagnostic gratuit de ma facture"
)}&body=${encodeURIComponent(
  "Bonjour,\n\nVoici ma dernière facture d'énergie (photo ou PDF en pièce jointe).\n\nMerci !"
)}`;

export function AuditOffer({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-8 rounded-xl border-2 border-amber-500 bg-amber-50 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
        Commerçants et petits locaux pro
      </p>
      <h3 className="mt-1 text-xl font-extrabold leading-tight">
        Je vérifie gratuitement votre facture et je vous dis si vous payez trop
        cher
      </h3>
      {!compact && (
        <ol className="mt-3 space-y-1 text-sm text-stone-700">
          <li>
            1. Vous m&apos;envoyez votre dernière facture (photo ou PDF).
          </li>
          <li>
            2. Sous {AUDIT.delay}, je vous dis <strong>gratuitement</strong> si
            une économie est possible et combien elle représente par an.
          </li>
          <li>
            3. Si vous voulez le plan détaillé (offre moins chère et marche à
            suivre pour changer, sans coupure) : {AUDIT.priceLabel}, une seule
            fois.
          </li>
        </ol>
      )}
      <p className="mt-4 text-sm font-bold text-green-800">
        Aucune économie trouvée ? Vous ne payez rien.
      </p>
      {PUBLISHER.email ? (
        <a
          href={MAILTO}
          className="mt-4 block w-full rounded-lg bg-amber-500 px-5 py-3 text-center font-bold text-white hover:bg-amber-600"
        >
          Envoyer ma facture gratuitement
        </a>
      ) : null}
      <p className="mt-3 text-xs text-stone-500">
        Ou par e-mail à <strong>{PUBLISHER.email}</strong>.
        {AUDIT.link ? (
          <>
            {" "}
            Déjà reçu votre diagnostic ?{" "}
            <a href={AUDIT.link} className="underline">
              Commander le plan détaillé ({AUDIT.priceLabel})
            </a>
            .
          </>
        ) : null}{" "}
        {PUBLISHER.vat}.
      </p>
    </div>
  );
}
