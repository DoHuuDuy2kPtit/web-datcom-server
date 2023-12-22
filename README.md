## Tài liệu triển khai code

### Cách chạy dự án

Các công nghệ sử dụng trong dự án:
- NodeJS, Express
- Knexjs: https://knexjs.org
- Objection: https://vincit.github.io/objection.js
- MySQL

Cài đặt các package:

`npm install`

Chạy source dự án:

`npm run dev`

### Giải thích cấu trúc thư mục của dự án.

Thư mục database: chứa các file cấu hình và tất cả các file migration để tương tác với database. Cách tương tác với thư mục database/migrations:

+ Tạo 1 file migration chạy câu lệnh: `knex migrate:make migration_name`

+ Chạy những file migrations thì chạy câu lệnh `npm run migrate:run`

+ Revert những thay đổi trong database thì chạy câu lệnh `npm run migrate:rollback`

Thư mục app:

+ Thư mục enums: chứa các enums được sử dụng trong dự án
+ Thư mục helpers: chứa các hàm sử dụng chung trong dự án
+ Thư mục model: chứa các Model, mỗi model tương ứng với 1 table trong database
+ Thư mục routes: định nghĩa các endpoint của server.
+ Thư mục http:
  1. Thư mục middlewares: sau khi request qua endpoint thì dữ liệu sẽ đi đến các middlewares được định nghĩa ở đây
  2. Thư mục controllers: sau khi qua các middlewares thì dữ liệu sẽ được validate và filter ở đây. Đồng thời sẽ gọi service để lấy dữ liệu và trả response về
  3. Thư mục services: ở đây sẽ thực hiện việc lấy, sửa, xóa các dữ liệu trong DB.