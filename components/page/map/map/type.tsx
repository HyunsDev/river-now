export type Vector = { x: number; y: number };

export interface RiverLevelSeoulAPIResponse {
  ListRiverStageService: {
    list_total_count: number;
    RESULT: {
      CODE: string;
      MESSAGE: string;
    };
    row: Array<RiverLevelSeoulDataRow>;
  };
}

export interface RiverLevelSeoulDataRow {
  RIVERGAUGE_CODE: string;
  RIVERGAUGE_NAME: string;
  RIVER_NAME: string;
  GU_CODE: string;
  GU_NAME: string;
  STORED_TIME: string;
  TRANSFER_TIME: string;
  CURRENT_LEVEL: number;
  LEVEE_LEVEL: number;
  PLANFLOOD_LEVEL: number;
  ORDINARY_LEVEL: number;
  CONTROL_LEVEL: number;
}

export type CityName = "seoul";

export interface Cities {
  [cityName: string]: Regions;
}

export interface Regions {
  svg: {
    width: number;
    height: number;
  };
  regions: {
    [guName: string]: Region;
  };
}

export interface Region {
  guName: string;
  target: React.RefObject<SVGPathElement>;
  riverLevel: Array<RiverLevel>;
  averageRiverLevelRatio: number | null;
  svgPath: string;
  svgTextPos: {
    x: number;
    y: number;
  };
}

export interface RiverLevel {
  riverName: string;
  rivergaugeName: string;
  currentLevel: number;
  planfloodLevel: number;
  riverLevelRatio: number;
}
