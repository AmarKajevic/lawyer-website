export const getTextAlign = (textAlign: "left" | "right" | "center" = "left"): string => {
    const textAlignMap: Record<"left" | "right" | "center", string> = {
      left: "text-left",
      right: "text-right",
      center: "text-center"
    };
  
    return `${textAlignMap[textAlign] || ""}`;
  };
  
  export const getFontSizeForHeading = (level: 1 | 2 | 3 | 4 | 5 ): string => {
    const fontSizeMap: Record<1 | 2 | 3 | 4 | 5 , string> = {
      1: "text-5xl",
      2: "text-4xl",
      3: "text-3xl",
      4: "text-2xl",
      5: "text-xl",
      
    };
  
    return `${fontSizeMap[level] || ""}`;
  };
  