export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent border-primary h-5 w-5 ${className}`}
    />
  );
}
