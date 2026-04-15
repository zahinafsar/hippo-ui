import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPreview() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
