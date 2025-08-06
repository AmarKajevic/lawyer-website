export const relativeToAbsoluteUrls = (htmlString: string = ""): string => {
    const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
    if (!wpUrl) {
        console.warn("Environment variable NEXT_PUBLIC_WP_URL is not defined.");
        return htmlString;
      }
    return htmlString.split(wpUrl).join("");
  };
  