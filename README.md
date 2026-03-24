# Trang Quản Lý Công Việc Cá Nhân

Single Page Application được xây dựng bằng React + Vite để quản lý công việc cá nhân. Ứng dụng tập trung vào các thao tác quan trọng nhất: tạo task, cập nhật task, theo dõi deadline, tìm kiếm, lọc dữ liệu và lưu trạng thái bằng `localStorage`.

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

- `src/App.jsx`: toàn bộ logic hiện tại của SPA, bao gồm CRUD, filter, search, localStorage, warning và UI
- `src/index.css`: import Tailwind CSS và typography base
- `vite.config.js`: cấu hình Vite và plugin Tailwind CSS

## Các quyết định kỹ thuật

### 1. Dùng `useState` + `localStorage`

Đề bài yêu cầu dữ liệu không bị mất khi tắt trình duyệt. Vì phạm vi bài test là SPA đơn giản và không cần backend, `localStorage` là lựa chọn phù hợp nhất:

- dễ implement
- dễ giải thích
- đủ để đáp ứng yêu cầu persistence cơ bản

State được quản lý bằng `useState`, sau đó đồng bộ vào `localStorage` bằng `useEffect` mỗi khi `tasks` thay đổi.

### 2. Giữ logic trong `App.jsx`

Trong quá trình làm bài, phiên bản hiện tại ưu tiên hướng dễ học và dễ review từng bước. Vì vậy logic được giữ trong `App.jsx` thay vì tách thành nhiều component nhỏ ngay từ đầu.

Lựa chọn này giúp:

- dễ theo dõi luồng state
- dễ debug với người mới học React
- giảm độ phức tạp khi mới xây dựng tính năng

Nếu mở rộng thêm, nên tách thành:

- `TaskForm`
- `TaskList`
- `TaskCard`
- `StatsBar`
- custom hook `useTasks`

### 3. Quy tắc xử lý deadline

- `Quá hạn`: `deadline < ngày hiện tại`
- `Sắp đến hạn`: `deadline` trong khoảng `0-3 ngày tới`
- Task có trạng thái `DONE` sẽ không hiện cảnh báo deadline nữa

Để tránh sai lệch do giờ/phút/giây, giá trị ngày được đưa về mốc `00:00:00` trước khi so sánh.

### 4. Search và filter được xử lý trên dữ liệu đã có

Thay vì tạo thêm một state riêng cho danh sách lọc, ứng dụng tính `filteredTasks` trực tiếp từ:

- `tasks`
- `status`
- `searchItem`

Cách này giúp UI đơn giản hơn và tránh duplicate state không cần thiết.

### 5. Chọn Tailwind CSS cho bước UI

Tailwind được chọn để:

- tạo layout nhanh
- responsive dễ điều chỉnh
- tiện cho việc polish UI trên desktop/mobile

Giao diện hiện tại theo hướng single-page, card-based, ưu tiên khả năng đọc nhanh task và thao tác nhanh trên cùng một màn hình.

## Những điểm sẽ cải thiện nếu có thêm thời gian

- Tách `App.jsx` thành các component nhỏ để dễ bảo trì hơn
- Chuẩn hóa giá trị `status` thành constants để tránh typo
- Thêm `description`, `priority`, `category` cho task
- Thêm drag-and-drop để đổi trạng thái task nhanh hơn
- Thêm modal thay cho edit inline để UI sạch hơn trên mobile
- Viết unit test / component test cho CRUD, filter, deadline logic
- Bổ sung animation nhẹ và polish thêm UX cho mobile
- Cải thiện accessibility: keyboard flow, aria-label, contrast states

## Trạng thái hiện tại

Ứng dụng hiện đã đáp ứng phần lớn yêu cầu chức năng của đề bài và có thể chạy local, build production, lint clean.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
