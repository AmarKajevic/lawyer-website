import Image from "next/image";
import Link from "next/link";
import Search from "../Search/Search";

const LogoMenu = () => {
  return (
    <div className="bg-black/90 px-1 sm:px-6 md:px-10 py-1 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      {/* Gornji red: logo + search */}
      <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between lg:flex-row lg:gap-6 w-full">
        <div className="flex-shrink-0 mb-2 sm:mb-0 ">
          <Link href="/">
            <Image
              src="/logoMilovanovic.png"
              alt="logo"
              width={100}
              height={100}
              className="w-18 p-2 sm:w-20 md:w-20 lg:w-28 h-auto"
              priority
            />
          </Link>
        </div>
        <div className="w-full max-w-5xl">
          <Search />
        </div>
      </div>

      {/* Donji red: telefon + email */}
      <div className="hidden md:flex flex-row sm:flex-row sm:justify-between sm:items-center text-white text-sm w-full gap-2 sm:gap-4 lg:w-auto lg:flex-row lg:gap-6">
        <div>+381644208963</div>
        <div>advokatmilovanovic@gmail.com</div>
      </div>
    </div>
  );
};

export default LogoMenu;
