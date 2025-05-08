import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import { JSDOM } from 'jsdom';

function stripHtmlWithDOM(html: string): string {
  if (!html || typeof html !== 'string') {
    console.warn('stripHtmlWithDOM: 유효하지 않은 입력:', html);
    return '';
  }
  try {
    const dom = new JSDOM(html);
    const text = dom.window.document.body.textContent || '';
    console.log('stripHtmlWithDOM 입력:', html);
    console.log('stripHtmlWithDOM 출력:', text.trim());
    return text.trim();
  } catch (error) {
    console.error('stripHtmlWithDOM 처리 오류:', error, '입력:', html);
    return html;
  }
}

export async function GET() {
  try {
    const db = await openDb();
    const faqs = await db.all('SELECT * FROM faq_de ORDER BY regDate DESC LIMIT 100');

    const cleanedFaqs = faqs.map((faq) => ({
      ...faq,
      ansCntnCl: stripHtmlWithDOM(faq.ansCntnCl),
      qstnCntnCl: stripHtmlWithDOM(faq.qstnCntnCl),
    }));

    console.log('정리된 FAQ 데이터 (DOMParser):', cleanedFaqs);

    return NextResponse.json(cleanedFaqs);
  } catch (error) {
    console.error('FAQ 조회 오류:', error);
    return NextResponse.json({ error: '데이터베이스 쿼리 실패' }, { status: 500 });
  }
}