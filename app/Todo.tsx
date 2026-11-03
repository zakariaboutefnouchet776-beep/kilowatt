// Affiche la valeur, ou un repère jaune bien visible quand elle n'est pas encore renseignée.
export function Field({
  value,
  label,
}: {
  value: string | null | undefined;
  label: string;
}) {
  if (value && value.trim() !== "") return <>{value}</>;
  return (
    <mark className="rounded bg-yellow-300 px-1 font-semibold text-stone-900">
      [À COMPLÉTER : {label}]
    </mark>
  );
}
