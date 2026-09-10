"use client";

import React, { useState, useEffect } from "react";
import { soundFx } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import { Volume2, VolumeX, Sparkles, Layers, BookOpen, Cpu, Network, Compass, Video } from "lucide-react";

export default function Navbar() {
  const [isMuted, setIsMuted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMuted(soundFx.getMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleTriggerConfetti = () => {
    soundFx.pop(880);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.15 },
      colors: ["#10B981", "#FF9F43", "#EC4899", "#06B6D4", "#8B5CF6"]
    });
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(6, 9, 18, 0.92)" : "rgba(6, 9, 18, 0.6)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: scrolled ? "1.5px solid rgba(255, 255, 255, 0.1)" : "1.5px solid transparent",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
        padding: "12px 0"
      }}
    >
      <div className="app-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        {/* Brand Logo */}
        <a
          href="#"
          onClick={() => soundFx.boing()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #10B981 0%, #8B5CF6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              border: "2px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <Cpu size={24} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: 900, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>API ARCHITECTURES</span>
              <span style={{ fontSize: "0.68rem", fontWeight: 800, padding: "2px 6px", borderRadius: "999px", background: "#10B981", color: "#042F1C" }}>PROMAX</span>
            </div>
            <div style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 500 }}>PRN232 · Master Interactive Guide</div>
          </div>
        </a>

        {/* Navigation Map Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "6px" }} className="nav-links">
          <a
            href="#matrix"
            onClick={() => soundFx.whoosh()}
            className="btn-comic"
            style={{ padding: "6px 14px", fontSize: "0.82rem", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Layers size={14} color="#10B981" />
            <span>14 Tiêu Chí</span>
          </a>
          <a
            href="#case-study"
            onClick={() => soundFx.whoosh()}
            className="btn-comic"
            style={{ padding: "6px 14px", fontSize: "0.82rem", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Compass size={14} color="#38BDF8" />
            <span>Case Study SMS</span>
          </a>
          <a
            href="#packet-flow"
            onClick={() => soundFx.whoosh()}
            className="btn-comic"
            style={{ padding: "6px 14px", fontSize: "0.82rem", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Network size={14} color="#EC4899" />
            <span>Luồng Gói Tin</span>
          </a>
          <a
            href="#theater"
            onClick={() => soundFx.whoosh()}
            className="btn-comic"
            style={{ padding: "6px 14px", fontSize: "0.82rem", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Video size={14} color="#FF9F43" />
            <span>Rạp Phim & Audio</span>
          </a>
          <a
            href="#references"
            onClick={() => soundFx.whoosh()}
            className="btn-comic"
            style={{ padding: "6px 14px", fontSize: "0.82rem", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <BookOpen size={14} color="#8B5CF6" />
            <span>16 Nguồn Tham Khảo</span>
          </a>
        </nav>

        {/* Control Tools (Sound & Confetti) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={handleToggleSound}
            className="btn-comic"
            title={isMuted ? "Bật âm thanh hoạt hình" : "Tắt âm thanh"}
            style={{
              padding: "8px 12px",
              background: isMuted ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
              borderColor: isMuted ? "rgba(239, 68, 68, 0.4)" : "rgba(16, 185, 129, 0.4)",
              color: isMuted ? "#F87171" : "#34D399"
            }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            onClick={handleTriggerConfetti}
            className="btn-comic btn-primary-comic"
            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            title="Bắn pháo hoa ăn mừng!"
          >
            <Sparkles size={16} />
            <span>Confetti!</span>
          </button>
        </div>
      </div>
    </header>
  );
}
