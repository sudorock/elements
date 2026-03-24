import { cva } from '../utils/style';

const statusContainerVariant = cva(
  'flex items-center gap-2 border pl-2 pr-2.5 py-1 rounded-full shadow-sm bg-white cursor-pointer',
  {
    variants: {
      color: {
        gray: 'border-gray-500',
        blue: 'border-blue-500',
        green: 'border-green-600',
        indigo: 'border-indigo-600',
        lime: 'border-lime-600',
        orange: 'border-orange-600',
        teal: 'border-teal-600',
        sky: 'border-sky-600',
        amber: 'border-amber-600',
        yellow: 'border-yellow-600',
      },
    },
  }
);

const statusDotVariant = cva('w-3 h-3 rounded-full', {
  variants: {
    color: {
      gray: 'bg-gray-400',
      blue: 'bg-blue-500',
      green: 'bg-green-600',
      indigo: 'bg-indigo-600',
      lime: 'bg-lime-600',
      orange: 'bg-orange-600',
      teal: 'bg-teal-600',
      sky: 'bg-sky-600',
      amber: 'bg-amber-600',
      yellow: 'bg-yellow-500',
    },
    pulse: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    pulse: false,
  },
});

const statusTextVariant = cva('text-xs font-medium', {
  variants: {
    color: {
      gray: 'text-gray-500',
      blue: 'text-blue-600',
      green: 'text-green-600',
      indigo: 'text-indigo-600',
      lime: 'text-lime-600',
      orange: 'text-orange-600',
      teal: 'text-teal-600',
      sky: 'text-sky-600',
      amber: 'text-amber-600',
      yellow: 'text-yellow-600',
    },
  },
});

export type Colors =
  | 'gray'
  | 'blue'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'orange'
  | 'teal'
  | 'sky'
  | 'amber'
  | 'yellow';

interface StatusButtonProps {
  name: string;
  color: Colors;
  shouldDotPulse?: boolean;
  onClick?: any;
}

export const StatusButton = ({ name, color, shouldDotPulse, onClick }: StatusButtonProps) => {
  return (
    <button className={statusContainerVariant({ color })} type={'button'} onClick={onClick}>
      <div className={statusDotVariant({ color, pulse: shouldDotPulse })} />
      <p className={statusTextVariant({ color })}>{name}</p>
    </button>
  );
};
