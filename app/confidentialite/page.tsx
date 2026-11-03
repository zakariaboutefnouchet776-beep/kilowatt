import type { Metadata } from "next";
import { LegalLayout } from "../LegalLayout";
import { Field } from "../Todo";
import { PUBLISHER } from "../config";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Kilowatt",
  description: "Quelles données Kilowatt collecte, pourquoi, et comment les supprimer.",
};

export default function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="3 novembre 2026">
      <h2>Qui est responsable de tes données</h2>
      <p>
        <Field value={PUBLISHER.name} label="nom ou raison sociale" />,{" "}
        <Field value={PUBLISHER.address} label="adresse postale" />. Contact :{" "}
        <Field value={PUBLISHER.email} label="e-mail de contact" />.
      </p>

      <h2>Ce que nous collectons</h2>
      <ul>
        <li>
          Tes réponses au questionnaire (type de logement, énergie, montant de
          facture, ancienneté du contrat, type d&apos;offre, chauffage) et
          l&apos;estimation calculée. Ces données ne contiennent ni ton nom ni
          ton adresse.
        </li>
        <li>
          Ton adresse e-mail, si tu la laisses pour recevoir ton détail ou des
          alertes.
        </li>
        <li>
          Les informations liées à ton paiement et à ton abonnement. Ton
          numéro de carte est traité uniquement par Stripe : Kilowatt ne le voit
          pas.
        </li>
      </ul>

      <h2>Pourquoi, et sur quelle base</h2>
      <ul>
        <li>
          Calculer ton estimation et te l&apos;afficher : exécution du service
          que tu demandes.
        </li>
        <li>
          T&apos;envoyer ton détail et tes alertes : ton consentement, en
          laissant ton e-mail.
        </li>
        <li>
          Gérer ton abonnement, ton paiement et un éventuel remboursement :
          exécution du contrat et obligations comptables.
        </li>
      </ul>

      <h2>Qui reçoit tes données</h2>
      <ul>
        <li>Supabase : stockage des réponses et des e-mails, en Europe.</li>
        <li>Stripe : paiement et gestion de l&apos;abonnement.</li>
        <li>Vercel : hébergement du site.</li>
      </ul>
      <p>
        Nous ne vendons pas tes données et ne les transmettons pas à des
        fournisseurs d&apos;énergie sans ton accord.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les réponses au questionnaire et ton e-mail sont conservés tant que tu
        ne demandes pas leur suppression, et au maximum 3 ans après ton dernier
        contact. Les données de paiement sont conservées le temps exigé par la
        loi comptable.
      </p>

      <h2>Cookies et mesure d&apos;audience</h2>
      <p>
        Le site n&apos;utilise aucun cookie publicitaire et n&apos;installe pas
        de traceur de mesure d&apos;audience à ce jour. Si cela change, cette
        page sera mise à jour avant.
      </p>

      <h2>Tes droits</h2>
      <p>
        Tu peux demander l&apos;accès à tes données, leur correction, leur
        suppression, ou t&apos;opposer à leur traitement, en écrivant à{" "}
        <Field value={PUBLISHER.email} label="e-mail de contact" />. Nous
        répondons sous un mois. Tu peux aussi introduire une réclamation auprès
        de l&apos;autorité de protection des données de ton pays (en France, la
        CNIL ; en Belgique, l&apos;APD).
      </p>
    </LegalLayout>
  );
}
