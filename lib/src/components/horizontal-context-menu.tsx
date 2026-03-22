import { EllipsisHorizontalOutline } from '../icons';
import { Dropdown, type ItemType } from './dropdown';
import { cva } from '../utils/style';

type Size = 'xs' | 's' | 'md';

export interface HorizontalContextMenuProps {
  items: ItemType[];
  dotsOnly?: boolean;
  size?: Size;
}

const dotsOnlyIconVariant = cva('text-gray-700', {
  variants: {
    size: {
      md: 'h-6 w-6',
      s: 'h-5 w-5',
      xs: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const boxedContainerVariant = cva(
  'cursor-pointer border border-gray-300 shadow-sm rounded-md px-0.5',
  {
    variants: {
      size: {
        md: '',
        s: '',
        xs: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const boxedIconVariant = cva('text-gray-700', {
  variants: {
    size: {
      md: 'h-5 w-5',
      s: 'h-4 w-4',
      xs: 'h-3.5 w-3.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const HorizontalContextMenuButton = ({
  dotsOnly = true,
  size = 'md',
}: {
  dotsOnly?: boolean;
  size?: Size;
}) => {
  return dotsOnly ? (
    <button className='cursor-pointer' type={'button'}>
      <EllipsisHorizontalOutline className={dotsOnlyIconVariant({ size })} />
    </button>
  ) : (
    <button className={boxedContainerVariant({ size })} type={'button'}>
      <EllipsisHorizontalOutline className={boxedIconVariant({ size })} />
    </button>
  );
};

export const HorizontalContextMenu = ({
  dotsOnly,
  items,
  size = 'md',
}: HorizontalContextMenuProps) => {
  return (
    <Dropdown
      button={<HorizontalContextMenuButton dotsOnly={dotsOnly} size={size} />}
      items={items}
    />
  );
};
