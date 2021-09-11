import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { SportsDbScheduleProps } from 'types';

export function useSportsDB(leagueId: number) {
  const [scheduleData, setScheduleData] = useState<SportsDbScheduleProps[]>([]);

  function createListFromSportsDBData(scheduleData: SportsDbScheduleProps[]) {
    const newList = [];

    if (scheduleData.length > 0) {
      scheduleData.map((game) => {
        const localDateTime = game.dateEventLocal + 'T' + game.strTimeLocal;
        newList.push({
          label: `${game.strEvent} @ ${format(
            new Date(localDateTime),
            'MMMM dd, yyyy h:mm aa',
          )}`,
          value: `${game.idEvent}`,
        });
      });
    }

    setScheduleData(newList);
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

  useEffect(() => {
    if (leagueId > 0) {
      if (typeof leagueScheduleData !== 'undefined') {
        createListFromSportsDBData(leagueScheduleData.events);
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
