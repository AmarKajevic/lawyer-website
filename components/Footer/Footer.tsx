import { MainMenuProps } from "@/types/blocks";
import Image from "next/image";
import Link from "next/link";

export default function Footer({
  items,
  callToActionLabel,
  callToActionDestination,
}: MainMenuProps) {
  return (
    <div className="relative w-full min-h-[400px] text-white  ">
      {/* Pozadinska slika */}
      <Image
        src="/hram.webp"
        alt="Background"
        fill
        className="object-cover -z-10"
        quality={70}
        priority
      />
      <div className="absolute inset-0 bg-black/70 -z-0" />

      {/* Sadržaj */}
      <div className="relative z-10 h-full flex flex-col md:flex-row justify-between items-center md:items-center gap-6 px-6 py-30">
        {/* Logo */}
        <div className="md:w-1/3 w-full flex justify-center">
          <Image
            src="/logoMilovanovic.png"
            alt="logo"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>

        {/* Linkovi */}
        <div className="md:w-1/3 w-full grid grid-cols-2 md:grid-cols-2 gap-2">
          {Array.isArray(items) &&
            items.flatMap((item) =>
              Array.isArray(item.subMenuItems)
                ? item.subMenuItems.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.destination || "#"}
                      className="hover:underline text-white text-sm"
                    >
                      {sub.label}
                    </Link>
                  ))
                : []
            )}
        </div>

        {/* Tekst + dugme */}
        <div className="md:w-1/3 w-full flex flex-col md:items-center items-center space-y-4 mt-4 md:mt-0">
          <p className="text-sm md:text-center">Napomena: Sadržaj ove internet stranice služi isključivo u informativne svrhe i ne predstavlja pravni savet niti poziv na angažovanje. Prikazane informacije ne mogu zameniti konsultaciju sa advokatom koja uključuje detaljnu analizu konkretne pravne situacije. Ova prezentacija ne predstavlja reklamiranje u smislu Zakona o advokaturi. Uspešni ishodi u prethodnim slučajevima ne predstavljaju garanciju sličnog rezultata u budućnosti.</p>
          <Link
            href={callToActionDestination || "#"}
            className="btn"
          >
            {callToActionLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
