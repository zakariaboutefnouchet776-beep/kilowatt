import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-stone-200 pt-6 text-center text-xs text-stone-500">
      <nav
        aria-label="Informations légales"
        className="flex flex-wrap justify-center gap-x-5 gap-y-2"
      >
        <Link href="/mentions-legales" className="underline">
          Mentions légales
        </Link>
        <Link href="/cgv" className="underline">
          Conditions générales de vente
        </Link>
        <Link href="/confidentialite" className="underline">
          Politique de confidentialité
        </Link>
      </nav>
      <p className="mt-3">© Kilowatt</p>
    </footer>
  );
}
