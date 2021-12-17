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

  const { data: poolsInvitedByUser } = useCollection<PoolDataProps>('pools', {
    where: ['invitedUsers', 'array-contains', userData && userData.uid],
    // orderBy: ['createdAt', 'desc'],
    listen: false,
  });

  const { data: poolsAcceptedByUser } = useCollection<PoolDataProps>('pools', {
    where: ['acceptedUsers', 'array-contains', userData && userData.uid],
    // orderBy: ['createdAt', 'desc'],
    listen: false,
  });

  const { data: poolData, update: updatePoolData } = useDocument<PoolDataProps>(
    `pools/${poolId}`,
    {
      listen: false,
    },
  );

  const { data: poolSubmissionsByUser } = useCollection<any>(
    `users/${userData?.uid}/userPools`,
  );

  const { data: liveUserPoolsData } = useCollection<any>(
    `users/${userData?.uid}/userPools`,
  );

  return {
    poolsOwnedByUser,
    poolsInvitedByUser,
    poolsAcceptedByUser,
    poolData,
    updatePoolData,
    poolSubmissionsByUser,
    liveUserPoolsData,
  };
};
