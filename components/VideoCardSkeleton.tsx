export function VideoCardSkeleton() {
    return (
      <div className="rounded-lg bg-gray-800/50 overflow-hidden">
        {/* Thumbnail skeleton */}
        <div className="aspect-video w-full bg-gray-700/50 animate-pulse" />
  
        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          {/* Title skeleton */}
          <div className="h-4 bg-gray-700/50 rounded animate-pulse w-3/4" />
  
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-700/50 rounded animate-pulse" />
            <div className="h-3 bg-gray-700/50 rounded animate-pulse w-4/5" />
          </div>
  
          {/* Meta info skeleton */}
          <div className="flex items-center space-x-4 pt-2">
            <div className="h-8 w-8 rounded-full bg-gray-700/50 animate-pulse" />
            <div className="h-3 bg-gray-700/50 rounded animate-pulse w-24" />
          </div>
        </div>
      </div>
    )
  }