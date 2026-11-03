import Link from "next/link";
import { Footer } from "./Footer";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6">
      <header className="mb-8 text-sm font-bold">
        <Link href="/">⚡ Kilowatt</Link>
      </header>
      <article className="flex-1 text-sm leading-relaxed text-stone-800 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_li]:mt-1 [&_p]:mt-3 [&_ul]:ml-5 [&_ul]:mt-3 [&_ul]:list-disc">
        <h1 className="text-2xl font-extrabold">{title}</h1>
        <p className="text-xs text-stone-500">Dernière mise à jour : {updated}</p>
        {children}
        <p className="mt-8">
          <Link href="/" className="font-bold underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      </article>
      <Footer />
    </main>
  );
}
