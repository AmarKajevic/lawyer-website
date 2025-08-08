import Image from "next/image";

interface GroupProps {
    children: React.ReactNode;
    className?: string;
    backgroundImageUrl?: string;
    backgroundSize?: string; // npr. "contain" ili "auto"
    hoverImageUrl?: string;
    hoverImageAlt?: string;
    ctaButton?: {
      label: string;
      destination: string;
    };
  }
  
  const Group = ({
    children,
    className,
    backgroundImageUrl,
    backgroundSize = 'auto',
    hoverImageUrl,
    hoverImageAlt,
    ctaButton,
  }: GroupProps) => {
    const isHoverCard = className?.includes('hover-card');
  
    // Stil za pozadinsku sliku ako postoji
    const backgroundStyle = backgroundImageUrl
      ? {
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: backgroundSize, 
        }
      : undefined;
  
    return (
      <div
        className={`group relative p-2 overflow-hidden ${className}`}
        style={backgroundStyle}
      >
        {children}
  
        {isHoverCard && hoverImageUrl && (
          <div className="absolute w-full h-full inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <Image
              src={hoverImageUrl}
              alt={hoverImageAlt || ''}
              fill
              className="object-cover"
            />
            <div className=" absolute inset-0 flex items-center justify-center">
              {ctaButton?.label && (
                <a
                  href={ctaButton.destination}
                  className="btn"
                >
                  {ctaButton.label}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Group;
  