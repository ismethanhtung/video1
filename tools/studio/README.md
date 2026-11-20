# STUDIO — Công cụ sản xuất video hàng loạt bằng code

Mỗi video là một thư mục chứa `production.json` (máy đọc) + `PRODUCTION.md` (người đọc).
Chạy một lệnh là ra video mp4 dọc 540×960 có phụ đề cháy sẵn.

## Làm video mới (4 bước, đúng vai trò trong công ty)

1. **Ý tưởng** — chọn chủ đề "what if" + twist. Ghi vào `production.json`: `idea`
   (premise, hook, structure, tone) và `title`.
2. **Kịch bản** — viết lời thoại, mỗi cảnh 1 câu, nhịp ~3 giây/cảnh.
   Ghi vào `scenes[].sub`, `t0`, `t1` (nối tiếp, không hở).
3. **Phân cảnh** — mỗi cảnh ghi: `shot` (wide/medium/close/split),
   `setting` (bối cảnh), `chars` (ai, biểu cảm, tư thế), `props` (đạo cụ),
   `title` (chữ lớn trên khung, nếu có).
4. **Dựng** — chạy lệnh dưới, xong kiểm chứng bằng mắt rồi mới giao:
   ```bash
   ./run.sh <thư-mục-video>/production.json <thư-mục-video>/<tên>.mp4
   ```

## Cấu trúc

- `stick.js` — toolkit vẽ SVG: nhân vật que `char()`, buồng `pod()`,
  10 bối cảnh `bg*()`, 8 đạo cụ. Muốn thêm bối cảnh/đạo cụ mới: thêm hàm
  ở đây, rồi dùng tên hàm đó trong `production.json`.
- `render.mjs` — đọc `production.json` → vẽ từng cảnh thành PNG 540×960
  (thứ tự: bối cảnh → đạo cụ → nhân vật → tiêu đề) → ghi `subs.srt`.
- `assemble.sh` — ffmpeg ghép PNG + đốt phụ đề thành mp4.
  Phụ đề dọc dùng FontSize=9 (≈30px thật, vì libass phóng 960/288 ≈ 3.33×).
- `run.sh` — chạy cả hai bước trên.

## Quy tắc đã học (đừng phá)

- Nhân vật giữ nguyên tạo hình ở mọi cảnh (An: áo tím, tóc nâu nhọn).
- Đạo cụ không đặt dưới y=820 (vùng phụ đề); nhân vật đặt chân ở y≈780.
- `assemble.sh` nhận thư mục frames làm tham số, kiểm tra file thiếu thì dừng.
- Kiểm chứng: render đủ khung, xem thật ít nhất 4 khung (đầu, giữa, cao trào,
  kết), trích 2 khung từ video để chắc phụ đề đúng giờ.

## Video đã làm

- `teleport/` — "Dịch chuyển tức thời", 60s, 20 cảnh. Xem `PRODUCTION.md`.
