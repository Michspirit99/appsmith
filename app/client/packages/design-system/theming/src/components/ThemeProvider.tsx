import { createTypographyStyles } from "./typography";
import React from "react";
import styled, { css } from "styled-components";
import kebabCase from "lodash/kebabCase";
import type { ReactNode } from "react";
import type { ThemeTokens } from "../";
import { ThemeContext } from "./ThemeContext";

export interface ThemeProviderProps {
  theme: ThemeTokens;
  children: ReactNode;
  className?: string;
}

const getTypographyStyles = (rootUnit = 4, fontFamily = undefined) => {
  return {
    heading: css`
      ${createTypographyStyles({
        fontFamily,
        capHeight: rootUnit * 6,
        lineGap: rootUnit * 6,
      })}
    `,
    body: css`
      ${createTypographyStyles({
        fontFamily,
        capHeight: rootUnit * 2.5,
        lineGap: rootUnit * 2,
      })}
    `,
    footnote: css`
      ${createTypographyStyles({
        fontFamily,
        capHeight: rootUnit * 2,
        lineGap: rootUnit,
      })}
    `,
  };
};

/**
 * creates locally scoped css variables
 *
 */
const StyledProvider = styled.div<ThemeProviderProps>`
  ${({ theme }) => {
    return css`
      ${Object.keys(theme).map((key) => {
        return Object.keys(theme[key]).map((nestedKey) => {
          return `--${kebabCase(key)}-${kebabCase(nestedKey)}: ${
            theme[key][nestedKey].value
          };`;
        });
      })}
    `;
  }}
`;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, className, theme } = props;

  const rootUnit = parseInt(theme.sizing["root-unit"].value as string, 10);
  const fontFamily = theme?.fontFamilies?.["1"]?.value || undefined;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        typography: getTypographyStyles(
          rootUnit as number,
          fontFamily as undefined,
        ),
      }}
    >
      <StyledProvider
        className={className}
        data-theme-provider=""
        theme={theme}
      >
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  );
};
