"use client";

import React, { useState } from "react";
import { soundFx } from "@/lib/soundEffects";
import { REFERENCE_SOURCES, ReferenceSource } from "@/lib/lectureData";
import { BookOpen, ExternalLink, Copy, Check, BookmarkCheck, FileText, Library } from "lucide-react";

export default function ReferencesSection() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { label: "Tất Cả (16)", value: "All" },
    { label: "Đặc Tả Nền Tảng (5)", value: "Foundational Specifications" },
    { label: "Tài Liệu Hướng Dẫn (5)", value: "Official Documentation" },
    { label: "Sách & Chuẩn Kiến Trúc (6)", value: "Architecture Books & Standards" }
  ];

  const filteredSources = REFERENCE_SOURCES.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  const handleCopyCitation = (source: ReferenceSource) => {
    soundFx.pop(800);
    navigator.clipboard.writeText(source.citation);
    setCopiedId(source.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="references" style={{ padding: "80px 0", position: "relative" }}>
      <div className="app-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: "#8B5CF6", borderColor: "rgba(139,92,246,0.3)" }}>
            <BookOpen size={16} />
            <span>YÊU CẦU 5: 16 TÀI LIỆU THAM KHẢO CHÍNH THỨC & HỌC THUẬT</span>
          </div>
          <h2 className="section-title">
            DANH MỤC <span className="gradient-text-grpc">NGUỒN HỌC LIỆU & ĐẶC TẢ GỐC</span>
          </h2>
          <p className="section-desc">
            Toàn bộ 16 tài liệu học thuật, luận văn tiến sĩ, khuyến nghị chuẩn W3C/IETF/OASIS và sách kiến trúc kinh điển được trích dẫn trong bài giảng.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
          {categories.map((cat) => {
            const isSelected = activeTab === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  soundFx.pop(650);
                  setActiveTab(cat.value);
                }}
                className="btn-comic"
                style={{
                  padding: "8px 20px",
                  fontSize: "0.85rem",
                  borderColor: isSelected ? "#8B5CF6" : "rgba(255,255,255,0.1)",
                  background: isSelected ? "rgba(139, 92, 246, 0.2)" : "transparent",
                  color: isSelected ? "#A78BFA" : "#94A3B8"
                }}
              >
                <Library size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* References Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "20px"
          }}
        >
          {filteredSources.map((source, index) => (
            <div
              key={source.id}
              className="cartoon-card"
              style={{
                background: "rgba(13, 19, 34, 0.8)",
                border: "1.5px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px"
              }}
            >
              <div>
                {/* Category & Year Tag */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "999px",
                      background: "rgba(139, 92, 246, 0.15)",
                      color: "#A78BFA"
                    }}
                  >
                    {source.category}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 700 }}>
                    Năm: {source.year}
                  </span>
                </div>

                {/* Title & Author */}
                <h3 style={{ fontSize: "1.02rem", fontWeight: 800, color: "#F8FAFC", lineHeight: 1.4, marginBottom: "6px" }}>
                  {source.title}
                </h3>
                <div style={{ fontSize: "0.82rem", color: "#38BDF8", fontWeight: 600, marginBottom: "10px" }}>
                  Tác giả: {source.author}
                </div>

                {/* Key Takeaway */}
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderLeft: "3px solid #8B5CF6",
                    fontSize: "0.82rem",
                    color: "#CBD5E1",
                    lineHeight: 1.5
                  }}
                >
                  💡 <strong>Giá trị cốt lõi:</strong> {source.takeaway}
                </div>
              </div>

              {/* Action Buttons: Visit Link & Copy APA Citation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  gap: "10px"
                }}
              >
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.whoosh()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.8rem",
                    color: "#38BDF8",
                    textDecoration: "none",
                    fontWeight: 700
                  }}
                >
                  <ExternalLink size={14} />
                  <span>Xem Tài Liệu Gốc</span>
                </a>

                <button
                  onClick={() => handleCopyCitation(source)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: copiedId === source.id ? "#34D399" : "#94A3B8",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.78rem",
                    fontFamily: "var(--font-main)"
                  }}
                >
                  {copiedId === source.id ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedId === source.id ? "Đã chép APA!" : "Trích Dẫn APA"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
