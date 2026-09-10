# API Architectures Comparison - Promax Master Guide 🚀
> **Course**: PRN232 - Advanced Cross-Platform .NET Application Development · **Institution**: FPT University  
> **Topic**: Comparing API Architectures (SOAP, REST, GraphQL, OData, gRPC) & Student Management System Case Study

---

## 🌟 Tổng Quan Dự Án

Trang web tương tác đa phương tiện hiện đại xây dựng bằng **Next.js 15 (React 19, TypeScript)** kết hợp thư viện hoạt họa **`motion` (Framer Motion v12)**, đồ họa phong cách hoạt hình (cartoon bouncy animations), hệ thống âm thanh **Web Audio API**, pháo hoa **Canvas Confetti** và linh vật robot **Chip Bot**.

Đáp ứng trọn vẹn **100% 5 yêu cầu đề bài** trong tài liệu `Comparing API Architectures.pdf`:
1. **Compare**: Ma trận so sánh **14 tiêu chí kỹ thuật** cho 5 kiến trúc: SOAP, REST, GraphQL, OData, gRPC.
2. **Choose**: Lựa chọn **REST** cho hệ thống Quản lý Sinh viên (SMS) với **bộ tính điểm trọng số tương tác 8 tiêu chí (REST: 4.35/5.00)** và các biện luận chuyên sâu.
3. **Demonstrate**: Mô phỏng hành trình gói tin hoạt họa 4 bước qua 5 trạm mạng (`Client ➔ Gateway ➔ Serialization ➔ Controller ➔ DB`), hỗ trợ các phương thức `GET`, `POST`, `PUT`, `DELETE` và bảng ngữ nghĩa CRUD.
4. **Diagram**: Sơ đồ kiến trúc 4 tầng phân lớp chi tiết của hệ thống SMS (Client Apps ➔ API Gateway ➔ RESTful Core Services ➔ Redis Cache & PostgreSQL).
5. **References**: Danh mục **16 tài liệu tham khảo chính thức** (Fielding, W3C, RFC 9110, MDN, Fowler, Newman, v.v.) kèm tính năng sao chép trích dẫn chuẩn APA với 1 click.

---

## 🛠️ Công Nghệ Sử Dụng

- **Core Framework**: [Next.js 15 (Turbopack)](https://nextjs.org/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Animation Engine**: [`motion` (Framer Motion v12)](https://motion.dev/) với vật lý nảy hoạt hình (`type: "spring", stiffness: 350, damping: 20`)
- **Icons & Celebration**: [`lucide-react`](https://lucide.dev/) + [`canvas-confetti`](https://www.npmjs.com/package/canvas-confetti)
- **Audio Engine**: Bộ tổng hợp âm thanh Web Audio API (`pop`, `boing`, `whoosh`, `fanfare`)
- **Multimedia**: Video bài giảng Full HD `api-architecture-lecture.mp4`, 13 file audio thuyết minh tiếng Việt đồng bộ và 20 ảnh slide tĩnh.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Cài đặt các gói phụ thuộc:
```bash
npm install
```

### 2. Chạy môi trường phát triển (Development Server):
```bash
npm run dev
```

Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

### 3. Build bản tối ưu cho Production:
```bash
npm run build
npm run start
```

---

## 📂 Cấu Trúc Thư Mục

```
web/
├── public/
│   ├── videos/        # Video bài giảng bài học HD
│   ├── voiceover/     # 13 file audio WAV thuyết minh tiếng Việt
│   ├── thumbnails/    # 13 ảnh thumbnails các phân đoạn
│   └── stills/        # 7 ảnh still frames chất lượng cao
├── src/
│   ├── app/
│   │   ├── layout.tsx # Root layout SEO & Google Fonts
│   │   ├── page.tsx   # Trang chủ tổng hợp toàn bộ components
│   │   └── globals.css# CSS variables tokens & cartoon animations
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ComparisonMatrix.tsx   # Yêu cầu 1: 14 tiêu chí
│   │   ├── ProfileCards.tsx       # Deep dive 5 profiles & Live Simulator
│   │   ├── CaseStudyCalculator.tsx# Yêu cầu 2: SMS & Weighted Matrix
│   │   ├── PacketSimulator.tsx    # Yêu cầu 3: Quy trình 4 bước
│   │   ├── ArchitectureFlow.tsx   # Yêu cầu 4: Sơ đồ kiến trúc SMS
│   │   ├── ArchitectureArena.tsx  # Đấu trường Radar 6 chiều
│   │   ├── VideoAudioTheater.tsx  # Video player & 13 Voiceover Chapters
│   │   ├── ReferencesSection.tsx  # Yêu cầu 5: 16 tài liệu tham khảo
│   │   ├── ChipBotMascot.tsx      # Linh vật Robot hoạt hình tương tác
│   │   └── Footer.tsx
│   └── lib/
│       ├── lectureData.ts         # Toàn bộ dữ liệu 5 profiles & ma trận
│       ├── narrationData.ts       # 13 kịch bản phụ đề thuyết minh
│       └── soundEffects.ts        # Web Audio API Synthesizer
├── package.json
└── tsconfig.json
```

---

## 📜 Giấy Phép & Bản Quyền

Dự án phục vụ mục đích học tập môn PRN232 tại Đại học FPT © 2026.
