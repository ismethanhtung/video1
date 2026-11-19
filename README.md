# Làm video bằng code — Demo

Nhân vật 2D được vẽ 100% bằng code (SVG), không vẽ tay, không dùng AI tạo ảnh.
Ý tưởng từ video ["Claude Làm Nhân Vật 2D?"](https://www.youtube.com/watch?v=mZvDTFSCq5M):
Claude tự viết code để vẽ, người chỉ xem và chê.

## Demo có gì?

- Cậu bé áo vàng, đeo kính — vẽ bằng `src/character.js`
- 6 biểu cảm: vui, cười lớn, ngạc nhiên, buồn, nháy mắt, mắt tim
- 6 tư thế: vẫy tay, nhảy lên, chỉ tay, giơ hai tay, cúi chào, đứng yên
- Timeline 5 cảnh, tổng 16 giây, tự chạy (cảnh cuối là đánh nhau)
- Đổi màu áo, màu nền, chữ trên màn hình, bật mưa giấy màu
- **v4 — Phim "Chuyện làng quê" 90 giây:** đúng phong cách ảnh bạn gửi — 3 căn nhà lá, cây dừa, trời chiều vàng cam, Má (áo tím, tóc búi), Anh Hai (áo xanh), Tôi (áo sọc đỏ trắng), chó vàng, nhãn tên trong hộp trắng, phụ đề đen chữ trắng lớn. 6 cảnh × 15 giây: chiều ở xóm, Má chèo xuồng bán chè đậu, đi dọc bờ rạch, điều kiêng của xóm ở khúc sông, sáng hôm sau, về nhà lúc hoàng hôn. Code ở `src/village.js` + `src/villageStory.js`.
- **v4.1 — Sửa lỗi dàn cảnh:** phụ đề neo đáy khung 540 (không tràn), dàn cảnh v3 chân chạm đất/bờ, cảnh 2 v4 hai anh em + chó lên bờ và bong bóng thoại của Má hiện lại.
- **v5 — Phim Doraemon "Chong chóng tre" 90 giây:** phong cách nét vẽ nghệch ngoạc, cute — nét chì hơi lệch, viền đôi mờ, hình đơn giản nhưng nhận ra ngay Doraemon (tròn xanh, mũi đỏ, chuông vàng, túi thần kỳ), Nobita (áo vàng, kính tròn, tóc rối), Gian (to, áo cam), Shizuka (váy hồng). 6 cảnh × 15 giây: Gian đuổi Nobita, Doraemon chui ra từ ngăn kéo lấy chong chóng tre, Nobita bay lên trời, gặp Shizuka ở công viên, chong chóng hết pin, Doraemon cứu lúc hoàng hôn. Code ở `src/doraemon.js` + `src/doraemonStory.js`.
- **v6 — Phim ngắn "Sa mạc không sông" 30 giây:** đúng phong cách ảnh tham chiếu — trời xanh, mặt trời lớn, cồn cát lớp lớp, người đàn ông áo thobe trắng, khăn kẻ đỏ, dép đen, đào giếng tìm nước. 3 cảnh × 10 giây: đào giếng giữa sa mạc không thấy nước, nhà máy khử mặn bên bờ biển biến nước biển thành nước ngọt, nước ngọt theo ống tới mọi nhà trong thành phố. Code ở `src/desert.js` + `src/desertStory.js`.
- **v7 — Tranh cà phê phong cách vẽ tay (ảnh tĩnh, chưa có chuyển động):** học theo video Bilibili của 画渣花小烙 — viền nâu đậm dày hơi lệch tay, màu phẳng dịu, nhân vật hạt tròn (mắt nửa nhắm, miệng ^, má hồng 3 chấm), cô gái tóc nâu dài áo xanh dẫn chuyện, nền giấy kẻ ô, khung viền dày, phụ đề chữ đậm viền trắng. 6 khung hình về cà phê: giới thiệu, ba loại hạt (Arabica thơm / Robusta đậm / Liberica lạ), quy trình hái–rang–xay–pha phin, ba món (đen đá / sữa đá / bạc xỉu), uống nhiều quá (mất ngủ, tim đập nhanh, run tay), kết. Code ở `src/doodle.js` + `src/coffeeStory.js` — bộ công cụ vẽ tay dùng chung để giữ đồng nhất phong cách cho các phim sau.
- **v8 — Video cà phê 5 phút "Hành trình của hạt cà phê Bi":** 30 cảnh × 10 giây = 300 giây, mỗi cảnh 1 tranh tĩnh + 1 câu phụ đề kể chuyện, căn đúng thời gian. Bi sinh ra từ hoa trắng, quả chín xanh–vàng–đỏ, được hái, phơi nắng, gặp ba bạn Arabica/Robusta/Liberica, vào máy rang nổ bụp bụp, xay thành bột, pha phin / espresso / latte art / bạc xỉu / cà phê trứng / cold brew, rồi cà phê vỉa hè, ngồi bệt, quán cóc–quán sang, cà phê thế giới, đêm deadline, caffeine vào não, 4 ly là vừa, uống nhiều quá, giờ vàng 9 giờ sáng, kết. Code ở `src/coffeeStory.js` (30 cảnh, `coffeeSceneAt`), đạo cụ mới trong `src/doodle.js` (cây, giỏ, máy rang, máy espresso, ghế nhựa, laptop, não, đồng hồ...). App có nút phát video 5 phút, 30 nút chọn cảnh và nút xuất WebM.
- **v10 — Vẽ lại nhân vật cô gái y hệt ảnh gốc:** user gửi chân dung cô gái
  (`..._17.46.24.png`, nền xanh tím, áo cam, tóc dài) và yêu cầu tập trung
  vào nhân vật trước vì bản cũ "quá đơn sơ, không chỉn chu". Viết lại
  `girlSVG` trong `src/doodle.js`: tóc nâu dài hình chuông (hẹp ở đỉnh,
  xòe rộng qua vai, đáy sóng lượn), mái hòa vào tóc chỉ viền đường lượn
  dưới, mặt trắng to tròn (rx 112), mắt vui là 2 cung ∪ dày có mi hất,
  miệng cười há to ruột đỏ sẫm `#9e3d2c` + lưỡi hồng, 1 sợi tóc cong ở
  đỉnh đầu, opts `shirt`/`hands`/`cup`. Chân dung đối chiếu render bằng
  `~/workspace/.render-check/render_portrait.mjs` (nền `#5b5bd6` + chấm sao
  + áo cam `#f5a623`), xem cạnh ảnh gốc rồi mới ship. Skill và `STYLE.md`
  cập nhật theo quy tắc mới.
- Panel "Code đang chạy" cập nhật theo tham số bạn chọn
- Xuất video WebM (ghi theo thời gian thực 12s, dùng Chrome), tải SVG

## Chạy thử

Mở `index.html` bằng trình duyệt, hoặc:

```bash
npx serve .
# rồi mở http://localhost:3000
```

Không cần build, không cần cài thêm gì.

## Cấu trúc

```
.
├── index.html          # Sân khấu 16:9 + bảng điều khiển
├── src/
│   ├── character.js    # Hàm renderCharacter({expression, pose, shirt, bg})
│   ├── app.js          # Timeline, nút bấm, xuất video WebM
│   └── style.css
├── docs/
│   └── PUSH_TO_GITHUB.md
└── package.json
```

## Cách làm công cụ thật (4 bước trong video gốc)

1. **Gom mẫu** — chọn style nhân vật muốn giữ.
2. **Đo mẫu** — bắt AI đo tỉ lệ, màu, nét vẽ thành tham số.
3. **Làm thật rồi so** — vẽ bằng code, so với mẫu, sửa tới khi giống.
4. **Gói thành Skill** — lưu quy tắc vẽ + prompt để lần sau chỉ cần nói
   "thêm nhân vật mới" là ra đúng style.

Vì nhân vật là tham số, nên giữ nguyên mặt / áo / tỉ lệ qua mọi cảnh,
đổi biểu cảm chỉ cần đổi mắt - miệng - tay.

## Làm việc chung

Xem `docs/PUSH_TO_GITHUB.md`. Quy trình ngắn gọn:

- Bạn push folder này lên GitHub, tạo repo.
- Muse clone repo về, code trên branch riêng, push lên để bạn review / merge.
# video1
