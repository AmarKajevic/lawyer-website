import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // 1. Izvuci sadržaj iz WordPress-a (npr. FAQ stranice ili 'Usluge')
  const wpDataRes = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          pages(where: {title: "FAQ"}) {
            nodes {
              title
              content
            }
          }
        }
      `,
    }),
  });

  const wpData = await wpDataRes.json();
  const faqContent = wpData?.data?.pages?.nodes?.[0]?.content?.replace(/<[^>]+>/g, '') ?? '';

  // 2. Pošalji poruku GPT-u sa dodatim kontekstom iz WP-a
  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Ti si advokatski asistent. Koristi sledeće informacije iz FAQ sekcije kako bi odgovarao korisnicima:\n\n${faqContent}`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    }),
  });

  const data = await openaiRes.json();
  return NextResponse.json({ reply: data.choices[0].message.content });
}
