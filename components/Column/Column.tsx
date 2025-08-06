

import { ColumnProps } from "@/types/blocks";

const Column = ({
  children,
  width,
  className = "",
  backgroundColor,
  textColor,
}: ColumnProps) => {
  const widthStyle = width
    ? { minWidth: width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 };

  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <div
      style={{ ...widthStyle, ...textColorStyle, ...backgroundColorStyle }}
      className={`px-2 py-1 max-w-7xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Column;
