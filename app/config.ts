// Réglages à compléter. Une valeur `null` s'affiche en jaune « À COMPLÉTER » sur le site.

export const SITE_URL = "https://kilowatt-kappa.vercel.app";

// Coordonnées de l'éditeur (mentions légales, CGV, confidentialité, garantie).
export const PUBLISHER = {
  name: null as string | null, // Nom et prénom, ou raison sociale
  legalForm: null as string | null, // ex. « Entrepreneur individuel », « SRL », « SAS »
  registration: null as string | null, // SIRET (France) ou numéro BCE (Belgique)
  address: null as string | null, // Adresse postale complète
  email: null as string | null, // E-mail de contact
  publicationDirector: null as string | null, // Directeur de la publication
  vat: null as string | null, // N° de TVA, ou « TVA non applicable »
  mediator: null as string | null, // Médiateur de la consommation (obligatoire pour vendre en France)
};

// Liens de paiement Stripe (Payment Links). Tant qu'un lien est `null`, le bouton reste inactif.
export const STRIPE_LINKS = {
  monthly: null as string | null,
  yearly: null as string | null,
};

export const GUARANTEE_DAYS = 14;
export const REFUND_DELAY = "5 jours ouvrés";
export const CANCEL_DELAY = "2 jours ouvrés";

export type PlanId = "monthly" | "yearly";

export const PLANS: {
  id: PlanId;
  name: string;
  price: number; // en euros
  priceLabel: string;
  period: string;
  perDay: string;
  highlight?: string;
}[] = [
  {
    id: "monthly",
    name: "Mensuel",
    price: 7.99,
    priceLabel: "7,99 €",
    period: "par mois",
    perDay: "0,27 €",
  },
  {
    id: "yearly",
    name: "Annuel",
    price: 59,
    priceLabel: "59 €",
    period: "par an",
    perDay: "0,16 €",
    highlight: "Tu économises 37 € par rapport au mensuel",
  },
];
