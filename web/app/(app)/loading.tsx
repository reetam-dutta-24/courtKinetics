export default function Loading() {
  return (
    <div className="section-stack animate-pulse">
      <div>
        <div className="h-9 w-48 rounded-lg bg-muted" />
        <div className="h-5 w-64 rounded-lg bg-muted mt-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card-base h-32 flex flex-col justify-between">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="h-9 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}