export default function Loading() {
  return (
    <div className="page-container flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg animate-pulse section-stack">
        <div className="h-9 w-64 rounded-lg bg-muted" />
        <div className="h-5 w-80 rounded-lg bg-muted" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-11 rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}