export type ModeType = 'production' | 'development' | 'none';

export interface BuildPaths {
  html: string;
  src: string;
}

export interface BuildEnv {
  mode: ModeType;
  analyze: boolean;
  port: number;
}
