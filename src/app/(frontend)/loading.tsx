// Default Next.js loading UI for the (frontend) tree. Renders skeleton
// placeholders that mimic the typical listing layout while data streams in.

export default function Loading() {
  return (
    <div className="container py-16 space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-1/3 bg-surface-container rounded-md" />
        <div className="h-4 w-1/4 bg-surface-container rounded-md" />
      </div>
      <div className="h-14 bg-surface-container rounded-md" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card rounded-md shadow-e1 overflow-hidden">
            <div className="aspect-[16/10] bg-surface-container" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-surface-container rounded-md" />
              <div className="h-3 w-1/2 bg-surface-container rounded-md" />
              <div className="h-5 w-1/3 bg-surface-container rounded-md mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
