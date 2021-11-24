import styled, { css, keyframes } from "styled-components";
import {
  layout,
  flexbox,
  space,
  width,
  border,
  fontSize,
  textAlign,
  boxShadow,

  // Types
  BoxShadowProps,
  TextAlignProps,
  FontSizeProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  WidthProps,
  color,
  ColorProps,
  BorderProps,
  system
} from "styled-system";
import theme from "./theme";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from {
    transform: translateX(50%);
  } to {
    transform: translate(0);
  }
`;

const customDefinitions = system({
  cursor: {
    property: "cursor"
  }
});

const lineClamp = (value: string | number) => css`
  -webkit-line-clamp: ${value};
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
`;

const defaults = css`
  ${width};
  ${space};
  ${flexbox};
  ${layout};
  ${color};
  ${border};
  ${fontSize};
  ${textAlign};
  ${boxShadow};
  ${customDefinitions};
  ${(p: any) => p.lineClamp && lineClamp(p.lineClamp)};
`;

interface CustomProps {
  cursor?: string;
  lineClamp?: string;
}

type Props = FlexboxProps &
  LayoutProps &
  SpaceProps &
  WidthProps &
  ColorProps &
  BorderProps &
  FontSizeProps &
  TextAlignProps &
  BoxShadowProps &
  CustomProps;

export const Flex = styled("div")<Props>`
  ${defaults};
  display: flex;
  flex-wrap: wrap;
`;

export const Box = styled("div")<Props>`
  ${defaults};
`;

export const Button = styled("button")<Props>`
  ${defaults};
  background-color: ${(p: any) => p.backgroundColor || "black"};
  border-radius: 4px;
  color: white;
  text-align: center;
  border: none;
  padding: 1.2em 2em;
  width: 100%;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 11px;

  &:hover {
    background-color: ${(p: any) => p.backgroundColor || "rgba(0,0,0,0.5)"};
  }
  /* box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.4); */
`;

export const Product = styled("article")<Props>`
  ${defaults};
  border-radius: 4px;
  background: white;
`;

export const ProductDetails = styled("div")<Props>`
  ${defaults};
  height: 250px;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Price = styled.p`
  ${defaults};
  font-weight: bold;
  font-size: 14px;
`;

export const ProductImage = styled.figure<any>`
  background-image: url(${(p: any) => p.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 250px;
  background-blend-mode: multiply;
  background-color: ${theme.colors.background};
  margin: 0;
  padding: 2em;
  border-radius: 4px 4px 0 0;
`;

export const Container = styled.div.attrs({
  maxWidth: 1200,
  margin: "auto"
})<Props>({}, defaults);

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 200ms ease;
`;

export const CartDrawer = styled.div<{ open: boolean }>`
  width: 500px;
  max-width: 500px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  box-shadow: -20px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 10;
  display: ${(p) => (p.open ? "block" : "none")};
  animation: ${slideIn} 300ms ease-out, ${fadeIn} 200ms ease;
`;

export const Input = styled.input<Props>`
  ${defaults};
  border: 1px solid black;
  border-radius: 4px;
  font-size: 13px;
  padding: 5px;
`;

export const Text = styled.div<Props>`
  ${defaults};
`;

export const Nav = styled.nav<Props>`
  ${defaults}
`;
