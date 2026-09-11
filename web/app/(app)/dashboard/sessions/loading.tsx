export default function Loading() {
  return (
    <div className="section-stack animate-pulse">
      <div className="h-9 w-40 rounded-lg bg-muted" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-7 w-24 rounded-full bg-muted" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="card-base h-32" />)}
      </div>
    </div>
  );
}