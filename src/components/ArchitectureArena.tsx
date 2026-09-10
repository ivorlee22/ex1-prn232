"use client";

import React, { useState } from "react";
import { soundFx } from "@/lib/soundEffects";
import { PROTOCOL_PROFILES } from "@/lib/lectureData";
import { Swords, Trophy, Sparkles, Check, ArrowRightLeft } from "lucide-react";

export default function ArchitectureArena() {
  const [protoA, setProtoA] = useState<string>("rest");
  const [protoB, setProtoB] = useState<string>("graphql");

  // 6 radar dimensions scored 0 to 10
  const radarDimensions = [
    { key: "mobile", name: "Hiệu Năng Mobile", max: 10 },
    { key: "velocity", name: "Tốc Độ Dev", max: 10 },
    { key: "caching", name: "HTTP Caching", max: 10 },
    { key: "queryPower", name: "Sức Mạnh Truy Vấn", max: 10 },
    { key: "contract", name: "Chặt Chẽ Contract", max: 10 },
    { key: "tooling", name: "Hệ Sinh Thái", max: 10 }
  ];

  const radarScores: Record<string, Record<string, number>> = {
    soap: { mobile: 2, velocity: 4, caching: 2, queryPower: 3, contract: 9, tooling: 5 },
    rest: { mobile: 9, velocity: 10, caching: 10, queryPower: 6, contract: 7, tooling: 10 },
    graphql: { mobile: 9, velocity: 8, caching: 4, queryPower: 10, contract: 9, tooling: 8 },
    odata: { mobile: 7, velocity: 7, caching: 7, queryPower: 9, contract: 8, tooling: 7 },
    grpc: { mobile: 5, velocity: 6, caching: 1, queryPower: 4, contract: 10, tooling: 7 }
  };

  const aProfile = PROTOCOL_PROFILES[protoA] || PROTOCOL_PROFILES.rest;
  const bProfile = PROTOCOL_PROFILES[protoB] || PROTOCOL_PROFILES.graphql;

  const aScores = radarScores[protoA] || radarScores.rest;
  const bScores = radarScores[protoB] || radarScores.graphql;

  // Radar geometry calculations (Center: 200, 200, Radius: 140)
  const center = 200;
  const radius = 140;
  const totalAxes = radarDimensions.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 10) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const getPolygonPoints = (scores: Record<string, number>) => {
    return radarDimensions
      .map((d, idx) => {
        const coords = getCoordinates(idx, scores[d.key] || 5);
        return `${coords.x},${coords.y}`;
      })
      .join(" ");
  };

  const handleSwap = () => {
    soundFx.whoosh();
    setProtoA(protoB);
    setProtoB(protoA);
  };

  return (
    <section id="arena" style={{ padding: "80px 0", position: "relative" }}>
      <div className="app-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: "#8B5CF6", borderColor: "rgba(139,92,246,0.3)" }}>
            <Swords size={16} />
            <span>ĐẤU TRƯỜNG SO GĂNG HEAD-TO-HEAD</span>
          </div>
          <h2 className="section-title">
            ĐẤU TRƯỜNG <span className="gradient-text-grpc">RADAR SHOWDOWN 6 CHIỀU</span>
          </h2>
          <p className="section-desc">
            Chọn 2 kiến trúc bất kỳ để so sánh tương quan qua biểu đồ mạng nhện SVG đa chiều.
          </p>
        </div>

        {/* Fighter Selectors */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "36px"
          }}
        >
          {/* Fighter A Select */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: 800, color: aProfile.color }}>CHIẾN BINH A:</span>
            <select
              value={protoA}
              onChange={(e) => {
                soundFx.pop(650);
                setProtoA(e.target.value);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                background: "rgba(13, 19, 34, 0.9)",
                border: `2px solid ${aProfile.color}`,
                color: "#F8FAFC",
                fontWeight: 800,
                fontSize: "0.95rem",
                outline: "none",
                cursor: "pointer"
              }}
            >
              {Object.values(PROTOCOL_PROFILES).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="btn-comic"
            style={{ padding: "8px 14px" }}
            title="Đổi vị trí 2 bên"
          >
            <ArrowRightLeft size={16} />
          </button>

          {/* Fighter B Select */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: 800, color: bProfile.color }}>CHIẾN BINH B:</span>
            <select
              value={protoB}
              onChange={(e) => {
                soundFx.pop(750);
                setProtoB(e.target.value);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                background: "rgba(13, 19, 34, 0.9)",
                border: `2px solid ${bProfile.color}`,
                color: "#F8FAFC",
                fontWeight: 800,
                fontSize: "0.95rem",
                outline: "none",
                cursor: "pointer"
              }}
            >
              {Object.values(PROTOCOL_PROFILES).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.badge})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Arena Showcase Grid: SVG Radar Chart vs Detailed Breakdown */}
        <div
          className="glass-panel"
          style={{
            padding: "36px",
            border: "2px solid rgba(255, 255, 255, 0.12)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "36px",
            alignItems: "center"
          }}
        >
          {/* SVG Radar Chart Box */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="400" height="400" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
              {/* Background concentric polygons (levels: 2, 4, 6, 8, 10) */}
              {[2, 4, 6, 8, 10].map((lvl) => {
                const ringPoints = radarDimensions
                  .map((_, idx) => {
                    const c = getCoordinates(idx, lvl);
                    return `${c.x},${c.y}`;
                  })
                  .join(" ");
                return (
                  <polygon
                    key={lvl}
                    points={ringPoints}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis lines */}
              {radarDimensions.map((d, idx) => {
                const outer = getCoordinates(idx, 10);
                return (
                  <line
                    key={d.key}
                    x1={center}
                    y1={center}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                );
              })}

              {/* Fighter A Polygon */}
              <polygon
                points={getPolygonPoints(aScores)}
                fill={`${aProfile.color}33`}
                stroke={aProfile.color}
                strokeWidth="2.5"
                style={{ transition: "all 0.4s ease" }}
              />

              {/* Fighter B Polygon */}
              <polygon
                points={getPolygonPoints(bScores)}
                fill={`${bProfile.color}33`}
                stroke={bProfile.color}
                strokeWidth="2.5"
                style={{ transition: "all 0.4s ease" }}
              />

              {/* Axis Label Tags */}
              {radarDimensions.map((d, idx) => {
                const labelCoord = getCoordinates(idx, 12);
                return (
                  <text
                    key={d.key}
                    x={labelCoord.x}
                    y={labelCoord.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#94A3B8"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="var(--font-main)"
                  >
                    {d.name}
                  </text>
                );
              })}
            </svg>

            {/* Radar Legend */}
            <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "14px", height: "14px", background: aProfile.color, borderRadius: "4px" }} />
                <strong style={{ color: aProfile.color }}>{aProfile.name}</strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "14px", height: "14px", background: bProfile.color, borderRadius: "4px" }} />
                <strong style={{ color: bProfile.color }}>{bProfile.name}</strong>
              </div>
            </div>
          </div>

          {/* Side-by-Side Dimension Scores Table */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "8px" }}>
              BẢNG ĐIỂM ĐỐI ĐẦU TRỰC TIẾP
            </h3>

            {radarDimensions.map((dim) => {
              const scoreA = aScores[dim.key];
              const scoreB = bScores[dim.key];
              const winner = scoreA > scoreB ? aProfile.name : scoreB > scoreA ? bProfile.name : "Hòa";

              return (
                <div
                  key={dim.key}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "12px",
                    background: "rgba(6, 9, 18, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <span style={{ fontWeight: 700, color: "#E2E8F0", fontSize: "0.9rem" }}>{dim.name}</span>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ fontWeight: 800, color: aProfile.color }}>{scoreA}/10</span>
                    <span style={{ color: "#64748B" }}>vs</span>
                    <span style={{ fontWeight: 800, color: bProfile.color }}>{scoreB}/10</span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.06)",
                        color: winner === aProfile.name ? aProfile.color : winner === bProfile.name ? bProfile.color : "#94A3B8",
                        fontWeight: 800
                      }}
                    >
                      {winner === "Hòa" ? "Hòa" : `${winner} dẫn`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
