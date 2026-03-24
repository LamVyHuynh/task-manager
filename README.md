# Trang Quản Lý Công Việc Cá Nhân

Đây là Single Page Application được xây dựng bằng React + Vite để hỗ trợ quản lý công việc cá nhân. Ứng dụng gồm các chức năng cơ bản như thêm, sửa, xóa, tìm kiếm, lọc công việc, theo dõi deadline và lưu dữ liệu bằng `localStorage`.

## Tính năng đã hoàn thành

- Thêm công việc mới với `title` và `deadline`
- Sửa công việc gồm `title`, `status`, `deadline`
- Xóa công việc
- Tìm kiếm công việc theo tên
- Lọc công việc theo trạng thái
- Lưu dữ liệu bằng `localStorage` để không mất khi refresh hoặc mở lại trình duyệt
- Cảnh báo task quá hạn và sắp đến hạn
- Thống kê nhanh: tổng số task, đã hoàn thành, quá hạn, sắp đến hạn
- Giao diện single-page, responsive cho desktop và mobile

## Công nghệ sử dụng

- React
- Vite
- Tailwind CSS v4
- ESLint
- `localStorage` cho client-side persistence

## Hướng dẫn cài đặt và chạy local

Yêu cầu:

- Node.js 18+ (khuyến nghị dùng bản LTS mới)
- npm

Chạy local:

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

Kiểm tra lint:

```bash
npm run lint
```

## Cấu trúc chính

- `src/App.jsx`: chứa phần lớn logic hiện tại của ứng dụng, bao gồm CRUD, filter, search, localStorage, deadline warning và giao diện
- `src/index.css`: import Tailwind CSS và một số thiết lập base
- `vite.config.js`: cấu hình Vite và plugin Tailwind CSS

## Các quyết định kỹ thuật

### 1. Dùng `useState` + `localStorage`

Vì đề bài yêu cầu dữ liệu không bị mất khi tắt trình duyệt, em chọn `localStorage` để lưu danh sách công việc. Đây là cách phù hợp với phạm vi bài test vì dễ triển khai và vẫn đáp ứng được yêu cầu lưu dữ liệu cơ bản.

State được quản lý bằng `useState`, sau đó đồng bộ vào `localStorage` bằng `useEffect` mỗi khi `tasks` thay đổi.

### 2. Giữ logic trong `App.jsx`

Ở phiên bản hiện tại, em đang gom phần lớn logic trong `App.jsx` để dễ theo dõi state và thuận tiện khi làm từng bước chức năng.

Cách làm này giúp:

- dễ đọc luồng xử lý
- dễ debug hơn khi mới học React
- giảm độ phức tạp ở giai đoạn đầu

Nếu có thêm thời gian, em sẽ tách nhỏ thành:

- `TaskForm`
- `TaskList`
- `TaskCard`
- `StatsBar`
- custom hook `useTasks`

### 3. Quy tắc xử lý deadline

- `Quá hạn`: `deadline < ngày hiện tại`
- `Sắp đến hạn`: `deadline` trong khoảng `0-3 ngày tới`
- Task có trạng thái `DONE` sẽ không hiện cảnh báo deadline nữa

Để tránh sai lệch do giờ/phút/giây, phần ngày được đưa về mốc `00:00:00` trước khi so sánh.

### 4. Search và filter

Thay vì tạo thêm một state riêng cho danh sách đã lọc, em xử lý trực tiếp từ dữ liệu `tasks` kết hợp với:

- `status`
- `searchItem`

Cách này giúp code đơn giản hơn và tránh lưu nhiều state trùng ý nghĩa.

### 5. Chọn Tailwind CSS cho phần giao diện

Em dùng Tailwind CSS để làm giao diện vì dễ dựng layout nhanh, responsive tốt và thuận tiện khi chỉnh UI cho cả desktop lẫn mobile.

## Những điểm sẽ cải thiện nếu có thêm thời gian

- Tách `App.jsx` thành các component nhỏ để dễ bảo trì hơn
- Chuẩn hóa giá trị `status` thành constants để tránh typo
- Thêm `description`, `priority`, `category` cho task
- Thêm drag-and-drop để đổi trạng thái task nhanh hơn
- Thêm modal thay cho edit inline để UI gọn hơn trên mobile
- Viết unit test / component test cho CRUD, filter, deadline logic
- Bổ sung animation nhẹ và polish thêm UX cho mobile
- Cải thiện accessibility: keyboard flow, aria-label, contrast states

## Trạng thái hiện tại

Hiện tại ứng dụng đã đáp ứng các yêu cầu chính của đề bài và có thể chạy local, build production, cũng như kiểm tra lint.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
