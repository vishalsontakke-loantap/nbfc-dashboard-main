import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const NBFCInfoSkeleton = () => {
  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4 text-sm">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-32" />
        ))}
      </div>
    </Card>
  )
}

export const LoanCardSkeleton = () => {
  return (
    <Card className="rounded-2xl shadow-md p-4 w-full">
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-2 gap-2 mt-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}
