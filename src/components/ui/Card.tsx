import React, { forwardRef } from 'react';
import { View, Text, ViewProps, TextProps } from 'react-native';
import { tv } from 'tailwind-variants';

const card = tv({
  slots: {
    root: 'bg-white rounded-[24px] overflow-hidden border border-zinc-200/50 shadow-sm',
    header: 'p-5 pb-2',
    body: 'p-5 pt-2 flex-1',
    footer: 'p-5 pt-2 flex-row items-center justify-between',
    title: 'text-xl font-bold text-zinc-900 tracking-tight',
    description: 'text-sm text-zinc-500 font-medium',
  },
});

const { root, header, body, footer, title, description } = card();

export const Card = ({ children, className, ...props }: ViewProps) => (
  <View className={root({ className })} {...props}>{children}</View>
);

Card.Header = ({ children, className, ...props }: ViewProps) => (
  <View className={header({ className })} {...props}>{children}</View>
);

Card.Body = ({ children, className, ...props }: ViewProps) => (
  <View className={body({ className })} {...props}>{children}</View>
);

Card.Footer = ({ children, className, ...props }: ViewProps) => (
  <View className={footer({ className })} {...props}>{children}</View>
);

Card.Title = ({ children, className, ...props }: TextProps) => (
  <Text className={title({ className })} {...props}>{children}</Text>
);

Card.Description = ({ children, className, ...props }: TextProps) => (
  <Text className={description({ className })} {...props}>{children}</Text>
);
