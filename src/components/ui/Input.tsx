import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { tv } from 'tailwind-variants';

const input = tv({
  slots: {
    root: 'w-full mb-4',
    label: 'text-sm font-bold text-zinc-700 mb-1.5 ml-1',
    container: 'bg-zinc-100 rounded-2xl border border-transparent focus:border-[#007E3A] px-4 py-3.5 flex-row items-center',
    field: 'flex-1 text-base text-zinc-900 font-medium',
    helper: 'text-xs text-zinc-500 mt-1 ml-1',
  },
});

const { root, label: labelStyle, container, field, helper } = input();

interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  containerClassName,
  className,
  ...props
}: InputProps) => {
  return (
    <View className={root({ className })}>
      {label && <Text className={labelStyle()}>{label}</Text>}
      <View className={container({ className: containerClassName })}>
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        <TextInput
          className={field()}
          placeholderTextColor="#a1a1aa"
          {...props}
        />
        {rightIcon && <View className="ml-3">{rightIcon}</View>}
      </View>
      {(error || helperText) && (
        <Text className={helper({ className: error ? 'text-red-500' : '' })}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};
