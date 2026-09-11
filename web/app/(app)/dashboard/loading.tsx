export default function Loading() {
  return (
    <div className="section-stack animate-pulse">
      <div className="h-32 rounded-2xl bg-muted" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card-base h-28" />
        ))}
      </div>
      <div className="h-40 rounded-2xl bg-muted" />
    </div>
  );
}