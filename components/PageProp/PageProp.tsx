import { PageProps } from "@/types/blocks";
import { BlockRenderer } from "../BlockRenderer/BlockRenderer";
import MainMenu from "../MainMenu/MainMenu";





export const PageProp = ({
  menuItems,
  callToActionLabel,
  callToActionDestination,
  blocks,
}: PageProps) => {
  return (
    <div>
      <MainMenu
        items={menuItems}
        callToActionLabel={callToActionLabel}
        callToActionDestination={callToActionDestination}
      />
      <BlockRenderer blocks={blocks} />
    </div>
  );
};
