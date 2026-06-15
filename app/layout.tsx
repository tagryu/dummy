import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAG 인플루언서 협업",
  description: "TAG와 함께하는 인플루언서 협업 — 혜택 확인 및 상품 셀렉",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
