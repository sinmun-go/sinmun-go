// app/faqs/page.tsx
'use client';

import { useEffect, useState } from 'react';

type FAQ = {
  faqNo: string;
  qnaTitl: string;
  qstnCntnCl: string;
  ansCntnCl: string;
  ancName: string;
  deptName: string;
  regDate: string;
  ancCode: string;
  deptCode: string;
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    fetch('/api/faq') // API 엔드포인트 수정
      .then((res) => res.json())
      .then(setFaqs)
      .catch(console.error);
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">국민권익위원회 질의/응답 조회</h1>
      <ul className="space-y-4">
        {faqs.map((faq) => (
          <li key={faq.faqNo} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{faq.qnaTitl}</h2>
            <p className="text-gray-600">{faq.qstnCntnCl}</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-600">답변 보기</summary>
              <div dangerouslySetInnerHTML={{ __html: faq.ansCntnCl }} className="mt-1" />
            </details>
            <p className="text-sm text-gray-400 mt-2">
              등록일: {faq.regDate} / 부서: {faq.deptName}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}