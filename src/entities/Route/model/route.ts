interface IBaseRoute {
  id: string;
  price?: string;
}

interface IStop {
  id: string;
  address: string;
  city: string;
  time?: string;
  date?: string;
  isStart?: boolean;
  isEnd?: boolean;
}

interface IDirectRoute extends IBaseRoute {
  routeStart: IStop;
  routeEnd: IStop;
  stops?: never;
}

interface IStopsRoute extends IBaseRoute {
  stops: IStop[];
  routeStart?: never;
  routeEnd?: never;
}

export type IRoute = IDirectRoute | IStopsRoute;
