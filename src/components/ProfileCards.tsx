"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { soundFx } from "@/lib/soundEffects";
import { PROTOCOL_PROFILES, ProtocolProfile } from "@/lib/lectureData";
import {
  Sparkles,
  Send,
  Check,
  Copy,
  Clock,
  Terminal,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Play
} from "lucide-react";

export default function ProfileCards() {
  const profiles = Object.values(PROTOCOL_PROFILES);
  const [activeTab, setActiveTab] = useState<string>("rest");
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<Record<string, { latency: number; payload: string }> | null>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeProfile = PROTOCOL_PROFILES[activeTab] || PROTOCOL_PROFILES.rest;

  const handleSelectTab = (id: string) => {
    soundFx.whoosh();
    setActiveTab(id);
  };

  const handleSimulateRequest = (profile: ProtocolProfile) => {
    soundFx.pop(750);
    setTestingId(profile.id);

    setTimeout(() => {
      soundFx.sparkle();
      setTestingId(null);
      const resStr =
        typeof profile.responsePayload === "string"
          ? profile.responsePayload
          : JSON.stringify(profile.responsePayload, null, 2);

      setTestResult((prev) => ({
        ...prev,
        [profile.id]: {
          latency: profile.latencySim,
          payload: resStr
        }
      }));
    }, 450);
  };

  const handleCopyCode = (profile: ProtocolProfile) => {
    soundFx.pop(900);
    navigator.clipboard.writeText(profile.code.join("\n"));
    setCopiedId(profile.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="profiles" style={{ padding: "80px 0", position: "relative" }}>
      <div className="app-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: "#EC4899", borderColor: "rgba(236,72,153,0.3)" }}>
            <Sparkles size={16} />
            <span>HỒ SƠ ĐỘC QUYỀN 5 KIẾN TRÚC API</span>
          </div>
          <h2 className="section-title">
            DEEP DIVE <span className="gradient-text-graphql">BẢN CHẤT & LIVE SIMULATOR</span>
          </h2>
          <p className="section-desc">
            Khám phá chi tiết kiến trúc, bản chất giao thức, mã nguồn mẫu và kiểm thử tương tác trực tiếp với các endpoint công cộng.
          </p>
        </div>

        {/* Protocol Selector Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "36px"
          }}
        >
          {profiles.map((p) => {
            const isSelected = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectTab(p.id)}
                className="btn-comic"
                style={{
                  padding: "10px 24px",
                  fontSize: "0.95rem",
                  borderColor: isSelected ? p.color : "rgba(255,255,255,0.1)",
                  background: isSelected ? p.darkColor : "rgba(13, 19, 34, 0.7)",
                  color: isSelected ? p.color : "#94A3B8",
                  boxShadow: isSelected ? `0 6px 0px ${p.color}, 0 0 20px ${p.darkColor}` : "var(--shadow-comic)"
                }}
              >
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color }} />
                <span>{p.name}</span>
                <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>({p.badge})</span>
              </button>
            );
          })}
        </div>

        {/* Active Profile Interactive Showcase */}
        <div
          id={`profile-${activeProfile.id}`}
          className="glass-panel"
          style={{
            padding: "36px",
            border: `2px solid ${activeProfile.color}`,
            boxShadow: `0 20px 50px -10px ${activeProfile.darkColor}`,
            transition: "all 0.3s ease"
          }}
        >
          {/* Top Bar Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "20px",
              paddingBottom: "24px",
              borderBottom: "1.5px solid rgba(255,255,255,0.1)",
              marginBottom: "28px"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "2rem", fontWeight: 900, color: activeProfile.color }}>
                  {activeProfile.name}
                </h3>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: activeProfile.darkColor,
                    border: `1.5px solid ${activeProfile.color}`,
                    color: activeProfile.color,
                    fontWeight: 800,
                    fontSize: "0.78rem"
                  }}
                >
                  {activeProfile.badge}
                </span>
              </div>
              <p style={{ color: "#CBD5E1", fontSize: "1.05rem" }}>
                <strong>Bản chất:</strong> {activeProfile.nature}
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Tình huống lý tưởng nhất:</div>
              <div style={{ fontWeight: 700, color: "#F8FAFC", fontSize: "0.95rem" }}>
                {activeProfile.bestFor}
              </div>
            </div>
          </div>

          {/* Grid Content: Left (Specs & Pros/Cons) vs Right (Code & Live Simulator) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "30px"
            }}
          >
            {/* Left Column: Architectural Traits */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Contract & Format */}
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: "16px",
                  background: "rgba(6, 9, 18, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>
                    Quy Chuẩn Contract:
                  </span>
                  <div style={{ fontWeight: 600, color: "#F8FAFC", marginTop: "2px" }}>
                    {activeProfile.contract}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>
                    Định Dạng Payload:
                  </span>
                  <div style={{ fontWeight: 600, color: "#F8FAFC", marginTop: "2px" }}>
                    {activeProfile.format}
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(16, 185, 129, 0.06)",
                  border: "1.5px solid rgba(16, 185, 129, 0.2)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34D399", fontWeight: 800, marginBottom: "12px" }}>
                  <CheckCircle2 size={18} />
                  <span>ĐIỂM MẠNH THEN CHỐT</span>
                </div>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", color: "#E2E8F0" }}>
                  {activeProfile.strengths.map((s, idx) => (
                    <li key={idx}><strong>{s}</strong></li>
                  ))}
                  {activeProfile.prosDetail.map((d, idx) => (
                    <li key={`d-${idx}`} style={{ color: "#94A3B8" }}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Limits & Trade-offs */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(239, 68, 68, 0.06)",
                  border: "1.5px solid rgba(239, 68, 68, 0.2)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#F87171", fontWeight: 800, marginBottom: "12px" }}>
                  <XCircle size={18} />
                  <span>GIỚI HẠN & ĐÁNH ĐỔI</span>
                </div>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", color: "#E2E8F0" }}>
                  {activeProfile.limits.map((l, idx) => (
                    <li key={idx}><strong>{l}</strong></li>
                  ))}
                  {activeProfile.consDetail.map((c, idx) => (
                    <li key={`c-${idx}`} style={{ color: "#94A3B8" }}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Code & Live Simulator */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Code Box */}
              <div
                style={{
                  background: "#070B14",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "18px",
                  overflow: "hidden"
                }}
              >
                {/* Header of code box */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 18px",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Terminal size={16} color={activeProfile.color} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#E2E8F0" }}>
                      Payload Request Mẫu ({activeProfile.api})
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(activeProfile)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: copiedId === activeProfile.id ? "#34D399" : "#94A3B8",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.78rem"
                    }}
                  >
                    {copiedId === activeProfile.id ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedId === activeProfile.id ? "Đã chép!" : "Copy"}</span>
                  </button>
                </div>

                {/* Code body */}
                <pre
                  style={{
                    padding: "18px",
                    margin: 0,
                    fontSize: "0.84rem",
                    lineHeight: 1.5,
                    color: "#A7F3D0",
                    overflowX: "auto",
                    maxHeight: "220px"
                  }}
                >
                  <code>{activeProfile.code.join("\n")}</code>
                </pre>
              </div>

              {/* Endpoint Banner & Live Simulator Trigger */}
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: "16px",
                  background: "rgba(13, 19, 34, 0.9)",
                  border: "1.5px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>ENDPOINT THỰC NGHIỆM:</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: activeProfile.color, wordBreak: "break-all" }}>
                    {activeProfile.endpoint}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                  <button
                    onClick={() => handleSimulateRequest(activeProfile)}
                    disabled={testingId === activeProfile.id}
                    className="btn-comic btn-primary-comic"
                    style={{
                      padding: "10px 22px",
                      fontSize: "0.9rem",
                      background: `linear-gradient(135deg, ${activeProfile.color} 0%, #0F172A 140%)`,
                      borderColor: activeProfile.color,
                      color: "#FFFFFF"
                    }}
                  >
                    <Send size={16} />
                    <span>{testingId === activeProfile.id ? "Đang Gửi Request..." : "Gửi Request Thử Nghiệm"}</span>
                  </button>

                  <div style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
                    Kỳ vọng: <strong>{activeProfile.result}</strong>
                  </div>
                </div>
              </div>

              {/* Simulator Response Inspector */}
              {testResult && testResult[activeProfile.id] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "16px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1.5px solid #10B981"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34D399", fontWeight: 800, fontSize: "0.85rem" }}>
                      <CheckCircle2 size={16} />
                      <span>PHẢN HỒI THÀNH CÔNG: HTTP 200 OK</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#A7F3D0" }}>
                      <Clock size={14} />
                      <span>Độ trễ: {testResult[activeProfile.id].latency} ms</span>
                    </div>
                  </div>

                  <pre
                    style={{
                      background: "#050810",
                      padding: "12px",
                      borderRadius: "10px",
                      fontSize: "0.78rem",
                      color: "#E2E8F0",
                      maxHeight: "160px",
                      overflowY: "auto",
                      margin: 0
                    }}
                  >
                    <code>{testResult[activeProfile.id].payload}</code>
                  </pre>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
