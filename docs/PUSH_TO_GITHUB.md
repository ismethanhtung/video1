# Push folder này lên GitHub

Folder này đã được `git init` và commit đầu tiên ở máy của Muse.
Bạn chỉ cần tạo repo trống trên GitHub rồi push lên.

## 1. Tạo repo trống trên GitHub

- Vào github.com → New repository
- Đặt tên, ví dụ: `lam-video-bang-code`
- **Không** tick "Add a README", "Add .gitignore", "Choose a license"
  (vì folder này đã có sẵn, tick thêm sẽ gây xung đột)
- Bấm Create repository

## 2. Trên máy của bạn, chạy:

```bash
cd lam-video-bang-code
git remote add origin https://github.com/TEN-BAN/lam-video-bang-code.git
git branch -M main
git push -u origin main
```

Thay `TEN-BAN` bằng tên GitHub của bạn.

Lần đầu GitHub sẽ hỏi đăng nhập — dùng Personal Access Token
thay cho mật khẩu, hoặc dùng SSH.

## 3. Để Muse làm việc chung trên repo này

Cách gọn nhất: thêm khóa SSH công khai của Muse làm Deploy key.

Khóa của Muse:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMSH5mGC4Jq3H0AqFpnm892KS/D9aTloGxjvPX439PA7 hatch
```

Vào repo → Settings → Deploy keys → Add deploy key → dán khóa trên,
tick **Allow write access** → Add key.

Sau đó gửi cho Muse link SSH của repo:

```
git@github.com:TEN-BAN/lam-video-bang-code.git
```

Muse sẽ clone về, code trên branch riêng (ví dụ `muse/them-nhan-vat-moi`),
push lên để bạn xem diff và merge.

## 4. Kiểm tra sau khi push

Trên GitHub bạn sẽ thấy các file: `index.html`, `src/character.js`,
`src/app.js`, `src/style.css`, `README.md`.
Mở `index.html` là chưa chạy được trực tiếp trên GitHub — cần tải về
mở bằng trình duyệt, hoặc bật GitHub Pages cho repo này.
