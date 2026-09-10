"use client";

import React, { useState, useRef } from "react";
import { soundFx } from "@/lib/soundEffects";
import { VIDEO_CHAPTERS, VideoChapter } from "@/lib/lectureData";
import { NARRATION_DATA, NarrationChapter } from "@/lib/narrationData";
import {
  Video,
  Play,
  Pause,
  Volume2,
  Headphones,
  FileText,
  Sparkles,
  ChevronRight,
  Maximize2,
  Clock,
  Image as ImageIcon
} from "lucide-react";

export default function VideoAudioTheater() {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [selectedMediaType, setSelectedMediaType] = useState<"video" | "audio" | "gallery">("video");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentChapter = VIDEO_CHAPTERS[activeChapterIndex] || VIDEO_CHAPTERS[0];
  const currentNarration = NARRATION_DATA[activeChapterIndex] || NARRATION_DATA[0];

  // Convert mm:ss to seconds
  const parseTimestamp = (str: string) => {
    const parts = str.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const handleSelectChapter = (index: number) => {
    soundFx.whoosh();
    setActiveChapterIndex(index);
    const chapter = VIDEO_CHAPTERS[index];
    const targetSec = parseTimestamp(chapter.timestampStr);

    if (videoRef.current) {
      videoRef.current.currentTime = targetSec;
      videoRef.current.play().catch(() => {});
    }

    if (audioRef.current) {
      audioRef.current.src = chapter.audioFile;
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  return (
    <section id="theater" style={{ padding: "80px 0", position: "relative" }}>
      <div className="app-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: "#FF9F43", borderColor: "rgba(255,159,67,0.3)" }}>
            <Video size={16} />
            <span>RẠP PHIM & ÂM THANH ĐA PHƯƠNG TIỆN</span>
          </div>
          <h2 className="section-title">
            VIDEO BÀI GIẢNG & <span className="gradient-text-soap">THUYẾT MINH 13 PHÂN ĐOẠN</span>
          </h2>
          <p className="section-desc">
            Xem toàn bộ video bài giảng `api-architecture-lecture.mp4`, điều hướng 13 chương và nghe giọng đọc lồng tiếng kèm lời phụ đề tiếng Việt đồng bộ.
          </p>
        </div>

        {/* Media Type Switcher Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
          <button
            onClick={() => { soundFx.pop(650); setSelectedMediaType("video"); }}
            className="btn-comic"
            style={{
              padding: "10px 22px",
              fontSize: "0.92rem",
              borderColor: selectedMediaType === "video" ? "#10B981" : "rgba(255,255,255,0.1)",
              background: selectedMediaType === "video" ? "rgba(16,185,129,0.18)" : "transparent",
              color: selectedMediaType === "video" ? "#34D399" : "#94A3B8"
            }}
          >
            <Video size={16} />
            <span>Video Bài Giảng Full HD</span>
          </button>

          <button
            onClick={() => { soundFx.pop(750); setSelectedMediaType("audio"); }}
            className="btn-comic"
            style={{
              padding: "10px 22px",
              fontSize: "0.92rem",
              borderColor: selectedMediaType === "audio" ? "#EC4899" : "rgba(255,255,255,0.1)",
              background: selectedMediaType === "audio" ? "rgba(236,72,153,0.18)" : "transparent",
              color: selectedMediaType === "audio" ? "#F472B6" : "#94A3B8"
            }}
          >
            <Headphones size={16} />
            <span>Audio Voiceover & Lời Thoại</span>
          </button>

          <button
            onClick={() => { soundFx.pop(850); setSelectedMediaType("gallery"); }}
            className="btn-comic"
            style={{
              padding: "10px 22px",
              fontSize: "0.92rem",
              borderColor: selectedMediaType === "gallery" ? "#38BDF8" : "rgba(255,255,255,0.1)",
              background: selectedMediaType === "gallery" ? "rgba(56,189,248,0.18)" : "transparent",
              color: selectedMediaType === "gallery" ? "#38BDF8" : "#94A3B8"
            }}
          >
            <ImageIcon size={16} />
            <span>Bộ Sưu Tập Slide (20 Ảnh)</span>
          </button>
        </div>

        {/* View 1: Video Player & Chapter Index */}
        {selectedMediaType === "video" && (
          <div
            className="glass-panel"
            style={{
              padding: "28px",
              border: "2px solid rgba(255, 255, 255, 0.12)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "28px"
            }}
          >
            {/* Left: Video Player */}
            <div>
              <div
                style={{
                  position: "relative",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                  background: "#000000",
                  aspectRatio: "16 / 9",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.7)"
                }}
              >
                <video
                  ref={videoRef}
                  src="/videos/api-architecture-lecture.mp4"
                  controls
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              {/* Current Playing Chapter Info */}
              <div style={{ marginTop: "16px", padding: "16px", borderRadius: "14px", background: "rgba(13, 19, 34, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34D399", fontWeight: 800, fontSize: "0.85rem", marginBottom: "4px" }}>
                  <Clock size={16} />
                  <span>ĐANG PHÁT: PHÂN ĐOẠN {currentChapter.number} ({currentChapter.timestampStr})</span>
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#F8FAFC", marginBottom: "8px" }}>
                  {currentChapter.title}
                </h3>
                <ul style={{ paddingLeft: "18px", fontSize: "0.86rem", color: "#94A3B8", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {currentChapter.keyPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: 13 Chapters List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "560px", overflowY: "auto", paddingRight: "8px" }}>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#E2E8F0", marginBottom: "6px" }}>
                DANH SÁCH 13 PHÂN ĐOẠN BÀI GIẢNG:
              </div>

              {VIDEO_CHAPTERS.map((chap, idx) => {
                const isSelected = activeChapterIndex === idx;

                return (
                  <button
                    key={chap.id}
                    onClick={() => handleSelectChapter(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: isSelected ? "rgba(16, 185, 129, 0.2)" : "rgba(6, 9, 18, 0.5)",
                      border: `1.5px solid ${isSelected ? "#10B981" : "rgba(255, 255, 255, 0.06)"}`,
                      color: isSelected ? "#34D399" : "#E2E8F0",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: isSelected ? "#10B981" : "rgba(255,255,255,0.06)",
                        color: isSelected ? "#032314" : "#94A3B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: "0.85rem",
                        flexShrink: 0
                      }}
                    >
                      {chap.number}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {chap.title}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>
                        Thời lượng: {chap.durationSec}s · Bắt đầu: {chap.timestampStr}
                      </div>
                    </div>

                    <ChevronRight size={16} color={isSelected ? "#10B981" : "#64748B"} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* View 2: Audio Voiceover & Captions */}
        {selectedMediaType === "audio" && (
          <div
            className="glass-panel"
            style={{
              padding: "36px",
              border: "2px solid #EC4899",
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.15)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#F472B6", fontWeight: 800, fontSize: "0.85rem", marginBottom: "4px" }}>
                  <Headphones size={18} />
                  <span>VOICEOVER CHƯƠNG {currentChapter.number}: {currentChapter.title}</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
                  File âm thanh: <code>{currentChapter.audioFile}</code>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <audio ref={audioRef} src={currentChapter.audioFile} onEnded={() => setIsPlayingAudio(false)} />
                <button
                  onClick={toggleAudio}
                  className="btn-comic btn-primary-comic"
                  style={{
                    background: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
                    borderColor: "#F472B6",
                    color: "#FFFFFF",
                    padding: "10px 24px"
                  }}
                >
                  {isPlayingAudio ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isPlayingAudio ? "Tạm Dừng" : "Phát Thuyết Minh"}</span>
                </button>
              </div>
            </div>

            {/* Captions Transcript Box */}
            <div
              style={{
                background: "rgba(6, 9, 18, 0.7)",
                border: "1.5px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "24px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#F8FAFC", fontWeight: 800, fontSize: "0.95rem", marginBottom: "14px" }}>
                <FileText size={18} color="#EC4899" />
                <span>PHỤ ĐỀ TIẾNG VIỆN ĐỒNG BỘ (TRANSCRIPT):</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {currentNarration.captions.map((cap, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.03)",
                      borderLeft: "3px solid #EC4899",
                      fontSize: "0.95rem",
                      color: "#E2E8F0",
                      lineHeight: 1.6
                    }}
                  >
                    "{cap}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 3: Slide Gallery & Stills */}
        {selectedMediaType === "gallery" && (
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "16px", color: "#38BDF8" }}>
              13 ẢNH THUMBNAIL PHÂN ĐOẠN:
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "14px",
                marginBottom: "36px"
              }}
            >
              {VIDEO_CHAPTERS.map((c) => (
                <div
                  key={c.id}
                  onClick={() => { soundFx.pop(700); setSelectedSlide(c.thumbnail); }}
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1.5px solid rgba(255,255,255,0.1)",
                    background: "rgba(13, 19, 34, 0.8)",
                    cursor: "pointer",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >
                  <img src={c.thumbnail} alt={c.title} style={{ width: "100%", height: "auto", display: "block" }} />
                  <div style={{ padding: "10px", fontSize: "0.78rem", fontWeight: 700, color: "#E2E8F0" }}>
                    {c.title}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "16px", color: "#8B5CF6" }}>
              7 ẢNH STILL FRAMES ĐỘ PHÂN GIẢI CAO:
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "16px"
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                const stillPath = `/stills/still-0${num}-${
                  num === 1 ? "intro" : num === 2 ? "essence" : num === 3 ? "profiles" : num === 4 ? "matrix" : num === 5 ? "decision" : num === 6 ? "flow" : "outro"
                }.png`;
                return (
                  <div
                    key={num}
                    onClick={() => { soundFx.pop(800); setSelectedSlide(stillPath); }}
                    style={{
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1.5px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  >
                    <img src={stillPath} alt={`Still ${num}`} style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Lightbox for enlarged slide preview */}
        {selectedSlide && (
          <div
            onClick={() => setSelectedSlide(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(10px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <div style={{ maxWidth: "900px", width: "100%", borderRadius: "20px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.2)" }}>
              <img src={selectedSlide} alt="Enlarged preview" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
