export interface ProtocolProfile {
  id: "soap" | "rest" | "graphql" | "odata" | "grpc";
  name: string;
  badge: string;
  color: string;
  darkColor: string;
  nature: string;
  contract: string;
  format: string;
  strengths: string[];
  limits: string[];
  bestFor: string;
  api: string;
  endpoint: string;
  method: string;
  code: string[];
  result: string;
  latencySim: number;
  responsePayload: Record<string, unknown> | string;
  prosDetail: string[];
  consDetail: string[];
}

export const PROTOCOL_PROFILES: Record<string, ProtocolProfile> = {
  soap: {
    id: "soap",
    name: "SOAP",
    badge: "Enterprise Messaging",
    color: "#FF9F43",
    darkColor: "rgba(255, 159, 67, 0.15)",
    nature: "Messaging Protocol độc lập transport",
    contract: "WSDL (Web Services Description Language) + XSD Schema",
    format: "XML Envelope (<Envelope><Header/><Body/></Envelope>)",
    strengths: [
      "Formal Contract rất chặt với WSDL",
      "SOAP Fault có cấu trúc phân cấp lỗi rõ ràng",
      "Hệ sinh thái WS-* chuẩn hóa (WS-Security, WS-ReliableMessaging)"
    ],
    limits: [
      "XML cực kỳ verbose, tốn băng thông và CPU parsing",
      "Tooling nhiều lớp, phức tạp, không thân thiện với browser/mobile",
      "Không tận dụng ngữ nghĩa HTTP method chuẩn (thường chỉ POST)"
    ],
    bestFor: "Tích hợp hệ thống Enterprise, ngân hàng, B2B tài chính, legacy system",
    api: "DataAccess Number Conversion Service",
    endpoint: "POST https://www.dataaccess.com/webservicesserver/NumberConversion.wso",
    method: "POST",
    code: [
      'POST /webservicesserver/NumberConversion.wso HTTP/1.1',
      'Host: www.dataaccess.com',
      'Content-Type: text/xml; charset=utf-8',
      '',
      '<?xml version="1.0" encoding="utf-8"?>',
      '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
      '  <soap:Body>',
      '    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">',
      '      <ubiNum>232</ubiNum>',
      '    </NumberToWords>',
      '  </soap:Body>',
      '</soap:Envelope>'
    ],
    result: "two hundred and thirty two",
    latencySim: 180,
    responsePayload: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <m:NumberToWordsResponse xmlns:m="http://www.dataaccess.com/webservicesserver/">
      <m:NumberToWordsResult>two hundred and thirty two</m:NumberToWordsResult>
    </m:NumberToWordsResponse>
  </soap:Body>
</soap:Envelope>`,
    prosDetail: [
      "Tính toàn vẹn giao dịch và bảo mật tầng ứng dụng mạnh mẽ với WS-Security",
      "Xác thực kiểu dữ liệu nghiêm ngặt ngay tại biên qua XML Schema",
      "Độc lập với giao thức truyền tải (có thể chạy qua HTTP, SMTP, JMS, TCP)"
    ],
    consDetail: [
      "Gói tin XML nặng hơn JSON từ 300% - 600%",
      "Trình duyệt không hỗ trợ native streaming hoặc client stubs trực tiếp",
      "Khó khăn lớn khi xây dựng ứng dụng Mobile do chi phí giải mã XML cao"
    ]
  },
  rest: {
    id: "rest",
    name: "REST",
    badge: "Web Architectural Style",
    color: "#10B981",
    darkColor: "rgba(16, 185, 129, 0.15)",
    nature: "Architectural Style dựa trên 6 ràng buộc cốt lõi của Web",
    contract: "Tùy chọn; chuẩn công nghiệp thông qua OpenAPI / Swagger",
    format: "Không ép buộc; JSON là tiêu chuẩn thực tế (de facto standard)",
    strengths: [
      "Web-native: tương thích 100% mọi trình duyệt và thiết bị di động",
      "Tận dụng tối đa HTTP Caching (Cache-Control, ETag, 304 Not Modified)",
      "Stateless, dễ dàng mở rộng theo chiều ngang (horizontal scale) qua CDN/Gateway"
    ],
    limits: [
      "Nguy cơ over-fetching (lấy thừa) hoặc under-fetching (lấy thiếu)",
      "Không ép buộc contract tại tầng giao thức (cần duy trì spec OpenAPI tách biệt)",
      "Real-time hai chiều (full-duplex) không phải thiết kế nguyên bản (cần SSE/WebSocket)"
    ],
    bestFor: "Public Web API, Mobile App (iOS/Android), CRUD Microservices, Student Management System",
    api: "JSONPlaceholder Public API",
    endpoint: "GET https://jsonplaceholder.typicode.com/posts/1",
    method: "GET",
    code: [
      'GET /posts/1 HTTP/1.1',
      'Host: jsonplaceholder.typicode.com',
      'Accept: application/json',
      'Cache-Control: max-age=3600',
      '',
      'HTTP/1.1 200 OK',
      'Content-Type: application/json; charset=utf-8',
      'ETag: W/"10b-1854911d"'
    ],
    result: "HTTP 200 + JSON resource",
    latencySim: 45,
    responsePayload: {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio",
      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae"
    },
    prosDetail: [
      "Đơn giản nhất cho cả đội ngũ Frontend, Mobile và Backend",
      "Hỗ trợ bộ đệm HTTP Caching cấp độ CDN giúp giảm tới 80% tải lên cơ sở dữ liệu",
      "Hệ sinh thái tooling, testing (Postman, Swagger, cURL), monitoring rộng lớn nhất thế giới"
    ],
    consDetail: [
      "Khi màn hình đòi hỏi dữ liệu từ 4-5 bảng khác nhau có thể cần gửi nhiều request liên tiếp",
      "Việc đồng bộ phiên bản (API versioning: /v1, /v2) cần quản trị có kỷ luật"
    ]
  },
  graphql: {
    id: "graphql",
    name: "GraphQL",
    badge: "Query Language & Runtime",
    color: "#EC4899",
    darkColor: "rgba(236, 72, 153, 0.15)",
    nature: "Ngôn ngữ truy vấn dữ liệu & mô hình thực thi (Execution Runtime)",
    contract: "Typed Schema (SDL - Schema Definition Language) là trung tâm",
    format: "Request dạng GraphQL Query document; Response thường là JSON",
    strengths: [
      "Client quyết định chính xác các trường cần lấy (chấm dứt over-fetching)",
      "Gộp dữ liệu từ nhiều nguồn vào 1 round-trip duy nhất",
      "Hệ thống kiểu mạnh (Strong Type System) & khả năng tự sinh code (Introspection)"
    ],
    limits: [
      "Bài toán N+1 query tại các resolver đòi hỏi DataLoader hoặc tối ưu ORM",
      "Không tận dụng được HTTP Caching tự nhiên (vì hầu hết request đều là POST tới /graphql)",
      "Độ phức tạp bảo mật: client có thể gửi query lồng nhau vô hạn gây DDoS server"
    ],
    bestFor: "Giao diện Frontend phức tạp, dashboard đa nguồn dữ liệu, ứng dụng di động mạng yếu",
    api: "Trevor Blades Countries GraphQL API",
    endpoint: "POST https://countries.trevorblades.com/",
    method: "POST",
    code: [
      'POST / HTTP/1.1',
      'Host: countries.trevorblades.com',
      'Content-Type: application/json',
      '',
      'query GetVietnam {',
      '  country(code: "VN") {',
      '    name',
      '    capital',
      '    currency',
      '    phone',
      '  }',
      '}'
    ],
    result: "Vietnam · Hanoi · VND (+84)",
    latencySim: 85,
    responsePayload: {
      data: {
        country: {
          name: "Vietnam",
          capital: "Hanoi",
          currency: "VND",
          phone: "84"
        }
      }
    },
    prosDetail: [
      "Cho phép client UI tiến hóa giao diện độc lập mà không cần backend sửa endpoint",
      "Hệ thống type an toàn từ server tới React hook với GraphQL Code Generator",
      "Subscription hỗ trợ cập nhật dữ liệu thời gian thực qua WebSocket"
    ],
    consDetail: [
      "Phức tạp trong việc phân quyền chi tiết (Field-level Authorization)",
      "Chi phí CPU trên server để parse và validate AST query trước khi thực thi",
      "Caching client phức tạp với Apollo Client / Relay normalized cache"
    ]
  },
  odata: {
    id: "odata",
    name: "OData",
    badge: "Standardized Data Protocol",
    color: "#06B6D4",
    darkColor: "rgba(6, 182, 212, 0.15)",
    nature: "Giao thức truy cập & truy vấn dữ liệu chuẩn hóa trên nền REST (OASIS)",
    contract: "Entity Data Model (EDM) xuất qua endpoint /$metadata (CSDL XML)",
    format: "JSON (OData JSON format v4.01) hoặc Atom/XML",
    strengths: [
      "Bộ cú pháp truy vấn hệ thống cực mạnh: $filter, $select, $expand, $orderby, $top, $skip",
      "Khả năng tự khám phá siêu dữ liệu (Metadata self-discovery)",
      "Tích hợp xuất sắc với các công cụ BI (PowerBI, Excel, SAP, ASP.NET OData)"
    ],
    limits: [
      "Client có thể vô tình sinh câu truy vấn $expand đắt đỏ gây cạn kiệt tài nguyên DB",
      "Cần thiết lập chính sách bảo vệ nghiêm ngặt (EnableQuery max limit, allowed functions)",
      "Không tự nhiên cho các nghiệp vụ domain nặng hành vi (action-heavy logic)"
    ],
    bestFor: "Dịch vụ dữ liệu doanh nghiệp, trang quản trị Admin, báo cáo BI, ERP/CRM",
    api: "OASIS Northwind OData V4 Service",
    endpoint: "GET https://services.odata.org/V4/Northwind/Northwind.svc/Products",
    method: "GET",
    code: [
      'GET /V4/Northwind/Northwind.svc/Products?$top=3&$select=ProductID,ProductName,UnitPrice&$orderby=UnitPrice desc HTTP/1.1',
      'Host: services.odata.org',
      'Accept: application/json;odata.metadata=minimal',
      '',
      'HTTP/1.1 200 OK',
      'Content-Type: application/json;odata.metadata=minimal;charset=utf-8'
    ],
    result: "3 products · đúng 3 fields được chỉ định",
    latencySim: 110,
    responsePayload: {
      "@odata.context": "https://services.odata.org/V4/Northwind/Northwind.svc/$metadata#Products(ProductID,ProductName,UnitPrice)",
      value: [
        { ProductID: 38, ProductName: "Côte de Blaye", UnitPrice: 263.5 },
        { ProductID: 29, ProductName: "Thüringer Rostbratwurst", UnitPrice: 123.79 },
        { ProductID: 9, ProductName: "Mishi Kobe Niku", UnitPrice: 97.0 }
      ]
    },
    prosDetail: [
      "Tiết kiệm hàng trăm giờ code backend cho các tính năng phân trang, sắp xếp và lọc dữ liệu",
      "Chuẩn hóa hoàn toàn query string giúp frontend không cần tự chế quy ước URL",
      "Vẫn thừa hưởng các đặc tính tốt của REST như HTTP status codes và caching"
    ],
    consDetail: [
      "Dễ để lộ mô hình bảng dữ liệu nội bộ nếu không ánh xạ qua DTO cẩn thận",
      "Thư viện hỗ trợ trên các nền tảng ngoài .NET/SAP không đồng đều"
    ]
  },
  grpc: {
    id: "grpc",
    name: "gRPC",
    badge: "High Performance RPC",
    color: "#8B5CF6",
    darkColor: "rgba(139, 92, 246, 0.15)",
    nature: "Khung giao tiếp gọi thủ tục từ xa hiệu năng cao (High Performance RPC Framework)",
    contract: "File .proto (Protocol Buffers v3) sinh tự động stubs đa ngôn ngữ",
    format: "Binary Protocol Buffers (mặc định) tối ưu dung lượng",
    strengths: [
      "Nhị phân siêu nén, tốc độ tuần tự hóa (serialization) nhanh gấp 5-10 lần JSON",
      "Vận hành native trên HTTP/2: multiplexing, header compression (HPACK)",
      "Hỗ trợ 4 mô hình truyền tải: Unary, Server Streaming, Client Streaming, Bidirectional Streaming"
    ],
    limits: [
      "Trình duyệt không thể gọi native HTTP/2 gRPC trực tiếp (phải dùng gRPC-Web proxy)",
      "Payload dạng nhị phân không thể đọc hoặc debug bằng mắt thường nếu không có tooling",
      "Quy trình contract-first đòi hỏi biên dịch code stubs mỗi khi schema thay đổi"
    ],
    bestFor: "Giao tiếp nội bộ giữa các microservice (Service-to-Service), luồng dữ liệu lớn, IoT, FinTech",
    api: "grpcb.in Public Testing Service",
    endpoint: "grpcb.in:9001 (TLS Enabled)",
    method: "RPC",
    code: [
      'syntax = "proto3";',
      'package hello;',
      '',
      'service HelloService {',
      '  rpc SayHello (HelloRequest) returns (HelloReply);',
      '  rpc BidiHello (stream HelloRequest) returns (stream HelloReply);',
      '}',
      '',
      'message HelloRequest { string greeting = 1; }',
      'message HelloReply   { string reply = 1; }'
    ],
    result: "Kết nối thành công qua grpcurl / generated stubs",
    latencySim: 18,
    responsePayload: {
      reply: "Hello from grpcb.in! Binary payload delivered with HTTP/2 Multiplexing in 18ms."
    },
    prosDetail: [
      "Tiết kiệm tối đa băng thông mạng và năng lượng pin cho thiết bị nhúng / IoT",
      "Cơ chế Deadlines/Timeouts và Cancellation lan truyền xuyên suốt chuỗi microservices",
      "Sinh code client/server tự động cho hơn 10 ngôn ngữ (Go, Java, C#, Rust, Python, Node)"
    ],
    consDetail: [
      "Cần thêm một lớp Envoy Proxy để chuyển đổi gRPC-Web cho ứng dụng trình duyệt",
      "Khó kiểm thử thủ công nhanh qua trình duyệt thông thường so với REST"
    ]
  }
};

export interface ComparisonCriterion {
  id: string;
  category: "Architecture" | "Data & Network" | "Ecosystem & Dev";
  name: string;
  description: string;
  soap: string;
  rest: string;
  graphql: string;
  odata: string;
  grpc: string;
  winner: string;
  keyTakeaway: string;
}

export const COMPARISON_CRITERIA: ComparisonCriterion[] = [
  {
    id: "nature",
    category: "Architecture",
    name: "1. Bản chất kiến trúc",
    description: "Cơ sở lý thuyết và tầng trừu tượng mà công nghệ được xây dựng.",
    soap: "Messaging Protocol độc lập transport (chạy qua HTTP, SMTP, TCP)",
    rest: "Architectural Style dựa trên 6 ràng buộc (Stateless, Cacheable, Uniform Interface,...)",
    graphql: "Query Language cho API kết hợp Execution Runtime trên server",
    odata: "Data Access Protocol chuẩn hóa trên nền REST (chuẩn mở OASIS)",
    grpc: "RPC Framework tập trung vào gọi hàm từ xa trực tiếp qua service definition",
    winner: "REST & GraphQL",
    keyTakeaway: "SOAP & gRPC là protocol/framework; REST là phong cách kiến trúc; GraphQL là ngôn ngữ truy vấn; OData là giao thức dữ liệu."
  },
  {
    id: "transport",
    category: "Architecture",
    name: "2. Giao thức truyền tải (Transport)",
    description: "Giao thức mạng nền tảng để vận chuyển thông điệp.",
    soap: "Độc lập: HTTP/1.1, HTTPS, SMTP, JMS, TCP",
    rest: "Gần như gắn liền với HTTP/1.1, HTTP/2, HTTP/3",
    graphql: "Thường dùng HTTP POST; WebSocket cho Subscription",
    odata: "Chuẩn hóa trên HTTP/1.1, HTTP/2",
    grpc: "Bắt buộc native HTTP/2 (tận dụng Multiplexing & Streaming)",
    winner: "REST & gRPC",
    keyTakeaway: "gRPC khai thác tối đa HTTP/2; REST tương thích hoàn hảo toàn bộ hạ tầng web hiện có."
  },
  {
    id: "payload_format",
    category: "Data & Network",
    name: "3. Định dạng dữ liệu Payload",
    description: "Cách dữ liệu được đóng gói và mã hóa khi gửi qua mạng.",
    soap: "Bắt buộc XML Envelope (<Envelope><Body/></Envelope>)",
    rest: "Linh hoạt; JSON là tiêu chuẩn thực tế (de facto); XML, HTML tùy chọn",
    graphql: "Request dạng GraphQL Query string; Response hầu hết là JSON",
    odata: "JSON (với OData annotations) hoặc XML Atom",
    grpc: "Binary Protocol Buffers (.proto) được biên dịch nhị phân nén chặt",
    winner: "gRPC & REST",
    keyTakeaway: "gRPC nhỏ gọn và nhanh nhất; JSON của REST dễ đọc và debug nhất bằng mắt thường."
  },
  {
    id: "interaction_model",
    category: "Architecture",
    name: "4. Mô hình tương tác",
    description: "Cách client và server trao đổi yêu cầu.",
    soap: "Message-oriented / RPC style đóng gói trong XML body",
    rest: "Resource-oriented: Thao tác trên URI bằng các động từ HTTP (GET, POST, PUT, DELETE)",
    graphql: "Graph-oriented: Truy vấn theo cây thuộc tính (Query, Mutation, Subscription)",
    odata: "Resource & Entity-oriented: Thao tác thực thể qua hệ thống truy vấn $filter, $select",
    grpc: "Method-oriented (RPC): Gọi hàm từ xa với 4 kiểu (Unary, Client/Server/Bidi Stream)",
    winner: "REST",
    keyTakeaway: "REST mô hình hóa tài nguyên rõ ràng nhất cho các ứng dụng quản lý thực thể (như sinh viên, môn học)."
  },
  {
    id: "contract_schema",
    category: "Ecosystem & Dev",
    name: "5. Định nghĩa Schema & Hợp đồng",
    description: "Mức độ chặt chẽ trong việc quy định cấu trúc dữ liệu giữa 2 bên.",
    soap: "Bắt buộc WSDL + XML Schema chặt chẽ",
    rest: "Không bắt buộc tại tầng lõi; cộng đồng sử dụng OpenAPI / Swagger",
    graphql: "Bắt buộc Schema Definition Language (SDL) định kiểu tĩnh nghiêm ngặt",
    odata: "Bắt buộc Entity Data Model (EDM) xuất qua endpoint /$metadata",
    grpc: "Bắt buộc file Protocol Buffers (.proto) và sinh mã tự động",
    winner: "gRPC & GraphQL",
    keyTakeaway: "gRPC và GraphQL tích hợp sẵn type-safety trong khi REST phụ thuộc vào việc viết OpenAPI tách rời."
  },
  {
    id: "query_flexibility",
    category: "Data & Network",
    name: "6. Khả năng truy vấn Client",
    description: "Mức độ tự do của client trong việc quyết định dữ liệu nhận về.",
    soap: "Cố định theo định nghĩa phương thức trong WSDL",
    rest: "Cố định theo endpoint; có thể bổ sung query parameters tùy biến",
    graphql: "Cực kỳ linh hoạt: Client chọn chính xác từng trường cần lấy trong 1 request",
    odata: "Rất mạnh với cú pháp chuẩn: $filter, $select, $expand, $orderby, $top",
    grpc: "Cố định theo định nghĩa protobuf message (trừ khi dùng field mask)",
    winner: "GraphQL & OData",
    keyTakeaway: "GraphQL và OData cho phép client chủ động chọn dữ liệu, giải quyết triệt để vấn đề màn hình đa dạng."
  },
  {
    id: "fetching_issues",
    category: "Data & Network",
    name: "7. Vấn đề Over/Under-fetching",
    description: "Nguy cơ lấy thừa dữ liệu không dùng hoặc phải gửi nhiều request để gom đủ dữ liệu.",
    soap: "Dễ bị over-fetching do payload XML cố định trả về toàn bộ đối tượng",
    rest: "Phổ biến: Endpoint thường trả về toàn bộ resource (over) hoặc cần gọi 3-4 endpoint (under)",
    graphql: "Giải quyết triệt để: Không over-fetch, không under-fetch",
    odata: "Khắc phục tốt nhờ toán tử $select và $expand",
    grpc: "Cố định theo message; cần nhiều RPC nếu gom dữ liệu phân tán",
    winner: "GraphQL",
    keyTakeaway: "GraphQL là giải pháp số 1 chống lãng phí băng thông do thừa/thiếu dữ liệu trên giao diện."
  },
  {
    id: "caching",
    category: "Data & Network",
    name: "8. Khả năng HTTP Caching",
    description: "Tận dụng bộ đệm của trình duyệt, proxy và CDN.",
    soap: "Kém: Thường dùng POST nên proxy và CDN không thể cache tự động",
    rest: "Xuất sắc: Tận dụng hoàn hảo Cache-Control, ETag, Last-Modified, 304 Not Modified",
    graphql: "Khó khăn: Hầu hết là POST tới 1 endpoint; cần cache phức tạp phía client (Apollo/Relay)",
    odata: "Tốt với các truy vấn GET nếu có chính sách cache theo URL",
    grpc: "Hạn chế: Không tận dụng HTTP Caching thông thường của hạ tầng Web/CDN",
    winner: "REST",
    keyTakeaway: "REST vượt trội hoàn toàn về khả năng giảm tải máy chủ thông qua hạ tầng CDN toàn cầu."
  },
  {
    id: "network_efficiency",
    category: "Data & Network",
    name: "9. Hiệu năng & Băng thông",
    description: "Dung lượng gói tin và thời gian CPU tuần tự hóa/giải mã dữ liệu.",
    soap: "Thấp nhất: XML cồng kềnh, chi phí parse DOM/SAX cao",
    rest: "Tốt: JSON gọn gàng, parser có sẵn ở mức C++ trong mọi browser engine",
    graphql: "Khá: JSON gọn nhưng server tốn chi phí parse AST query và chạy resolver",
    odata: "Khá: Tùy thuộc độ phức tạp của câu query sinh ra câu SQL",
    grpc: "Tối ưu nhất: Nhị phân Protobuf siêu nhỏ, parse cực nhanh, multiplexing HTTP/2",
    winner: "gRPC",
    keyTakeaway: "gRPC nhanh gấp nhiều lần về throughput và độ trễ, tối ưu tuyệt đối cho microservices."
  },
  {
    id: "streaming_realtime",
    category: "Architecture",
    name: "10. Streaming & Thời gian thực",
    description: "Khả năng truyền phát luồng dữ liệu liên tục 2 chiều.",
    soap: "Không hỗ trợ native streaming 2 chiều (chỉ có MTOM đính kèm file)",
    rest: "Không phải thiết kế gốc; có thể dùng Server-Sent Events (SSE) hoặc WebSocket",
    graphql: "Hỗ trợ Subscriptions (thường chạy qua WebSocket)",
    odata: "Không tập trung vào streaming thời gian thực",
    grpc: "Xuất sắc: Hỗ trợ 4 kiểu streaming hạng nhất ngay trên kết nối HTTP/2",
    winner: "gRPC",
    keyTakeaway: "gRPC là chuẩn mực vàng cho các kênh streaming hai chiều liên tục."
  },
  {
    id: "browser_ecosystem",
    category: "Ecosystem & Dev",
    name: "11. Trình duyệt & Thiết bị di động",
    description: "Mức độ hỗ trợ tự nhiên trên Web Browser và ứng dụng Mobile (iOS/Android).",
    soap: "Rất kém: Cần thư viện ngoài nặng nề để tạo envelope XML",
    rest: "Hoàn hảo: Mọi ngôn ngữ, trình duyệt (fetch API) và mobile OS đều hỗ trợ native",
    graphql: "Rất tốt: Dùng client fetch đơn giản hoặc các SDK như Apollo, urql",
    odata: "Tốt trên Web/Admin, hơi cồng kềnh trên Mobile",
    grpc: "Cần gRPC-Web và proxy trung gian (Envoy) để chạy được trên Web Browser",
    winner: "REST",
    keyTakeaway: "REST là công dân hạng nhất của Web Browser và Mobile Apps mà không cần bất kỳ proxy nào."
  },
  {
    id: "operational_complexity",
    category: "Ecosystem & Dev",
    name: "12. Độ phức tạp vận hành & Học tập",
    description: "Chi phí đào tạo nhân sự, kiểm thử thủ công và debug lỗi.",
    soap: "Cao: Tooling cổ điển, khó học, debug XML lỗi mất nhiều thời gian",
    rest: "Thấp nhất: Cực kỳ trực quan, test nhanh bằng cURL, Postman hoặc URL trình duyệt",
    graphql: "Trung bình - Cao: Phải học schema, quản lý N+1, chi phí query và phân quyền",
    odata: "Trung bình: Cần học cú pháp toán tử và cấu hình bảo vệ server",
    grpc: "Trung bình: Cần quản lý file .proto, cài đặt công cụ biên dịch protoc và tooling riêng",
    winner: "REST",
    keyTakeaway: "REST dễ tuyển dụng lập trình viên nhất và dễ dàng gỡ lỗi nhất trong thực tế phát triển."
  },
  {
    id: "crud_conventions",
    category: "Architecture",
    name: "13. Chuẩn hóa CRUD & Nghiệp vụ",
    description: "Quy ước chuẩn mực cho các thao tác Thêm, Đọc, Sửa, Xóa.",
    soap: "Tự định nghĩa các hàm như CreateStudent, GetStudent qua XML",
    rest: "Rõ ràng: Ánh xạ chuẩn GET (Đọc), POST (Tạo), PUT/PATCH (Sửa), DELETE (Xóa)",
    graphql: "Gom tất cả vào 2 khái niệm Query (Đọc) và Mutation (Ghi)",
    odata: "Chuẩn hóa hoàn toàn với REST CRUD + truy vấn sâu",
    grpc: "Định nghĩa các hàm RPC riêng biệt trong Service block",
    winner: "REST & OData",
    keyTakeaway: "Hệ thống Quản lý Sinh viên với các thực thể chuẩn mực là kịch bản hoàn hảo nhất cho REST CRUD."
  },
  {
    id: "best_use_case",
    category: "Ecosystem & Dev",
    name: "14. Tình huống khuyên dùng",
    description: "Môi trường triển khai mang lại hiệu quả cao nhất.",
    soap: "Ngân hàng, tài chính, cơ quan chính phủ, tích hợp hệ thống legacy",
    rest: "Public API, Mobile Apps, Hệ thống CRUD quản trị, Microservices giao tiếp ngoài",
    graphql: "Frontend-driven UI, Mạng xã hội, ứng dụng có giao diện biến đổi liên tục",
    odata: "Hệ thống báo cáo BI, phần mềm doanh nghiệp SAP/.NET, màn hình lọc dữ liệu phức tạp",
    grpc: "Giao tiếp nội bộ giữa các Microservices (East-West traffic), hệ thống độ trễ cực thấp",
    winner: "REST (cho SMS)",
    keyTakeaway: "Không có công nghệ nào chiến thắng tuyệt đối, chỉ có công nghệ phù hợp nhất với bài toán."
  }
];

export interface WeightedCriteria {
  id: string;
  name: string;
  weight: number; // 0.0 to 1.0
  scores: {
    soap: number;
    rest: number;
    graphql: number;
    odata: number;
    grpc: number;
  };
  explanation: string;
}

export const WEIGHTED_DECISION_MATRIX: WeightedCriteria[] = [
  {
    id: "browser_mobile",
    name: "Tương thích Web Browser & Mobile Apps",
    weight: 0.20,
    scores: { soap: 1.5, rest: 5.0, graphql: 4.5, odata: 4.0, grpc: 2.0 },
    explanation: "REST được hỗ trợ 100% tự nhiên trên mọi thiết bị và hệ điều hành di động mà không cần proxy chuyển đổi."
  },
  {
    id: "crud_fit",
    name: "Chuẩn hóa nghiệp vụ CRUD (Sinh viên, Môn học, Điểm)",
    weight: 0.20,
    scores: { soap: 2.0, rest: 5.0, graphql: 3.5, odata: 4.5, grpc: 3.0 },
    explanation: "Hệ thống SMS chủ yếu xoay quanh các tài nguyên danh mục. Các động từ HTTP của REST khớp hoàn hảo 1:1."
  },
  {
    id: "network_efficiency",
    name: "Hiệu quả mạng & Băng thông",
    weight: 0.15,
    scores: { soap: 2.0, rest: 4.0, graphql: 4.5, odata: 3.5, grpc: 5.0 },
    explanation: "gRPC nhị phân tối ưu nhất, tuy nhiên JSON của REST kết hợp Gzip/Brotli nén đã hoàn toàn đáp ứng tốt cho SMS."
  },
  {
    id: "caching",
    name: "Tận dụng HTTP Caching & Mạng CDN",
    weight: 0.10,
    scores: { soap: 1.5, rest: 5.0, graphql: 2.5, odata: 4.0, grpc: 1.0 },
    explanation: "Danh mục môn học, học kỳ ít thay đổi. REST cache qua ETag/Cache-Control giúp giảm 80% tải truy vấn cơ sở dữ liệu."
  },
  {
    id: "flexible_query",
    name: "Khả năng truy vấn linh hoạt",
    weight: 0.10,
    scores: { soap: 1.5, rest: 3.0, graphql: 5.0, odata: 4.5, grpc: 2.0 },
    explanation: "GraphQL và OData dẫn đầu ở tiêu chí này, nhưng SMS có cấu trúc màn hình ổn định nên nhu cầu này không ở mức tối hậu."
  },
  {
    id: "contract_codegen",
    name: "Định nghĩa Contract & Sinh mã tự động",
    weight: 0.10,
    scores: { soap: 4.5, rest: 3.5, graphql: 4.5, odata: 4.0, grpc: 5.0 },
    explanation: "OpenAPI v3 kết hợp với TypeScript/Flutter generator cung cấp hợp đồng đầy đủ cho REST."
  },
  {
    id: "simplicity",
    name: "Độ đơn giản triển khai & Vận hành",
    weight: 0.10,
    scores: { soap: 2.0, rest: 5.0, graphql: 3.0, odata: 3.5, grpc: 3.0 },
    explanation: "Dễ kiểm thử với Postman/Swagger, dễ tuyển dụng kỹ sư, chi phí bảo trì thấp nhất."
  },
  {
    id: "streaming",
    name: "Hỗ trợ Streaming & Thời gian thực",
    weight: 0.05,
    scores: { soap: 1.0, rest: 2.5, graphql: 4.0, odata: 2.0, grpc: 5.0 },
    explanation: "Hệ thống SMS ít yêu cầu streaming liên tục (chỉ cần polling định kỳ hoặc thông báo qua SSE)."
  }
];

export interface VideoChapter {
  id: string;
  number: number;
  title: string;
  durationSec: number;
  timestampStr: string;
  thumbnail: string;
  audioFile: string;
  keyPoints: string[];
}

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: "intro",
    number: 1,
    title: "1. Giới thiệu tổng quan & Đặt vấn đề",
    durationSec: 26,
    timestampStr: "00:00",
    thumbnail: "/thumbnails/lecture-01-intro.png",
    audioFile: "/voiceover/intro.wav",
    keyPoints: [
      "5 cách tiếp cận API thường xuất hiện trong các bài toán thiết kế hệ thống",
      "Sự khác biệt về bản chất và tầng trừu tượng giữa protocol và style",
      "Mục tiêu bài giảng: Từ lý thuyết đến quyết định thực chiến cho Student Management System"
    ]
  },
  {
    id: "nature",
    number: 2,
    title: "2. Bản chất kiến trúc & Tầng trừu tượng",
    durationSec: 40,
    timestampStr: "00:26",
    thumbnail: "/thumbnails/lecture-02-nature.png",
    audioFile: "/voiceover/nature.wav",
    keyPoints: [
      "SOAP là Messaging Protocol, REST là Architectural Style",
      "GraphQL là Query Language + Runtime, OData là Data Protocol trên REST, gRPC là RPC Framework",
      "4 yêu cầu bắt buộc: SOAP, REST, GraphQL, gRPC; OData là phần đối chiếu mở rộng"
    ]
  },
  {
    id: "soap",
    number: 3,
    title: "3. Kiến trúc SOAP - Enterprise Messaging",
    durationSec: 61,
    timestampStr: "01:06",
    thumbnail: "/thumbnails/lecture-03-soap.png",
    audioFile: "/voiceover/soap.wav",
    keyPoints: [
      "Cấu trúc XML Envelope chuẩn hóa với Header và Body",
      "Tính độc lập giao thức truyền tải và hệ sinh thái WS-Security",
      "Thực chứng với DataAccess Number Conversion Service (chuyển 232 thành chữ)"
    ]
  },
  {
    id: "rest",
    number: 4,
    title: "4. Kiến trúc REST - Web-Native Resource",
    durationSec: 64,
    timestampStr: "02:07",
    thumbnail: "/thumbnails/lecture-04-rest.png",
    audioFile: "/voiceover/rest.wav",
    keyPoints: [
      "6 ràng buộc nền tảng của Web: Stateless, Cacheable, Uniform Interface,...",
      "Sử dụng URI định danh tài nguyên và các động từ HTTP chuẩn",
      "Thực chứng với JSONPlaceholder posts/1 trả về JSON và HTTP 200 OK"
    ]
  },
  {
    id: "graphql",
    number: 5,
    title: "5. Kiến trúc GraphQL - Client-Driven Graph",
    durationSec: 61,
    timestampStr: "03:11",
    thumbnail: "/thumbnails/lecture-05-graphql.png",
    audioFile: "/voiceover/graphql.wav",
    keyPoints: [
      "Tổ chức quanh Typed Schema và Selection Set của Client",
      "Loại bỏ hoàn toàn vấn đề over-fetching và under-fetching",
      "Thực chứng với Countries API lấy thông tin Việt Nam (Hanoi, VND)"
    ]
  },
  {
    id: "odata",
    number: 6,
    title: "6. Kiến trúc OData - Standardized Data Service",
    durationSec: 56,
    timestampStr: "04:12",
    thumbnail: "/thumbnails/lecture-06-odata.png",
    audioFile: "/voiceover/odata.wav",
    keyPoints: [
      "Entity Data Model (EDM) và khám phá tự động qua /$metadata",
      "Cú pháp truy vấn chuẩn hóa: $filter, $select, $top, $expand, $orderby",
      "Thực chứng với Northwind OData V4 lọc 3 sản phẩm đắt giá nhất"
    ]
  },
  {
    id: "grpc",
    number: 7,
    title: "7. Kiến trúc gRPC - High Performance RPC",
    durationSec: 68,
    timestampStr: "05:08",
    thumbnail: "/thumbnails/lecture-07-grpc.png",
    audioFile: "/voiceover/grpc.wav",
    keyPoints: [
      "Định nghĩa service và message qua Protocol Buffers (.proto)",
      "Vận hành native trên HTTP/2 với 4 mô hình Streaming linh hoạt",
      "Thực chứng kết nối an toàn với dịch vụ công cộng grpcb.in TLS"
    ]
  },
  {
    id: "matrix",
    number: 8,
    title: "8. Ma trận so sánh 14 tiêu chí toàn diện",
    durationSec: 60,
    timestampStr: "06:16",
    thumbnail: "/thumbnails/lecture-08-matrix.png",
    audioFile: "/voiceover/matrix.wav",
    keyPoints: [
      "Phân tích 14 tiêu chí kỹ thuật song song giữa 5 công nghệ",
      "Đánh giá điểm mạnh, giới hạn và sự đánh đổi kiến trúc",
      "Nguyên tắc: Không có công nghệ tốt nhất, chỉ có công nghệ phù hợp nhất"
    ]
  },
  {
    id: "case",
    number: 9,
    title: "9. Bài toán thực tế: Student Management System",
    durationSec: 44,
    timestampStr: "07:16",
    thumbnail: "/thumbnails/lecture-09-case.png",
    audioFile: "/voiceover/case.wav",
    keyPoints: [
      "Bối cảnh: Ứng dụng di động sinh viên + Cổng thông tin giảng viên Web",
      "Các nghiệp vụ cốt lõi: Hồ sơ sinh viên, đăng ký tín chỉ, tra cứu bảng điểm",
      "Yêu cầu về tính ổn định, chi phí vận hành và tốc độ phát triển"
    ]
  },
  {
    id: "decision",
    number: 10,
    title: "10. Ma trận quyết định có trọng số & Lựa chọn REST",
    durationSec: 47,
    timestampStr: "08:00",
    thumbnail: "/thumbnails/lecture-10-decision.png",
    audioFile: "/voiceover/decision.wav",
    keyPoints: [
      "Thiết lập 8 tiêu chí chấm điểm tương ứng với bài toán SMS",
      "REST đạt điểm cao nhất 4.35/5.00 nhờ tính phổ quát và HTTP Caching",
      "Giải thích chi tiết lý do từ chối SOAP, gRPC, GraphQL và OData"
    ]
  },
  {
    id: "demo",
    number: 11,
    title: "11. Kiểm chứng thực tế qua 5 dịch vụ Public",
    durationSec: 69,
    timestampStr: "08:47",
    thumbnail: "/thumbnails/lecture-11-demo.png",
    audioFile: "/voiceover/demo.wav",
    keyPoints: [
      "Kiểm tra phản hồi thực tế từ các server công cộng trên Internet",
      "So sánh độ trễ, kích thước gói tin và định dạng phản hồi",
      "Minh họa tính trực quan của REST so với các công nghệ còn lại"
    ]
  },
  {
    id: "flow",
    number: 12,
    title: "12. Luồng kiến trúc hoàn chỉnh từ Client đến Backend",
    durationSec: 49,
    timestampStr: "09:56",
    thumbnail: "/thumbnails/lecture-12-flow.png",
    audioFile: "/voiceover/flow.wav",
    keyPoints: [
      "Hành trình của request qua các tầng: Client -> Gateway -> Service -> DB",
      "Cơ chế xác thực JWT, Rate Limiting và Redis Caching",
      "Sơ đồ luồng dữ liệu 2 chiều kèm các mã phản hồi HTTP chuẩn"
    ]
  },
  {
    id: "outro",
    number: 13,
    title: "13. Tổng kết & Khuyến nghị thiết kế hệ thống",
    durationSec: 32,
    timestampStr: "10:45",
    thumbnail: "/thumbnails/lecture-13-outro.png",
    audioFile: "/voiceover/outro.wav",
    keyPoints: [
      "Quy tắc chọn API: Hãy chọn công nghệ đơn giản nhất giải quyết được bài toán",
      "Kết hợp đa kiến trúc: REST cho Client, gRPC cho Microservices nội bộ",
      "Lời kết và lời chúc học tập thành công"
    ]
  }
];

export interface ReferenceSource {
  id: string;
  category: "Foundational Specifications" | "Official Documentation" | "Architecture Books & Standards";
  title: string;
  author: string;
  year: string;
  url: string;
  citation: string;
  takeaway: string;
}

export const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: "fielding2000",
    category: "Foundational Specifications",
    title: "Architectural Styles and the Design of Network-based Software Architectures (Chapter 5: REST)",
    author: "Roy Thomas Fielding",
    year: "2000",
    url: "https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm",
    citation: "Fielding, R. T. (2000). Architectural styles and the design of network-based software architectures (Doctoral dissertation, University of California, Irvine).",
    takeaway: "Tài liệu học thuật gốc định nghĩa 6 ràng buộc kiến trúc của REST, giải thích vì sao REST tận dụng tối đa kiến trúc của World Wide Web."
  },
  {
    id: "w3c_soap12",
    category: "Foundational Specifications",
    title: "SOAP Version 1.2 Part 1: Messaging Framework (Second Edition)",
    author: "W3C XML Protocol Working Group",
    year: "2007",
    url: "https://www.w3.org/TR/soap12-part1/",
    citation: "W3C. (2007). SOAP Version 1.2 Part 1: Messaging Framework (Second Edition). W3C Recommendation.",
    takeaway: "Đặc tả chuẩn mực của W3C về cấu trúc XML Envelope, mô hình xử lý thông điệp và cơ chế fault handling."
  },
  {
    id: "graphql_spec",
    category: "Foundational Specifications",
    title: "GraphQL Specification (October 2021 Edition)",
    author: "GraphQL Foundation",
    year: "2021",
    url: "https://spec.graphql.org/October2021/",
    citation: "GraphQL Foundation. (2021). GraphQL Specification (October 2021).",
    takeaway: "Đặc tả chính thức về hệ thống kiểu (Type System), ngôn ngữ truy vấn (Query Language) và giải thuật thực thi AST resolver."
  },
  {
    id: "oasis_odata",
    category: "Foundational Specifications",
    title: "OData Version 4.01. Part 1: Protocol",
    author: "OASIS Standard",
    year: "2020",
    url: "https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html",
    citation: "OASIS. (2020). OData Version 4.01 Part 1: Protocol. OASIS Standard.",
    takeaway: "Tiêu chuẩn quốc tế chuẩn hóa cú pháp truy vấn $filter, $select, $expand trên nền tảng tài nguyên REST."
  },
  {
    id: "grpc_spec",
    category: "Foundational Specifications",
    title: "gRPC over HTTP2 Protocol Specification",
    author: "The gRPC Authors",
    year: "2023",
    url: "https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md",
    citation: "gRPC Authors. (2023). gRPC over HTTP2 Protocol Specification.",
    takeaway: "Quy chuẩn kỹ thuật ánh xạ các luồng RPC, headers, trailers và protobuf messages lên các frames của giao thức HTTP/2."
  },
  {
    id: "rfc9110",
    category: "Official Documentation",
    title: "RFC 9110: HTTP Semantics",
    author: "R. Fielding, M. Nottingham, J. Reschke (IETF)",
    year: "2022",
    url: "https://www.rfc-editor.org/rfc/rfc9110.html",
    citation: "Fielding, R., Nottingham, M., & Reschke, J. (2022). HTTP Semantics (RFC 9110). Internet Engineering Task Force.",
    takeaway: "Quy chuẩn mới nhất về ý nghĩa các phương thức HTTP (GET, POST, PUT, DELETE, PATCH), idempotency và mã trạng thái HTTP."
  },
  {
    id: "mdn_caching",
    category: "Official Documentation",
    title: "HTTP Caching - Web Technology for Developers",
    author: "Mozilla Developer Network (MDN)",
    year: "2024",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching",
    citation: "Mozilla Developer Network. (2024). HTTP Caching Guide. MDN Web Docs.",
    takeaway: "Hướng dẫn thực hành chuyên sâu về Cache-Control, ETag, 304 Not Modified và vai trò của shared proxy caches/CDN."
  },
  {
    id: "apollo_best_practices",
    category: "Official Documentation",
    title: "GraphQL Best Practices & Performance Guide",
    author: "Apollo GraphQL",
    year: "2023",
    url: "https://www.apollographql.com/docs/technotes/TN0001-graphql-best-practices/",
    citation: "Apollo GraphQL. (2023). GraphQL Best Practices: Caching, Pagination, and Security.",
    takeaway: "Phân tích các bài toán thực tế của GraphQL: giải pháp cho N+1 query, persisted queries và giải thuật giới hạn chi phí query."
  },
  {
    id: "protobuf_style",
    category: "Official Documentation",
    title: "Protocol Buffers Language Guide (proto3)",
    author: "Google Developers",
    year: "2024",
    url: "https://protobuf.dev/programming-guides/proto3/",
    citation: "Google. (2024). Protocol Buffers Language Guide (proto3).",
    takeaway: "Tài liệu chính thức về cú pháp .proto, cách đánh số field tags, backward compatibility và nén dữ liệu nhị phân."
  },
  {
    id: "ms_rest_guidelines",
    category: "Official Documentation",
    title: "Microsoft REST API Guidelines",
    author: "Microsoft Cloud Architecture Team",
    year: "2023",
    url: "https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md",
    citation: "Microsoft. (2023). Microsoft REST API Guidelines vNext.",
    takeaway: "Bộ quy chuẩn thiết kế API chuẩn mực doanh nghiệp: quy tắc đặt tên endpoint số nhiều, phân trang, xử lý lỗi có cấu trúc."
  },
  {
    id: "fowler_microservices",
    category: "Architecture Books & Standards",
    title: "Microservices: A definition of this new architectural term",
    author: "Martin Fowler & James Lewis",
    year: "2014",
    url: "https://martinfowler.com/articles/microservices.html",
    citation: "Fowler, M., & Lewis, J. (2014). Microservices: A definition of this new architectural term.",
    takeaway: "Khái niệm nền tảng về hệ thống phân tán, 'Smart endpoints and dumb pipes', phân tích lý do REST và HTTP là cầu nối tối ưu."
  },
  {
    id: "newman_building_microservices",
    category: "Architecture Books & Standards",
    title: "Building Microservices: Designing Fine-Grained Systems (2nd Edition)",
    author: "Sam Newman",
    year: "2021",
    url: "https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/",
    citation: "Newman, S. (2021). Building Microservices: Designing Fine-Grained Systems (2nd ed.). O'Reilly Media.",
    takeaway: "So sánh toàn diện giữa REST, gRPC và GraphQL trong bối cảnh kiến trúc vi dịch vụ hiện đại."
  },
  {
    id: "richardson_maturity_model",
    category: "Architecture Books & Standards",
    title: "Richardson Maturity Model: Steps toward the glory of REST",
    author: "Leonard Richardson & Martin Fowler",
    year: "2010",
    url: "https://martinfowler.com/articles/richardsonMaturityModel.html",
    citation: "Richardson, L., & Fowler, M. (2010). Richardson Maturity Model.",
    takeaway: "Mô hình 4 cấp độ trưởng thành của REST (Level 0: The Swamp of POX -> Level 1: Resources -> Level 2: HTTP Verbs -> Level 3: HATEOAS)."
  },
  {
    id: "kleppmann_data_intensive",
    category: "Architecture Books & Standards",
    title: "Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
    author: "Martin Kleppmann",
    year: "2017",
    url: "https://dataintensive.net/",
    citation: "Kleppmann, M. (2017). Designing Data-Intensive Applications. O'Reilly Media.",
    takeaway: "Phân tích sâu về định dạng dữ liệu (JSON, XML, Thrift, Protobuf, Avro) và các mô hình truyền tải dữ liệu phân tán qua mạng."
  },
  {
    id: "evans_ddd",
    category: "Architecture Books & Standards",
    title: "Domain-Driven Design: Tackling Complexity in the Heart of Software",
    author: "Eric Evans",
    year: "2003",
    url: "https://www.domainlanguage.com/ddd/",
    citation: "Evans, E. (2003). Domain-Driven Design. Addison-Wesley Professional.",
    takeaway: "Nguyên lý mô hình hóa thực thể nghiệp vụ (Entities & Aggregates) - tiền đề để thiết kế RESTful resource URLs chuẩn mực cho SMS."
  },
  {
    id: "newman_monolith_to_microservices",
    category: "Architecture Books & Standards",
    title: "Monolith to Microservices: Evolutionary Patterns to Transform Your Monolith",
    author: "Sam Newman",
    year: "2019",
    url: "https://www.oreilly.com/library/view/monolith-to-microservices/9781492047834/",
    citation: "Newman, S. (2019). Monolith to Microservices. O'Reilly Media.",
    takeaway: "Các mẫu hình chuyển đổi hệ thống: API Gateway pattern, Strangler Fig pattern và vai trò của REST trong bảo vệ hệ thống cốt lõi."
  }
];

export const CRUD_VERB_MAP = [
  {
    verb: "GET",
    endpoint: "/students/SE160001",
    semantic: "Truy vấn an toàn (Safe) & Bất biến (Idempotent)",
    cacheable: "Có (HTTP 200 / 304)",
    successCode: "200 OK",
    description: "Lấy thông tin chi tiết của sinh viên có mã số SE160001."
  },
  {
    verb: "POST",
    endpoint: "/students",
    semantic: "Tạo mới tài nguyên (Không Safe, Không Idempotent)",
    cacheable: "Không (trừ khi có explicit header)",
    successCode: "201 Created",
    description: "Tạo mới một hồ sơ sinh viên vào hệ thống. Trả về header Location."
  },
  {
    verb: "PUT",
    endpoint: "/students/SE160001",
    semantic: "Thay thế toàn bộ tài nguyên (Idempotent)",
    cacheable: "Không",
    successCode: "200 OK / 204 No Content",
    description: "Cập nhật toàn bộ thông tin sinh viên SE160001 bằng payload mới."
  },
  {
    verb: "DELETE",
    endpoint: "/students/SE160001",
    semantic: "Xóa tài nguyên (Idempotent)",
    cacheable: "Không",
    successCode: "204 No Content",
    description: "Xóa hồ sơ sinh viên SE160001 khỏi hệ thống quản lý."
  }
];
