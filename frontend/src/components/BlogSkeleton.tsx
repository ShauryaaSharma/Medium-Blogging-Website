export function BlogSkeleton() {
  return (
    <div className="max-w-2xl border-b border-gray-200 py-6 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-gray-200" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-1" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-16 bg-gray-200 rounded" />
    </div>
  );
}

export function FullBlogSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 animate-pulse">
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-6" />
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
