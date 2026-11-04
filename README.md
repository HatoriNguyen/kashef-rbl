# Kashef RBL — Web Security Lab

Nghiên cứu bài báo *Automated Extension-Based Penetration Testing for Web Vulnerabilities* (Alhogail & Alkahtani, 2024) và demo web minh họa SQL Injection, Reflected XSS, SSRF.

## Hồ sơ nộp RBL

| Hạng mục | File |
| --- | --- |
| PPT thuyết trình | [Kashef_RBL_Presentation.pptx](Kashef_RBL_Presentation.pptx) |
| Paper PDF | [Kashef_Related_Paper_Alhogail_2024.pdf](Kashef_Related_Paper_Alhogail_2024.pdf) |
| Audit log nhóm | [AI_Audit_Log_Kashef_RBL.xlsx](AI_Audit_Log_Kashef_RBL.xlsx) |
| Demo | [index.html](index.html) và thư mục assets |
| Hướng dẫn trình diễn | [HUONG_DAN_DEMO.md](HUONG_DAN_DEMO.md) |

Slide cuối PPT dẫn đến repository này theo lựa chọn của nhóm, thay cho clip video.

## Chạy demo

1. Chọn **Code → Download ZIP**, giải nén.
2. Mở `index.html` bằng Chrome hoặc Edge. Giữ nguyên thư mục `assets` cạnh file HTML.
3. Chọn SQLi, XSS hoặc SSRF, chạy dữ liệu mẫu, bật vá lỗi và thử lại.
4. Dùng nút **Làm lại demo** để xóa kết quả và quay về trạng thái ban đầu.

Cần Internet để tải Tailwind CSS và bộ biểu tượng từ CDN. JavaScript mô phỏng chạy trong trình duyệt; không cần cài server.

## Mã nguồn

- `index.html`: giao diện và điều khiển.
- `assets/styles.css`: giao diện nền trung tính.
- `assets/app.js`: điều hướng, scanner mô phỏng và báo cáo.
- `assets/lab.js`: ba kịch bản, trạng thái vá và đặt lại lab.
- `verify_demo.cjs`: kiểm tra logic bằng `node verify_demo.cjs`.

Demo dùng dữ liệu mẫu, không phải extension/backend Kashef gốc và không tái lập benchmark của tác giả. Xem [đối chiếu minh chứng](REVIEW_EVIDENCE.md).

## Nguồn bài báo

Areej Alhogail, Manal Alkahtani. Procedia Computer Science 238 (2024), 15–23. DOI: https://doi.org/10.1016/j.procs.2024.05.191

PDF giữ nguyên bản xuất bản và thông tin bản quyền/giấy phép CC BY-NC-ND của tác giả.
