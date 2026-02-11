import { RoutePathResponse, useGetStopsQuery } from '../../api/routeApi';
import { IRoute } from '../../model/route';
import { RouteItem } from '../RouteItem/RouteItem';
import { RouteItemSkeleton } from '../RouteItem/RouteItemSkeleton';

export const SmartRouteItem = ({ route }: { route: RoutePathResponse }) => {
  const startId = route.stopsIds[0];
  const endId = route.stopsIds[route.stopsIds.length - 1];

  const { data: stops, isLoading } = useGetStopsQuery([startId, endId]);

  if (isLoading) return <RouteItemSkeleton />;

  const startStop = stops?.find((s) => s.id === startId);
  const endStop = stops?.find((s) => s.id === endId);

  if (!startStop || !endStop) return null;

  const routeData: IRoute = {
    id: route.id,
    price: `${route.price} р`,
    routeStart: { ...startStop, isStart: true },
    routeEnd: { ...endStop, isEnd: true },
  };

  return <RouteItem route={routeData} />;
};
