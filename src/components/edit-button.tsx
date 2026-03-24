import { cx } from '../utils';
import { PencilOutline } from '../icons';

export const EditButton = ({ canEdit, onEdit, className }: any) => {
  return canEdit ? (
    <PencilOutline className={cx('cursor-pointer', className)} onClick={onEdit} />
  ) : null;
};
