# Chế độ "Xung phong" cho Ô chữ tinh nghịch

## Mục đích
Thêm một nhánh chơi riêng, dễ hơn, chạy cùng web với trò chơi chính (4 đội). Cả lớp xung phong đoán từ vựng thông dụng qua cảnh hoạt ảnh ngắn lặp lại. Người điều phối chỉ quan sát và chấm đúng/sai. Dùng cho lớp nhỏ hoặc buổi khởi động, không cần chia đội.

## Mục tiêu
- Chọn chế độ ở màn đầu: "4 đội" (hiện có, giữ nguyên) hoặc "Xung phong" (mới).
- 25 hộp quà, mở theo thứ tự ngẫu nhiên mỗi ván, mỗi hộp một cảnh hoạt ảnh.
- Lưu và chơi tiếp ván dở, tách biệt hoàn toàn với bản lưu của chế độ 4 đội.
- Nét vẽ và cách dựng cảnh giống trò chơi chính (SVG + GSAP, bộ vẽ ở `src/scenes/kit.jsx`, `kit2.jsx`, `rig.jsx`).

## Không làm (non-goals)
- Không có đội, không điểm, không vòng quay, không chuông theo đội, không bốc thăm, không màn tổng kết bục vinh danh.
- Không loại ai. Người điều phối không tham gia đoán.
- Không đổi hành vi chế độ 4 đội. Điều làm hỏng nhánh này dù chạy đúng: bất kỳ thay đổi nào khiến chế độ 4 đội chơi khác đi.

## Cách chơi
1. Màn đầu có lựa chọn chế độ. Chọn Xung phong thì vào thẳng màn 25 hộp quà (không đặt tên đội).
2. Người điều phối bấm một hộp quà. Cảnh hiện trong TV, **lặp liên tục**, đồng hồ đếm lùi **30 giây**.
3. Em nào xung phong, người điều phối bấm **Dừng chuông**: cảnh đứng yên đúng khung hình đó, đồng hồ dừng.
4. Bấm **Đúng**: hiện đáp án, giải nghĩa, pháo giấy; ô hộp quà đó thành "đã mở". Bấm **Sai**: cảnh và đồng hồ chạy tiếp từ chỗ đã dừng, có thể dừng tiếp cho em khác, lặp lại đến khi đúng.
5. Gợi ý hiện ở giây **15** và **25** tính theo thời gian đã chạy (đồng hồ dừng thì thời gian không tính). Gợi ý 25s dễ hơn gợi ý 15s.
6. Hết 30 giây mà chưa ai đúng: hiện "Hết giờ, chưa ai đúng" với hai nút **Xem lại** và **Hiện đáp án** (giống trò chơi chính). Hộp được tính là đã mở, không có người đúng.
7. Phím tắt: Space = Dừng chuông (bấm lại để chạy tiếp khi chưa chấm), D = Đúng, S = Sai, A = xem đáp án (chỉ người điều phối thấy, như `peek` ở `Play.jsx`).

## Màn hình (đã được duyệt qua mẫu)
Khung 16:9 (1600x900) như game chính, tràn cửa sổ. Bố cục:
- Trái: dòng loại câu hỏi ("Từ vựng thông dụng · Hộp quà số N"), TV lớn có khung giống `.tv-frame`, ô gợi ý, dải 25 ô nhỏ cho biết hộp nào đã mở.
- Phải: một khung riêng gồm đồng hồ tròn, thanh thời gian có hai vạch vàng ở 15s và 25s, nút tròn nổi có đổ bóng giống nút chính: **Dừng chuông** (cam, lớn nhất), **Đúng** (xanh lá), **Sai** (đỏ), **Xem đáp án**, **Về hộp quà**.
- Các khối cách nhau rộng hơn bản mẫu đầu (khoảng 14 đơn vị trên khung 960 thay vì 8).
- Màn hộp quà: lưới 25 hộp, dùng lại `GiftArt` và hoạt ảnh mở hộp của `Board.jsx`; bỏ cột đội và panel tiến độ điểm, giữ vòng tiến độ, nút Lưu và thoát, nút tải file lưu.

## Hoạt ảnh (25 cảnh)
- Nét vẽ, nhân vật `Kid`, `Room`, đạo cụ: dùng bộ vẽ và cách dựng có sẵn ở `src/scenes/`. Khung 160x90 đơn vị.
- Mỗi cảnh là một vòng chuyển động **dài ít nhất 5 giây, tốt nhất 5 đến 8 giây**, tự lặp. Không có cảnh nào ngắn hơn 5 giây. Khác cảnh của chế độ chính (kịch bản 12 giây, "hình đánh lừa rồi chi tiết khóa"), ở đây hình ảnh phải rõ nghĩa ngay, vì câu dễ hơn.
- `useScene` hiện lặp ở mốc 12 đến 20 giây. Cần thêm tham số tuỳ chọn để cảnh ngắn chọn mốc lặp riêng (không đổi mặc định, để cảnh cũ không đổi hành vi).
- Đăng ký trong `src/scenes/index.js` (hoặc một bản đăng ký riêng cho chế độ này), viết trong các file mới, ví dụ `src/scenes/xp1.jsx` đến `xpN.jsx`.

Danh sách 25 từ đã chốt, kèm ý tưởng cảnh:
1. Cầu kiến: đàn kiến nối thành cầu qua khe nước.
2. Đẽo cày giữa đường: người đẽo cày bên đường, mỗi người qua góp ý thì cái cày biến dạng.
3. Đường mật: từ miệng người nói chảy ra đường và mật ong.
4. Ếch ngồi đáy giếng: ếch nhìn miệng giếng tròn bé xíu tưởng là cả bầu trời.
5. Ôm cây đợi thỏ: người nông dân ngồi bên gốc cây, ruộng bỏ hoang, thỏ chạy ngang.
6. Vẽ rắn thêm chân: vẽ con rắn rồi thêm 4 chân, thành thằn lằn.
7. Đàn gảy tai trâu: người gảy đàn cạnh con trâu, trâu vẫn gặm cỏ.
8. Mèo khen mèo dài đuôi: mèo soi gương khoe đuôi.
9. Chuột sa chĩnh gạo: chuột rơi vào chĩnh gạo đầy, vui sướng ăn.
10. Mò kim đáy bể: người lặn xuống biển với kính lúp tìm cây kim.
11. Đầu voi đuôi chuột: con vật đầu voi oai vệ, đuôi chuột bé tí.
12. Rút dây động rừng: kéo nhẹ sợi dây leo, cả rừng rung, thú hoảng chạy.
13. Thêm dầu vào lửa: lửa nhỏ, đổ dầu, lửa bùng.
14. Nước mắt cá sấu: cá sấu rơi nước mắt nhưng vẫn nhai con mồi.
15. Rồng rắn lên mây: hàng bạn nhỏ nắm áo nhau uốn lượn như rồng.
16. Thuận buồm xuôi gió: thuyền buồm căng gió lướt nhanh.
17. Mèo mù vớ cá rán: mèo bịt mắt mò mẫm tình cờ vồ trúng cá.
18. Mật ngọt chết ruồi: ruồi bay đến bát mật rồi dính chặt.
19. Cá nằm trên thớt: cá nằm trên thớt, dao giơ lơ lửng.
20. Cá lớn nuốt cá bé: cá to nuốt cá vừa, cá vừa nuốt cá nhỏ.
21. Lên voi xuống chó: người ngồi voi cao, cảnh đổi thành cưỡi chó nhỏ.
22. Nước đổ lá khoai: nước đổ lên lá khoai rồi trượt đi.
23. Lá lành đùm lá rách: lá xanh che chở lá rách bên cạnh.
24. Chậm như rùa: thỏ chạy vụt qua, rùa bò từng bước nhỏ.
25. Tre già măng mọc: cây tre già đứng cạnh, măng non mọc lên cao dần.

Mỗi từ có: đáp án, 2 gợi ý (gợi ý 15s hơi mơ hồ, gợi ý 25s dễ hơn, đều bằng chữ), một câu giải nghĩa ngắn. Dữ liệu để trong `src/data/xpQuestions.js`, cùng dạng với `questions.js` nhưng không có `pts`.

## Lưu và chơi tiếp
- Khóa lưu riêng: `o-chu-tinh-nghich:save:xp:v1`. Không đọc, ghi hay xóa bản lưu của chế độ 4 đội.
- Nội dung lưu: thứ tự 25 câu (id), tập hộp đã mở, kết quả từng hộp (đúng hay hết giờ). Tự lưu sau mỗi câu xong, như chế độ chính.
- Câu đang chơi dở thì mở lại từ đầu (giống chế độ chính).
- Màn đầu: nếu có bản lưu Xung phong thì hiện thẻ **Chơi tiếp** riêng cho chế độ này; có nút xuất và mở file `.json` (file có trường nhận biết chế độ để không mở nhầm file 4 đội).
- Chơi hết 25 hộp: xóa bản lưu, hiện màn kết thúc đơn giản ("Đã mở hết 25 hộp quà") với nút Chơi lại và Về màn đầu.

## Ràng buộc
- Chạy offline, không thêm thư viện. Dùng React 18, antd 5, framer-motion, gsap, Vite như hiện tại.
- Tái dùng `Stage`, `Confetti`, `sfx`, `shuffle`, `GiftArt`/`Gift` (cần tách hoặc xuất ra từ `Board.jsx` mà không đổi hành vi).
- Build đơn file (`npm run build:single`) vẫn phải chạy.
- Mọi chữ hiển thị bằng tiếng Việt có dấu.

## Để người triển khai quyết (đánh dấu là lựa chọn của tôi)
- Cách đưa chế độ vào `App.jsx` (thêm giá trị `mode`, phase riêng cho nhánh mới).
- Tách `Gift`/`GiftArt` ra file dùng chung hay sao chép.
- Nội dung chi tiết của 25 câu gợi ý và giải nghĩa (viết cho đúng ý, ngắn gọn, phù hợp học sinh).
- Chi tiết dựng từng cảnh, miễn đạt ≥5 giây lặp, rõ nghĩa, đúng nét vẽ có sẵn.
- Cách chạy kiểm tra nhanh một cảnh: tương tự `?cau=N` hiện có, ví dụ `?xp=N`.
