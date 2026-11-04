# Hướng dẫn vận hành và giải thích code

## Mở demo
Mở index.html bằng Chrome/Edge. Giữ thư mục assets cạnh index.html. CSS Tailwind và biểu tượng dùng CDN nên cần Internet để tải giao diện đầy đủ.

## Trình diễn
1. Nhấn Làm lại demo.
2. SQLi: chọn Accessories để minh họa đầu vào bình thường, sau đó chọn Boolean Bypass hoặc UNION Dump. Chỉ ra nơi đầu vào được nối vào câu SQL minh họa.
3. Bật vá: câu SQL minh họa chuyển sang prepared statement; đầu vào được xem là dữ liệu.
4. XSS: chuyển tab, tắt vá, chạy XSS; so sánh đầu vào được phản chiếu với trường hợp mã hóa đầu ra sau khi bật vá.
5. SSRF: chuyển tab, tắt vá, chạy SSRF; bật vá và thử lại. URL ngoài allowlist nhận phản hồi mô phỏng 403, URL stock.vulnshop.internal nhận 200.
6. Nhấn Làm lại demo, chạy cả ba kịch bản; bật vá và chạy lại để so sánh. Đổi trạng thái vá hoặc chạy chuỗi mới sẽ xóa kết quả cũ.

## Cấu trúc code
- index.html: bố cục, các nút, ô nhập và vùng hiển thị; các onclick gọi hàm JavaScript.
- assets/styles.css: nền trung tính, màu nút chính và trạng thái vá, bố cục màn hình nhỏ.
- assets/app.js: chuyển tab, chạy scanner mô phỏng, lưu kết quả và xuất báo cáo. esc() mã hóa dữ liệu trước khi đưa vào HTML; wait() tạo khoảng dừng cho luồng trình diễn.
- assets/lab.js: logic ba kịch bản và trạng thái vá.

## Luồng xử lý để giải thích với thầy
Nút chọn kịch bản → selectLabVector() → thiết lập ô nhập → executeLabRequest() → đọc currentLabVector/isLabPatched → cập nhật mã minh họa, phản hồi và log.

- setLabInput(): đặt dữ liệu mẫu và gọi xử lý.
- triggerSingleAttack(): chọn kịch bản rồi điền mẫu đầu vào tương ứng.
- executeLabRequest(): chọn nhánh SQLi/XSS/SSRF và trạng thái trước/sau vá; dựng phản hồi.
- isAllowedStockUrl(): phân tích URL; chỉ chấp nhận HTTP/HTTPS, hostname chính xác stock.vulnshop.internal và không chứa thông tin đăng nhập.
- toggleLabPatch(): đổi trạng thái vá, xóa kết quả cũ và xử lý lại đầu vào.
- runKashefAutoLab(): lần lượt chạy ba kịch bản với khoảng dừng.
- resetLab(): trở về SQLi chưa vá, xóa kết quả và log.
- scanContext trong app.js: lưu URL, chế độ và thời điểm của lượt chạy để báo cáo không bị đổi mục tiêu khi sửa ô URL.

## Phạm vi triển khai
Lab chạy bằng JavaScript trong trình duyệt. PHP, SQL và HTTP response được hiển thị để giải thích cơ chế; không có backend hay cơ sở dữ liệu thật. Các điều kiện nhận diện payload là quy tắc minh họa, không phải bộ phát hiện lỗ hổng. Nội dung rà soát học thuật nằm trong REVIEW_EVIDENCE.md.

## Kiểm tra
Chạy node verify_demo.cjs để kiểm tra các URL SSRF, luồng scanner, URL báo cáo, trạng thái vá và đặt lại demo.
