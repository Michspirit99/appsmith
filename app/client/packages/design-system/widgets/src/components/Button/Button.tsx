import React, { forwardRef } from "react";
import { Icon as HeadlessIcon } from "@design-system/headless";
import type {
  ButtonProps as HeadlessButtonProps,
  ButtonRef as HeadlessButtonRef,
} from "@design-system/headless";

import { Text } from "../Text";
import { Spinner } from "../Spinner";
import { StyledButton } from "./index.styled";

export type ButtonVariants = "primary" | "secondary" | "tertiary";

export interface ButtonProps extends Omit<HeadlessButtonProps, "className"> {
  /**
   *  @default primary
   */
  variant?: ButtonVariants;
  isLoading?: boolean;
  isFitContainer?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export const Button = forwardRef(
  (props: ButtonProps, ref: HeadlessButtonRef) => {
    const {
      children,
      icon,
      iconPosition = "start",
      isFitContainer = false,
      isLoading,
      // eslint-disable-next-line -- TODO add onKeyUp when the bug is fixedhttps://github.com/adobe/react-spectrum/issues/4350
      onKeyUp,
      variant = "primary",
      ...rest
    } = props;

    const renderChildren = () => {
      if (isLoading) {
        return (
          <HeadlessIcon>
            <Spinner />
          </HeadlessIcon>
        );
      }

      return (
        <>
          {icon}
          <Text lineClamp={1}>{children}</Text>
        </>
      );
    };

    return (
      <StyledButton
        data-button=""
        data-fit-container={isFitContainer ? "" : undefined}
        data-icon-position={iconPosition === "start" ? undefined : "end"}
        data-loading={isLoading ? "" : undefined}
        data-variant={variant}
        ref={ref}
        {...rest}
      >
        {renderChildren()}
      </StyledButton>
    );
  },
);
