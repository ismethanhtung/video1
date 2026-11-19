# Phong cách vẽ tay 画渣 (Huazha Doodle Style)

Phong cách của video Bilibili 画渣花小烙 (BV1TBx46pEwA). Skill đầy đủ:
`~/workspace/custom-skills/huazha_doodle_style/SKILL.md`.
Ảnh tham chiếu: `workspace/user/media_library/image/A_nh_ma_n_hi_nh_2026-11-19_lu_c_17.08.*`
(video chàm) và `..._17.34.55.png` （睡不着啊）, `..._17.35.40.png` （巧克力历史）,
`..._17.35.55.png` （痛）, `..._17.36.00.png` （经期腹泻）, `..._17.36.08.png` （死去的鸟儿尸体）.

## Quy tắc cốt lõi (đo từ ảnh gốc)

1. **Nét vẽ:** viền nâu đậm `#3b2a1a`, dày 5–7px (khung 960px), hơi lệch tay
   (`blobPath`/`jhash`). Không bao giờ vẽ hình học hoàn hảo.
2. **Màu:** tô phẳng, không gradient. Da `#fffdf8`, tóc `#6e4a2f`, áo xanh
   `#4a90d9`, đỏ `#d94f3d`, vàng `#f2c94c`, má hồng `#f2a0c0`, nước mắt `#7fc4e8`.
3. **Nền:** màu phẳng tràn khung (xanh đêm, nâu ấm, xanh nhạt, cam ấm) hoặc
   nền trắng + MỘT hình hữu cơ lớn (gối, vũng nước). Giấy kẻ ô chỉ dùng cho
   khung kiểu sơ đồ, không dùng cho khung cảm xúc.
4. **Nhân vật:** đầu to : thân nhỏ ≈ 1:1. **Cô gái:** tóc nâu DÀI hình
   chuông (hẹp ở đỉnh, xòe rộng qua vai ±180, đáy sóng lượn), mái hòa vào
   tóc chỉ viền đường lượn dưới, mặt trắng to tròn rx≈112, mắt vui là 2
   cung ∪ dày có mi hất, miệng cười há to ruột đỏ sẫm + lưỡi hồng, 1 sợi
   tóc cong ở đỉnh đầu. Tay chân cụt, không ngón tay.
5. **Mắt là quan trọng nhất:** mắt là 2 vòng tròn trắng LỚN, đường kính ≈ 25%
   chiều rộng mặt, con ngươi nhỏ (bằng ~1/3 bán kính mắt), nhìn lệch hoặc
   nhìn xuống. Mí trên là đường cong ngang. Mệt/buồn thì thêm quầng thâm
   (vệt xám-nâu `#c9b8a8` dưới mắt).
6. **Miệng rất nhỏ:** đường ngang, `^`, oval nhỏ, hoặc đường lượn sóng.
   Chỉ khi cười vui mới mở miệng TO (ruột đỏ sẫm `#9e3d2c` + lưỡi hồng
   `#e87a6a`); chỉ khi hét mới mở miệng to không lưỡi.
7. **Má hồng:** mảng oval mềm, không phải hàng chấm (chấm chỉ dùng cho nhân
   vật hạt nhỏ).
8. **Dấu hiệu cảm xúc (không được thiếu):** nước mắt xanh chảy dài, vạch run
   rẩy quanh đầu/thân, giọt mồ hôi, vạch tốc độ vàng, bong bóng `...`,
   đạo cụ nói rõ tình huống (đồng hồ 03:14, biển gỗ, bồn cầu, gối).
9. **Bố cục:** 1 nhân vật chính / khung, cao 40–60% khung. Chữ tiêu đề LỚN
   (2–5 chữ, trắng viền nâu trên nền màu, nghiêng -2° đến -4°, được phép
   chồng lên tóc) vẽ TRƯỚC, nhân vật vẽ SAU, đè lên. Tối đa 1–3 đạo cụ,
   mỗi cái nhìn 1 giây là nhận ra. Để khoảng trống có chủ ý.
10. **Tư thế kể chuyện:** nằm dài, gục xuống, ngồi bệt, ôm tách — đừng bao
    giờ xếp nhân vật đứng thẳng như sơ đồ.
12. **Hệ thống: phong cách cố định, nội dung tham số hóa.** Phong cách
    (nét, màu, mặt, dấu hiệu cảm xúc, chữ tiêu đề, phụ đề) KHÔNG BAO GIỜ
    đổi theo câu chuyện. Nội dung đổi bằng tham số: loài (cô gái, hạt,
    tách, sư tử...), tư thế (`dung`/`ngoi`/`ban`, tay dang), trang phục
    (`hien-dai`, váy + quần + giày, `co-dai` hán phục + búi + trâm + quạt),
    hoạt động/đạo cụ (gõ laptop, ngồi sofa, cầm điện thoại, đèn lồng,
    bong bóng thoại), cảm xúc (`cuoi`/`thuong`/`buon`/`khoc`/`met`/
    `ngac-nhien`/`gian`/`hoi`/`buc`). Cần cái mới thì thêm 1 giá trị tham
    số hoặc 1 hàm đạo cụ nhỏ — không bao giờ vẽ lại nhân vật từ đầu.
13. **Mềm mại:** hình tròn mềm khắp nơi (đầu tóc xoăn cụp vào, sofa là
    khối tròn lớn, laptop bo tròn), má hồng là mảng oval LỚN, con ngươi
    nhìn lệch/xuống, tư thế tự nhiên thư giãn (ngồi xếp bằng, dang tay
    nhún vai, tay đặt trên bàn phím), đạo cụ to mềm và ít.

## Bảng biểu cảm

| Cảm xúc | Mắt | Miệng | Dấu hiệu thêm |
|---|---|---|---|
| Vui | nhắm cong | cười há to | — |
| Thường/nói | nửa nhắm (mí ngang 1/3 trên) | `^` | — |
| Ngạc nhiên | tròn to, con ngươi ở giữa | oval nhỏ há | — |
| Mệt/mất ngủ | to + quầng thâm | đường ngang | vạch run, nằm trên gối |
| Buồn/đau | nửa nhắm + quầng | lượn sóng | nước mắt, nằm sấp trên vũng màu |
| Khóc | to | há lượn sóng | 2–3 giọt nước mắt dài mỗi bên |
| Hét | to | há rộng có lưỡi | vạch run quanh thân |
| Chết/ngất | nằm ngửa, con ngươi lệch | nhỏ | vạch vàng, cánh xòe |

## Vì sao bản trước "đúng mà không đẹp" (19/11)

- Mắt quá nhỏ (cung tròn hoặc chấm nhỏ) — khác biệt lớn nhất.
- Mặt quá gọn, đối xứng, hình học; ảnh gốc hữu cơ, hơi lệch, tóc rối.
- Nền giấy kẻ ô ở mọi khung; ảnh gốc dùng màu phẳng tràn khung.
- Bố cục kiểu sơ đồ (ô vuông, hàng ngang, nhãn); ảnh gốc là 1 khoảnh khắc
  cảm xúc lớn / khung.
- Miệng nào cũng `^`; ảnh gốc có cả bảng miệng.
- Thiếu nước mắt, quầng thâm, vạch run, mồ hôi, chữ tiêu đề lớn, tư thế nằm.

## Ánh xạ vào code

- `src/doodle.js`: `faceSVG` (mắt to, mí, quầng, miệng; biểu cảm
  `cuoi`/`thuong`/`buon`/`khoc`/`met`/`ngac-nhien`/`gian`/`hoi`/`buc`),
  `blushDots`/`blushOval`, `girlSVG` (tóc dài hình chuông + mái + sợi cong
  đỉnh đầu; opts `pose`, `outfit`, `skirt`, `arms`, `bun`, `fan`, `phone`,
  `shirt`, `hands`, `cup`), `blobCharSVG`, `cupSVG`, `lionSVG` (bờm gai
  hoặc tai tròn, mũi sẫm, râu), `couchSVG`, `laptopDeskSVG`, `bubbleSVG`,
  `tearSVG`, `trembleSVG`, `sweatSVG`, `titleTextSVG`, `colorBgSVG`,
  `warmBgSVG`, `doodleSub`.
- `src/coffeeStory.js`: 30 cảnh video cà phê; các cảnh cảm xúc dùng dấu hiệu
  cảm xúc của skill này.
- Kiểm chứng: `~/workspace/verify_coffee.mjs` + render thật bằng
  `@resvg/resvg-js` ở `~/workspace/.render-check`, xem ảnh rồi mới ship.
