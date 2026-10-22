import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kilowatt — combien te coûte ton contrat d'énergie de trop ?",
  description:
    "Réponds à 6 questions et découvre une estimation prudente de ce que tu pourrais économiser chaque année sur ton contrat d'électricité ou de gaz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
