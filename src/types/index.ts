export interface UserDataProps extends Record<string, any> {
  uid: string;
  email: string;
  modifiedAt: Date;
  name: string;
  nickname: string;
  provider: string;
}
export interface SportsDbTeamProps extends Record<string, any> {
  idLeague: number;
  idTeam: number;
  strLeague: string;
  strLocked: string;
  strSport: string;
  strTeam: string;
  strTeamBadge: string;
  strTeamLogo: string;
  strTeamShort: string;
}

export interface SportsDbScheduleProps extends Record<string, any> {
  dateEvent: Date;
  idAwayTeam: number;
  idEvent: number;
  idHomeTeam: number;
  idLeague: number;
  intRoud: number;
  strAwayTeam: string;
  strEvent: string;
  strEventAlternate: string;
  strHomeTeam: string;
  strLeague: string;
  strLocked: string;
  strResult: string;
  strSeason: string;
  strSport: string;
  strStatus: string;
  strTimestamp: Date;
}

export interface SportsDbLiveScoreProps extends Record<string, any> {}
