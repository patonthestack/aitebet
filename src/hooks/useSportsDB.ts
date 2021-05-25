import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { SportsDbScheduleProps } from 'types';
import { usePrevious } from './usePrevious';

export function useSportsDB(leagueId: number) {
  const [scheduleData, setScheduleData] = useState<SportsDbScheduleProps[]>([]);

  function createListFromSportsDBData(scheduleData: SportsDbScheduleProps[]) {
    const newList = [];

    scheduleData.map((game) => {
      newList.push({
        label: `${game.strEvent} @ ${format(
          new Date(game.strTimestamp),
          'MMMM dd, yyyy h:mm aa',
        )}`,
        value: `${game.idEvent}`,
      });
    });

    return newList;
  }

  const leagueTeamsUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/lookup_all_teams.php?id=${leagueId}`;
  const leagueScheduleUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/eventsnextleague.php?id=${leagueId}`;
  const leagueLiveScores = `https://www.thesportsdb.com/api/v2/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/livescore.php?l=${leagueId}`;

  const { data: leagueTeamsData } = useSWR<any, any>(
    `${leagueTeamsUrl}`,
    fetcher,
  );

  const { data: leagueScheduleData } = useSWR<any, any>(
    `${leagueScheduleUrl}`,
    fetcher,
  );

  const { data: leagueLiveScoresData } = useSWR<any, any>(
    `${leagueLiveScores}`,
    fetcher,
  );

  const prevLeagueId = usePrevious(leagueId);

  useEffect(() => {
    if (leagueId > 0) {
      if (
        prevLeagueId !== leagueId &&
        typeof leagueScheduleData !== 'undefined'
      ) {
        setScheduleData(createListFromSportsDBData(leagueScheduleData.events));
      }
    }
  }, [leagueId, leagueScheduleData]);

  return {
    scheduleData,
    leagueTeamsData,
    leagueScheduleData,
    leagueLiveScoresData,
  };
}
