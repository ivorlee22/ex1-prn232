import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "So Sánh Các Kiến Trúc API - SOAP, REST, GraphQL, OData, gRPC | PRN232",
  description: "Trang web tương tác promax so sánh 5 kiến trúc API (SOAP, REST, GraphQL, OData, gRPC) với 14 tiêu chí, mô phỏng hành trình gói tin, ma trận quyết định cho Student Management System, video bài giảng và 16 tài liệu tham khảo chính thức.",
  keywords: ["API Architectures", "REST", "GraphQL", "gRPC", "SOAP", "OData", "PRN232", "Student Management System", "API Comparison"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#060912" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
