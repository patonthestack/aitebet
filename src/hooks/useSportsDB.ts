import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { SportsDbScheduleProps } from 'types';

export interface useSportsDBProps {
  leagueId?: number;
  eventId?: string | number;
  homeTeamId?: number;
  awayTeamId?: number;
}

export const useSportsDB = (props: useSportsDBProps) => {
  const [scheduleData, setScheduleData] = useState<SportsDbScheduleProps[]>([]);
  const [homeTeamData, setHomeTeamData] = useState(null);
  const [awayTeamData, setAwayTeamData] = useState(null);

  function createListFromSportsDBData(scheduleData: SportsDbScheduleProps[]) {
    const newList = [];

    if (scheduleData && scheduleData.length > 0) {
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

  const leagueTeamsUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/lookup_all_teams.php?id=${props.leagueId}`;
  const leagueScheduleUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/eventsnextleague.php?id=${props.leagueId}`;
  const leagueLiveScoresUrl = `https://www.thesportsdb.com/api/v2/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/livescore.php?l=${props.leagueId}`;
  const eventDetailsUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/lookupevent.php?id=${props.eventId}`;
  const homeTeamDetailsUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/lookupteam.php?id=${props.homeTeamId}`;
  const awayTeamDetailsUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.NEXT_PUBLIC_SPORTS_DB_KEY}/lookupteam.php?id=${props.awayTeamId}`;

  const { data: leagueTeamsData } = useSWR<any, any>(
    `${leagueTeamsUrl}`,
    fetcher,
  );

  const { data: leagueScheduleData } = useSWR<any, any>(
    `${leagueScheduleUrl}`,
    fetcher,
  );

  const { data: leagueLiveScoresData } = useSWR<any, any>(
    `${leagueLiveScoresUrl}`,
    fetcher,
  );

  const { data: eventData } = useSWR<any, any>(`${eventDetailsUrl}`, fetcher);

  const { data: leagueHomeTeamData } = useSWR<any, any>(
    `${homeTeamDetailsUrl}`,
    fetcher,
  );

  const { data: leagueAwayTeamData } = useSWR<any, any>(
    `${awayTeamDetailsUrl}`,
    fetcher,
  );

  useEffect(() => {
    if (props.leagueId > 0) {
      if (typeof leagueScheduleData !== 'undefined') {
        createListFromSportsDBData(leagueScheduleData.events);
      }
    }
  }, [props.leagueId, leagueScheduleData]);

  useEffect(() => {
    if (props.homeTeamId > 0) {
      if (typeof leagueHomeTeamData !== 'undefined') {
        setHomeTeamData(leagueHomeTeamData);
      }
    }
  }, [props.homeTeamId, leagueHomeTeamData]);

  useEffect(() => {
    if (props.awayTeamId > 0) {
      if (typeof leagueAwayTeamData !== 'undefined') {
        setAwayTeamData(leagueAwayTeamData);
      }
    }
  }, [props.awayTeamId, leagueAwayTeamData]);

  return {
    scheduleData,
    leagueTeamsData,
    leagueScheduleData,
    leagueLiveScoresData,
    eventData,
    homeTeamData,
    awayTeamData,
  };
};
