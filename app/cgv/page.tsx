import type { Metadata } from "next";
import { LegalLayout } from "../LegalLayout";
import { Field } from "../Todo";
import {
  CANCEL_DELAY,
  GUARANTEE_DAYS,
  PLANS,
  PUBLISHER,
  REFUND_DELAY,
} from "../config";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Kilowatt",
  description: "Conditions de l'abonnement Kilowatt : prix, paiement, résiliation, remboursement.",
};

export default function Cgv() {
  const monthly = PLANS.find((p) => p.id === "monthly")!;
  const yearly = PLANS.find((p) => p.id === "yearly")!;

  return (
    <LegalLayout title="Conditions générales de vente" updated="3 novembre 2026">
      <h2>1. Vendeur</h2>
      <p>
        Le service est proposé par{" "}
        <Field value={PUBLISHER.name} label="nom ou raison sociale" />,{" "}
        <Field value={PUBLISHER.registration} label="SIRET ou numéro BCE" />,{" "}
        <Field value={PUBLISHER.address} label="adresse postale" />. Contact :{" "}
        <Field value={PUBLISHER.email} label="e-mail de contact" />.
      </p>

      <h2>2. Service vendu</h2>
      <p>
        L&apos;abonnement Kilowatt donne accès à la surveillance régulière des
        offres d&apos;énergie correspondant à ton profil, à une alerte par
        e-mail quand une offre moins chère apparaît, et à la marche à suivre
        pour changer de fournisseur. L&apos;estimation gratuite proposée sur le
        site n&apos;est pas soumise à abonnement.
      </p>

      <h2>3. Prix</h2>
      <ul>
        <li>
          Formule mensuelle : {monthly.priceLabel} {monthly.period}.
        </li>
        <li>
          Formule annuelle : {yearly.priceLabel} {yearly.period}.
        </li>
      </ul>
      <p>
        Les prix sont indiqués en euros. TVA :{" "}
        <Field value={PUBLISHER.vat} label="TVA incluse, ou « TVA non applicable »" />.
      </p>

      <h2>4. Paiement et renouvellement</h2>
      <p>
        Le paiement s&apos;effectue par carte bancaire via Stripe, prestataire
        de paiement sécurisé. Kilowatt ne voit ni ne conserve ton numéro de
        carte. L&apos;abonnement démarre au paiement et se renouvelle
        automatiquement à chaque échéance (chaque mois ou chaque année selon la
        formule choisie), au même prix, jusqu&apos;à résiliation.
      </p>

      <h2>5. Résiliation</h2>
      <p>
        Tu peux résilier à tout moment, sans engagement, en écrivant à{" "}
        <Field value={PUBLISHER.email} label="e-mail de contact" />. La
        résiliation est effective sous {CANCEL_DELAY} et aucun nouveau
        prélèvement n&apos;a lieu ensuite. L&apos;accès au service reste ouvert
        jusqu&apos;à la fin de la période déjà payée.
      </p>

      <h2>6. Remboursement</h2>
      <p>
        Tu disposes de {GUARANTEE_DAYS} jours à compter du paiement pour être
        remboursé, sans motif : écris à{" "}
        <Field value={PUBLISHER.email} label="e-mail de contact" />. Le
        remboursement est intégral et effectué sous {REFUND_DELAY}, sur le moyen
        de paiement utilisé. Ce délai de {GUARANTEE_DAYS} jours correspond au
        droit de rétractation prévu pour les consommateurs en cas de vente à
        distance.
      </p>

      <h2>7. Limites du service</h2>
      <p>
        Les économies affichées sont des estimations calculées à partir de tes
        réponses et des offres connues au moment du calcul. Elles ne constituent
        pas une offre ferme d&apos;un fournisseur et ne garantissent pas un
        montant d&apos;économie. Le contrat d&apos;énergie est conclu entre toi
        et le fournisseur que tu choisis.
      </p>

      <h2>8. Données personnelles</h2>
      <p>
        Les données collectées sont traitées conformément à la politique de
        confidentialité, accessible depuis le pied de page.
      </p>

      <h2>9. Réclamation et médiation</h2>
      <p>
        Pour toute réclamation, écris d&apos;abord à{" "}
        <Field value={PUBLISHER.email} label="e-mail de contact" />. Si le
        désaccord persiste, tu peux saisir gratuitement le médiateur de la
        consommation :{" "}
        <Field value={PUBLISHER.mediator} label="nom et coordonnées du médiateur" />.
      </p>

      <h2>10. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit français. Les
        dispositions impératives de protection du consommateur de ton pays de
        résidence restent applicables.
      </p>
    </LegalLayout>
  );
}
