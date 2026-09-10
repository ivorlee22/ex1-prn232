"use client";

import React from "react";
import { soundFx } from "@/lib/soundEffects";
import { Cpu, ArrowUp, Heart, BookOpen, Layers, Compass, Network } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    soundFx.whoosh();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#04060C",
        borderTop: "1.5px solid rgba(255, 255, 255, 0.08)",
        padding: "60px 0 30px",
        marginTop: "60px"
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "36px",
            marginBottom: "40px"
          }}
        >
          {/* Col 1: Course & Project */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #10B981 0%, #8B5CF6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Cpu size={20} color="#FFFFFF" />
              </div>
              <span style={{ fontWeight: 900, fontSize: "1.1rem" }}>API ARCHITECTURES</span>
            </div>
            <p style={{ fontSize: "0.86rem", color: "#94A3B8", lineHeight: 1.6 }}>
              Dự án bài tập chuyên sâu môn <strong>PRN232</strong> (Advanced Cross-Platform .NET Application Development) tại Đại học FPT.
              So sánh toàn diện 5 kiến trúc API hiện đại: SOAP, REST, GraphQL, OData, gRPC.
            </p>
          </div>

          {/* Col 2: 5 Assignment Requirements */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#F8FAFC", marginBottom: "14px" }}>
              5 MỤC TIÊU ĐỀ BÀI
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
              <li>
                <a href="#matrix" onClick={() => soundFx.pop(600)} style={{ color: "#94A3B8", textDecoration: "none" }}>
                  1. So sánh 14 tiêu chí kỹ thuật
                </a>
              </li>
              <li>
                <a href="#case-study" onClick={() => soundFx.pop(650)} style={{ color: "#94A3B8", textDecoration: "none" }}>
                  2. Chọn REST cho Student Management System
                </a>
              </li>
              <li>
                <a href="#packet-flow" onClick={() => soundFx.pop(700)} style={{ color: "#94A3B8", textDecoration: "none" }}>
                  3. Quy trình 4 bước Client ➔ API ➔ Response
                </a>
              </li>
              <li>
                <a href="#architecture" onClick={() => soundFx.pop(750)} style={{ color: "#94A3B8", textDecoration: "none" }}>
                  4. Sơ đồ kiến trúc SMS phân tầng
                </a>
              </li>
              <li>
                <a href="#references" onClick={() => soundFx.pop(800)} style={{ color: "#94A3B8", textDecoration: "none" }}>
                  5. 16 tài liệu tham khảo chính thức
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Technologies */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#F8FAFC", marginBottom: "14px" }}>
              CÔNG NGHỆ WEB PROMAX
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Next.js 15", "React 19", "Framer Motion", "TypeScript", "Web Audio API", "Canvas Confetti", "Lucide Icons"].map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: "0.76rem",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#CBD5E1"
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Back to top */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#F8FAFC" }}>
              ĐIỀU HƯỚNG
            </h4>
            <button
              onClick={scrollToTop}
              className="btn-comic"
              style={{ padding: "10px 20px", fontSize: "0.88rem" }}
            >
              <ArrowUp size={16} />
              <span>Về Đầu Trang</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "0.82rem",
            color: "#64748B"
          }}
        >
          <div>
            © 2026 PRN232 Assignment · FPT University. Thiết kế giao diện hoạt hình Promax.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Được xây dựng với niềm đam mê kiến trúc phần mềm</span>
            <Heart size={14} color="#EF4444" fill="#EF4444" />
          </div>
        </div>
      </div>
    </footer>
  );
}
