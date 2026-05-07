import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'flex-row items-center justify-center rounded-2xl px-6 py-3 active:opacity-80 transition-opacity',
  variants: {
    variant: {
      primary: 'bg-[#007E3A]',
      secondary: 'bg-zinc-100',
      outline: 'bg-transparent border border-zinc-200',
      ghost: 'bg-transparent',
      danger: 'bg-red-500',
    },
    size: {
      sm: 'px-3 py-1.5 rounded-xl',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 rounded-3xl',
      icon: 'p-3 rounded-2xl w-12 h-12',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends TouchableOpacityProps, ButtonVariants {
  label?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  labelClassName?: string;
}

export const Button = ({
  label,
  variant,
  size,
  className,
  labelClassName,
  loading,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) => {
  const textColor = variant === 'secondary' || variant === 'outline' || variant === 'ghost' ? 'text-zinc-900' : 'text-white';
  
  return (
    <TouchableOpacity
      className={button({ variant, size, className })}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#000' : '#fff'} />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          {label ? (
            <Text className={`font-bold text-base ${textColor} ${labelClassName}`}>
              {label}
            </Text>
          ) : children}
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};
