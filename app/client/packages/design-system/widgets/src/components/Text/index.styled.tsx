import styled, { css } from "styled-components";

import type { TextProps } from "./Text";

type StyledTextProp = TextProps & any;

/**
 * adds Truncate styles
 * truncate -> trucate text to single line
 * lineClamp -> truncate text to multiple lines
 *
 * @param {TextProps} props
 * @returns {string}
 */
const truncateStyles = css`
  ${(props: TextProps) => {
    const { lineClamp } = props;

    if (typeof lineClamp === "number") {
      return css`
        span {
          display: -webkit-box;
          -webkit-line-clamp: ${lineClamp};
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
      `;
    }

    return "";
  }}
`;

export const StyledText = styled.div<StyledTextProp>`
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-style: ${({ fontStyle }) => fontStyle};
  text-align: ${({ textAlign }) => textAlign};

  ${(props) =>
    props.variant === "body" &&
    css`
      ${props.typography.body}
    `}

  ${(props) =>
    props.variant === "footnote" &&
    css`
      ${props.typography.footnote}
    `}

  ${(props) =>
    props.variant === "heading" &&
    css`
      ${props.typography.heading}
      font-weight: bold
    `}


  ${truncateStyles}
`;
