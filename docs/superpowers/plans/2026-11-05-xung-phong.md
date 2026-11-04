# Chế độ "Xung phong" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm chế độ chơi "Xung phong" (25 hộp quà, cảnh hoạt ảnh lặp, đồng hồ 30s, dừng chuông, đúng/sai, lưu riêng) cạnh chế độ 4 đội mà không làm đổi chế độ 4 đội.

**Architecture:** Thêm giá trị `mode` ('teams' | 'xp') ở `App.jsx` và các phase riêng cho nhánh mới (`xpboard`, `xpplay`, `xpend`). Logic vòng chơi nằm trong một reducer thuần (`src/utils/xpRound.js`), lưu trạng thái trong `src/utils/xpSave.js`; cả hai kiểm thử được bằng `node --test`. Giao diện và 25 cảnh SVG+GSAP dùng lại bộ vẽ ở `src/scenes/kit*.jsx`.

**Tech Stack:** React 18, antd 5, framer-motion, gsap, Vite (có sẵn). Kiểm thử logic: `node --test` (có sẵn trong Node 18+, không thêm thư viện).

**Spec:** `docs/superpowers/specs/2026-11-05-xung-phong-design.md`

## Global Constraints

- Chạy offline, không thêm thư viện nào vào `package.json`.
- Khung 16:9 (1600 x 900) qua `Stage`; cảnh SVG khung 160 x 90 đơn vị.
- Đồng hồ 30 giây; gợi ý ở 15 giây và 25 giây tính theo thời gian đã chạy (đồng hồ dừng thì không tính).
- Mỗi cảnh lặp ít nhất 5 giây, nên 5 đến 8 giây; không cảnh nào ngắn hơn 5 giây.
- Khóa lưu: `o-chu-tinh-nghich:save:xp:v1`; không đọc, ghi, xóa khóa `o-chu-tinh-nghich:save:v1` của chế độ 4 đội.
- Phím tắt: Space = Dừng chuông, D = Đúng, S = Sai, A = xem đáp án.
- Không đổi hành vi chế độ 4 đội. `useScene` giữ nguyên mặc định cho cảnh cũ.
- Mọi chữ hiển thị là tiếng Việt có dấu. `npm run build` và `npm run build:single` phải chạy được.

## Review Focus

- Bấm Dừng chuông liên tục (dừng, chạy tiếp, dừng) không làm đồng hồ hoặc gợi ý nhảy: thời gian chỉ tính khi chạy.
- Hết 30 giây đúng lúc đang ở trạng thái dừng chờ chấm: không bị tính hết giờ khi đồng hồ đã đứng.
- Bấm Đúng/Sai khi chưa dừng chuông không làm gì.
- File lưu của chế độ 4 đội mở ở chế độ Xung phong (và ngược lại) bị từ chối, không làm hỏng ván đang chơi.
- Bản lưu có id câu trùng, thiếu, hoặc `done` chứa chỉ số ngoài 0..24 bị từ chối hoặc lọc, không làm trắng màn hình.
- Mở bản lưu đã hết 25 hộp đi thẳng sang màn kết thúc, không vào màn hộp quà rỗng.
- Cảnh cũ của chế độ 4 đội vẫn lặp ở mốc 12 đến 20 giây như trước.

---

## File Structure

- Create `src/data/xpQuestions.js`: 25 câu (`XP_QUESTIONS`) + `XP_TOTAL = 25`.
- Create `src/utils/xpRound.js`: reducer vòng chơi 30 giây (thuần, có test).
- Create `src/utils/xpSave.js`: lưu, đọc, kiểm tra, xuất file chế độ Xung phong (có test).
- Create `tests/xpQuestions.test.js`, `tests/xpRound.test.js`, `tests/xpSave.test.js`.
- Modify `src/scenes/kit.jsx`: `useScene` nhận tham số thứ ba `{ loop }`.
- Create `src/scenes/xp1.jsx` … `xp5.jsx` (mỗi file 5 cảnh) và `src/scenes/xpIndex.js` (đăng ký `XP_SCENES`).
- Create `src/components/Gift.jsx`: tách `GiftArt`, `Gift` từ `Board.jsx`; `Board.jsx` import lại.
- Create `src/components/XpBoard.jsx`, `XpPlay.jsx`, `XpEnd.jsx`.
- Modify `src/components/Intro.jsx`: chọn chế độ, thẻ Chơi tiếp riêng.
- Modify `src/App.jsx`: `mode`, phase mới, lưu riêng, `?xp=N`.
- Modify `src/styles.css`: kiểu cho 3 màn mới.
- Modify `package.json`: thêm script `"test": "node --test tests/"`.
- Modify `README.md`: mục chế độ Xung phong.

---

### Task 1: Dữ liệu 25 câu

**Files:**
- Create: `src/data/xpQuestions.js`, `tests/xpQuestions.test.js`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces: `XP_QUESTIONS: { id: number, scene: string, answer: string, hints: [string, string], explain: string }[]` (id 1..25), `XP_TOTAL: 25`, `XP_SCENE_KEYS: string[]` (25 khóa cảnh, đúng bằng thứ tự bên dưới).

Khóa cảnh theo thứ tự câu (dùng chính xác): `caukien, deocay, duongmat, echgieng, omcay, verangchan, dantaitrau, meokhen, chuotchinh, mokim, dauvoi, ruttday, themdau, nuocmatcasau, rongran, thuanbuom, meomu, matngot, cathot, calon, lenvoi, nuocdolakhoai, lalanh, chamrua, tregia`.

- [ ] **Step 1: Viết test** `tests/xpQuestions.test.js` bằng `node:test`: `XP_QUESTIONS.length === 25`; `id` là 1..25 không trùng; mảng `answer` bằng đúng danh sách 25 từ trong spec (Cầu kiến, Đẽo cày giữa đường, Đường mật, Ếch ngồi đáy giếng, Ôm cây đợi thỏ, Vẽ rắn thêm chân, Đàn gảy tai trâu, Mèo khen mèo dài đuôi, Chuột sa chĩnh gạo, Mò kim đáy bể, Đầu voi đuôi chuột, Rút dây động rừng, Thêm dầu vào lửa, Nước mắt cá sấu, Rồng rắn lên mây, Thuận buồm xuôi gió, Mèo mù vớ cá rán, Mật ngọt chết ruồi, Cá nằm trên thớt, Cá lớn nuốt cá bé, Lên voi xuống chó, Nước đổ lá khoai, Lá lành đùm lá rách, Chậm như rùa, Tre già măng mọc); mỗi câu có `hints.length === 2`, cả hai và `explain` là chuỗi không rỗng; `scene` của câu i bằng `XP_SCENE_KEYS[i]` và 25 khóa không trùng.
- [ ] **Step 2: Chạy** `node --test tests/xpQuestions.test.js`. Kỳ vọng: FAIL (thiếu module).
- [ ] **Step 3: Viết `src/data/xpQuestions.js`** theo dạng của `src/data/questions.js` (không có `pts`, không có `kind`). Gợi ý 1 (hiện ở 15s) hơi mơ hồ, gợi ý 2 (hiện ở 25s) dễ hơn, đều là chữ; `explain` một câu nói nghĩa. Thêm `"test": "node --test tests/"` vào `scripts` trong `package.json`.
- [ ] **Step 4: Chạy** `npm test`. Kỳ vọng: PASS.
- [ ] **Step 5: Commit** (thư mục chưa là git repo: nếu chưa `git init` thì bỏ qua bước này và ghi chú vào báo cáo).

---

### Task 2: Reducer vòng chơi

**Files:**
- Create: `src/utils/xpRound.js`, `tests/xpRound.test.js`

**Interfaces:**
- Produces:
  - `DURATION = 30`, `HINT_AT = [15, 25]`
  - `initRound(): Round` với `Round = { status: 'run'|'held'|'end', left: number, spent: number, outcome: null|'right'|'timeout', revealed: boolean, replay: number }`; ban đầu `{ status:'run', left:30, spent:0, outcome:null, revealed:false, replay:0 }`.
  - `roundReduce(s: Round, a: { type: 'tick', dt: number } | { type: 'toggle' } | { type: 'right' } | { type: 'wrong' } | { type: 'reveal' } | { type: 'replay' }): Round`
  - `hintLevel(s: Round): 0|1|2`

Quy tắc: `tick` chỉ có tác dụng khi `status==='run'`, trừ `dt` khỏi `left` (không xuống dưới 0), cộng `dt` vào `spent`, `left===0` thì `status:'end', outcome:'timeout'`. `toggle`: `run`↔`held`. `right`: chỉ khi `held` → `end`, `outcome:'right'`. `wrong`: chỉ khi `held` → `run`. `reveal`: chỉ khi `end` và `outcome==='timeout'` → `revealed:true`. `replay`: chỉ khi `end` và `timeout` và chưa `revealed` → `replay+1`. Mọi hành động không hợp lệ trả về đúng đối tượng cũ.

- [ ] **Step 1: Viết test** (`node:test`, `assert`): mỗi quy tắc trên một test; thêm `tick dt=29.95 rồi dt=0.1 → left 0, end, timeout`; `toggle` hai lần rồi `tick` không làm `spent` nhảy; `held` + `tick(5)` không đổi `left`/`spent` (hết giờ không xảy ra khi đang dừng); `right` khi `run` trả về cùng đối tượng; `hintLevel` tại `spent` = 14.9 → 0, 15 → 1, 24.9 → 1, 25 → 2.
- [ ] **Step 2: Chạy** `node --test tests/xpRound.test.js`. Kỳ vọng: FAIL.
- [ ] **Step 3: Implement** `xpRound.js` đúng chữ ký trên, hàm thuần không đổi trạng thái đầu vào.
- [ ] **Step 4: Chạy** `npm test`. Kỳ vọng: PASS.
- [ ] **Step 5: Commit.**

---

### Task 3: Lưu và đọc ván Xung phong

**Files:**
- Create: `src/utils/xpSave.js`, `tests/xpSave.test.js`

**Interfaces:**
- Consumes: `XP_QUESTIONS`, `XP_TOTAL` (Task 1).
- Produces:
  - `XP_KEY = 'o-chu-tinh-nghich:save:xp:v1'`
  - `type XpState = { order: Question[], done: Set<number>, results: Record<number, 'right'|'timeout'>, savedAt?: number|null }`
  - `packXp(state: XpState): object` → `{ mode:'xp', version:1, savedAt, order:id[], done:number[], results }`
  - `unpackXp(d: unknown): XpState | null` (null nếu `mode!=='xp'`, `version!==1`, `order` không đủ 25 id duy nhất hợp lệ; `done` lọc theo số nguyên 0..24; `results` chỉ giữ khóa trong `done` với giá trị `'right'|'timeout'`)
  - `writeXpSave(state, storage?)`, `readXpSave(storage?)`, `clearXpSave(storage?)` (`storage` mặc định `globalThis.localStorage`, bọc try/catch như `save.js`)
  - `downloadXpSave(state)`, `readXpFile(file: File): Promise<XpState|null>` (như `downloadSave`/`readFile`, tên file `o-chu-tinh-nghich-xung-phong-YYYY-MM-DD.json`)

- [ ] **Step 1: Viết test** với `storage` giả (đối tượng có `getItem/setItem/removeItem`): vòng ghi–đọc giữ nguyên `order`, `done`, `results`; `unpackXp` trả null với: gói lưu chế độ 4 đội (`{version:1, teams:[...], order:[...]}`), `order` thiếu 1 id, `order` có id trùng, `mode` sai; `done:[0, 99, -1, 2.5, 3]` chỉ còn `{0,3}`; `results` có khóa ngoài `done` bị bỏ; `writeXpSave` chỉ gọi `setItem` với `XP_KEY`; `clearXpSave` chỉ gọi `removeItem(XP_KEY)`; `readXpSave` với `getItem` ném lỗi trả null.
- [ ] **Step 2: Chạy** `node --test tests/xpSave.test.js`. Kỳ vọng: FAIL.
- [ ] **Step 3: Implement** theo mẫu `src/utils/save.js` nhưng độc lập (không import từ `save.js`).
- [ ] **Step 4: Chạy** `npm test`. Kỳ vọng: PASS.
- [ ] **Step 5: Commit.**

---

### Task 4: `useScene` hỗ trợ cảnh ngắn và bản đăng ký cảnh

**Files:**
- Modify: `src/scenes/kit.jsx:56-78`
- Create: `src/scenes/xpIndex.js`

**Interfaces:**
- Produces: `useScene(running, build, opts?: { loop?: number })`. Khi `opts.loop` có giá trị: `loopAt = opts.loop` (ném lỗi nếu `< 5`), bỏ công thức `min(20, max(12, ...))`; thêm `data-loop` = `loopAt` vào phần tử gốc của cảnh (`ref.current.dataset.loop`). Khi không truyền `opts`, hành vi y như cũ.
- Produces: `XP_SCENES: Record<string, ReactComponent>` trong `xpIndex.js`, ban đầu chỉ re-export các cảnh đã có (rỗng khi chưa có cảnh nào); mỗi Task 6 đến 10 thêm khóa của mình.

- [ ] **Step 1:** Mở `?cau=1` (chế độ demo hiện có, `npm run dev`) và ghi lại giá trị mốc lặp của một cảnh cũ làm chuẩn: trong console của trang, `document.querySelector('.scene-svg')` chưa có `data-loop` (xác nhận hành vi gốc).
- [ ] **Step 2: Implement** tham số `opts` trong `useScene`. Sau khi sửa, `?cau=1` vẫn lặp như cũ (không có `data-loop` vì không truyền `opts`).
- [ ] **Step 3: Kiểm tra** bằng một cảnh thử tạm (xóa sau): `useScene(running, build, { loop: 6 })` cho `data-loop="6"`; `loop: 4` ném lỗi.
- [ ] **Step 4: Commit.**

---

### Task 5: Tách `Gift` ra file dùng chung

**Files:**
- Create: `src/components/Gift.jsx`
- Modify: `src/components/Board.jsx` (xóa `GIFT`, `GiftArt`, `Gift`; import `{ Gift } from './Gift.jsx'`)

**Interfaces:**
- Produces: `export function Gift({ idx: number, opening: number|null, onOpen: (idx: number) => void })`, y hệt `Gift` hiện có trong `Board.jsx:36-52`.

- [ ] **Step 1:** Chụp màn hộp quà chế độ 4 đội trước khi sửa (`npm run dev`, vào ván mới, qua câu mẫu đến màn hộp quà).
- [ ] **Step 2: Implement** di chuyển mã, không đổi nội dung.
- [ ] **Step 3: Kiểm tra** màn hộp quà 4 đội giống hệt ảnh trước, bấm một hộp vẫn mở đúng, console không có lỗi. `npm run build` chạy được.
- [ ] **Step 4: Commit.**

---

### Tasks 6–10: 25 cảnh hoạt ảnh (mỗi task 5 cảnh)

Áp dụng cho cả 5 task. Mỗi cảnh:
- là component `export function Ten({ running })` dùng `useScene(running, (tl) => {...}, { loop: L })` với `5 <= L <= 8`;
- toàn bộ chuyển động chính kết thúc trước `L`, rõ nghĩa ngay trong 2 giây đầu (không dùng kịch bản "hình đánh lừa rồi chi tiết khóa");
- vẽ bằng `Svg`, `G`, `Kid`, `Room`, `Sparkle`... và đạo cụ ở `kit.jsx`, `kit2.jsx`, `rig.jsx`, `props.jsx`, `art.jsx`; nếu thiếu nhân vật hoặc con vật thì thêm vào file `xpN.jsx` của task, không sửa kit cũ;
- được đăng ký trong `XP_SCENES` với đúng khóa ở Task 1.

**Cách kiểm tra chung cho từng cảnh:** thêm tạm `?xp=N` ở Task 14 chưa có, nên trong lúc dựng dùng trang thử: tạm thời đăng ký cảnh vào `SCENES` của `index.js` qua một khóa `xp_<khóa>` chỉ khi đang dev, hoặc nhanh hơn, render `<Scene running />` trong `Play` demo (`?cau=N` với `q.scene` đổi tạm). Khi Task 14 xong, kiểm tra lại cả 25 cảnh một lượt bằng `?xp=N`: trong console `document.querySelector('.scene-svg').dataset.loop` cho 5 đến 8, hình rõ nghĩa, vòng lặp nối liền không giật, không lỗi console.

### Task 6: Cảnh 1–5 (`src/scenes/xp1.jsx`)
Khóa và ý tưởng: `caukien` (kiến nối thành cầu), `deocay` (đẽo cày bên đường, cái cày biến dạng), `duongmat` (đường và mật ong chảy ra từ miệng), `echgieng` (ếch nhìn miệng giếng tròn), `omcay` (người ngồi gốc cây, thỏ chạy ngang). Export tên: `CauKien, DeoCay, DuongMat, EchGieng, OmCay`.
- [ ] Mỗi cảnh: dựng, đăng ký, xem trong trình duyệt, kiểm tra `data-loop` 5–8 và vòng lặp liền mạch. Commit sau 5 cảnh.

### Task 7: Cảnh 6–10 (`src/scenes/xp2.jsx`)
`verangchan` (vẽ rắn rồi thêm chân), `dantaitrau` (gảy đàn bên con trâu gặm cỏ), `meokhen` (mèo soi gương khoe đuôi), `chuotchinh` (chuột rơi vào chĩnh gạo), `mokim` (người lặn tìm kim bằng kính lúp). Export: `VeRanChan, DanTaiTrau, MeoKhen, ChuotChinh, MoKim`.
- [ ] Dựng, đăng ký, kiểm tra như trên. Commit.

### Task 8: Cảnh 11–15 (`src/scenes/xp3.jsx`)
`dauvoi` (đầu voi đuôi chuột), `ruttday` (kéo dây leo, rừng rung, thú chạy), `themdau` (đổ dầu, lửa bùng), `nuocmatcasau` (cá sấu khóc nhưng nhai), `rongran` (hàng bạn nắm áo uốn lượn như rồng). Export: `DauVoi, RutDay, ThemDau, NuocMatCaSau, RongRan`.
- [ ] Dựng, đăng ký, kiểm tra. Commit.

### Task 9: Cảnh 16–20 (`src/scenes/xp4.jsx`)
`thuanbuom` (thuyền buồm căng gió), `meomu` (mèo bịt mắt vồ trúng cá), `matngot` (ruồi dính bát mật), `cathot` (cá trên thớt, dao lơ lửng), `calon` (cá nuốt cá chuỗi). Export: `ThuanBuom, MeoMu, MatNgot, CaThot, CaLon`.
- [ ] Dựng, đăng ký, kiểm tra. Commit.

### Task 10: Cảnh 21–25 (`src/scenes/xp5.jsx`)
`lenvoi` (ngồi voi cao rồi cưỡi chó), `nuocdolakhoai` (nước trượt khỏi lá khoai), `lalanh` (lá xanh che lá rách), `chamrua` (thỏ chạy vụt, rùa bò), `tregia` (măng non mọc cạnh tre già). Export: `LenVoi, NuocDoLaKhoai, LaLanh, ChamRua, TreGia`.
- [ ] Dựng, đăng ký, kiểm tra. Sau khi xong, `Object.keys(XP_SCENES).length === 25` và khớp `XP_SCENE_KEYS`. Commit.

---

### Task 11: Màn hộp quà Xung phong

**Files:**
- Create: `src/components/XpBoard.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `Gift` (Task 5), `XP_TOTAL`, `fmtTime` từ `src/utils/save.js`.
- Produces: `export default function XpBoard({ order, done, results, savedAt, onPick, onExit, onDownload, onFinish })` — `onPick(idx)` gọi sau hoạt ảnh mở hộp 800ms (như `Board.jsx:open`); lưới 25 hộp (5 cột x 5 hàng); hộp đã mở hiện dấu (✔ xanh nếu `results[idx]==='right'`, ✖ xám nếu `'timeout'`); vòng tiến độ `done.size/25`; nút **Lưu và thoát**, nút tải file, nút **Kết thúc** (hỏi xác nhận bằng `Popconfirm`, gọi `onFinish`). Tiêu đề: "Người điều phối mở một hộp quà bí mật".

- [ ] **Step 1: Implement** theo cấu trúc `Board.jsx` bỏ phần đội.
- [ ] **Step 2: Kiểm tra** trong trình duyệt (khi Task 14 đã nối): 25 hộp vừa khung 1600x900, không cuộn, hộp đã mở hiển thị dấu, tiến độ đúng.
- [ ] **Step 3: Commit.**

---

### Task 12: Màn chơi Xung phong

**Files:**
- Create: `src/components/XpPlay.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `initRound, roundReduce, hintLevel, DURATION, HINT_AT` (Task 2), `XP_SCENES` (Task 4/6–10), `Confetti`, `sfx`.
- Produces: `export default function XpPlay({ q, no, total, onFinish, preview = false })` — `q` là một phần tử `XP_QUESTIONS`, `no` là số hộp (1 đến 25) hiển thị ở dòng "Từ vựng thông dụng · Hộp quà số N", `onFinish(result: 'right'|'timeout')`, `preview=true` thì không chạy đồng hồ (dùng cho `?xp=N`).

Hành vi (xem spec mục Cách chơi và Màn hình): dùng `useReducer(roundReduce, undefined, initRound)`; `setInterval` 100ms gửi `tick` chỉ khi `status==='run'` và không `preview`; cảnh nhận `running = status==='run'` (nên dừng đúng khung hình khi `held`, và cũng dừng khi `end`); cảnh được `key` theo `replay`. Nút **Dừng chuông** gọi `toggle`; **Đúng/Sai** chỉ bấm được khi `status==='held'`. Khi `end`+`right`: thẻ đáp án + giải nghĩa + `Confetti`; nút **Hộp quà tiếp theo** gọi `onFinish('right')`. Khi `end`+`timeout` và chưa `revealed`: hai nút **Xem lại** (`replay`) và **Hiện đáp án** (`reveal`); sau khi `revealed` hiện thẻ đáp án và nút **Hộp quà tiếp theo** gọi `onFinish('timeout')`. Ô gợi ý theo `hintLevel` (0: "Gợi ý 1 sẽ hiện ở giây 15"; 1 và 2 hiện `q.hints[level-1]`). Thanh thời gian có hai vạch ở 15s và 25s. Dải 25 ô nhỏ phía dưới: ô thứ `no` được tô sáng. Phím tắt Space/D/S/A như Global Constraints; Space chỉ có tác dụng khi `status!=='end'`.

- [ ] **Step 1: Implement** theo mẫu đã duyệt (khung 16:9, TV bên trái dùng `.tv-frame`/`.tv-screen`, cột phải khung riêng, nút tròn nổi).
- [ ] **Step 2: Kiểm tra** trong trình duyệt: dừng chuông giữ nguyên khung hình và đồng hồ; Sai chạy tiếp từ chỗ cũ; Đúng hiện đáp án và pháo giấy; để hết 30 giây hiện "Hết giờ" với hai nút; gợi ý hiện đúng ở 15s và 25s (kể cả sau một lần dừng); Space hai lần không làm đồng hồ nhảy.
- [ ] **Step 3: Commit.**

---

### Task 13: Màn kết thúc Xung phong

**Files:**
- Create: `src/components/XpEnd.jsx`

**Interfaces:**
- Produces: `export default function XpEnd({ opened, total, correct, onAgain, onHome })` — hiện "Đã mở {opened}/{total} hộp quà", "{correct} từ được đoán đúng", `Confetti`, nút **Chơi lại** (`onAgain`) và **Về màn đầu** (`onHome`).

- [ ] **Step 1: Implement.**
- [ ] **Step 2: Kiểm tra** hiển thị khi nối ở Task 14. **Step 3: Commit.**

---

### Task 14: Nối vào `App.jsx` và màn đầu

**Files:**
- Modify: `src/components/Intro.jsx`, `src/App.jsx`, `src/styles.css`

**Interfaces:**
- Consumes: mọi thứ ở Task 1–13.
- Produces: `Intro` nhận thêm props `xpSaved: XpState|null`, `onStartXp(): void`, `onResumeXp(g: XpState): void`, `onDiscardXp(): void`; hiển thị lựa chọn hai chế độ ("Chơi 4 đội" như cũ, "Xung phong") và thẻ **Chơi tiếp** riêng cho ván Xung phong (có `Mở file` dùng `readXpFile`). Các thẻ và nút của chế độ 4 đội giữ nguyên.

**Hành vi trong `App.jsx`:**
- Thêm state: `xpOrder`, `xpDone`, `xpResults`, `xpCur`, `xpSaved` (khởi tạo từ `readXpSave()`).
- Phase mới `xpboard`, `xpplay`, `xpend`. Bắt đầu ván mới: `xpOrder = shuffle(XP_QUESTIONS)`, `xpDone = new Set()`, `xpResults = {}`.
- Tự lưu bằng `writeXpSave` khi `phase==='xpboard'`; `clearXpSave()` khi `xpend`.
- `onPick(idx)` đặt `xpCur`, phase `xpplay`; `XpPlay.onFinish(r)` ghi `xpDone/xpResults`, về `xpboard`, hoặc sang `xpend` khi đủ 25.
- Mở bản lưu đã đủ 25 hộp đi thẳng `xpend`.
- `?xp=N` (1..25) mở `XpPlay` với `XP_QUESTIONS[N-1]` và `preview` (không đồng hồ), tương tự `?cau=N`.
- Không đọc/ghi state hoặc khóa lưu của chế độ 4 đội trong nhánh Xung phong.

- [ ] **Step 1: Implement** các thay đổi trên.
- [ ] **Step 2: Kiểm tra bằng tay (luồng đầy đủ):** chọn Xung phong → mở hộp → dừng chuông → Sai → dừng chuông → Đúng → hộp đó thành ✔; tải lại trang thấy thẻ **Chơi tiếp** đúng số hộp; chơi tiếp đúng thứ tự cũ; thẻ **Chơi tiếp** của chế độ 4 đội (nếu có) vẫn độc lập; mở file lưu 4 đội ở nút Xung phong báo "File không hợp lệ".
- [ ] **Step 3: Kiểm tra 25 cảnh một lượt** bằng `?xp=1` … `?xp=25`: `dataset.loop` 5–8, hình rõ nghĩa, không lỗi console.
- [ ] **Step 4: Kiểm tra không hồi quy:** chơi nhanh chế độ 4 đội một câu (có cảnh cũ, lặp bình thường, chuông, vòng quay, lưu/chơi tiếp).
- [ ] **Step 5: Commit.**

---

### Task 15: Tài liệu và kiểm tra cuối

**Files:**
- Modify: `README.md`

- [ ] **Step 1:** Thêm mục "Chế độ Xung phong" vào `README.md` (cách chơi, phím tắt, nơi sửa 25 câu `src/data/xpQuestions.js`, thêm cảnh ở `src/scenes/xpN.jsx` + `xpIndex.js`, khóa lưu riêng, `?xp=N`).
- [ ] **Step 2:** `npm test` PASS; `npm run build` và `npm run build:single` thành công; mở `dist-single/index.html` bằng đúp-bấm, chơi được một hộp Xung phong offline.
- [ ] **Step 3: Commit.**

---

## Self-Review

- **Spec coverage:** chọn chế độ (T14), 25 hộp ngẫu nhiên (T14, T11), cảnh lặp ≥5s (T4, T6–10), đồng hồ 30s, dừng chuông, đúng/sai, hết giờ (T2, T12), gợi ý 15s/25s (T2, T12), lưu riêng + file (T3, T14), màn kết thúc (T13), giữ nguyên chế độ 4 đội (T5, T14 step 4), README (T15).
- **Types:** `Round`, `XpState`, `XP_SCENE_KEYS`, `onFinish('right'|'timeout')` dùng nhất quán ở T2, T3, T12, T14.
- **Review Focus** có test ở T2 (dừng liên tục, hết giờ khi dừng, Đúng/Sai khi chưa dừng), T3 (file sai chế độ, id trùng, `done` sai), T14 step 2 (bản lưu đủ 25), T4 step 2 (cảnh cũ không đổi).
