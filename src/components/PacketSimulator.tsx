"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { soundFx } from "@/lib/soundEffects";
import { CRUD_VERB_MAP } from "@/lib/lectureData";
import {
  Network,
  Play,
  RotateCcw,
  Smartphone,
  ShieldCheck,
  Binary,
  Cpu,
  Database,
  ArrowRight,
  CheckCircle2,
  Clock,
  Terminal,
  Layers
} from "lucide-react";

export default function PacketSimulator() {
  const [selectedMethod, setSelectedMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">("GET");
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = idle, 1 = client, 2 = network, 3 = serialize, 4 = backend, 5 = database, 6 = response back
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const stations = [
    { id: 1, name: "1. Client App", icon: <Smartphone size={22} color="#38BDF8" />, sub: "Mobile / Web Portal" },
    { id: 2, name: "2. API Gateway", icon: <ShieldCheck size={22} color="#8B5CF6" />, sub: "TLS · JWT · Rate Limit" },
    { id: 3, name: "3. Serialization", icon: <Binary size={22} color="#EC4899" />, sub: "JSON Payload Parser" },
    { id: 4, name: "4. REST Controller", icon: <Cpu size={22} color="#10B981" />, sub: "Business Logic Engine" },
    { id: 5, name: "5. Storage & DB", icon: <Database size={22} color="#FF9F43" />, sub: "PostgreSQL & Redis" }
  ];

  const requestDetails = {
    GET: {
      endpoint: "/api/v1/students/SE160001",
      headers: [
        "GET /api/v1/students/SE160001 HTTP/1.1",
        "Host: sms.university.edu.vn",
        "Accept: application/json",
        "Authorization: Bearer eyJhbGciOi..."
      ],
      requestBody: "(Không có body cho GET)",
      status: "200 OK",
      responseHeaders: [
        "HTTP/1.1 200 OK",
        "Content-Type: application/json; charset=utf-8",
        "ETag: W/\"3a2-b91c0e\"",
        "Cache-Control: public, max-age=3600"
      ],
      responseBody: {
        studentId: "SE160001",
        fullName: "Nguyễn Văn An",
        major: "Software Engineering",
        gpa: 3.65,
        enrolledCourses: ["PRN232", "SWD392", "MLN111"]
      }
    },
    POST: {
      endpoint: "/api/v1/students",
      headers: [
        "POST /api/v1/students HTTP/1.1",
        "Host: sms.university.edu.vn",
        "Content-Type: application/json",
        "Authorization: Bearer eyJhbGciOi..."
      ],
      requestBody: JSON.stringify({
        fullName: "Trần Thị Mai",
        major: "Information Assurance",
        cohort: "K18"
      }, null, 2),
      status: "201 Created",
      responseHeaders: [
        "HTTP/1.1 201 Created",
        "Location: /api/v1/students/SE180099",
        "Content-Type: application/json"
      ],
      responseBody: {
        studentId: "SE180099",
        fullName: "Trần Thị Mai",
        status: "Active",
        createdAt: "2026-09-10T13:30:00Z"
      }
    },
    PUT: {
      endpoint: "/api/v1/students/SE160001",
      headers: [
        "PUT /api/v1/students/SE160001 HTTP/1.1",
        "Host: sms.university.edu.vn",
        "Content-Type: application/json",
        "Authorization: Bearer eyJhbGciOi..."
      ],
      requestBody: JSON.stringify({
        fullName: "Nguyễn Văn An",
        major: "Software Engineering",
        phone: "+84 912 345 678"
      }, null, 2),
      status: "200 OK",
      responseHeaders: [
        "HTTP/1.1 200 OK",
        "Content-Type: application/json"
      ],
      responseBody: {
        studentId: "SE160001",
        fullName: "Nguyễn Văn An",
        updatedAt: "2026-09-10T13:35:00Z"
      }
    },
    DELETE: {
      endpoint: "/api/v1/students/SE160001",
      headers: [
        "DELETE /api/v1/students/SE160001 HTTP/1.1",
        "Host: sms.university.edu.vn",
        "Authorization: Bearer eyJhbGciOi..."
      ],
      requestBody: "(Không có body cho DELETE)",
      status: "204 No Content",
      responseHeaders: [
        "HTTP/1.1 204 No Content"
      ],
      responseBody: "(204 No Content - Hồ sơ sinh viên đã xóa hoàn toàn)"
    }
  };

  const activeReq = requestDetails[selectedMethod];

  const handleStartSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCurrentStep(1);
    soundFx.whoosh();

    // Trigger REAL network request in browser DevTools
    try {
      if (selectedMethod === "GET") {
        fetch("/api/sms-students?studentId=SE160001", { cache: "no-store" }).catch(() => {});
      } else if (selectedMethod === "POST") {
        fetch("/api/sms-students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName: "Trần Thị Mai", major: "Information Assurance" })
        }).catch(() => {});
      } else if (selectedMethod === "PUT") {
        fetch("/api/sms-students", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName: "Nguyễn Văn An", phone: "+84 912 345 678" })
        }).catch(() => {});
      } else if (selectedMethod === "DELETE") {
        fetch("/api/sms-students", { method: "DELETE" }).catch(() => {});
      }
    } catch {
      // Ignore network failure
    }

    const stepIntervals = [700, 1400, 2100, 2800, 3500];

    stepIntervals.forEach((delay, idx) => {
      setTimeout(() => {
        const nextStep = idx + 2;
        setCurrentStep(nextStep);
        if (nextStep <= 5) {
          soundFx.pop(500 + nextStep * 100);
        } else {
          soundFx.victoryFanfare();
          setIsSimulating(false);
        }
      }, delay);
    });
  };

  const handleReset = () => {
    soundFx.pop(400);
    setCurrentStep(0);
    setIsSimulating(false);
  };

  return (
    <section id="packet-flow" style={{ padding: "80px 0", position: "relative" }}>
      <div className="app-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: "#EC4899", borderColor: "rgba(236,72,153,0.3)" }}>
            <Network size={16} />
            <span>YÊU CẦU 3: MINH HỌA QUY TRÌNH 4 BƯỚC HOẠT HỌA</span>
          </div>
          <h2 className="section-title">
            HÀNH TRÌNH GÓI TIN <span className="gradient-text-graphql">CLIENT ➔ REQUEST ➔ API ➔ RESPONSE</span>
          </h2>
          <p className="section-desc">
            Quan sát trực quan lộ trình di chuyển của gói tin mạng qua 5 trạm hệ thống với các phương thức HTTP chuẩn REST.
          </p>
        </div>

        {/* Method Selector & Control Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          {/* Method Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {(["GET", "POST", "PUT", "DELETE"] as const).map((method) => {
              const isSelected = selectedMethod === method;
              let btnColor = "#10B981";
              if (method === "POST") btnColor = "#38BDF8";
              if (method === "PUT") btnColor = "#FF9F43";
              if (method === "DELETE") btnColor = "#EF4444";

              return (
                <button
                  key={method}
                  onClick={() => {
                    soundFx.pop(600);
                    setSelectedMethod(method);
                    setCurrentStep(0);
                    setIsSimulating(false);
                  }}
                  className="btn-comic"
                  style={{
                    padding: "8px 20px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    borderColor: isSelected ? btnColor : "rgba(255,255,255,0.1)",
                    background: isSelected ? `rgba(${btnColor}, 0.2)` : "rgba(13, 19, 34, 0.7)",
                    color: isSelected ? btnColor : "#94A3B8"
                  }}
                >
                  {method}
                </button>
              );
            })}
          </div>

          {/* Action Trigger Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleReset}
              className="btn-comic"
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
            <button
              onClick={handleStartSimulation}
              disabled={isSimulating}
              className="btn-comic btn-primary-comic"
              style={{ padding: "8px 22px", fontSize: "0.9rem" }}
            >
              <Play size={16} />
              <span>{isSimulating ? "Gói Tin Đang Bay..." : "Bắn Gói Tin Đi!"}</span>
            </button>
          </div>
        </div>

        {/* Visual Pipeline Station Nodes */}
        <div
          className="glass-panel"
          style={{
            padding: "36px 24px",
            border: "2px solid rgba(255, 255, 255, 0.12)",
            marginBottom: "36px",
            position: "relative"
          }}
        >
          {/* Station Pipeline Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "16px",
              position: "relative",
              zIndex: 2
            }}
          >
            {stations.map((s) => {
              const isActive = currentStep === s.id;
              const isPassed = currentStep > s.id;

              return (
                <div
                  key={s.id}
                  style={{
                    padding: "20px 14px",
                    borderRadius: "18px",
                    background: isActive
                      ? "rgba(16, 185, 129, 0.18)"
                      : isPassed
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(6, 9, 18, 0.6)",
                    border: `2px solid ${
                      isActive ? "#10B981" : isPassed ? "rgba(16, 185, 129, 0.4)" : "rgba(255, 255, 255, 0.08)"
                    }`,
                    boxShadow: isActive ? "0 0 25px rgba(16, 185, 129, 0.4)" : "none",
                    textAlign: "center",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform: isActive ? "scale(1.06) translateY(-4px)" : "scale(1)"
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: isActive ? "#10B981" : "rgba(255, 255, 255, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      boxShadow: isActive ? "0 4px 15px rgba(16, 185, 129, 0.5)" : "none"
                    }}
                  >
                    {s.icon}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: isActive ? "#34D399" : "#F8FAFC" }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#94A3B8", marginTop: "2px" }}>
                    {s.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated Cartoon Packet Indicator */}
          {currentStep > 0 && (
            <motion.div
              layout
              style={{
                marginTop: "24px",
                padding: "12px 20px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#032314",
                fontWeight: 900,
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)"
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>💌</span>
              <span>
                {currentStep === 1 && "Gói tin bắt đầu xuất phát từ Client..."}
                {currentStep === 2 && "Gateway kiểm tra JWT token, TLS và Rate Limiting..."}
                {currentStep === 3 && "Tầng Serialization đọc và giải mã JSON payload..."}
                {currentStep === 4 && "REST Controller xử lý nghiệp vụ sinh viên..."}
                {currentStep === 5 && "Truy vấn cơ sở dữ liệu PostgreSQL & kiểm tra Redis..."}
                {currentStep >= 6 && `Hoàn tất! Server trả về response: ${activeReq.status}`}
              </span>
            </motion.div>
          )}
        </div>

        {/* Telemetry Inspector: Request Header/Body vs Response Header/Body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "24px",
            marginBottom: "40px"
          }}
        >
          {/* Request Telemetry */}
          <div
            className="cartoon-card"
            style={{
              background: "#070B14",
              border: "1.5px solid rgba(56, 189, 248, 0.3)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#38BDF8", fontWeight: 800, marginBottom: "14px" }}>
              <Terminal size={18} />
              <span>GÓI TIN YÊU CẦU (HTTP REQUEST HEADERS & BODY)</span>
            </div>

            <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginBottom: "6px" }}>HEADERS:</div>
            <pre
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                padding: "12px",
                borderRadius: "10px",
                fontSize: "0.8rem",
                color: "#93C5FD",
                marginBottom: "14px",
                overflowX: "auto"
              }}
            >
              <code>{activeReq.headers.join("\n")}</code>
            </pre>

            <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginBottom: "6px" }}>REQUEST PAYLOAD:</div>
            <pre
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                padding: "12px",
                borderRadius: "10px",
                fontSize: "0.8rem",
                color: "#F8FAFC",
                overflowX: "auto"
              }}
            >
              <code>{activeReq.requestBody}</code>
            </pre>
          </div>

          {/* Response Telemetry */}
          <div
            className="cartoon-card"
            style={{
              background: "#070B14",
              border: "1.5px solid rgba(16, 185, 129, 0.3)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34D399", fontWeight: 800 }}>
                <CheckCircle2 size={18} />
                <span>GÓI TIN PHẢN HỒI (HTTP RESPONSE)</span>
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 900, padding: "2px 8px", borderRadius: "999px", background: "#10B981", color: "#042F1C" }}>
                {activeReq.status}
              </span>
            </div>

            <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginBottom: "6px" }}>RESPONSE HEADERS:</div>
            <pre
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                padding: "12px",
                borderRadius: "10px",
                fontSize: "0.8rem",
                color: "#6EE7B7",
                marginBottom: "14px",
                overflowX: "auto"
              }}
            >
              <code>{activeReq.responseHeaders.join("\n")}</code>
            </pre>

            <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginBottom: "6px" }}>RESPONSE BODY:</div>
            <pre
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                padding: "12px",
                borderRadius: "10px",
                fontSize: "0.8rem",
                color: "#F8FAFC",
                overflowX: "auto",
                maxHeight: "150px"
              }}
            >
              <code>
                {typeof activeReq.responseBody === "string"
                  ? activeReq.responseBody
                  : JSON.stringify(activeReq.responseBody, null, 2)}
              </code>
            </pre>
          </div>
        </div>

        {/* CRUD Verb Map Table */}
        <div className="glass-panel" style={{ padding: "24px 28px", border: "2px solid rgba(255, 255, 255, 0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <Layers size={20} color="#10B981" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>BẢNG QUY ƯỚC NGỮ NGHĨA CÁC ĐỘNG TỪ CRUD CHUẨN REST</h3>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.12)", color: "#94A3B8" }}>
                  <th style={{ padding: "10px" }}>Động Từ</th>
                  <th style={{ padding: "10px" }}>Endpoint Mẫu</th>
                  <th style={{ padding: "10px" }}>Đặc Tính Ngữ Nghĩa</th>
                  <th style={{ padding: "10px" }}>HTTP Caching</th>
                  <th style={{ padding: "10px" }}>Mã Thành Công</th>
                  <th style={{ padding: "10px" }}>Mô Tả Nghiệp Vụ SMS</th>
                </tr>
              </thead>
              <tbody>
                {CRUD_VERB_MAP.map((verb) => (
                  <tr key={verb.verb} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <td style={{ padding: "12px 10px", fontWeight: 900, color: verb.verb === "GET" ? "#10B981" : verb.verb === "POST" ? "#38BDF8" : verb.verb === "PUT" ? "#FF9F43" : "#EF4444" }}>
                      {verb.verb}
                    </td>
                    <td style={{ padding: "12px 10px", fontFamily: "var(--font-mono)", color: "#E2E8F0" }}>
                      {verb.endpoint}
                    </td>
                    <td style={{ padding: "12px 10px", color: "#CBD5E1" }}>{verb.semantic}</td>
                    <td style={{ padding: "12px 10px", color: verb.cacheable.includes("Có") ? "#34D399" : "#94A3B8" }}>
                      {verb.cacheable}
                    </td>
                    <td style={{ padding: "12px 10px", fontWeight: 700, color: "#F8FAFC" }}>{verb.successCode}</td>
                    <td style={{ padding: "12px 10px", color: "#94A3B8" }}>{verb.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
