export interface Theme {
    base: string;
    contrast: string;
    "accent-1": string;
    "accent-2": string;
    "accent-3": string;
    "accent-4": string;
    "accent-5": string;
    "accent-6": string;
    slate: string;
    oker: string;
    braon: string;
    brown:string;
    "vivid-green-cyan"?: string;
    "pale-pink"?: string;
    "vivid-red"?: string;
    "luminous-vivid-orange"?: string;
    // Dodaj još ako koristiš više boja
  }
  
  export const theme: Theme = {
    base: "#FFFFFF",
    contrast: "#111111",
    "accent-1": "#FFEE58",
    "accent-2": "#F6CFF4",
    "accent-3": "#503AA8",
    "accent-4": "#686868",
    "accent-5": "#FBFAF3",
    "accent-6": "color-mix(in srgb, currentColor 20%, transparent)",
    slate: "#1E293B",
    oker: "#f0efc6",
    braon: "#604B33",
    brown: "#2B1700",
  
    // WordPress core boje
    "vivid-green-cyan": "#00d084",
    "pale-pink": "#f78da7",
    "vivid-red": "#cf2e2e",
    "luminous-vivid-orange": "#ff6900",
  };
  