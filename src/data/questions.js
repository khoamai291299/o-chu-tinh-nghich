/**
 * 16 câu tục ngữ. Mỗi câu:
 *  - kind: dòng mô tả loại câu hỏi hiện dưới TV
 *  - answer: đáp án hiển thị
 *  - hints: gợi ý, hiện dần khi quá ~15 giây
 *  - scene: id hoạt ảnh trong scenes/index.js
 *  - pts: gói điểm của câu (50, 100 hoặc 150), chỉ hiện khi mở câu hỏi
 */
const TT = 'Đây là một câu tục ngữ.';
/** Câu mẫu chơi đầu tiên để cả lớp làm quen luật, không tính điểm và không nằm trong 16 hộp quà. */
export const SAMPLE = { id: 0, pts: 0, kind: TT, scene: 'thungrong', answer: 'Thùng rỗng kêu to', hints: ['Nói về những người hay khoe khoang.', 'Một cái thùng bị gõ kêu rất to, còn thùng đầy nước thì gõ lại kêu nhỏ.'], explain: 'Thùng không có gì bên trong thì kêu to, người ít hiểu biết thường hay nói nhiều, khoe khoang.' };

export const QUESTIONS = [
  { id: 1, pts: 100, kind: TT, scene: 'caukieu', answer: 'Muốn sang thì bắc cầu Kiều, muốn con hay chữ thì yêu lấy thầy', hints: ['Nói về việc kính trọng người dạy dỗ.', 'Một bạn đi qua cây cầu tên Kiều, rồi thầy đồ ngồi trên cao, trò ngồi dưới chép bài.'], explain: 'Muốn qua sông phải bắc cầu, muốn con học giỏi thì phải biết yêu quý, kính trọng thầy cô.' },
  { id: 2, pts: 150, kind: TT, scene: 'dimotngay', answer: 'Đi một ngày đàng, học một sàng khôn', hints: ['Nói về trải nghiệm làm ta khôn ngoan hơn.', 'Một bạn đi qua ba ngày, mỗi ngày gặp một chuyện, mỗi chuyện thành một ánh sáng bay vào cái sàng.'], explain: 'Đi nhiều nơi, trải nghiệm nhiều thì hiểu biết rộng hơn.' },
  { id: 3, pts: 50, kind: TT, scene: 'thatbai', answer: 'Thất bại là mẹ thành công', hints: ['Nói về việc rút kinh nghiệm sau khi vấp ngã.', 'Hai bạn vật tay, bạn bên trái thua, đến lần thứ 8 thì bạn ấy thắng.'], explain: 'Thất bại giúp ta rút ra bài học, từ đó đi đến thành công.' },
  { id: 4, pts: 150, kind: TT, scene: 'songca', answer: 'Chớ thấy sóng cả mà ngã tay chèo', hints: ['Nói về sự kiên trì trước khó khăn.', 'Một con thuyền gặp cơn sóng lớn nhưng người chèo vẫn không buông.'], explain: 'Gặp khó khăn lớn cũng đừng nản lòng bỏ cuộc, cứ vững vàng thì sẽ vượt qua.' },
  { id: 5, pts: 100, kind: TT, scene: 'luathuvang', answer: 'Lửa thử vàng, gian nan thử sức', hints: ['Nói về việc khó khăn cho ta biết bản lĩnh.', 'Thỏi vàng được đưa vào lò lửa, rồi có một bạn chạy đường dài.'], explain: 'Lửa thử mới biết vàng thật, gian nan thử thách mới biết sức mạnh và ý chí con người.' },
  { id: 6, pts: 150, kind: TT, scene: 'daomai', answer: 'Dao có mài mới sắc, người có học mới nên', hints: ['Nói về việc học tập và rèn luyện.', 'Một bàn tay mài con dao trên đá, rồi một bạn đứng đọc sách.'], explain: 'Dao phải mài mới sắc, con người phải chăm chỉ học tập mới thành tài.' },
  { id: 7, pts: 50, kind: TT, scene: 'motchu', answer: 'Một chữ cũng là thầy, nửa chữ cũng là thầy', hints: ['Nói về lòng biết ơn người dạy mình.', 'Một chữ rồi đến nửa chữ, và đều có thầy.'], explain: 'Dù chỉ dạy cho ta một chữ hay nửa chữ, người đó vẫn là thầy và đáng được kính trọng.' },
  { id: 8, pts: 50, kind: TT, scene: 'ngua', answer: 'Một con ngựa đau, cả tàu bỏ cỏ', hints: ['Nói về tình đoàn kết, sẻ chia.', 'Có một con vật bị bệnh, những con khác không buồn ăn.'], explain: 'Một người gặp chuyện, cả tập thể cùng lo lắng, chia sẻ với nhau.' },
  { id: 9, pts: 150, kind: TT, scene: 'kheoan', answer: 'Khéo ăn thì no, khéo co thì ấm', hints: ['Nói về cách biết sắp xếp, tiết kiệm trong cuộc sống.', 'Một bạn ăn cơm no bụng, rồi một bạn nằm dưới tấm chăn ngắn.'], explain: 'Biết cách ăn uống thì đủ no, biết cách co mình thì tấm chăn ngắn cũng đủ ấm, nghĩa là biết tính toán thì đủ dùng.' },
  { id: 10, pts: 100, kind: TT, scene: 'veduong', answer: 'Vẽ đường cho hươu chạy', hints: ['Nói về việc làm thừa, chỉ dẫn điều không cần thiết.', 'Một bạn vẽ một con đường quanh co dưới đất, và có một con hươu chạy theo.'], explain: 'Chỉ vẽ vời, hướng dẫn người khác làm điều họ vốn đã biết hoặc không cần, vô tình dẫn họ đi sai.' },
  { id: 11, pts: 100, kind: TT, scene: 'tramhay', answer: 'Trăm hay không bằng tay quen', hints: ['Nói về giá trị của sự luyện tập.', 'Một bạn treo đầy bằng cấp (có mũi tên chỉ số 100) nhưng thêu rất xấu, bạn kia không có bằng nào mà thêu được bông hoa rất đẹp.'], explain: 'Biết nhiều lý thuyết cũng không bằng làm quen tay, luyện tập nhiều thì mới thành thạo.' },
  { id: 12, pts: 50, kind: TT, scene: 'nuocchay', answer: 'Nước chảy đá mòn', hints: ['Nói về sức mạnh của sự kiên trì.', 'Những giọt nước rơi xuống một tảng đá, lịch treo tường lật dần.'], explain: 'Việc nhỏ làm đều đặn, bền bỉ lâu ngày cũng tạo nên kết quả lớn.' },
  { id: 13, pts: 50, kind: TT, scene: 'duocvoi', answer: 'Được voi đòi tiên', hints: ['Nói về sự tham lam không đáy.', 'Một bạn được tặng một chú voi, rồi lại chỉ tay đòi cô tiên.'], explain: 'Đã được cái này lại muốn cái khác to hơn, tham lam không biết đủ.' },
  { id: 14, pts: 100, kind: TT, scene: 'dongcam', answer: 'Đồng cam cộng khổ', hints: ['Nói về tình nghĩa gắn bó của bạn bè.', 'Hai bạn chia nhau một quả cam, sau đó cùng khiêng một tảng đá nặng dưới mưa.'], explain: 'Cùng nhau chia sẻ cả lúc sung sướng lẫn lúc gian khổ.' },
  { id: 15, pts: 50, kind: TT, scene: 'cuoingua', answer: 'Cưỡi ngựa xem hoa', hints: ['Nói về cách làm qua loa, không kỹ càng.', 'Một bạn phi ngựa rất nhanh qua cánh đồng hoa.'], explain: 'Xem xét, làm việc vội vàng, chỉ lướt qua nên không thấy hết được chi tiết.' },
  { id: 16, pts: 100, kind: TT, scene: 'matbo', answer: 'Mất bò mới lo làm chuồng', hints: ['Nói về việc chỉ lo phòng bị khi sự việc đã xảy ra.', 'Một con bò bước ra khỏi chuồng trong lúc chủ ngủ quên.'], explain: 'Việc xảy ra rồi mới lo đối phó thì đã muộn, cần phòng ngừa từ trước.' },
];

/** Câu hỏi phụ để phân thắng bại khi hai đội trở lên bằng điểm ở hạng nhất. Được bốc ngẫu nhiên ở màn tổng kết. */
export const TIEBREAK = [
  { q: 'Tục ngữ nào có ý: học ở bạn bè cũng quý như học ở thầy?', answer: 'Học thầy không tày học bạn' },
  { q: 'Tục ngữ nào có ý: hưởng thành quả thì phải nhớ ơn người tạo ra nó?', answer: 'Uống nước nhớ nguồn' },
  { q: 'Tục ngữ nào có ý: kiên trì làm việc dù khó, sớm muộn cũng thành công?', answer: 'Có công mài sắt, có ngày nên kim' },
  { q: 'Tục ngữ nào có ý: muốn thành công phải có người dạy dỗ?', answer: 'Không thầy đố mày làm nên' },
  { q: 'Tục ngữ nào có ý: ở gần người tốt thì học được điều tốt, gần người xấu thì nhiễm thói xấu?', answer: 'Gần mực thì đen, gần đèn thì rạng' },
];
