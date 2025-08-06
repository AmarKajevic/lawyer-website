import React from "react";
import {getTextAlign } from "../../utils/fonts";
import { relativeToAbsoluteUrls } from "../../utils/relativeToAbsoluteUrls";
import { ParagraphProps } from "@/types/blocks";


  
  export const Paragraph = ({ textAlign = "left", textColor, content }:ParagraphProps) => {
    return (
      <p
        className={`max-w-7xl mx-auto py-5 ${getTextAlign(textAlign)}`}
        style={{ color: textColor }}
        dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
      ></p>
    );
  };
  