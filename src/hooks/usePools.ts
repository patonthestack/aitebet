import { useAuthUser } from '@/lib/useAuthUser';
import { PoolDataProps } from 'types';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';

export const usePools = (poolId?: string | string[]) => {
  const { userData } = useAuthUser();

  const { data: poolsOwnedByUser } = useCollection<PoolDataProps>('pools', {
    where: ['owner', '==', userData && userData.uid],
    // orderBy: ['createdAt', 'desc'],
    listen: false,
  });

  const { data: poolData, update } = useDocument<PoolDataProps>(
    `pools/${poolId}`,
    {
      listen: false,
    },
  );

  return {
    poolsOwnedByUser,
    poolData,
  };
};
