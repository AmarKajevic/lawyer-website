import { ReactNode } from "react";

export type Block ={
    
    name: string;
    id: string; // Opcionalno jer ćemo ga kasnije dodeliti
    innerBlocks: Block[]; // Podbloci, može biti prazan niz ili niz blokova
    [key: string]: any; // Ostali atributi blokova, kao što su text, image, itd.
    
  }
  export type ColumnsProps = {
    isStackedOnMobile: boolean;
    children: ReactNode;
    className?: string;
    textColor?: string;
    backgroundColor?: string;
  }
  export type ButtonProps = {
    destination: string;
    label:string;
}
export type CtaProps = {
  buttonLabel: string;
  destination: string;
  align?: "left" | "center" | "right";
}
export type ColumnProps = {
  children: ReactNode
  width:number;
  className?: string;
  textColor?: string;
  backgroundColor?: string;
}
export type CoverProps ={
  background: string;
  isVideo?: boolean;
  children?: React.ReactNode;
  poster?: string;
  className?: string;
}
export type HeadingProps ={
  textAlign?: "left" | "center" | "right";
  level: 1 | 2 | 3 | 4 | 5 ;
  children: ReactNode;
  textColor?: string;
  className?: string;
}
export type MenuItem = {
  id: string;
  destination?: string;
  label: string;
  subMenuItems?: {
    id: string;
    destination?: string;
    label: string;
    subItems?: {
      id: string;
      destination?: string;
      label: string;
    }[];
  }[];
};


export type MainMenuProps = {
  items: MenuItem[];
  callToActionLabel: string;
  callToActionDestination: string;
}
export type PageProps = {
  menuItems: any[]; // preciziraj tip ako imaš
  callToActionLabel: string;
  callToActionDestination: string;
  blocks: any[]; // preciziraj tip ako imaš
}
export type ParagraphProps  = {
  textAlign?: "left" | "center" | "right";
  textColor?: string;
  content: string;
}
export type Property ={
  databaseId: number;
  title: string;
  uri: string;
  featuredImage?: {
    node: {
      uri: string;
      sourceUrl: string;
    };
  };
  propertyFeatures?: {
    saznaj?: {
      id: string;
    };
    title?: string;
  };
}