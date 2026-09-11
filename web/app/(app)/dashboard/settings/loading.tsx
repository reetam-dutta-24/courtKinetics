export default function Loading() {
  return (
    <div className="section-stack max-w-2xl animate-pulse">
      <div className="h-9 w-40 rounded-lg bg-muted" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card-base h-32" />
      ))}
    </div>
  );
}