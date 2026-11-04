/**
 * Chế độ Xung phong: 25 từ vựng và thành ngữ thông dụng.
 *  - answer: đáp án hiển thị
 *  - hints: [gợi ý hiện ở giây 15 (hơi mơ hồ), gợi ý hiện ở giây 25 (dễ hơn)]
 *  - scene: khóa cảnh trong scenes/xpIndex.js
 *  - explain: một câu giải nghĩa hiện cùng đáp án
 */
export const XP_TOTAL = 25;

export const XP_SCENE_KEYS = ['caukien', 'deocay', 'duongmat', 'echgieng', 'omcay', 'verangchan', 'dantaitrau', 'meokhen', 'chuotchinh', 'mokim', 'dauvoi', 'ruttday', 'themdau', 'nuocmatcasau', 'rongran', 'thuanbuom', 'meomu', 'matngot', 'cathot', 'calon', 'lenvoi', 'nuocdolakhoai', 'lalanh', 'chamrua', 'tregia'];

const Q = (id, answer, hint1, hint2, explain) => ({ id, scene: XP_SCENE_KEYS[id - 1], answer, hints: [hint1, hint2], explain });

export const XP_QUESTIONS = [
  Q(1, 'Cầu kiến', 'Có một loài vật nhỏ bé đang làm một việc rất lớn.', 'Con gì nhỏ xíu, và thứ chúng tạo thành là một cái gì đó để đi qua chỗ hiểm trở?', 'Chỉ sự đoàn kết của những con vật nhỏ bé, kết thành cầu để cùng vượt qua khó khăn.'),
  Q(2, 'Đẽo cày giữa đường', 'Người này làm theo lời của tất cả mọi người.', 'Ai đi qua cũng góp ý, nghe ai cũng làm, cuối cùng cái cày không còn ra hình gì.', 'Làm việc không có chủ kiến, ai nói gì cũng nghe theo nên chẳng đi đến đâu.'),
  Q(3, 'Đường mật', 'Nghe thì ngọt ngào nhưng chưa chắc đã thật lòng.', 'Hai thứ ngọt: một thứ làm từ mía, một thứ do ong làm ra, chảy ra từ lời nói.', 'Lời nói ngọt ngào, êm tai nhưng có thể không thành thật.'),
  Q(4, 'Ếch ngồi đáy giếng', 'Con vật này tưởng thế giới chỉ nhỏ có thế.', 'Nó chỉ thấy một khoảng trời tròn bé xíu qua miệng giếng.', 'Người có hiểu biết hạn hẹp mà lại tưởng mình biết hết mọi thứ.'),
  Q(5, 'Ôm cây đợi thỏ', 'Người này bỏ việc chính để chờ một điều may mắn.', 'Một chú thỏ tự đâm vào gốc cây, và người nông dân bỏ cày ngồi chờ thêm thỏ.', 'Không chịu làm việc, chỉ chờ may mắn tự đến.'),
  Q(6, 'Vẽ rắn thêm chân', 'Làm thêm một việc không cần thiết lại hỏng chuyện.', 'Con vật bị vẽ thêm bốn cái chân và không còn giống con rắn nữa.', 'Làm thừa những điều không cần, khiến việc đang tốt trở nên hỏng.'),
  Q(7, 'Đàn gảy tai trâu', 'Người nói thì hay, người nghe thì không để ý.', 'Một con vật to lớn vẫn thản nhiên gặm cỏ khi có tiếng đàn bên tai.', 'Nói điều hay lẽ phải với người không hiểu hoặc không chịu nghe thì vô ích.'),
  Q(8, 'Mèo khen mèo dài đuôi', 'Ai đó đang tự khen mình.', 'Một con vật ngắm đuôi mình trong gương và khoe với mọi người.', 'Người tự khen mình, tự đề cao bản thân.'),
  Q(9, 'Chuột sa chĩnh gạo', 'Một con vật nhỏ gặp may bất ngờ.', 'Con vật nhỏ rơi vào một cái chĩnh đầy thức ăn mà nó thích nhất.', 'Người gặp may, được sống trong cảnh sung túc, đầy đủ bất ngờ.'),
  Q(10, 'Mò kim đáy bể', 'Việc này gần như không thể làm được.', 'Tìm một cây kim bé xíu, mà lại ở dưới đáy biển rộng mênh mông.', 'Tìm một thứ rất nhỏ ở nơi rộng lớn nên rất khó thấy.'),
  Q(11, 'Đầu voi đuôi chuột', 'Mở đầu thì to, kết thúc thì nhỏ.', 'Đầu to lớn như một con vật khổng lồ, nhưng đuôi chỉ bé xíu như đuôi của một con vật nhỏ.', 'Làm việc khởi đầu rầm rộ nhưng kết thúc yếu ớt, qua loa.'),
  Q(12, 'Rút dây động rừng', 'Làm một việc nhỏ nhưng ảnh hưởng đến rất nhiều thứ.', 'Chỉ kéo nhẹ sợi dây leo mà cả khu rừng rung lên.', 'Làm một việc nhỏ có thể làm kinh động đến cả một nhóm lớn.'),
  Q(13, 'Thêm dầu vào lửa', 'Việc làm này khiến chuyện đang xấu trở nên xấu hơn.', 'Ngọn lửa đang nhỏ, có người đổ thêm thứ gì đó vào và nó bùng lên.', 'Làm cho sự việc, cơn giận càng thêm nghiêm trọng.'),
  Q(14, 'Nước mắt cá sấu', 'Khóc, nhưng không phải vì thương xót thật.', 'Một con vật hung dữ ở dưới sông, vừa khóc vừa ăn thịt con mồi.', 'Sự thương xót giả dối, khóc cho có.'),
  Q(15, 'Rồng rắn lên mây', 'Đây là một trò chơi dân gian quen thuộc của trẻ em.', 'Các bạn nhỏ nắm áo nhau thành hàng dài, uốn lượn như một con vật huyền thoại.', 'Tên một trò chơi dân gian, các bạn nắm áo nhau thành đoàn rồng rắn.'),
  Q(16, 'Thuận buồm xuôi gió', 'Mọi việc diễn ra rất suôn sẻ.', 'Chiếc thuyền đi nhanh vì cánh buồm căng đầy gió thổi cùng chiều.', 'Mọi việc đều thuận lợi, suôn sẻ, không gặp trở ngại.'),
  Q(17, 'Mèo mù vớ cá rán', 'Gặp may một cách tình cờ, không do giỏi.', 'Con vật không nhìn thấy gì mà vẫn bắt trúng món ăn ngon.', 'Gặp may mắn một cách tình cờ, không phải nhờ tài giỏi.'),
  Q(18, 'Mật ngọt chết ruồi', 'Thứ hấp dẫn nhưng lại nguy hiểm.', 'Con vật nhỏ bay đến vì mùi ngọt, nhưng bị dính chặt và không thoát ra được.', 'Lời ngon ngọt, lợi ích hấp dẫn có thể khiến người ta mắc bẫy.'),
  Q(19, 'Cá nằm trên thớt', 'Tình thế này đã hết đường lựa chọn.', 'Con vật sống dưới nước nằm trên tấm gỗ, và con dao đang giơ lên phía trên.', 'Ở vào thế bị động, hoàn toàn nằm trong tay người khác.'),
  Q(20, 'Cá lớn nuốt cá bé', 'Kẻ mạnh lấn át kẻ yếu.', 'Con cá to nuốt con cá vừa, rồi con cá vừa lại nuốt con cá nhỏ hơn.', 'Kẻ mạnh bắt nạt, thôn tính kẻ yếu hơn.'),
  Q(21, 'Lên voi xuống chó', 'Cuộc sống lúc lên lúc xuống bất ngờ.', 'Lúc đầu ngồi trên con vật to lớn, về sau chỉ còn cưỡi con vật nhỏ nuôi trong nhà.', 'Cuộc đời lúc sung sướng, lúc sa sút, thay đổi thất thường.'),
  Q(22, 'Nước đổ lá khoai', 'Có nói thế nào thì người kia cũng không để tâm.', 'Nước đổ lên một loại lá to, nước trượt đi hết, lá vẫn khô nguyên.', 'Nói hay dạy bảo đến mấy cũng không có tác dụng.'),
  Q(23, 'Lá lành đùm lá rách', 'Người khá giả giúp đỡ người khó khăn.', 'Chiếc lá còn nguyên vẹn che chở cho chiếc lá đã bị rách ở bên cạnh.', 'Người may mắn, đủ đầy biết giúp đỡ người gặp khó khăn.'),
  Q(24, 'Chậm như rùa', 'Đây là cách nói về tốc độ rất thấp.', 'Một con vật nhanh chạy vụt qua, còn con vật mang mai trên lưng thì bò từng bước nhỏ.', 'Người hoặc việc làm rất chậm chạp.'),
  Q(25, 'Tre già măng mọc', 'Thế hệ sau nối tiếp thế hệ trước.', 'Cây tre đã già, nhưng những búp non mọc lên bên cạnh và lớn dần.', 'Lớp người trước già đi thì có lớp người sau thay thế, nối tiếp.'),
];
