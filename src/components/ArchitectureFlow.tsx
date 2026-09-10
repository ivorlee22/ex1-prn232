"use client";

import React, { useState } from "react";
import { soundFx } from "@/lib/soundEffects";
import {
  Globe,
  Smartphone,
  Shield,
  Layers,
  Server,
  Database,
  HardDrive,
  Cpu,
  Lock,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function ArchitectureFlow() {
  const [selectedLayer, setSelectedLayer] = useState<string>("services");

  const layers = [
    {
      id: "presentation",
      name: "TẦNG 1: TRÌNH DIỄN (CLIENTS)",
      color: "#38BDF8",
      items: [
        { title: "Student Mobile App", tech: "Flutter / React Native (iOS & Android)", desc: "Sinh viên xem lịch học, đăng ký môn, nhận điểm qua HTTPS" },
        { title: "Faculty Web Portal", tech: "Next.js / React 19 (Desktop Web)", desc: "Giảng viên & Admin quản trị điểm, duyệt hồ sơ học vụ" },
        { title: "3rd-Party Integrations", tech: "Tuition Gateway & LMS Partner", desc: "Hệ thống thanh toán học phí qua Webhooks" }
      ],
      protocols: "HTTPS, WSS (WebSockets cho thông báo đẩy)",
      security: "PKCE OAuth 2.0, Secure Enclave lưu JWT Token"
    },
    {
      id: "gateway",
      name: "TẦNG 2: CỔNG API GATEWAY & BẢO MẬT",
      color: "#8B5CF6",
      items: [
        { title: "Reverse Proxy & TLS", tech: "NGINX / Cloudflare CDN", desc: "Mã hóa SSL/TLS v1.3, nén Gzip/Brotli, chặn DDoS" },
        { title: "Security & Auth Filter", tech: "JWT Token Validation", desc: "Xác thực chữ ký số, kiểm tra quyền truy cập Role-based (RBAC)" },
        { title: "Rate Limiter & Routing", tech: "Token Bucket Algorithm", desc: "Giới hạn 100 req/phút/IP nhằm chống spam đăng ký môn" }
      ],
      protocols: "HTTP/2, HTTP/3, TLS 1.3",
      security: "WAF, JWT Verification, IP Whitelisting, CORS Policy"
    },
    {
      id: "services",
      name: "TẦNG 3: DỊCH VỤ LÕI RESTful SMS SERVICES",
      color: "#10B981",
      items: [
        { title: "Student Service", tech: "REST / C# ASP.NET Core", desc: "Quản lý thông tin hồ sơ, khoa ngành, trạng thái học tập" },
        { title: "Course Service", tech: "REST / C# ASP.NET Core", desc: "Danh mục môn học, học phần tiên quyết, số tín chỉ" },
        { title: "Enrollment Service", tech: "REST / Distributed Lock", desc: "Xử lý đăng ký tín chỉ đồng thời cao điểm" },
        { title: "Grade & Transcript Service", tech: "REST / Read-heavy", desc: "Tính điểm GPA, bảng điểm học kỳ, hỗ trợ ETag Cache" }
      ],
      protocols: "RESTful JSON APIs, OpenAPI v3 Contracts, gRPC cho liên lạc nội bộ",
      security: "mTLS giữa các microservices, DTO validation chặt chẽ"
    },
    {
      id: "storage",
      name: "TẦNG 4: LƯU TRỮ DỮ LIỆU & CACHE BỘ ĐỆM",
      color: "#FF9F43",
      items: [
        { title: "Redis Cache Cluster", tech: "In-Memory Data Store", desc: "Lưu tạm thời khóa biểu và danh mục môn học (TTL 1 giờ)" },
        { title: "Primary PostgreSQL", tech: "Relational DB (ACID)", desc: "Lưu hồ sơ sinh viên, giao dịch đăng ký học phần an toàn" },
        { title: "Read Replicas DB", tech: "PostgreSQL Read-only", desc: "Phục vụ tra cứu bảng điểm số lượng lớn, giảm tải cho Master DB" },
        { title: "Blob Object Storage", tech: "MinIO / AWS S3", desc: "Lưu ảnh đại diện thẻ sinh viên, chứng chỉ số và tài liệu PDF" }
      ],
      protocols: "Postgres Wire Protocol (SSL), RESP (Redis Protocol)",
      security: "Mã hóa dữ liệu khi nghỉ (AES-256 at Rest), Connection Pooling"
    }
  ];

  const activeData = layers.find((l) => l.id === selectedLayer) || layers[2];

  return (
    <section id="architecture" style={{ padding: "80px 0", position: "relative" }}>
      <div className="app-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: "#FF9F43", borderColor: "rgba(255,159,67,0.3)" }}>
            <Globe size={16} />
            <span>YÊU CẦU 4: SƠ ĐỒ THIẾT KẾ HỆ THỐNG SMS HOÀN CHỈNH</span>
          </div>
          <h2 className="section-title">
            KIẾN TRÚC PHÂN TẦNG <span className="gradient-text-soap">RESTful STUDENT MANAGEMENT SYSTEM</span>
          </h2>
          <p className="section-desc">
            Sơ đồ trực quan 4 tầng kiến trúc: từ thiết bị Client, qua Gateway bảo mật, đến các dịch vụ REST nghiệp vụ và tầng dữ liệu bền vững.
          </p>
        </div>

        {/* 4 Interactive Layer Cards in Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "36px" }}>
          {layers.map((layer) => {
            const isSelected = selectedLayer === layer.id;

            return (
              <div
                key={layer.id}
                onClick={() => {
                  soundFx.whoosh();
                  setSelectedLayer(layer.id);
                }}
                className="glass-panel"
                style={{
                  padding: "24px 30px",
                  borderRadius: "20px",
                  border: `2px solid ${isSelected ? layer.color : "rgba(255, 255, 255, 0.1)"}`,
                  boxShadow: isSelected ? `0 10px 30px -5px ${layer.color}40` : "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isSelected ? "scale(1.01)" : "scale(1)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: layer.color,
                        boxShadow: `0 0 12px ${layer.color}`
                      }}
                    />
                    <span style={{ fontWeight: 900, fontSize: "1.1rem", color: layer.color }}>
                      {layer.name}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
                    {isSelected ? "Đang chọn tầng này" : "Click để xem chi tiết kỹ thuật"}
                  </span>
                </div>

                {/* Sub-blocks Grid in Layer */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "14px"
                  }}
                >
                  {layer.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "16px",
                        borderRadius: "14px",
                        background: "rgba(6, 9, 18, 0.5)",
                        border: "1px solid rgba(255, 255, 255, 0.06)"
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#F8FAFC", marginBottom: "4px" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: layer.color, fontWeight: 600, marginBottom: "6px" }}>
                        {item.tech}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Layer Technical Inspector */}
        <div
          className="cartoon-card"
          style={{
            background: "rgba(13, 19, 34, 0.9)",
            border: `2px solid ${activeData.color}`,
            borderRadius: "20px",
            padding: "24px 30px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <Cpu size={22} color={activeData.color} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#F8FAFC" }}>
              CHI TIẾT KỸ THUẬT & KIỂM SOÁT AN TOÀN: {activeData.name}
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px"
            }}
          >
            <div>
              <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 700 }}>GIAO THỨC TRUYỀN TẢI (PROTOCOLS):</span>
              <div style={{ fontWeight: 600, color: "#E2E8F0", marginTop: "4px" }}>
                {activeData.protocols}
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 700 }}>CHÍNH SÁCH BẢO MẬT (SECURITY CONTROLS):</span>
              <div style={{ fontWeight: 600, color: "#E2E8F0", marginTop: "4px" }}>
                {activeData.security}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
