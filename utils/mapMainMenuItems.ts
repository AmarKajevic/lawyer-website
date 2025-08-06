import { v4 as uuid } from "uuid";

interface Destination {
  uri: string;
}

interface SubItem {
  destination?: Destination;
  label: string;
}

interface Item {
  destination?: Destination;
  label?: string; // Optional since some labels might not be present
  subitems?: SubItem[] | null;
}

interface MenuItem {
  destination?: Destination;
  label: string;
}

interface RawMenuItem {
  menuItem: MenuItem;
  items?: Item[] | null;
}

interface TransformedSubItem {
  id: string;
  destination?: string;
  label: string;
}

interface TransformedSubMenuItem {
  id: string;
  destination?: string;
  label: string;
  subItems: TransformedSubItem[];
}

interface TransformedMenuItem {
  id: string;
  destination?: string;
  label: string;
  subMenuItems: TransformedSubMenuItem[];
}

export const mapMainMenuItems = (
  menuItems: RawMenuItem[]
): TransformedMenuItem[] => {
  return menuItems.map((menuItem) => ({
    id: uuid(),
    destination: menuItem.menuItem.destination?.uri,
    label: menuItem.menuItem.label,
    subMenuItems: (menuItem.items || []).map((item) => ({
      id: uuid(),
      destination: item.destination?.uri,
      label:
        item.label ||
        item.destination?.uri?.split("/").filter(Boolean).pop() ||
        "Submenu",
      subItems: (item.subitems || []).map((subitem) => ({
        id: uuid(),
        destination: subitem.destination?.uri,
        label: subitem.label,
      })),
    })),
  }));
};
