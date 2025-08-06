import React, {  JSX  } from "react";
import { getFontSizeForHeading, getTextAlign } from "../../utils/fonts";
import { HeadingProps } from "@/types/blocks";




export const Heading = ({ textAlign = "left", level, children, textColor, className = "" }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`font-primary  max-w-7xl mx-auto my-5${className} ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}` } style={{ color: textColor }}>
      {children}
    </Tag>
  );
};
