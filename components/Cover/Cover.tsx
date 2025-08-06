import { CoverProps } from "@/types/blocks";
import Image from "next/image";

export const Cover = ({
  children,
  background,
  isVideo = false,
  poster,
  className = "",
}: CoverProps) => {
  return (
    <div className={`relative w-full h-[55vh] min-h-[650px] overflow-hidden ${className}`}>
      {/* Video background */}
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="absolute inset-0 w-screen h-full object-cover z-0"
        >
          <source src={background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={background}
          fill
          priority
          alt="Cover background"
          className="absolute inset-0 object-cover z-0"
          loading="eager"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/10 transition-colors duration-700" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-start h-full px-4 sm:px-6 lg:px-12">
        <div
          className="p-6 sm:p-8 max-w-4xl w-full border uppercase border-white rounded-2xl 
            opacity-0 animate-fade-in-up text-center sm:text-left
            [&_h1]:text-3xl [&_h1]:sm:text-3xl [&_h1]:md:text-4xl
            [&_p]:text-sm [&_p]:sm:text-base [&_p]:md:text-lg"
        >
        {children}
      </div>
      </div>
    </div>
  );
};
