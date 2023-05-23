import type { Ref } from "react";
import React, { forwardRef } from "react";
import { StyledText } from "./index.styled";
import { useThemeContext } from "@design-system/theming";

export interface TextProps {
  variant?: "body" | "footnote" | "heading";
  type?: "default" | "neutral" | "positive" | "negative" | "warn";
  fontWeight?: "normal" | "bold" | "bolder" | "lighter";
  fontStyle?: "normal" | "italic";
  textAlign?: "left" | "center" | "right";
  lineClamp?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

export const Text = forwardRef(
  (props: TextProps, ref: Ref<HTMLParagraphElement>) => {
    const { children, type = "default", variant = "body", ...rest } = props;

    const { typography } = useThemeContext();

    return (
      <StyledText
        ref={ref}
        type={type}
        variant={variant}
        {...rest}
        typography={typography}
      >
        <span>{children}</span>
      </StyledText>
    );
  },
);
