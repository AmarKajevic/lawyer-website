import Image from 'next/image';
import { ColumnsProps } from '@/types/blocks';

const Columns = ({ isStackedOnMobile, children, className = "", textColor, backgroundColor }: ColumnsProps) => {
  return (
    <div className={`relative ${className}`} style={{ color: textColor, backgroundColor }}>
      {className.includes('first-columns') && (
        <div className="absolute inset-0 -z-10">
          <Image
            src="/judgehammer.webp"
            alt="Background"
            fill
            className="object-cover"
            quality={70}
            priority
          />
        </div>
      )}
      <div className={`py-4 px-6 max-w-7xl mx-auto 
            ${isStackedOnMobile ? "flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6" : "flex space-x-6"}`}
        >


        {children}
      </div>
    </div>
  );
};

export default Columns;