import { Button } from '@citydrive/shared/ui/Button/Button';

export const DeleteDepartmentButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Button variant="clear" onClick={onClick}>
      Delete
    </Button>
  );
};
