export default function ResumenLoading() {
  return (
    <div className="animate-pulse max-w-3xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-surface-container-low rounded-2xl h-56 w-full" />

      {/* Title block */}
      <div className="space-y-3">
        <div className="bg-surface-container-low rounded-lg h-8 w-3/4" />
        <div className="bg-surface-container-low rounded-lg h-5 w-1/2" />
      </div>

      {/* Body paragraphs */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-surface-container-low rounded h-4 w-full" style={{ width: `${100 - i * 5}%` }} />
        ))}
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-surface-container-low rounded-full h-7 w-20" />
        ))}
      </div>
    </div>
  );
}
