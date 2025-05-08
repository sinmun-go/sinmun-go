// app/api/faqs/route.ts
import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await openDb();
    const faqs = await db.all('SELECT * FROM faq_de ORDER BY regDate DESC LIMIT 100');
    return NextResponse.json(faqs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
