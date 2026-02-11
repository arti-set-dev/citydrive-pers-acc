/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from '@citydrive/shared/ui/Stack';
import { Employee } from '../../model/types/employee';
import { getFlex } from '@citydrive/shared/lib/stack/flex/getFlex';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { COLUMN_MAP } from '../../model/types/columns';
import { AppLink } from '@citydrive/shared/ui/AppLink/AppLink';
import { getRouteEmployee } from '@citydrive/shared/lib/router/paths';

interface EmployeeItemProps {
  item: Employee;
  activeColumns: string[];
  gridCols: number;

  columnMap: Record<string, any>;
}

export const EmployeeItem = ({
  item,
  activeColumns,
  gridCols,
}: EmployeeItemProps) => {
  return (
    <AppLink to={getRouteEmployee(item.id)} variant="regular">
      <Grid cols={gridCols as any}>
        {activeColumns.map((key) => {
          const config = COLUMN_MAP[key];
          const align = getFlex({ align: config.align || 'start' });
          return (
            <Card
              key={key + item.id}
              p={16}
              borderLine="bottom"
              className={align.className}
              style={align.style}
            >
              {config.render(item)}
            </Card>
          );
        })}
      </Grid>
    </AppLink>
  );
};
