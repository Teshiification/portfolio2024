import { Skeleton } from '@/components/ui/skeleton'

export const CharacterOverviewCardSkeleton = () => {
  return (
    <Skeleton className='h-20 w-80 overflow-hidden text-center'>
      Loading...
    </Skeleton>
  )
}
