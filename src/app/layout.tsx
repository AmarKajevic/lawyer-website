
import ClientBreadcrumbWrapper from "../../components/Breadcrumb/ClientBreadcrumbWrapper";
import FloatingContactButton from "../../components/FloatingContactButton/FloatingContactButton";
import Footer from "../../components/Footer/Footer";
import LogoMenu from "../../components/LogoMenu/LogoMenu";
import MainMenu from "../../components/MainMenu/MainMenu";
import getPageStaticProps from "../../utils/getPageStaticProps";
import "./globals.css";
import { ReactNode } from "react";



export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const {
    
    menuItems,
    callToActionLabel,
    callToActionDestination,
  } = await getPageStaticProps(); // ili neka funkcija koja samo vraca mainMenu podatke
  
  return (
    <html lang="en" >
      <body>
        
        <div>
        <LogoMenu/>
        <div className="sticky top-0 z-50 ">
          <MainMenu
            items={menuItems}
            callToActionLabel={callToActionLabel}
            callToActionDestination={callToActionDestination}
          />
        </div>

        <ClientBreadcrumbWrapper />
        
        {children}
        <FloatingContactButton />
        <Footer items={menuItems}
            callToActionLabel={callToActionLabel}
            callToActionDestination={callToActionDestination}/>
        </div>
      </body>
    </html>
  );
}
