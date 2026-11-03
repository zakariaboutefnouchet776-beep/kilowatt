import type { Metadata } from "next";
import { LegalLayout } from "../LegalLayout";
import { Field } from "../Todo";
import { PUBLISHER } from "../config";

export const metadata: Metadata = {
  title: "Mentions légales — Kilowatt",
  description: "Éditeur, hébergement et contact du site Kilowatt.",
};

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales" updated="3 novembre 2026">
      <h2>Éditeur du site</h2>
      <ul>
        <li>
          Nom ou raison sociale : <Field value={PUBLISHER.name} label="nom ou raison sociale" />
        </li>
        <li>
          Statut : <Field value={PUBLISHER.legalForm} label="forme juridique" />
        </li>
        <li>
          Immatriculation (SIRET ou numéro BCE) :{" "}
          <Field value={PUBLISHER.registration} label="SIRET ou numéro BCE" />
        </li>
        <li>
          Adresse : <Field value={PUBLISHER.address} label="adresse postale" />
        </li>
        <li>
          TVA : <Field value={PUBLISHER.vat} label="numéro de TVA ou « TVA non applicable »" />
        </li>
        <li>
          Contact : <Field value={PUBLISHER.email} label="e-mail de contact" />
        </li>
        <li>
          Directeur de la publication :{" "}
          <Field value={PUBLISHER.publicationDirector} label="nom du directeur de la publication" />
        </li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina,
        CA 91723, États-Unis (vercel.com). Les données saisies sur le site sont
        stockées chez Supabase Inc. (supabase.com), dans un centre de données
        situé en Europe.
      </p>

      <h2>Nature du service</h2>
      <p>
        Kilowatt fournit une estimation indicative de l&apos;économie possible
        sur un contrat d&apos;électricité ou de gaz, et un service de
        surveillance des offres. Kilowatt n&apos;est pas un fournisseur
        d&apos;énergie et ne conclut aucun contrat d&apos;énergie à ta place.
        Les montants affichés sont des estimations, pas des offres fermes.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, la marque et la mise en page du site sont la propriété de
        l&apos;éditeur. Toute reproduction sans accord écrit préalable est
        interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de tes données est décrit dans la politique de
        confidentialité, accessible depuis le pied de page.
      </p>
    </LegalLayout>
  );
}
