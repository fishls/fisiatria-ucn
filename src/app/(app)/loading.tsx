export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Featured card skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-8 bg-surface-container-low rounded-2xl h-64" />
        <div className="md:col-span-4 bg-primary/20 rounded-2xl h-64" />
      </div>

      {/* List skeletons */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-surface-container-low rounded-xl h-20 w-full" />
        ))}
      </div>
    </div>
  );
}
