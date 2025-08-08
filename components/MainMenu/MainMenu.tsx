import React from "react";

import { MainMenuProps } from "@/types/blocks";
import BlogPreview from "../BlogPreview/BlogPreview";


const MainMenu = ({
  items,
  callToActionLabel,
  callToActionDestination,
}: MainMenuProps) => {
  return (
    <nav className="bg-white  shadow sticky top-0  z-10">
      <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  h-12 items-center">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 ">
            {items.map((item) => (
              <li key={item.id} className="relative group">
                <a
                  href={item.destination || "#"}
                  className="inline-flex items-center px-3 py-2 text-gray-800 hover:text-black font-semibold"
                >
                  {item.label}
                  {item.subMenuItems && item.subMenuItems.length > 0 && (
                    <svg
                      className="ml-1 w-4 h-4 fill-current transition-transform duration-200 group-hover:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548l4.484 4.484 4.484-4.484L15 9l-5 5-5-5z" />
                    </svg>
                  )}
                </a>

                {/* Mega Menu Dropdown */}
              {item.subMenuItems && item.subMenuItems.length > 0 && (
                    <div
                      className="absolute  left-0 top-5 mt-2 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 
                      pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-10"
                      style={{ minWidth: "800px" }}
                    >
                      <div className="px-8 py-6 grid grid-cols-4 gap-8">
                        {/* === 3 kolone za subMenuItems === */}
                        {(() => {
                          const columns: any[][] = [[], [], []];

                          item.subMenuItems.forEach((sub: any, index: number) => {
                            columns[index % 3].push(sub);
                          });

                          return columns.map((col, colIndex) => (
                            <div key={colIndex} className="space-y-6">
                              {col.map((sub) => (
                                <div key={sub.id} className="space-y-2">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    <a href={sub.destination || "#"}>{sub.label}</a>
                                  </h3>
                                  <ul className="space-y-1 text-gray-700">
                                    {sub.subItems &&
                                      sub.subItems.map((subsub: any) => (
                                        <li key={subsub.id}>
                                          <a
                                            href={subsub.destination || "#"}
                                            className="block hover:text-black hover:underline"
                                          >
                                            {subsub.label}
                                          </a>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ));
                        })()}

                        {/* === 4. kolona: blog preview === */}
                        <div>
                          <BlogPreview />
                        </div>
                      </div>
                    </div>
                  )}
              </li>
            ))}
          </ul>

          {/* CTA button */}
          {/* <div className="hidden lg:inline-block">
            <Link href={callToActionDestination}>
              <button className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-900 transition">
                {callToActionLabel}
              </button>
            </Link>
          </div> */}

          {/* Mobile menu toggle (checkbox) */}
          <div className="lg:hidden">
            <input
              type="checkbox"
              id="mobile-menu-toggle"
              className="peer hidden "
              aria-hidden="true"
            />
            <label
              htmlFor="mobile-menu-toggle"
              className="block cursor-pointer -top-2 w-8 h-8 relative"
              aria-label="Toggle menu"
              tabIndex={0}
            >
              {/* Hamburger icon */}
              <span
                aria-hidden="true"
                className="block absolute h-1 w-8 bg-gray-800 rounded transition-transform duration-300
                  peer-checked:rotate-45 peer-checked:top-3.5"
                style={{ top: "0.75rem" }}
              ></span>
              <span
                aria-hidden="true"
                className="block absolute h-1 w-8 bg-gray-800 rounded transition-opacity duration-300
                  peer-checked:opacity-0"
                style={{ top: "1.5rem" }}
              ></span>
              <span
                aria-hidden="true"
                className="block absolute h-1 w-8 bg-gray-800 rounded transition-transform duration-300
                  peer-checked:-rotate-45 peer-checked:top-3.5"
                style={{ top: "2.25rem" }}
              ></span>
            </label>

            {/* Fullscreen Mobile Menu */}
            <div
              className="fixed inset-0 bg-white scale z-[999] top-23 transform scale-0 peer-checked:scale-100 transition-transform origin-top-right
              overflow-y-auto"
              aria-modal="true"
              role="dialog"
              tabIndex={-1}
            >
              {/* Close button top right */}
              <label
                htmlFor="mobile-menu-toggle"
                className="absolute top-4 right-4 p-2 z-100 cursor-pointer text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                aria-label="Close menu"
              >
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </label>

              {/* Menu content */}
              <nav className="mt-16 px-6 pb-12">
                <ul className="space-y-8">
                  {items.map((item) => (
                    <li key={item.id}>
                      <label
                        htmlFor="mobile-menu-toggle"
                        className="block text-lg font-medium text-gray-900 cursor-pointer"
                      >
                        <a
                          href={item.destination || "#"}
                          className="block px-2 py-1"
                        >
                          {item.label}
                        </a>
                      </label>

                      {/* Podmeni */}
                      {item.subMenuItems && item.subMenuItems.length > 0 && (
                        <ul className="pl-4 mt-2 border-l border-gray-300 space-y-2">
                        {item.subMenuItems.map((sub) => (
                          <li key={sub.id}>
                            {sub.subItems && sub.subItems.length > 0 ? (
                              <details className="group">
                                <summary className="flex  items-center ">
                                  {/* Link unutar summary – klikom ideš na podkategoriju */}
                                  <a
                                    href={sub.destination || "#"}
                                    className="hover:underline"
                                  >
                                    {sub.label}
                                  </a>

                                  {/* Strelica */}
                                  <svg
                                    className="w-10 h-10 ml-2 transition-transform duration-300 group-open:rotate-180"
                                    fill="currentColor"
                                    viewBox="0 0 30 30"
                                  >
                                    <path d="M5.5 7.5l4.5 4.5 4.5-4.5" />
                                  </svg>
                                </summary>

                                {/* Treći nivo – prikazuje se ispod kada se otvori */}
                                <ul className="pl-4 mt-1 border-l border-gray-200 space-y-1">
                                  {sub.subItems.map((subsub) => (
                                    <li key={subsub.id}>
                                      <a
                                        href={subsub.destination || "#"}
                                        className="block px-2 py-1 text-gray-600 hover:text-gray-800 text-sm"
                                      >
                                        {subsub.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            ) : (
                              // Ako nema podpodkategorija
                              <a
                                href={sub.destination || "#"}
                                className="block px-2 py-1 text-gray-700 hover:text-gray-900"
                              >
                                {sub.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>


                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA button */}
              <div className="px-6 pb-8">
                <label htmlFor="mobile-menu-toggle" className="block w-full">
                  <a
                    href={callToActionDestination}
                    className="block w-full bg-black text-white py-3 rounded-md font-semibold text-center hover:bg-gray-900 transition"
                  >
                    {callToActionLabel}
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainMenu;
