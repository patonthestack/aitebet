import React, { ChangeEvent, FC, useState } from 'react';
import {
  Box,
  FormControl,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import { _leaguesData } from '@/data/_leaguesData';
import { LabelValue, SportsDbTeamProps } from 'types/index';
import { useSportsDB } from '@/hooks/index';
import { useEffect } from 'react';

export interface ViewMatchupProps {
  eventId: string | number;
  onHandleRadioChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ViewMatchup: FC<ViewMatchupProps> = ({
  eventId,
  onHandleRadioChange,
}) => {
  const [homeTeamId, setHomeTeamId] = useState<number>(0);
  const [awayTeamId, setAwayTeamId] = useState<number>(0);
  const [homeTeam, setHomeTeam] = useState<SportsDbTeamProps>(); // TODO set types for these team data and event data
  const [awayTeam, setAwayTeam] = useState<SportsDbTeamProps>();
  const { eventData, homeTeamData, awayTeamData } = useSportsDB({
    eventId: eventId,
    homeTeamId: homeTeamId,
    awayTeamId: awayTeamId,
  });

  const event = eventData && eventData?.events[0];

  const findTeamByEventId = () => {
    setHomeTeamId(event?.idHomeTeam);
    setAwayTeamId(event?.idAwayTeam);
  };

  useEffect(() => {
    if (event) {
      findTeamByEventId();
    }
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
    <Box>
      {homeTeam && awayTeam ? (
        <RadioGroup>
          <Stack direction="row" spacing={4}>
            <Radio
              value={homeTeam?.idTeam}
              name={String(eventId)}
              onChange={(e) => onHandleRadioChange(e)}
            >
              {homeTeam?.strTeam}
            </Radio>
            <Radio
              value={awayTeam?.idTeam}
              name={String(eventId)}
              onChange={(e) => onHandleRadioChange(e)}
            >
              {awayTeam?.strTeam}
            </Radio>
          </Stack>
        </RadioGroup>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};
