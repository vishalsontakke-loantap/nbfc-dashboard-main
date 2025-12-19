const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-md ${className}`}
  />
);

export default function DetailsViewSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <main className="container mx-auto px-6 py-8 space-y-6">

        {/* Page Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Applicant Overview */}
        <div className="bg-white rounded-2xl p-4 shadow-md space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </div>

        {/* Loan Details */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <Skeleton className="h-5 w-40 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 rounded-xl border space-y-3">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Risk & Analytics */}
        <div className="bg-white rounded-2xl p-4 shadow-md space-y-4">
          <Skeleton className="h-5 w-48" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>

        {/* Remarks */}
        <div className="bg-white rounded-2xl p-4 shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>

          <Skeleton className="h-4 w-64" />
        </div>

      </main>
    </div>
  );
}
