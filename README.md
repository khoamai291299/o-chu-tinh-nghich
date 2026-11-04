# Ô chữ tinh nghịch

Trò chơi đuổi hình bắt chữ cho lớp học: 16 hộp quà bí mật, 4 đội, chuông, vòng quay may mắn.

Công nghệ: React 18, Ant Design 5, Framer Motion (giao diện, chuyển cảnh), GSAP (hoạt ảnh SVG trong khung TV và vòng quay), Vite.
Chạy hoàn toàn offline, phông chữ đã đóng gói sẵn.

## Chạy trên máy
Cần Node.js 18 trở lên.

    npm install
    npm run dev            # mở http://localhost:5173

## Đóng gói
    npm run build          # thư mục dist/ (đưa lên hosting, hoặc chạy thử: npm run preview)
    npm run build:single   # dist-single/index.html: MỘT file duy nhất, bấm đúp là chạy, không cần mạng

## Khung hình
Toàn bộ trò chơi nằm trong một khung 16:9 (1600 x 900) tự co giãn vừa cửa sổ, không bao giờ cuộn hay tràn.
Nên chiếu ở chế độ toàn màn hình (nút góc trên bên phải). Màn hình dọc sẽ nhắc xoay ngang.

## Cách chơi (dành cho giáo viên)
1. Giới thiệu, Tiếp theo, đặt tên 4 đội và chọn nhân vật, Bắt đầu chơi.
1b. Câu đầu tiên là câu mẫu (không tính điểm) để cả lớp làm quen luật; xong bấm "Bắt đầu chơi thật".
1c. Random thứ tự (công tắc ở màn đặt tên, mặc định bật): 16 câu được xáo ngẫu nhiên vào 16 hộp mỗi ván, và có màn **Bốc thăm thứ tự chọn quà** để chốt thứ tự các đội. Tắt công tắc thì giữ thứ tự cố định và giáo viên tự chọn đội.
2. Bấm vào biểu tượng một đội (cột trái) để đội đó chọn quà (khi đã bốc thăm, đội kế tiếp tự được gợi ý theo thứ tự), rồi bấm một hộp quà. Mỗi hộp có gói 50, 100 hoặc 150 điểm.
3. Lượt 1 (15 giây): đội chọn quà thảo luận và trả lời trước. Giáo viên bấm Đúng (D) hoặc Sai (S).
   Đúng: nhận điểm của gói và một lượt quay may mắn (6 ô trừ -5 đến -30, 14 ô cộng +5 đến +100).
   Sai hoặc hết giờ: mất lượt.
4. Lượt 2 (15 giây): 3 đội còn lại giành quyền (bấm chuông hoặc phím 1 đến 4). Có đội bấm chuông thì đồng hồ dừng; đội đó sai thì đồng hồ chạy tiếp.
   Đúng: nhận điểm của gói, không quay.
4b. Hai đội bấm chuông cùng lúc: nút **Bốc thăm** (phím R) chọn ngẫu nhiên đội được trả lời.
5. Bấm vào đồng hồ (hoặc phím cách) để tạm dừng hoặc tiếp tục. Gợi ý hiện khi bắt đầu lượt giành quyền.
5b. Hòa điểm hạng nhất ở màn tổng kết: bấm **Phân thắng bại bằng câu hỏi phụ** (bốc ngẫu nhiên trong `TIEBREAK` ở `questions.js`).
5c. Lưu và chơi tiếp: trò chơi tự lưu sau mỗi câu (trong trình duyệt). Bấm **Lưu và thoát** ở màn hộp quà; lần sau mở trang sẽ có thẻ **Chơi tiếp** ở màn đầu (hiện số câu đã mở và điểm). Nút tải xuống cạnh đó xuất file `.json` để chơi tiếp trên máy khác (màn đầu có **Mở file đã lưu**). Chỉ lưu các câu đã hoàn tất; câu đang chơi dở sẽ mở lại từ đầu. Chơi hết ván hoặc bấm Tổng kết thì bản lưu được xóa.
6. Hết các hộp quà hoặc hết giờ học: nút Tổng kết (dưới khung tiến độ) để xem bục vinh danh.

Xem nhanh một câu, không tính giờ: thêm `?cau=7` vào địa chỉ, ví dụ http://localhost:5173/?cau=7

## Thêm hoặc sửa câu hỏi
- `src/utils/save.js`: lưu, đọc, kiểm tra và xuất file ván chơi.
- `src/utils/random.js`: hàm xáo trộn dùng chung (bộ sinh số của trình duyệt). `src/components/Draw.jsx`: màn bốc thăm đội.
- `src/data/questions.js`: đáp án, các cách viết được chấp nhận (không phân biệt dấu, hoa thường, dấu câu), gợi ý, giải thích, mức độ.
- Thêm hoạt ảnh mới: viết component trong `src/scenes/` (xem mẫu ở `groupA.jsx`, bộ vẽ ở `kit.jsx`, `kit2.jsx`), đăng ký trong `src/scenes/index.js`.
- Thời gian mỗi lượt, gói điểm, màu đội, các ô vòng quay: `src/data/constants.js`. Gói điểm của từng câu: trường `pts` trong `questions.js`.
- Giao diện và màu sắc: `src/styles.css` và `THEME` trong `src/App.jsx`.
