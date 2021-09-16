import React, { FC, useState } from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

import { _leaguesData } from '@/data/_leaguesData';
import { SportsDbTeamProps } from 'types/index';
import { useSportsDB } from '@/hooks/index';
import { useEffect } from 'react';

export interface ViewMatchupProps {
  eventId: string | number;
}

export const ViewMatchup: FC<ViewMatchupProps> = ({ eventId }) => {
  const [homeTeamId, setHomeTeamId] = useState<number>(0);
  const [awayTeamId, setAwayTeamId] = useState<number>(0);
  const [homeTeam, setHomeTeam] = useState<SportsDbTeamProps>(); // TODO set types for these team data and event data
  const [awayTeam, setAwayTeam] = useState<SportsDbTeamProps>();
  const { eventData, homeTeamData, awayTeamData } = useSportsDB({
    eventId: eventId,
    homeTeamId: homeTeamId,
    awayTeamId: awayTeamId,
  });

  const event = eventData.events[0];

  const findTeamByEventId = () => {
    setHomeTeamId(event.idHomeTeam);
    setAwayTeamId(event.idAwayTeam);
  };

  useEffect(() => {
    findTeamByEventId();
  }, [event, homeTeamId, awayTeamId]);

  useEffect(() => {
    if (typeof homeTeamData !== 'undefined' && homeTeamData !== null) {
      setHomeTeam(homeTeamData?.teams[0]);
    }
  }, [homeTeamData]);

  useEffect(() => {
    if (typeof awayTeamData !== 'undefined' && awayTeamData !== null) {
      setAwayTeam(awayTeamData?.teams[0]);
    }
  }, [awayTeamData]);

  return (
    <RadioGroup>
      <Stack direction="row">
        <Radio value={homeTeam.idTeam}>{homeTeam && homeTeam.strTeam}</Radio>
        <Radio value={awayTeam.idTeam}>{awayTeam && awayTeam.strTeam}</Radio>
      </Stack>
    </RadioGroup>
  );
};
