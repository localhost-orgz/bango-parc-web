export default function PageHeader({ title, description, className }) {
  return (
    <div className={className}>
      <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
      {description && <p className="text-sm text-zinc-500">{description}</p>}
    </div>
  );
}
