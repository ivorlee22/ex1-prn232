"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { soundFx } from "@/lib/soundEffects";
import { WEIGHTED_DECISION_MATRIX } from "@/lib/lectureData";
import {
  Compass,
  Trophy,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Sliders,
  Smartphone,
  Globe2,
  Server,
  Zap,
  Info
} from "lucide-react";

export default function CaseStudyCalculator() {
  // State for 8 weights (default from WEIGHTED_DECISION_MATRIX)
  const [weights, setWeights] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    WEIGHTED_DECISION_MATRIX.forEach((c) => {
      initial[c.id] = Math.round(c.weight * 100);
    });
    return initial;
  });

  const [activeTab, setActiveTab] = useState<"why-rest" | "not-soap" | "not-grpc" | "not-graphql" | "not-odata">("why-rest");

  // Calculate live weighted scores
  const calculatedScores = useMemo(() => {
    let totalWeight = 0;
    Object.values(weights).forEach((w) => (totalWeight += w));
    if (totalWeight === 0) totalWeight = 1;

    let soapSum = 0;
    let restSum = 0;
    let graphqlSum = 0;
    let odataSum = 0;
    let grpcSum = 0;

    WEIGHTED_DECISION_MATRIX.forEach((c) => {
      const normalizedW = (weights[c.id] || 0) / totalWeight;
      soapSum += c.scores.soap * normalizedW;
      restSum += c.scores.rest * normalizedW;
      graphqlSum += c.scores.graphql * normalizedW;
      odataSum += c.scores.odata * normalizedW;
      grpcSum += c.scores.grpc * normalizedW;
    });

    return [
      { id: "rest", name: "REST", score: restSum, color: "#10B981", badge: "LỰA CHỌN TỐI ƯU" },
      { id: "graphql", name: "GraphQL", score: graphqlSum, color: "#EC4899", badge: "Á QUÂN" },
      { id: "odata", name: "OData", score: odataSum, color: "#06B6D4", badge: "MỞ RỘNG" },
      { id: "grpc", name: "gRPC", score: grpcSum, color: "#8B5CF6", badge: "SERVICE NỘI BỘ" },
      { id: "soap", name: "SOAP", score: soapSum, color: "#FF9F43", badge: "LEGACY B2B" }
    ].sort((a, b) => b.score - a.score);
  }, [weights]);

  const handleSliderChange = (id: string, val: number) => {
    soundFx.pop(500 + val * 5);
    setWeights((prev) => ({ ...prev, [id]: val }));
  };

  const handleResetWeights = () => {
    soundFx.whoosh();
    const initial: Record<string, number> = {};
    WEIGHTED_DECISION_MATRIX.forEach((c) => {
      initial[c.id] = Math.round(c.weight * 100);
    });
    setWeights(initial);
  };

  const handleTriggerCelebrate = () => {
    soundFx.victoryFanfare();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#10B981", "#34D399", "#A7F3D0", "#FFFFFF"]
    });
  };

  return (
    <section id="case-study" style={{ padding: "80px 0", position: "relative" }}>
      <div className="app-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: "#38BDF8", borderColor: "rgba(56,189,248,0.3)" }}>
            <Compass size={16} />
            <span>YÊU CẦU 2: CASE STUDY STUDENT MANAGEMENT SYSTEM</span>
          </div>
          <h2 className="section-title">
            QUYẾT ĐỊNH KIẾN TRÚC <span className="gradient-text-rest">LỰA CHỌN REST CHO SMS</span>
          </h2>
          <p className="section-desc">
            Bài toán thực tế: Xây dựng hệ thống quản lý sinh viên phục vụ đồng thời Web Portal & Mobile App.
            Kéo các thanh trượt trọng số để tính toán lại điểm số khoa học theo nhu cầu riêng của dự án.
          </p>
        </div>

        {/* SMS Scenario Context Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
            marginBottom: "40px"
          }}
        >
          <div className="cartoon-card" style={{ borderLeft: "4px solid #38BDF8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#38BDF8", marginBottom: "8px" }}>
              <Smartphone size={20} />
              <strong style={{ fontSize: "1rem" }}>Client Mobile (Sinh Viên)</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#94A3B8" }}>
              Ứng dụng Flutter/React Native chạy trên mạng 4G/WiFi di động. Cần payload JSON gọn, hỗ trợ offline cache và xử lý nhanh.
            </p>
          </div>

          <div className="cartoon-card" style={{ borderLeft: "4px solid #10B981" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#10B981", marginBottom: "8px" }}>
              <Globe2 size={20} />
              <strong style={{ fontSize: "1rem" }}>Web Portal (Giảng Viên & Admin)</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#94A3B8" }}>
              Cổng web Next.js quản lý danh sách sinh viên, nhập điểm số, quản lý môn học theo mô hình CRUD chuẩn mực.
            </p>
          </div>

          <div className="cartoon-card" style={{ borderLeft: "4px solid #8B5CF6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#8B5CF6", marginBottom: "8px" }}>
              <Server size={20} />
              <strong style={{ fontSize: "1rem" }}>Hạ Tầng Backend SMS</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#94A3B8" }}>
              Cần dễ bảo trì, dễ tuyển dụng kỹ sư, tận dụng được Reverse Proxy, CDN Caching và OpenAPI Swagger để sinh client stubs.
            </p>
          </div>
        </div>

        {/* Interactive Weighted Calculator Box */}
        <div
          className="glass-panel"
          style={{
            padding: "32px",
            border: "2px solid rgba(255, 255, 255, 0.15)",
            marginBottom: "50px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "28px"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sliders size={22} color="#10B981" />
                <h3 style={{ fontSize: "1.4rem", fontWeight: 900 }}>
                  BỘ TÍNH ĐIỂM TRỌNG SỐ TƯƠNG TÁC (WEIGHTED CALCULATOR)
                </h3>
              </div>
              <p style={{ fontSize: "0.84rem", color: "#94A3B8", marginTop: "4px" }}>
                Điểm gốc được lấy từ slide 7 đề bài (REST: 4.35, GraphQL: 4.10, gRPC: 3.20, SOAP: 2.70).
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleResetWeights}
                className="btn-comic"
                style={{ padding: "8px 16px", fontSize: "0.85rem" }}
              >
                <RotateCcw size={14} />
                <span>Đặt Lại Trọng Số Gốc</span>
              </button>
              <button
                onClick={handleTriggerCelebrate}
                className="btn-comic btn-primary-comic"
                style={{ padding: "8px 18px", fontSize: "0.85rem" }}
              >
                <Sparkles size={14} />
                <span>Ăn Mừng REST Thắng!</span>
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "36px"
            }}
          >
            {/* Sliders Area (8 Criteria) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#E2E8F0", marginBottom: "4px" }}>
                ĐIỀU CHỈNH TRỌNG SỐ DỰ ÁN (%):
              </div>

              {WEIGHTED_DECISION_MATRIX.map((item) => (
                <div key={item.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 600, color: "#F8FAFC" }}>{item.name}</span>
                    <span style={{ fontWeight: 800, color: "#10B981" }}>{weights[item.id]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={weights[item.id]}
                    onChange={(e) => handleSliderChange(item.id, parseInt(e.target.value, 10))}
                    style={{
                      width: "100%",
                      accentColor: "#10B981",
                      cursor: "pointer"
                    }}
                  />
                  <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>{item.explanation}</div>
                </div>
              ))}
            </div>

            {/* Live Animated Score Bars */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "18px",
                padding: "24px",
                borderRadius: "20px",
                background: "rgba(6, 9, 18, 0.7)",
                border: "1.5px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#F8FAFC" }}>KẾT QUẢ ĐIỂM SỐ TỔNG HỢP:</span>
                <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>Thang điểm tối đa: 5.00</span>
              </div>

              {calculatedScores.map((item, index) => {
                const percentage = (item.score / 5) * 100;
                const isWinner = index === 0;

                return (
                  <div key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {isWinner && <Trophy size={18} color="#10B981" />}
                        <span style={{ fontWeight: 800, fontSize: "1rem", color: item.color }}>
                          {index + 1}. {item.name}
                        </span>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: "999px",
                            background: isWinner ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.06)",
                            color: isWinner ? "#34D399" : "#94A3B8"
                          }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <span style={{ fontWeight: 900, fontSize: "1.2rem", color: item.color }}>
                        {item.score.toFixed(2)} / 5.00
                      </span>
                    </div>

                    {/* Progress Bar with Motion */}
                    <div
                      style={{
                        width: "100%",
                        height: "16px",
                        background: "rgba(255, 255, 255, 0.06)",
                        borderRadius: "999px",
                        overflow: "hidden"
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          height: "100%",
                          borderRadius: "999px",
                          background: isWinner
                            ? "linear-gradient(90deg, #10B981 0%, #34D399 100%)"
                            : item.color,
                          boxShadow: isWinner ? "0 0 15px rgba(16, 185, 129, 0.6)" : "none"
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Winning Notice */}
              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  borderRadius: "14px",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1.5px solid #10B981",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <CheckCircle2 size={24} color="#10B981" />
                <div style={{ fontSize: "0.88rem", color: "#E2E8F0" }}>
                  <strong>KẾT LUẬN ĐỒNG THUẬN:</strong> REST đạt điểm số áp đảo nhờ tính tương thích tự nhiên 100% với trình duyệt web và thiết bị di động, mô hình tài nguyên CRUD rõ ràng, và tận dụng tối đa HTTP Caching.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Justification Tabs: Why REST & Why NOT Others */}
        <div className="glass-panel" style={{ padding: "32px", border: "2px solid rgba(255, 255, 255, 0.12)" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "20px" }}>
            BIỆN LUẬN CHI TIẾT: TẠI SAO CHỌN REST VÀ TỪ CHỐI CÁC KIẾN TRÚC KHÁC?
          </h3>

          {/* Subtabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
            <button
              onClick={() => { soundFx.whoosh(); setActiveTab("why-rest"); }}
              className="btn-comic"
              style={{
                borderColor: activeTab === "why-rest" ? "#10B981" : "rgba(255,255,255,0.1)",
                background: activeTab === "why-rest" ? "rgba(16,185,129,0.15)" : "transparent",
                color: activeTab === "why-rest" ? "#34D399" : "#94A3B8"
              }}
            >
              <CheckCircle2 size={16} />
              <span>1. Vì Sao Chọn REST?</span>
            </button>

            <button
              onClick={() => { soundFx.whoosh(); setActiveTab("not-soap"); }}
              className="btn-comic"
              style={{
                borderColor: activeTab === "not-soap" ? "#FF9F43" : "rgba(255,255,255,0.1)",
                background: activeTab === "not-soap" ? "rgba(255,159,67,0.15)" : "transparent",
                color: activeTab === "not-soap" ? "#FF9F43" : "#94A3B8"
              }}
            >
              <XCircle size={16} />
              <span>2. Vì Sao Không Chọn SOAP?</span>
            </button>

            <button
              onClick={() => { soundFx.whoosh(); setActiveTab("not-grpc"); }}
              className="btn-comic"
              style={{
                borderColor: activeTab === "not-grpc" ? "#8B5CF6" : "rgba(255,255,255,0.1)",
                background: activeTab === "not-grpc" ? "rgba(139,92,246,0.15)" : "transparent",
                color: activeTab === "not-grpc" ? "#8B5CF6" : "#94A3B8"
              }}
            >
              <XCircle size={16} />
              <span>3. Vì Sao Không Chọn gRPC Cho Client?</span>
            </button>

            <button
              onClick={() => { soundFx.whoosh(); setActiveTab("not-graphql"); }}
              className="btn-comic"
              style={{
                borderColor: activeTab === "not-graphql" ? "#EC4899" : "rgba(255,255,255,0.1)",
                background: activeTab === "not-graphql" ? "rgba(236,72,153,0.15)" : "transparent",
                color: activeTab === "not-graphql" ? "#EC4899" : "#94A3B8"
              }}
            >
              <XCircle size={16} />
              <span>4. Vì Sao Không Chọn GraphQL?</span>
            </button>

            <button
              onClick={() => { soundFx.whoosh(); setActiveTab("not-odata"); }}
              className="btn-comic"
              style={{
                borderColor: activeTab === "not-odata" ? "#06B6D4" : "rgba(255,255,255,0.1)",
                background: activeTab === "not-odata" ? "rgba(6,182,212,0.15)" : "transparent",
                color: activeTab === "not-odata" ? "#06B6D4" : "#94A3B8"
              }}
            >
              <XCircle size={16} />
              <span>5. Vì Sao Không Chọn OData?</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div style={{ background: "rgba(6, 9, 18, 0.6)", padding: "24px", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.08)" }}>
            {activeTab === "why-rest" && (
              <div>
                <h4 style={{ color: "#10B981", fontSize: "1.15rem", fontWeight: 800, marginBottom: "12px" }}>
                  4 TRỤ CỘT KHIẾN REST LÀ LỰA CHỌN TỐI ƯU CHO STUDENT MANAGEMENT SYSTEM:
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                  <div>
                    <strong style={{ color: "#F8FAFC" }}>1. Tương thích Web & Mobile 100% Native:</strong>
                    <p style={{ fontSize: "0.88rem", color: "#94A3B8", marginTop: "4px" }}>
                      Mọi thư viện HTTP (fetch, axios, Flutter http) đều hỗ trợ sẵn REST/JSON. Không cần cài thêm runtime phức tạp, tiết kiệm RAM và pin cho thiết bị sinh viên.
                    </p>
                  </div>
                  <div>
                    <strong style={{ color: "#F8FAFC" }}>2. Khớp hoàn hảo mô hình CRUD tài nguyên:</strong>
                    <p style={{ fontSize: "0.88rem", color: "#94A3B8", marginTop: "4px" }}>
                      Thực thể Sinh viên, Môn học, Điểm số khớp tự nhiên với các URL danh từ (`/students`, `/courses`) và các động từ chuẩn `GET`, `POST`, `PUT`, `DELETE`.
                    </p>
                  </div>
                  <div>
                    <strong style={{ color: "#F8FAFC" }}>3. Tận dụng HTTP Caching & ETag:</strong>
                    <p style={{ fontSize: "0.88rem", color: "#94A3B8", marginTop: "4px" }}>
                      Dữ liệu thời khóa biểu và danh mục môn học ít thay đổi. REST cho phép trình duyệt và CDN trả về `304 Not Modified`, giảm đến 80% tải truy vấn lên database.
                    </p>
                  </div>
                  <div>
                    <strong style={{ color: "#F8FAFC" }}>4. Vận hành & Tuyển dụng dễ dàng:</strong>
                    <p style={{ fontSize: "0.88rem", color: "#94A3B8", marginTop: "4px" }}>
                      Đội ngũ dễ kiểm thử bằng Postman/cURL, tích hợp OpenAPI/Swagger tự động sinh tài liệu và client SDK cho frontend và mobile.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "not-soap" && (
              <div>
                <h4 style={{ color: "#FF9F43", fontSize: "1.15rem", fontWeight: 800, marginBottom: "12px" }}>
                  LÝ DO TỪ CHỐI SOAP TRONG BÀI TOÁN SMS:
                </h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  SOAP sử dụng định dạng <strong>XML Envelope cồng kềnh</strong>, làm tăng kích thước gói tin gấp 3-5 lần so với JSON, gây tốn băng thông và hao pin trên thiết bị di động 4G. Thêm vào đó, việc xử lý XML trên ứng dụng mobile và web đòi hỏi các thư viện phân tích cú pháp (DOM/SAX) phức tạp, không thân thiện với lập trình viên hiện đại. Hệ sinh thái WS-Security quá nặng nề so với nhu cầu bảo mật thông thường chỉ cần JWT và HTTPS.
                </p>
              </div>
            )}

            {activeTab === "not-grpc" && (
              <div>
                <h4 style={{ color: "#8B5CF6", fontSize: "1.15rem", fontWeight: 800, marginBottom: "12px" }}>
                  LÝ DO TỪ CHỐI gRPC LÀM PUBLIC CLIENT API (DÙ RẤT TỐT CHO BACKEND):
                </h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  gRPC vận hành trên nền tảng native HTTP/2 framing. Trình duyệt web hiện tại <strong>không cho phép JavaScript can thiệp sâu vào HTTP/2 framing</strong> để gửi native gRPC request, do đó bắt buộc phải dựng thêm một cụm proxy trung gian như <strong>Envoy Proxy (gRPC-Web)</strong>, làm tăng độ phức tạp kiến trúc và chi phí vận hành server. Ngoài ra, payload dạng nhị phân Protocol Buffers gây khó khăn cho việc kiểm thử và debug nhanh qua trình duyệt. Tuy nhiên, gRPC là ứng viên số 1 nếu triển khai giao tiếp nội bộ giữa các microservices phía sau API Gateway.
                </p>
              </div>
            )}

            {activeTab === "not-graphql" && (
              <div>
                <h4 style={{ color: "#EC4899", fontSize: "1.15rem", fontWeight: 800, marginBottom: "12px" }}>
                  LÝ DO KHÔNG CẦN THIẾT DÙNG GraphQL CHO HỆ THỐNG SMS:
                </h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  Hệ thống SMS có các màn hình quản lý nghiệp vụ chuẩn mực, cấu trúc dữ liệu tương đối cố định (hồ sơ sinh viên, bảng điểm). Việc đưa vào GraphQL mang lại sự linh hoạt không cần thiết nhưng đánh đổi bằng <strong>độ phức tạp lớn</strong>: giải quyết bài toán N+1 query tại tầng resolver (cần DataLoader), server tốn chi phí CPU để phân tích cây cú pháp AST, và đặc biệt là <strong>đánh mất khả năng cache cấp độ HTTP/CDN tự nhiên</strong> vì hầu hết request đều là HTTP POST tới một endpoint `/graphql` duy nhất.
                </p>
              </div>
            )}

            {activeTab === "not-odata" && (
              <div>
                <h4 style={{ color: "#06B6D4", fontSize: "1.15rem", fontWeight: 800, marginBottom: "12px" }}>
                  LÝ DO TỪ CHỐI OData CHO ỨNG DỤNG DI ĐỘNG SMS:
                </h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  OData cung cấp các cú pháp truy vấn `$filter`, `$select`, `$expand` rất mạnh nhưng có nguy cơ khiến client tạo ra những câu truy vấn JOIN nhiều bảng phức tạp làm cạn kiệt tài nguyên database. Việc triển khai OData trên các nền tảng ngoài .NET (như Flutter, mobile iOS/Android) thiếu các client SDK gọn nhẹ, và dễ làm rò rỉ mô hình quan hệ cơ sở dữ liệu nội bộ ra ngoài giao diện công cộng.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
