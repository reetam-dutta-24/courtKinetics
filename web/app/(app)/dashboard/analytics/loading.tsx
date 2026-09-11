export default function Loading() {
  return (
    <div className="section-stack animate-pulse">
      <div className="h-9 w-40 rounded-lg bg-muted" />
      <div className="card-base h-80" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-base h-80" />
        <div className="card-base h-80" />
      </div>
    </div>
  );
}