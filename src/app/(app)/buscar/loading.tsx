export default function BuscarLoading() {
  return (
    <div className="animate-pulse flex gap-8">
      {/* Sidebar skeleton */}
      <aside className="hidden md:block w-64 shrink-0 space-y-4">
        <div className="bg-surface-container-low rounded-2xl h-10 w-32" />
        <div className="bg-surface-container-low rounded-2xl h-80" />
      </aside>

      {/* Results skeleton */}
      <div className="flex-1 space-y-4">
        <div className="bg-surface-container-low rounded-xl h-12 w-full mb-6" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-surface-container-low rounded-xl h-24 w-full" />
        ))}
      </div>
    </div>
  );
}
