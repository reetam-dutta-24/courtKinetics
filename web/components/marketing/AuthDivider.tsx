export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-small">or continue with</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}