import React from "react";

type FaqItem ={
  id: string;
  jsonQuestion: string;
  jsonAnswer: string;
}
type faqProps = {
    items : FaqItem[];
}
export default function Faq({items}:faqProps) {
  return (
  <div className="divide-y divide-gray-200 max-w-7xl mx-auto">
      {items.map((item) => (
        <details
          key={item.id}
          className="py-4 group"
        >
          <summary className="cursor-pointer text-lg font-medium text-white marker:text-blue-800 hover:underline">
            {item.jsonQuestion}
          </summary>
          <div className="mt-2 text-gray-200">{item.jsonAnswer}</div>
        </details>
      ))}
    </div>
  );
}