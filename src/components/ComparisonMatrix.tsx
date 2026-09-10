"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { soundFx } from "@/lib/soundEffects";
import { COMPARISON_CRITERIA, ComparisonCriterion } from "@/lib/lectureData";
import { Layers, Search, Filter, Trophy, ChevronRight, Check, HelpCircle } from "lucide-react";

export default function ComparisonMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [highlightedCol, setHighlightedCol] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { label: "Tất Cả (14)", value: "All" },
    { label: "Kiến Trúc (5)", value: "Architecture" },
    { label: "Dữ Liệu & Hiệu Năng (5)", value: "Data & Network" },
    { label: "Hệ Sinh Thái & Dev (4)", value: "Ecosystem & Dev" }
  ];

  const filteredCriteria = COMPARISON_CRITERIA.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.graphql.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.grpc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectCategory = (cat: string) => {
    soundFx.pop(700);
    setActiveCategory(cat);
  };

  const toggleExpand = (id: string) => {
    soundFx.whoosh();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="matrix" style={{ padding: "80px 0", position: "relative" }}>
      <div className="app-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)" }}>
            <Layers size={16} />
            <span>YÊU CẦU 1: ĐỐI CHIẾU 14 TIÊU CHÍ KỸ THUẬT</span>
          </div>
          <h2 className="section-title">
            MA TRẬN SO SÁNH <span className="gradient-text-rest">TOÀN DIỆN 5 KIẾN TRÚC</span>
          </h2>
          <p className="section-desc">
            Bảng đối chiếu chi tiết giữa 4 kiến trúc bắt buộc (SOAP, REST, GraphQL, gRPC) và 1 kiến trúc mở rộng (OData).
            Hover hoặc click vào tên kiến trúc để làm nổi bật cột tương ứng.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "28px"
          }}
        >
          {/* Category Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleSelectCategory(cat.value)}
                className="btn-comic"
                style={{
                  padding: "8px 18px",
                  fontSize: "0.85rem",
                  background: activeCategory === cat.value ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.04)",
                  borderColor: activeCategory === cat.value ? "#10B981" : "rgba(255, 255, 255, 0.1)",
                  color: activeCategory === cat.value ? "#34D399" : "#94A3B8"
                }}
              >
                <Filter size={14} />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div
            style={{
              position: "relative",
              minWidth: "260px",
              flex: "1 1 260px",
              maxWidth: "360px"
            }}
          >
            <Search
              size={18}
              color="#94A3B8"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Tìm tiêu chí (vd: cache, stream, json)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px 10px 42px",
                borderRadius: "999px",
                background: "rgba(13, 19, 34, 0.9)",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                color: "#F8FAFC",
                fontFamily: "var(--font-main)",
                fontSize: "0.9rem",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Matrix Table Container */}
        <div
          className="glass-panel"
          style={{
            overflowX: "auto",
            borderRadius: "24px",
            border: "2px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "1050px",
              borderCollapse: "separate",
              borderSpacing: 0,
              textAlign: "left"
            }}
          >
            <thead>
              <tr style={{ background: "rgba(6, 9, 18, 0.95)" }}>
                <th
                  style={{
                    padding: "20px 24px",
                    width: "22%",
                    borderBottom: "2px solid rgba(255, 255, 255, 0.12)",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}
                >
                  Tiêu Chí So Sánh
                </th>

                {/* SOAP Column */}
                <th
                  onMouseEnter={() => setHighlightedCol("soap")}
                  onMouseLeave={() => setHighlightedCol(null)}
                  style={{
                    padding: "20px 18px",
                    width: "15.6%",
                    borderBottom: "2px solid #FF9F43",
                    background: highlightedCol === "soap" ? "rgba(255, 159, 67, 0.1)" : "transparent",
                    transition: "background 0.2s",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF9F43" }} />
                    <span style={{ fontWeight: 800, color: "#FF9F43", fontSize: "1.05rem" }}>SOAP</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "2px" }}>Protocol (WSDL)</div>
                </th>

                {/* REST Column */}
                <th
                  onMouseEnter={() => setHighlightedCol("rest")}
                  onMouseLeave={() => setHighlightedCol(null)}
                  style={{
                    padding: "20px 18px",
                    width: "15.6%",
                    borderBottom: "2px solid #10B981",
                    background: highlightedCol === "rest" ? "rgba(16, 185, 129, 0.14)" : "rgba(16, 185, 129, 0.05)",
                    transition: "background 0.2s",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981" }} />
                    <span style={{ fontWeight: 800, color: "#10B981", fontSize: "1.05rem" }}>REST</span>
                    <span style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: "999px", background: "#10B981", color: "#042F1C", fontWeight: 900 }}>TOP SMS</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "2px" }}>Architectural Style</div>
                </th>

                {/* GraphQL Column */}
                <th
                  onMouseEnter={() => setHighlightedCol("graphql")}
                  onMouseLeave={() => setHighlightedCol(null)}
                  style={{
                    padding: "20px 18px",
                    width: "15.6%",
                    borderBottom: "2px solid #EC4899",
                    background: highlightedCol === "graphql" ? "rgba(236, 72, 153, 0.1)" : "transparent",
                    transition: "background 0.2s",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#EC4899" }} />
                    <span style={{ fontWeight: 800, color: "#EC4899", fontSize: "1.05rem" }}>GraphQL</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "2px" }}>Query Language</div>
                </th>

                {/* OData Column */}
                <th
                  onMouseEnter={() => setHighlightedCol("odata")}
                  onMouseLeave={() => setHighlightedCol(null)}
                  style={{
                    padding: "20px 18px",
                    width: "15.6%",
                    borderBottom: "2px solid #06B6D4",
                    background: highlightedCol === "odata" ? "rgba(6, 182, 212, 0.1)" : "transparent",
                    transition: "background 0.2s",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#06B6D4" }} />
                    <span style={{ fontWeight: 800, color: "#06B6D4", fontSize: "1.05rem" }}>OData</span>
                    <span style={{ fontSize: "0.65rem", padding: "2px 5px", borderRadius: "999px", background: "rgba(6,182,212,0.2)", color: "#38BDF8", fontWeight: 800 }}>MỞ RỘNG</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "2px" }}>Data Protocol (REST)</div>
                </th>

                {/* gRPC Column */}
                <th
                  onMouseEnter={() => setHighlightedCol("grpc")}
                  onMouseLeave={() => setHighlightedCol(null)}
                  style={{
                    padding: "20px 18px",
                    width: "15.6%",
                    borderBottom: "2px solid #8B5CF6",
                    background: highlightedCol === "grpc" ? "rgba(139, 92, 246, 0.1)" : "transparent",
                    transition: "background 0.2s",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#8B5CF6" }} />
                    <span style={{ fontWeight: 800, color: "#8B5CF6", fontSize: "1.05rem" }}>gRPC</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "2px" }}>RPC Framework (HTTP/2)</div>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCriteria.map((item, index) => {
                const isExpanded = expandedId === item.id;
                return (
                  <React.Fragment key={item.id}>
                    <tr
                      onClick={() => toggleExpand(item.id)}
                      style={{
                        background: index % 2 === 0 ? "rgba(13, 19, 34, 0.5)" : "rgba(18, 26, 46, 0.3)",
                        cursor: "pointer",
                        transition: "background 0.15s"
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          index % 2 === 0 ? "rgba(13, 19, 34, 0.5)" : "rgba(18, 26, 46, 0.3)";
                      }}
                    >
                      {/* Criterion Name */}
                      <td
                        style={{
                          padding: "16px 20px",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                          verticalAlign: "top"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <ChevronRight
                            size={16}
                            color="#38BDF8"
                            style={{
                              marginTop: "3px",
                              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform 0.2s"
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#F8FAFC" }}>{item.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "2px" }}>{item.description}</div>
                          </div>
                        </div>
                      </td>

                      {/* SOAP Value */}
                      <td
                        style={{
                          padding: "16px 18px",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                          fontSize: "0.85rem",
                          color: "#CBD5E1",
                          verticalAlign: "top",
                          background: highlightedCol === "soap" ? "rgba(255, 159, 67, 0.06)" : "transparent"
                        }}
                      >
                        {item.soap}
                      </td>

                      {/* REST Value */}
                      <td
                        style={{
                          padding: "16px 18px",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                          fontSize: "0.85rem",
                          color: "#E2E8F0",
                          fontWeight: 500,
                          verticalAlign: "top",
                          background: highlightedCol === "rest" ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.03)"
                        }}
                      >
                        {item.rest}
                      </td>

                      {/* GraphQL Value */}
                      <td
                        style={{
                          padding: "16px 18px",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                          fontSize: "0.85rem",
                          color: "#CBD5E1",
                          verticalAlign: "top",
                          background: highlightedCol === "graphql" ? "rgba(236, 72, 153, 0.06)" : "transparent"
                        }}
                      >
                        {item.graphql}
                      </td>

                      {/* OData Value */}
                      <td
                        style={{
                          padding: "16px 18px",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                          fontSize: "0.85rem",
                          color: "#CBD5E1",
                          verticalAlign: "top",
                          background: highlightedCol === "odata" ? "rgba(6, 182, 212, 0.06)" : "transparent"
                        }}
                      >
                        {item.odata}
                      </td>

                      {/* gRPC Value */}
                      <td
                        style={{
                          padding: "16px 18px",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                          fontSize: "0.85rem",
                          color: "#CBD5E1",
                          verticalAlign: "top",
                          background: highlightedCol === "grpc" ? "rgba(139, 92, 246, 0.06)" : "transparent"
                        }}
                      >
                        {item.grpc}
                      </td>
                    </tr>

                    {/* Expandable Key Takeaway Drawer */}
                    {isExpanded && (
                      <tr>
                        <td
                          colSpan={6}
                          style={{
                            padding: "14px 24px",
                            background: "rgba(16, 185, 129, 0.08)",
                            borderBottom: "1.5px solid rgba(16, 185, 129, 0.2)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <Trophy size={18} color="#10B981" />
                              <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "#34D399" }}>
                                Ưu Thế Vượt Trội: {item.winner}
                              </span>
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "#E2E8F0", fontStyle: "italic" }}>
                              💡 <strong>Key Takeaway:</strong> {item.keyTakeaway}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
