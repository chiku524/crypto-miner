export default function Loading() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[200] h-0.5 overflow-hidden bg-surface-950" aria-hidden>
      <div className="h-full w-1/3 bg-accent-cyan animate-loading-bar" />
    </div>
  );
}
