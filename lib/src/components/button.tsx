import { formatCount } from '../utils';
import { cva } from '../utils/style';
import type {
  AnchorHTMLAttributes,
  ComponentType,
  ForwardedRef,
  HTMLProps,
  MouseEvent,
} from 'react';
import { forwardRef, memo, useCallback } from 'react';

// TODO Refactor to have proper shadows and padding
const containerVariant = cva(
  'relative flex items-center justify-center rounded-md default-focus cursor-pointer',
  {
    variants: {
      kind: {
        primary: 'bg-blue-600 text-white',
        secondary: 'bg-white text-blue-700 border border-blue-500',
        tertiary: 'bg-white text-gray-700 border border-gray-300',
        success: 'bg-green-600 text-white',
        danger: 'bg-red-600 text-white',
        warning: 'text-amber-700 border border-amber-500 bg-amber-50',
        'danger-outline': 'bg-white text-red-700 border border-red-500',
      },
      size: {
        xxs: 'text-xs gap-1.5 px-1.5 h-[28px] font-normal',
        xs: 'text-xs gap-1.5 px-2.5 h-[32px] font-medium',
        sm: 'text-sm gap-2.5 px-3 h-[36px] font-medium',
        md: 'text-base gap-3 px-4 h-[40px] font-medium',
      },
      disabled: {
        false: 'ease-out hover:translate-y-[0.5px] hover:shadow-none transition-all',
        true: 'cursor-default shadow-none',
      },
      waiting: {
        false: '',
        true: 'animate-pulse cursor-default',
      },
      shadow: {
        none: 'shadow-none',
        small: 'shadow-sm',
        base: 'shadow',
        medium: 'shadow-md',
      },
      clicked: { true: '' },
      hasIcon: { true: '' },
      hasText: { true: '' },
      hasSecondaryIcon: { true: '' },
    },
    defaultVariants: {
      kind: 'primary',
      size: 'sm',
      disabled: false,
    },
    compoundVariants: [
      { size: 'xxs', hasIcon: true, class: 'pl-1.5 pr-1.5' },
      { size: 'xs', hasIcon: true, class: 'pl-2 pr-2.5' },
      { size: 'sm', hasIcon: true, class: 'pl-2.5 pr-3' },
      { size: 'md', hasIcon: true, class: 'pl-3 pr-4' },
      { size: 'xs', hasIcon: true, hasText: false, class: 'px-2.5' },
      { size: 'sm', hasIcon: true, hasText: false, class: 'px-3' },
      { size: 'md', hasIcon: true, hasText: false, class: 'px-4' },
      { size: 'xs', hasSecondaryIcon: true, class: 'pr-2 pl-2.5' },
      { size: 'sm', hasSecondaryIcon: true, class: 'pr-2.5 pl-3' },
      { size: 'md', hasSecondaryIcon: true, class: 'pr-3 pl-4' },
      {
        kind: 'tertiary',
        clicked: true,
        class: 'bg-gray-50 translate-y-[0.5px] shadow-none',
      },
      { size: ['xs', 'xxs'], kind: ['primary', 'danger', 'success'], class: 'shadow' },
      {
        size: ['xs', 'xxs'],
        kind: ['secondary', 'danger-outline', 'tertiary', 'warning'],
        class: 'shadow-sm',
      },
      { size: ['sm', 'md'], kind: ['primary', 'danger', 'success'], class: 'shadow-md' },
      {
        size: ['sm', 'md'],
        kind: ['secondary', 'danger-outline', 'tertiary', 'warning'],
        class: 'shadow',
      },
      { disabled: true, kind: 'primary', class: 'bg-blue-300 text-white' },
    ],
  }
);

const iconVariant = cva('', {
  variants: {
    kind: {
      primary: 'text-white',
      secondary: 'text-blue-600',
      tertiary: 'text-gray-500',
      warning: 'text-amber-700',
      success: 'text-white',
      danger: 'text-white',
      'danger-outline': 'text-red-600',
    },
    size: {
      xxs: 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
    },
  },
});

const secondaryIconVariant = cva('', {
  variants: {
    kind: {
      primary: 'text-white',
      secondary: 'text-blue-600',
      tertiary: 'text-gray-500',
      warning: 'text-amber-700',
      success: 'text-white',
      danger: 'text-white',
      'danger-outline': 'text-red-600',
    },
    size: {
      xxs: 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
    },
  },
});

const countVariant = cva('font-medium', {
  variants: {
    kind: {
      primary: 'text-white',
      secondary: 'text-blue-600',
      tertiary: 'text-gray-400',
      warning: 'text-amber-600',
      success: 'text-white',
      danger: 'text-white',
      'danger-outline': 'text-white',
    },
    size: {
      xxs: 'text-xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
    },
  },
});

type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md';

export type ButtonKind =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'danger-outline';

export interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size' | 'ref'> {
  size: ButtonSize;
  value?: string;
  count?: number;
  clicked?: boolean;
  Icon?: ComponentType<any>;
  SecondaryIcon?: ComponentType<any>;
  iconClassName?: string;
  secondaryIconClassName?: string;
  containerClassName?: string;
  type?: 'button' | 'submit';
  kind: ButtonKind;
  disabled?: boolean;
  onClick?: any;
  iconOnly?: boolean;
  waiting?: boolean;
}

const Button_ = forwardRef(
  (
    {
      value,
      count,
      type = 'button',
      Icon,
      SecondaryIcon,
      iconClassName,
      secondaryIconClassName,
      containerClassName,
      size,
      kind,
      disabled,
      clicked,
      onClick,
      iconOnly,
      waiting = false,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const onClickMemo = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
          onClick?.(event);
        }
      },
      [disabled, onClick]
    );

    return (
      <button
        {...props}
        ref={ref}
        className={containerVariant({
          size,
          kind,
          disabled: !!disabled,
          hasIcon: !!Icon,
          clicked: !!clicked,
          hasText: !!value,
          className: containerClassName,
          waiting,
        })}
        disabled={!!disabled || !!waiting}
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onClickMemo}>
        {!!Icon && <Icon className={iconVariant({ size, kind, className: iconClassName })} />}
        {!value || iconOnly ? null : <span>{value}</span>}
        {!!SecondaryIcon && (
          <SecondaryIcon
            className={secondaryIconVariant({ size, kind, className: secondaryIconClassName })}
          />
        )}
        {!!count && <span className={countVariant({ size, kind })}>{formatCount(count)}</span>}
      </button>
    );
  }
);

export const Button = memo(Button_);

export interface LinkButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'ref' | 'onClick'> {
  size: ButtonSize;
  value?: string;
  count?: number;
  clicked?: boolean;
  Icon?: ComponentType<any>;
  SecondaryIcon?: ComponentType<any>;
  iconClassName?: string;
  secondaryIconClassName?: string;
  containerClassName?: string;
  kind: ButtonKind;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  iconOnly?: boolean;
  waiting?: boolean;
}

const LinkButton_ = forwardRef(
  (
    {
      value,
      count,
      Icon,
      SecondaryIcon,
      iconClassName,
      secondaryIconClassName,
      containerClassName,
      size,
      kind,
      disabled,
      clicked,
      onClick,
      iconOnly,
      waiting = false,
      href,
      ...props
    }: LinkButtonProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const isDisabled = !!disabled || !!waiting;
    const onClickMemo = useCallback(
      (event: MouseEvent<HTMLAnchorElement>) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      },
      [isDisabled, onClick]
    );

    return (
      <a
        {...props}
        ref={ref}
        aria-disabled={isDisabled || undefined}
        className={containerVariant({
          size,
          kind,
          disabled: isDisabled,
          hasIcon: !!Icon,
          clicked: !!clicked,
          hasText: !!value,
          className: containerClassName,
          waiting,
        })}
        href={isDisabled ? undefined : href}
        onClick={onClickMemo}>
        {!!Icon && <Icon className={iconVariant({ size, kind, className: iconClassName })} />}
        {!value || iconOnly ? null : <span>{value}</span>}
        {!!SecondaryIcon && (
          <SecondaryIcon
            className={secondaryIconVariant({ size, kind, className: secondaryIconClassName })}
          />
        )}
        {!!count && <span className={countVariant({ size, kind })}>{formatCount(count)}</span>}
      </a>
    );
  }
);

export const LinkButton = memo(LinkButton_);
