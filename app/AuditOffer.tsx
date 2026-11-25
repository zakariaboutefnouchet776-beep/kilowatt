import { AUDIT, PUBLISHER } from "./config";

export function AuditOffer({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-8 rounded-xl border-2 border-amber-500 bg-amber-50 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
        Audit de ta facture par un humain
      </p>
      <h3 className="mt-1 text-xl font-extrabold leading-tight">
        Je vérifie ta facture et je te dis exactement combien tu paies de trop
      </h3>
      {!compact && (
        <ul className="mt-3 space-y-1 text-sm text-stone-700">
          <li>✓ Tu m&apos;envoies ta dernière facture (photo ou PDF)</li>
          <li>
            ✓ Sous {AUDIT.delay}, tu reçois l&apos;économie chiffrée en €/an et
            l&apos;offre moins chère à prendre
          </li>
          <li>✓ La marche à suivre pour changer, sans coupure</li>
        </ul>
      )}
      <p className="mt-4 text-3xl font-extrabold">
        {AUDIT.priceLabel}{" "}
        <span className="text-sm font-medium text-stone-600">
          une seule fois, sans abonnement
        </span>
      </p>
      <p className="mt-1 text-sm font-bold text-green-800">
        Remboursé si je ne te trouve aucune économie.
      </p>
      {AUDIT.link ? (
        <a
          href={AUDIT.link}
          className="mt-4 block w-full rounded-lg bg-amber-500 px-5 py-3 text-center font-bold text-white hover:bg-amber-600"
        >
          Je veux mon audit à {AUDIT.priceLabel}
        </a>
      ) : null}
      <p className="mt-3 text-xs text-stone-500">
        Après le paiement, envoie ta facture à{" "}
        <strong>{PUBLISHER.email}</strong>. {PUBLISHER.vat}.
      </p>
    </div>
  );
}
