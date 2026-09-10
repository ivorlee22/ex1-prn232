"use client";

import React from "react";
import { motion } from "motion/react";
import { soundFx } from "@/lib/soundEffects";
import { PROTOCOL_PROFILES } from "@/lib/lectureData";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Radio,
  FileCheck,
  Layers,
  Compass,
  Network,
  BookOpen
} from "lucide-react";

export default function Hero() {
  const protocols = Object.values(PROTOCOL_PROFILES);

  const getIcon = (id: string) => {
    switch (id) {
      case "soap": return <ShieldCheck size={20} color="#FF9F43" />;
      case "rest": return <Globe size={20} color="#10B981" />;
      case "graphql": return <Zap size={20} color="#EC4899" />;
      case "odata": return <Database size={20} color="#06B6D4" />;
      case "grpc": return <Radio size={20} color="#8B5CF6" />;
      default: return <Sparkles size={20} />;
    }
  };

  return (
    <section style={{ position: "relative", paddingTop: "50px", paddingBottom: "70px", overflow: "hidden" }}>
      {/* Background Decorative Rings */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "450px",
          background: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <div className="app-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top Mini Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
        >
          <div
            className="section-tag"
            style={{
              background: "rgba(16, 185, 129, 0.12)",
              borderColor: "rgba(16, 185, 129, 0.3)",
              color: "#34D399"
            }}
          >
            <Sparkles size={16} />
            <span>FPT UNIVERSITY · PRN232 ADVANCED API ARCHITECTURES</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: "center", maxWidth: "980px", margin: "0 auto 24px" }}
        >
          <h1
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 950,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "20px"
            }}
          >
            BẢN ĐỒ TOÀN CẢNH{" "}
            <span className="gradient-text-hero">5 KIẾN TRÚC API</span>{" "}
            <span style={{ display: "inline-block" }}>🚀</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "#94A3B8",
              lineHeight: 1.6,
              maxWidth: "820px",
              margin: "0 auto"
            }}
          >
            Nghiên cứu chuyên sâu, đối chiếu toàn diện <strong>14 tiêu chí kỹ thuật</strong> giữa{" "}
            <span style={{ color: "#FF9F43", fontWeight: 700 }}>SOAP</span>,{" "}
            <span style={{ color: "#10B981", fontWeight: 700 }}>REST</span>,{" "}
            <span style={{ color: "#EC4899", fontWeight: 700 }}>GraphQL</span>,{" "}
            <span style={{ color: "#06B6D4", fontWeight: 700 }}>OData</span> và{" "}
            <span style={{ color: "#8B5CF6", fontWeight: 700 }}>gRPC</span>.
            Giải bài toán lựa chọn kiến trúc tối ưu cho <strong>Student Management System (SMS)</strong>.
          </p>
        </motion.div>

        {/* 5 Protocol Cartoon Badges Floating */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            margin: "36px auto 44px",
            maxWidth: "1100px"
          }}
        >
          {protocols.map((proto, idx) => (
            <motion.a
              key={proto.id}
              href={`#profile-${proto.id}`}
              onClick={() => soundFx.boing()}
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
                delay: 0.2 + idx * 0.08
              }}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "999px",
                background: "rgba(13, 19, 34, 0.85)",
                border: `2px solid ${proto.color}`,
                boxShadow: `0 8px 24px -6px ${proto.darkColor}, 0 4px 0px ${proto.color}`,
                cursor: "pointer"
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: proto.darkColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {getIcon(proto.id)}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: proto.color }}>{proto.name}</div>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{proto.badge}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* 5 Assignment Map Requirements Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel"
          style={{
            padding: "24px 28px",
            maxWidth: "1150px",
            margin: "0 auto 40px",
            border: "2px solid rgba(255, 255, 255, 0.12)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FileCheck size={22} color="#10B981" />
              <span style={{ fontWeight: 800, fontSize: "1.05rem" }}>
                ĐÁP ỨNG 100% YÊU CẦU ĐỀ BÀI (COMPARING API ARCHITECTURES.PDF)
              </span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Click để nhảy nhanh tới từng mục</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px"
            }}
          >
            <a
              href="#matrix"
              onClick={() => soundFx.whoosh()}
              style={{
                textDecoration: "none",
                background: "rgba(16, 185, 129, 0.08)",
                border: "1.5px solid rgba(16, 185, 129, 0.3)",
                padding: "12px 14px",
                borderRadius: "12px",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34D399", fontWeight: 800, fontSize: "0.82rem" }}>
                <Layers size={15} />
                <span>YÊU CẦU 1</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>So Sánh 14 Tiêu Chí</div>
              <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>5 công nghệ song song</div>
            </a>

            <a
              href="#case-study"
              onClick={() => soundFx.whoosh()}
              style={{
                textDecoration: "none",
                background: "rgba(56, 189, 248, 0.08)",
                border: "1.5px solid rgba(56, 189, 248, 0.3)",
                padding: "12px 14px",
                borderRadius: "12px",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#38BDF8", fontWeight: 800, fontSize: "0.82rem" }}>
                <Compass size={15} />
                <span>YÊU CẦU 2</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Chọn REST Cho SMS</div>
              <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>Ma trận trọng số & Biện luận</div>
            </a>

            <a
              href="#packet-flow"
              onClick={() => soundFx.whoosh()}
              style={{
                textDecoration: "none",
                background: "rgba(236, 72, 153, 0.08)",
                border: "1.5px solid rgba(236, 72, 153, 0.3)",
                padding: "12px 14px",
                borderRadius: "12px",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#F472B6", fontWeight: 800, fontSize: "0.82rem" }}>
                <Network size={15} />
                <span>YÊU CẦU 3</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Quy Trình 4 Bước</div>
              <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>Client ➔ Req ➔ API ➔ Res</div>
            </a>

            <a
              href="#architecture"
              onClick={() => soundFx.whoosh()}
              style={{
                textDecoration: "none",
                background: "rgba(255, 159, 67, 0.08)",
                border: "1.5px solid rgba(255, 159, 67, 0.3)",
                padding: "12px 14px",
                borderRadius: "12px",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#FFB067", fontWeight: 800, fontSize: "0.82rem" }}>
                <Globe size={15} />
                <span>YÊU CẦU 4</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Sơ Đồ Hệ Thống SMS</div>
              <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>Gateway, REST, Redis, DB</div>
            </a>

            <a
              href="#references"
              onClick={() => soundFx.whoosh()}
              style={{
                textDecoration: "none",
                background: "rgba(139, 92, 246, 0.08)",
                border: "1.5px solid rgba(139, 92, 246, 0.3)",
                padding: "12px 14px",
                borderRadius: "12px",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#A78BFA", fontWeight: 800, fontSize: "0.82rem" }}>
                <BookOpen size={15} />
                <span>YÊU CẦU 5</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>16 Nguồn Tham Khảo</div>
              <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>Fielding, W3C, RFC, MDN,...</div>
            </a>
          </div>
        </motion.div>

        {/* Quick Stats Banner */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            maxWidth: "960px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#10B981" }}>5</div>
            <div style={{ fontSize: "0.82rem", color: "#94A3B8", fontWeight: 600 }}>Kiến Trúc Đánh Giá</div>
          </div>
          <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#38BDF8" }}>14</div>
            <div style={{ fontSize: "0.82rem", color: "#94A3B8", fontWeight: 600 }}>Tiêu Chí Đối Chiếu</div>
          </div>
          <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#EC4899" }}>4.35 / 5</div>
            <div style={{ fontSize: "0.82rem", color: "#94A3B8", fontWeight: 600 }}>Điểm REST Vô Địch</div>
          </div>
          <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#FF9F43" }}>13</div>
            <div style={{ fontSize: "0.82rem", color: "#94A3B8", fontWeight: 600 }}>Chương Video & Voiceover</div>
          </div>
          <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#8B5CF6" }}>16</div>
            <div style={{ fontSize: "0.82rem", color: "#94A3B8", fontWeight: 600 }}>Tài Liệu Chuẩn Mực</div>
          </div>
        </div>
      </div>
    </section>
  );
}
