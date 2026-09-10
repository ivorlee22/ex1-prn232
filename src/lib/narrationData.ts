export interface NarrationChapter {
  id: string;
  title: string;
  captions: string[];
}

export const NARRATION_DATA: NarrationChapter[] = [
  {
    id: "intro",
    title: "1. Giới thiệu tổng quan",
    captions: [
      "SOAP, REST, GraphQL, OData và gRPC thường được đặt cạnh nhau trong một bảng so sánh.",
      "Nhưng chúng không cùng một loại khái niệm, và không có lựa chọn nào thắng tuyệt đối.",
      "Video này đi từ bản chất, ví dụ public chạy thật, đến quyết định cho Student Management System."
    ]
  },
  {
    id: "nature",
    title: "2. Bản chất kiến trúc",
    captions: [
      "Trước hết, SOAP là một messaging protocol; REST là một architectural style.",
      "GraphQL là query language cùng execution model; OData là data access protocol chuẩn hóa trên nền REST.",
      "gRPC là RPC framework. Vì khác tầng trừu tượng, ta so sánh chúng như năm cách tiếp cận API trong thiết kế thực tế.",
      "Trong đề gốc có bốn mục bắt buộc: SOAP, REST, GraphQL và gRPC. OData là phần mở rộng để đối chiếu."
    ]
  },
  {
    id: "soap",
    title: "3. Kiến trúc SOAP",
    captions: [
      "SOAP định nghĩa một envelope XML, mô hình xử lý message và cơ chế mở rộng bằng header.",
      "Nó độc lập transport; HTTP rất phổ biến nhưng không phải lựa chọn duy nhất.",
      "WSDL và XML Schema thường tạo contract chặt, dù WSDL không phải điều kiện bắt buộc để một message là SOAP.",
      "Ưu điểm là chuẩn enterprise trưởng thành, SOAP Fault có cấu trúc và có thể dùng WS-Security.",
      "Đánh đổi là XML dài, tooling nhiều lớp và không tự nhiên cho public API nhẹ.",
      "Ví dụ public đã kiểm tra là Number Conversion Service: gửi số 232 và nhận chuỗi two hundred and thirty two."
    ]
  },
  {
    id: "rest",
    title: "4. Kiến trúc REST",
    captions: [
      "REST không phải đồng nghĩa với JSON API. Đây là architectural style với các constraint như client-server, stateless, cacheable, layered system và uniform interface.",
      "Trong thực tế, REST thường dùng HTTPS, URI cho resource và các method như GET, POST, PATCH, DELETE.",
      "JSON phổ biến, nhưng REST không bắt buộc một data format cụ thể.",
      "Điểm mạnh là browser friendliness, HTTP status rõ, cache và hệ sinh thái công cụ rộng.",
      "Hạn chế là có thể over-fetch, under-fetch và bản thân REST không bắt buộc schema; OpenAPI thường được bổ sung.",
      "Endpoint JSONPlaceholder posts slash 1 mở trực tiếp trong trình duyệt và trả về JSON với status 200."
    ]
  },
  {
    id: "graphql",
    title: "5. Kiến trúc GraphQL",
    captions: [
      "GraphQL tổ chức API quanh typed schema, type và field, thay vị một tập endpoint cố định.",
      "Client gửi selection set để yêu cầu đúng dữ liệu cần dùng; response thường có hình dạng tương ứng và thường được mã hóa JSON.",
      "Query dùng để đọc, mutation để thay đổi dữ liệu, còn subscription biểu diễn yêu cầu cập nhật dài hạn; transport cho subscription phải được chọn riêng.",
      "GraphQL phù hợp với giao diện có nhiều màn hình và data shape khác nhau.",
      "Đổi lại, resolver, N cộng 1, phân quyền theo field và giới hạn độ sâu hay query cost cần được thiết kế cẩn thận.",
      "Countries API cho phép query Việt Nam và chỉ lấy name, capital cùng currency trong một request."
    ]
  },
  {
    id: "odata",
    title: "6. Kiến trúc OData",
    captions: [
      "OData chuẩn hóa cách truy cập và truy vấn dữ liệu qua API theo các quy ước REST.",
      "Entity Data Model và endpoint dollar metadata giúp client khám phá cấu trúc dữ liệu.",
      "Các system query option như dollar filter, dollar select, dollar orderby, dollar top và dollar expand có cú pháp nhất quán.",
      "OData hữu ích cho data service, màn hình quản trị và hệ thống cần query phong phú mà không tự phát minh query string.",
      "Rủi ro là client có thể tạo truy vấn đắt, nên server phải giới hạn option, độ sâu và số lượng bản ghi.",
      "Northwind OData V4 đã được thử với dollar top bằng 3 và dollar select cho ba trường sản phẩm."
    ]
  },
  {
    id: "grpc",
    title: "7. Kiến trúc gRPC",
    captions: [
      "gRPC mô hình hóa API thành service và remote method. Contract thường nằm trong file proto, từ đó sinh client và server stub.",
      "Mặc định gRPC dùng Protocol Buffers cho IDL và message nhị phân, còn native transport dựa trên HTTP 2.",
      "Nó hỗ trợ unary, server streaming, client streaming và bidirectional streaming như khả năng hạng nhất.",
      "Ưu điểm là payload gọn, type mạnh, deadline và cancellation phù hợp giao tiếp service to service.",
      "Native gRPC không phải một URL GET có thể gọi trực tiếp bằng browser; thường cần grpcurl, generated client, gRPC-Web hoặc một gateway.",
      "Service test grpcb.in được dùng để xác nhận TLS, reflection và contract RPC."
    ]
  },
  {
    id: "matrix",
    title: "8. Ma trận so sánh 14 tiêu chí",
    captions: [
      "Mười bốn tiêu chí so sánh gồm: bản chất, transport, format, mô hình tương tác, schema, độ linh hoạt query, over under-fetch, cache, hiệu năng, streaming, browser, độ phức tạp, CRUD, và use case.",
      "Không có công nghệ nào thắng ở mọi dòng. SOAP mạnh contract và enterprise; REST mạnh tính phổ quát và cache; GraphQL mạnh về query linh hoạt; OData mạnh về chuẩn hóa truy vấn; gRPC mạnh về hiệu năng và streaming.",
      "Bài toán kiến trúc không phải là tìm công nghệ tốt nhất nói chung, mà là tìm công nghệ khớp nhất với ràng buộc của hệ thống."
    ]
  },
  {
    id: "case",
    title: "9. Bài toán Student Management System",
    captions: [
      "Student Management System phục vụ sinh viên và giảng viên, gồm mobile app và web portal.",
      "Nghiệp vụ cốt lõi gồm xem hồ sơ, xem danh sách môn học, lịch học, đăng ký tín chỉ và cập nhật điểm số.",
      "Ràng buộc là client đa dạng, cần cache dữ liệu ít thay đổi, mạng di động có thể chập chờn, và nhóm phát triển cần kiểm thử nhanh bằng công cụ quen thuộc."
    ]
  },
  {
    id: "decision",
    title: "10. Ma trận quyết định & Chọn REST",
    captions: [
      "Dựa trên ma trận chấm điểm có trọng số, REST đạt điểm số cao nhất nhờ độ phù hợp với browser, mobile, mô hình CRUD tài nguyên và khả năng dùng HTTP cache.",
      "SOAP bị loại vì XML nặng và tooling cồng kềnh cho mobile. gRPC xuất sắc cho backend nhưng cần thêm lớp chuyển đổi ở browser.",
      "GraphQL tốt cho UI đa dạng nhưng thêm chi phí resolver và cache cho bài toán CRUD cơ bản. OData mạnh query nhưng thừa phức tạp cho ứng dụng di động này.",
      "REST được chọn là primary API style cho giao diện bên ngoài của Student Management System."
    ]
  },
  {
    id: "demo",
    title: "11. Minh họa 4 bước tương tác",
    captions: [
      "Quy trình được minh họa bằng bốn bước: Client, Request, API xử lý và Response.",
      "Với GET students slash SE160001, client gửi HTTP request có header Accept application json.",
      "API kiểm tra xác thực, đọc dữ liệu, trả về HTTP 200 OK cùng JSON payload và header ETag để hỗ trợ cache.",
      "Ví dụ POST students minh họa tạo mới tài nguyên với status 201 Created và header Location."
    ]
  },
  {
    id: "flow",
    title: "12. Luồng kiến trúc hoàn chỉnh",
    captions: [
      "Hệ thống gồm Mobile App và Web Portal ở tầng Presentation, đi qua Reverse Proxy hoặc API Gateway để xác thực JWT và giới hạn tần suất.",
      "Phía sau là REST API Service xử lý nghiệp vụ, dùng Redis làm cache cho thông tin môn học và PostgreSQL để lưu trữ bền vững.",
      "Kiến trúc này tận dụng tối đa thế mạnh của REST: stateless, phân lớp, cacheable và interface đồng nhất."
    ]
  },
  {
    id: "outro",
    title: "13. Tổng kết bài học",
    captions: [
      "Tóm lại: hiểu bản chất giúp ta không so sánh khập khiễng; bảng tiêu chí giúp thấy rõ đánh đổi; và ma trận trọng số giúp đưa ra quyết định có căn cứ.",
      "REST không phải là công nghệ mới nhất, nhưng là lựa chọn thực dụng và hiệu quả nhất cho Student Management System.",
      "Cảm ơn các bạn đã theo dõi bài giảng."
    ]
  }
];
