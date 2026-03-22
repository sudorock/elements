import { EllipsisVerticalOutline } from '../icons';
import { Dropdown, type ItemType } from './dropdown';
import { cva } from '../utils/style';

type Size = 'xs' | 'sm' | 'md';

export interface VerticalContextMenuProps {
  items: ItemType[];
  dotsOnly?: boolean;
  size?: Size;
}

const dotsOnlyIconVariant = cva('text-gray-700', {
  variants: {
    size: {
      md: 'h-6 w-6',
      sm: 'h-5 w-5',
      xs: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const boxedContainerVariant = cva('cursor-pointer border border-gray-300 shadow-sm rounded-md', {
  variants: {
    size: {
      md: 'px-0.5 py-1',
      sm: 'px-px py-0.5',
      xs: 'px-0 py-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const boxedIconVariant = cva('text-gray-700', {
  variants: {
    size: {
      md: 'h-5 w-5',
      sm: 'h-4 w-4',
      xs: 'h-3.5 w-3.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const VerticalContextMenuButton = ({
  dotsOnly = true,
  size = 'md',
}: {
  dotsOnly?: boolean;
  size?: Size;
}) => {
  return dotsOnly ? (
    <button className='cursor-pointer' type={'button'}>
      <EllipsisVerticalOutline className={dotsOnlyIconVariant({ size })} />
    </button>
  ) : (
    <button className={boxedContainerVariant({ size })} type={'button'}>
      <EllipsisVerticalOutline className={boxedIconVariant({ size })} />
    </button>
  );
};

export const VerticalContextMenu = ({ dotsOnly, items, size = 'md' }: VerticalContextMenuProps) => {
  return (
    <Dropdown
      button={<VerticalContextMenuButton dotsOnly={dotsOnly} size={size} />}
      items={items}
    />
  );
};
