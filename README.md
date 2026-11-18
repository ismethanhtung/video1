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
