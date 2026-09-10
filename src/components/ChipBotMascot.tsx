"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { soundFx } from "@/lib/soundEffects";
import { Sparkles, MessageCircle, X, Volume2 } from "lucide-react";

export default function ChipBotMascot() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const robotQuotes = [
    "Xin chào! Mình là Chip Bot 🤖. Hãy cùng so sánh 5 kiến trúc API nhé!",
    "Bí mật kiến trúc: REST không phải là công nghệ mới nhất, nhưng là công dân hạng nhất của Web & Mobile!",
    "Lưu ý: gRPC chạy native HTTP/2 cực nhanh, nhưng trên trình duyệt cần gRPC-Web proxy!",
    "Mẹo hay: Đừng gửi XML 5MB qua 4G di động, hãy dùng JSON gọn nhẹ của REST!",
    "GraphQL giải quyết triệt để over-fetching, nhưng hãy cẩn thận bài toán N+1 resolver!",
    "Với Student Management System, REST đạt 4.35/5.00 điểm thuyết phục!"
  ];

  const handleMascotClick = () => {
    soundFx.boing();
    setIsSpinning(true);
    setQuoteIndex((prev) => (prev + 1) % robotQuotes.length);
    setIsOpen(true);
    setTimeout(() => setIsSpinning(false), 600);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px"
      }}
    >
      {/* Speech Bubble Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              maxWidth: "280px",
              padding: "14px 18px",
              borderRadius: "18px",
              background: "rgba(13, 19, 34, 0.95)",
              border: "2px solid #10B981",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 15px rgba(16, 185, 129, 0.3)",
              backdropFilter: "blur(12px)",
              position: "relative"
            }}
          >
            {/* Close speech bubble button */}
            <button
              onClick={() => { soundFx.pop(400); setIsOpen(false); }}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "transparent",
                border: "none",
                color: "#64748B",
                cursor: "pointer"
              }}
            >
              <X size={14} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34D399", fontWeight: 800, fontSize: "0.78rem", marginBottom: "4px" }}>
              <Sparkles size={14} />
              <span>CHIP BOT NHẮN BẠN:</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#F8FAFC", lineHeight: 1.5, margin: 0 }}>
              {robotQuotes[quoteIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Robot Mascot Button */}
      <motion.div
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        animate={isSpinning ? { rotate: [0, 360] } : { y: [0, -6, 0] }}
        transition={isSpinning ? { duration: 0.6 } : { repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        onClick={handleMascotClick}
        style={{
          width: "68px",
          height: "68px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #8B5CF6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "3px solid #FFFFFF",
          boxShadow: "0 8px 25px rgba(16, 185, 129, 0.6), 0 4px 0px rgba(0,0,0,0.5)",
          position: "relative"
        }}
        title="Bấm vào Chip Bot để nghe mẹo thú vị!"
      >
        {/* Cute Cartoon Robot SVG */}
        <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
          {/* Antenna */}
          <line x1="50" y1="12" x2="50" y2="28" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="10" r="7" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="3" />

          {/* Robot Head Body */}
          <rect x="20" y="28" width="60" height="50" rx="16" fill="#0F172A" stroke="#FFFFFF" strokeWidth="4" />

          {/* Screen Face */}
          <rect x="28" y="36" width="44" height="34" rx="10" fill="#1E293B" />

          {/* Big Blinking Cute Eyes */}
          <circle cx="40" cy="52" r="5.5" fill="#34D399" />
          <circle cx="60" cy="52" r="5.5" fill="#34D399" />
          <circle cx="42" cy="50" r="2" fill="#FFFFFF" />
          <circle cx="62" cy="50" r="2" fill="#FFFFFF" />

          {/* Cheerful Smile */}
          <path d="M 42 62 Q 50 68 58 62" stroke="#34D399" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Cute Robot Ears */}
          <rect x="12" y="44" width="8" height="18" rx="4" fill="#38BDF8" />
          <rect x="80" y="44" width="8" height="18" rx="4" fill="#38BDF8" />
        </svg>

        {/* Mini Notification Ping */}
        <div
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#EC4899",
            border: "2px solid #FFFFFF"
          }}
        />
      </motion.div>
    </div>
  );
}
