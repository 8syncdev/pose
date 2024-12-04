

-- Insert chapters

INSERT INTO "chapters" ("course_id", "name", "description", "order", "duration_minutes")
VALUES
((SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
    'Chương 1: Kiến thức cơ bản về Python',
    'Chương 1: Kiến thức cơ bản về Python',
    1,
    840),
((SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
    'Chương 2: Câu lệnh điều khiển',
    'Chương 2: Câu lệnh điều khiển',
    2,
    420),
((SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
    'Chương 3: Hàm trong Python',
    'Chương 3: Hàm trong Python',
    3,
    300),
((SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
    'Chương 4: Danh sách (List)',
    'Chương 4: Danh sách (List)',
    4,
    330),
((SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
    'Chương 5: Chuỗi (String)',
    'Chương 5: Chuỗi (String)',
    5,
    240),
((SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
    'Chương 6: Tập hợp (Set)',
    'Chương 6: Tập hợp (Set)',
    6,
    270),
((SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
    'Chương 7: Từ điển (Dictionary)',
    'Chương 7: Từ điển (Dictionary)',
    7,
    270),
((SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
    'Chương 8: Tuple',
    'Chương 8: Tuple',
    8,
    210);


-- Insert lessons

INSERT INTO "lessons" ("chapter_id", "name", "description", "order", "content", "duration_minutes", "is_free")
VALUES
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 00. Hướng dẫn Python',
    'Bài 00. Hướng dẫn Python',
    0,
    'Hiện nay, Python là một trong những ngôn ngữ lập trình phổ biến nhất. Mặc dù nó là một ngôn ngữ đa mục đích, nhưng được sử dụng trong các lĩnh vực ứng dụng khác nhau như Machine Learning, Artificial Intelligence, phát triển web, IoT và nhiều hơn nữa.

Hướng dẫn Python này đã được viết dành cho người mới bắt đầu để giúp họ hiểu các khái niệm cơ bản đến nâng cao của Ngôn ngữ lập trình Python. Sau khi hoàn thành hướng dẫn này, bạn sẽ thấy mình ở mức độ thành thạo tốt về Python, từ đó bạn có thể tiến thêm vào các cấp độ cao hơn để trở thành một Kỹ sư Phần mềm hàng đầu thế giới.

Hướng dẫn Python này dựa trên phiên bản Python 3.11.2 mới nhất.



Python là một ngôn ngữ lập trình phổ biến rất được ưa chuộng, được dịch, tương tác, hướng đối tượng và mức độ cao. Python là một ngôn ngữ lập trình được thu gom và kiểu động. Nó được tạo ra bởi Guido van Rossum trong khoảng thời gian từ 1985 đến 1990. Giống như Perl, mã nguồn Python cũng có sẵn dưới Giấy phép Công cộng GNU (GPL).

Python hỗ trợ nhiều mô hình lập trình, bao gồm lập trình thủ tục, lập trình hướng đối tượng, lập trình hàm, lập trình mô-đun và lập trình hàm lambda. Mỗi mô hình này đều có ưu điểm và ứng dụng riêng, giúp người lập trình có nhiều lựa chọn linh hoạt khi phát triển ứng dụng và dự án trong Python.



Nếu bạn biết Python một cách thành thạo, bạn sẽ có một sự nghiệp tốt. Dưới đây là một số lựa chọn sự nghiệp nơi Python là một kỹ năng chính:

- Nhà phát triển game
- Thiết kế web
- Nhà phát triển Python
- Nhà phát triển Full-stack
- Kỹ sư Machine Learning
- Nhà khoa học dữ liệu
- Nhà phân tích dữ liệu
- Kỹ sư dữ liệu
- Kỹ sư DevOps
- Kỹ sư phần mềm
- Và nhiều vai trò khác



Dưới đây là các đặc điểm quan trọng của Ngôn ngữ lập trình Python:

- Hỗ trợ phương pháp lập trình hàm và cấu trúc cũng như OOP.
- Có thể sử dụng như một ngôn ngữ kịch bản hoặc có thể biên dịch thành mã byte để xây dựng các ứng dụng lớn.
- Cung cấp các loại dữ liệu động cấp cao và hỗ trợ kiểm tra loại động.
- Hỗ trợ thu gom rác tự động.
- Có thể dễ dàng tích hợp với C, C++, COM, ActiveX, CORBA và Java.



Phiên bản Python mới nhất là 3.x. Như đã đề cập trước đó, Python là một trong những ngôn ngữ được sử dụng rộng rãi nhất trên web. Dưới đây là một số ví dụ:

- Dễ học: Python có ít từ khóa, cấu trúc đơn giản và cú pháp rõ ràng. Điều này cho phép sinh viên nắm bắt ngôn ngữ nhanh chóng.
- Dễ đọc: Mã Python được định nghĩa và hiển thị rõ ràng hơn.
- Dễ bảo trì: Mã nguồn Python khá dễ bảo trì.
- Thư viện tiêu chuẩn rộng lớn: Hầu hết thư viện Python rất di động và tương thích trên nhiều nền tảng như UNIX, Windows và Macintosh.
- Chế độ tương tác: Python hỗ trợ chế độ tương tác cho phép kiểm tra và gỡ lỗi mã mẫu một cách tương tác.
- Di động: Python có thể chạy trên nhiều nền tảng phần cứng khác nhau và có cùng giao diện trên tất cả các nền tảng.
- Mở rộng: Bạn có thể thêm các mô-đun cấp thấp vào trình thông dịch Python. Các mô-đun này cho phép các nhà lập trình thêm hoặc tùy chỉnh công cụ của họ để trở nên hiệu quả hơn.
- Cơ sở dữ liệu: Python cung cấp giao diện cho tất cả các cơ sở dữ liệu thương mại lớn.
- Lập trình GUI: Python hỗ trợ các ứng dụng GUI có thể được tạo ra và chuyển sang nhiều hệ thống gọi, thư viện và hệ thống cửa sổ, như Windows MFC, Macintosh và hệ thống cửa sổ X của Unix.
- Có thể mở rộng: Python cung cấp một cấu trúc tốt hơn và hỗ trợ cho các chương trình lớn hơn so với lập trình script shell.



Hướng dẫn Python này phù hợp cho:

- Những người mới bắt đầu lập trình và muốn học một ngôn ngữ lập trình dễ hiểu và dễ sử dụng.
- Những lập trình viên có kinh nghiệm muốn mở rộng kỹ năng của mình bằng cách học một ngôn ngữ lập trình đang được sử dụng rộng rãi.
- Những người quan tâm đến các lĩnh vực như Machine Learning, Artificial Intelligence, phát triển web, IoT, vì Python được sử dụng rộng rãi trong những lĩnh vực này.
- Những người muốn tìm hiểu ngôn ngữ lập trình có cộng đồng hỗ trợ lớn, nhiều tài liệu và thư viện mã nguồn mở.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    TRUE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 01. Python - Tổng quan',
    'Bài 01. Python - Tổng quan',
    1,
    'Python là một ngôn ngữ lập trình kịch bản cao cấp, được phiên dịch, tương tác và hướng đối tượng. Python được thiết kế để có tính đọc hiểu cao. Nó thường sử dụng các từ khóa tiếng Anh thay vì dấu câu, và có ít cấu trúc cú pháp hơn so với các ngôn ngữ khác.



- **Phiên dịch**: Python được xử lý vào thời gian chạy bởi trình phiên dịch. Bạn không cần phải biên dịch chương trình trước khi thực thi nó.
- **Tương tác**: Bạn có thể ngồi tại dấu nhắc Python và tương tác trực tiếp với trình phiên dịch để viết chương trình của bạn.
- **Hướng đối tượng**: Python hỗ trợ phong cách lập trình hướng đối tượng, trong đó mã được đóng gói trong các đối tượng.
- **Dành cho người mới bắt đầu**: Python là một ngôn ngữ tuyệt vời cho các lập trình viên mới bắt đầu và hỗ trợ phát triển một loạt các ứng dụng từ xử lý văn bản đơn giản đến trình duyệt WWW và trò chơi.



Triết lý thiết kế của Python tập trung vào đơn giản, đọc hiểu và không mơ hồ. Python nổi tiếng với cách tiếp cận "batteries included", với một thư viện chuẩn toàn diện của các hàm và module.



Python để bạn tự do lựa chọn lập trình theo cách hướng đối tượng, thủ tục, chức năng, hướng khía cạnh, hoặc thậm chí là hướng logic. Những tự do này khiến Python trở thành một ngôn ngữ tuyệt vời để viết mã sạch và đẹp.

Mã Pythonic là mã có tính đọc hiểu cao, ngắn gọn và dễ bảo trì.



Triết lý Pythonic liên quan đến mã không chỉ hoạt động, mà còn là Pythonic. Mã Pythonic là mã có thể đọc được, ngắn gọn và dễ bảo trì.

**Lưu ý**: Bạn có thể xem triết lý Python bằng cách nhập `import this` trong Python Shell.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 02. Python - Lịch sử',
    'Bài 02. Python - Lịch sử',
    2,
    'Python được phát triển bởi Guido van Rossum vào cuối thập kỷ 1980 và đầu thập kỷ 1990 tại Viện Nghiên cứu Toán học và Khoa học Máy tính Quốc gia Hà Lan.

Python được phát triển dựa trên nhiều ngôn ngữ khác nhau, bao gồm ABC, Modula-3, C, C++, Algol-68, SmallTalk, và Unix shell cùng với các ngôn ngữ lập trình kịch bản khác.

Python được bản quyền. Giống như Perl, mã nguồn Python hiện đã có sẵn dưới Giấy phép Công cộng GNU (GPL).

Đối với nhiều người không am hiểu, từ "Python" liên quan đến một loài rắn. Tuy nhiên, Rossum cho biết việc chọn tên Python liên quan đến một series hài hước phổ biến trên BBC có tên Monty Python''s Flying Circus.

Là kiến trúc sư chính của Python, cộng đồng phát triển đã trao cho ông danh hiệu "Benevolent Dictator for Life" (BDFL - Đại diện Từ thiện Vĩnh viễn). Tuy nhiên, vào năm 2018, Rossum từ bỏ danh hiệu đó. Sau đó, việc phát triển và phân phối phiên bản tham chiếu của Python được thực hiện bởi một tổ chức phi lợi nhuận có tên là Python Software Foundation.



Python được phát minh bởi một lập trình viên Hà Lan là Guido Van Rossum vào cuối thập kỷ 1980. Và, phiên bản đầu tiên của Python (0.9.0) đã được phát hành vào năm 1991.



Dưới đây là các giai đoạn quan trọng trong lịch sử của Python

- **Python 0.9.0**: Phiên bản đầu tiên của Python là 0.9.0. Nó được phát hành vào tháng 2 năm 1991. Nó bao gồm hỗ trợ cho các nguyên tắc lập trình hướng đối tượng cốt lõi.
  
- **Python 1.0**: Vào tháng 1 năm 1994, phiên bản 1.0 đã được phát hành, được trang bị các công cụ lập trình chức năng, các tính năng như hỗ trợ cho số phức, v.v.
  
- **Python 2.0**: Phiên bản chính tiếp theo - Python 2.0 được ra mắt vào tháng 10 năm 2000. Nhiều tính năng mới như comprehension của danh sách, thu gom rác và hỗ trợ Unicode được bao gồm với nó.
  
- **Python 3.0**: Python 3.0, một phiên bản hoàn toàn được tái cấu trúc của Python được phát hành vào tháng 12 năm 2008. Mục tiêu chính của việc tái cấu trúc này là loại bỏ nhiều không đồng nhất đã xuất hiện trong các phiên bản Python 2.x. Python 3 được trở lại thành Python 2.6. Nó cũng bao gồm một tiện ích có tên là python2to3 để hỗ trợ dịch tự động mã Python 2 sang Python 3.

- **Kết thúc vòng đời (EOL) cho Python 2.x**: Ngay cả sau khi Python 3 được phát hành, Python Software Foundation vẫn tiếp tục hỗ trợ nhánh Python 2 với các phiên bản nhỏ về mặt kỹ thuật cho đến năm 2019. Tuy nhiên, họ quyết định ngừng hỗ trợ vào cuối năm 2020, lúc đó Python 2.7.17 là phiên bản cuối cùng trong nhánh này.



Trong khi đó, ngày càng nhiều tính năng đã được tích hợp vào nhánh 3.x của Python. Hiện nay, Python 3.11.2 là phiên bản ổn định hiện tại, được phát hành vào tháng 2 năm 2023.



Một trong những tính năng quan trọng nhất của Python phiên bản 3.11 là cải tiến đáng kể về tốc độ. Theo tài liệu chính thức của Python, phiên bản này nhanh hơn phiên bản trước (3.10) lên đến 60%. Nó cũng nói rằng bộ kiểm tra tiêu chuẩn cho thấy tỷ lệ thực thi nhanh hơn 25%.

Python 3.11 cũng có thông báo ngoại lệ tốt hơn. Thay vì tạo ra một traceback dài khi xảy ra một ngoại lệ, chúng ta bây giờ nhận được biểu thức chính xác gây ra lỗi.

Theo đề xuất của PEP 678, phương thức add_note() được thêm vào lớp BaseException. Bạn có thể gọi phương thức này bên trong mệnh đề except và truyền một thông báo lỗi tùy chỉnh.

Nó cũng thêm hàm cbroot() vào module maths. Nó trả về căn bậc ba của một số cho trước.

Một module mới là tomlib được phát triển cho Python, cung cấp một cách thức mới để xử lý các tập tin cấu hình và dữ liệu được lưu trữ dưới dạng định dạng TOML (TOML stands for "TOML is a configuration file format that is easy to read and write. It is intended to be a more human-readable and easier-to-use alternative to JSON").

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 03. Python - Các Đặc Điểm và Ưu Điểm',
    'Bài 03. Python - Các Đặc Điểm và Ưu Điểm',
    3,
    'Python là một ngôn ngữ lập trình mạnh mẽ với nhiều đặc điểm và ưu điểm hấp dẫn, làm cho nó trở thành lựa chọn phổ biến của các nhà phát triển. Dưới đây là một bản tóm tắt chi tiết về các đặc điểm và ưu điểm của Python:




   - Python được biết đến với việc dễ học nhất đối với các lập trình viên mới. Với cú pháp đơn giản, Python giúp người học dễ dàng tiếp cận và hiểu được cách làm việc của nó một cách nhanh chóng.
   - Sử dụng thụt lề thay vì dấu ngoặc nhọn giúp giảm bớt sự phức tạp cú pháp và làm cho mã nguồn trở nên dễ đọc hơn.


   - Python là một ngôn ngữ dựa trên trình biên dịch, cho phép người lập trình thực thi và gỡ lỗi mã nguồn một cách dễ dàng và linh hoạt hơn.
   - Với tính năng này, người lập trình có thể thực hiện và thử nghiệm mã nguồn từng phần một, giúp tăng tốc quá trình phát triển.


   - Python cung cấp một shell tương tác, cho phép người dùng nhập các lệnh và biểu thức Python trực tiếp và nhận kết quả ngay lập tức.
   - Chế độ tương tác giúp người lập trình thử nghiệm và hiểu rõ hơn về các tính năng và thư viện của Python mà không cần viết mã hoàn chỉnh.


   - Python hỗ trợ nhiều mô hình lập trình, bao gồm lập trình hướng đối tượng, lập trình cấu trúc, và thậm chí là lập trình hàm.
   - Điều này cho phép các nhà phát triển chọn lựa phong cách lập trình phù hợp với nhu cầu và yêu cầu cụ thể của dự án.


   - Python đi kèm với một thư viện tiêu chuẩn phong phú, bao gồm nhiều mô-đun và gói cho các nhu cầu lập trình khác nhau.
   - Sự phong phú của thư viện tiêu chuẩn giúp giảm bớt thời gian phát triển và tăng hiệu suất của các dự án.


   - Python là một ngôn ngữ mã nguồn mở, cho phép các nhà phát triển tùy chỉnh và mở rộng mã nguồn theo nhu cầu của họ.
   - Python có sẵn trên nhiều nền tảng, bao gồm Windows, Linux, và macOS, giúp dễ dàng triển khai ứng dụng trên nhiều môi trường khác nhau.


   - Python hỗ trợ xây dựng các ứng dụng giao diện người dùng đồ họa thông qua các thư viện như TKinter, PyQt, và WxPython.
   - Việc hỗ trợ GUI cho phép người lập trình tạo ra các ứng dụng người dùng cuối thân thiện và hấp dẫn một cách dễ dàng.


   - Python hỗ trợ kết nối với nhiều loại cơ sở dữ liệu khác nhau thông qua giao diện DB-API.
   - Người lập trình có thể kết nối với các hệ quản trị cơ sở dữ liệu quan hệ (SQL) cũng như các hệ quản trị cơ sở dữ liệu NoSQL.


   - Python có khả năng mở rộng, cho phép người lập trình thêm các tính năng mới hoặc sửa đổi các tính năng hiện có một cách dễ dàng.
   - Việc viết và tích hợp các mô-đun bổ sung cho Python giúp tăng khả năng mở rộng của ứng dụng và dễ dàng mở rộng chức năng.


   - Python có một cộng đồng lớn và tích cực của các nhà phát triển trên toàn thế giới.
   - Sự phổ biến và tính đa dạng của Python đã tạo ra một môi trường phát triển sôi động với nhiều tài nguyên, hỗ trợ, và thông tin hữu ích.



Python không chỉ là một ngôn ngữ lập trình, mà còn là một hệ sinh thái đa dạng và mạnh mẽ.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 04. Python - Chương Trình Hello World',
    'Bài 04. Python - Chương Trình Hello World',
    4,
    'Trong hướng dẫn này, chúng ta sẽ học cách viết một chương trình Hello World đơn giản bằng ngôn ngữ lập trình Python. Chương trình này sẽ sử dụng hàm print() tích hợp sẵn trong Python để in ra chuỗi.



In ra chuỗi "Hello World" là chương trình đầu tiên trong Python. Chương trình này không yêu cầu bất kỳ đầu vào nào từ người dùng, nó chỉ in ra văn bản trên màn hình đầu ra. Nó được sử dụng để kiểm tra xem phần mềm cần thiết để biên dịch và chạy chương trình đã được cài đặt đúng cách hay chưa.



Dưới đây là các bước để viết một chương trình Python để in ra Hello World:

1. **Cài đặt Python:** Đảm bảo rằng Python đã được cài đặt trên hệ thống của bạn hoặc không. Nếu Python chưa được cài đặt, hãy cài đặt từ đây: [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. **Chọn Trình Soạn Thảo Văn Bản hoặc Môi Trường Phát Triển (IDE) để viết mã.**
3. **Mở Trình Soạn Thảo Văn Bản hoặc IDE, tạo một tệp mới, và viết mã để in ra Hello World.**
4. **Lưu tệp với tên và phần mở rộng ".py".**
5. **Biên dịch/Chạy chương trình.**



```python

print("Hello World")
```

Trong mã trên, chúng ta viết hai dòng. Dòng đầu tiên là bình luận Python sẽ được bỏ qua bởi trình biên dịch Python, và dòng thứ hai là câu lệnh print() sẽ in ra thông điệp được chỉ định ("Hello World") trên màn hình đầu ra.



```
Hello World
```





Rất dễ dàng để hiển thị thông điệp Hello World bằng cách sử dụng trình dịch Python. Khởi chạy trình dịch Python từ một cửa sổ dòng lệnh của Hệ điều hành Windows và gõ lệnh print từ dấu nhắc Python như sau:

**Ví dụ:**

```
PS C:\> python
Python 3.11.2 (tags/v3.11.2:878ead1, Feb 7 2023, 16:38:35) [MSC v.1934 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.

>>> print("Hello World")
Hello World
```

Tương tự, thông điệp Hello World cũng được in ra trên Hệ điều hành Linux.

**Ví dụ:**

```
$ python3
Python 3.10.6 (main, Mar 10 2023, 10:55:28) [GCC 11.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.

>>> print("Hello World")
Hello World
```



Trình dịch Python cũng hoạt động trong chế độ kịch bản. Mở bất kỳ trình soạn thảo văn bản nào, nhập văn bản sau đây và lưu với tên Hello.py

```python
print("Hello World")
```

Đối với Hệ điều hành Windows, mở cửa sổ dòng lệnh (CMD) và chạy chương trình như sau:

```
C:\>python hello.py
```

Điều này sẽ hiển thị đầu ra sau:

```
Hello World
```

Để chạy chương trình từ terminal Linux

```
$ python3 hello.py
```

Điều này sẽ hiển thị đầu ra sau:

```
Hello World
```



Trong Linux, bạn có thể chuyển đổi một chương trình Python thành một tập lệnh tự chạy. Câu lệnh đầu tiên trong mã nên là một dòng Shebang #!. Nó phải chứa đường dẫn đến chương trình Python. Trong Linux, Python được cài đặt trong thư mục /usr/bin, và tên của chương trình thực thi là python3. Do đó, chúng ta thêm câu lệnh này vào tệp hello.py

```python


print("Hello World")
```

Bạn cũng cần cấp quyền thực thi cho tệp bằng cách sử dụng lệnh chmod +x

```
$ chmod +x hello.py
```

Sau đó, bạn có thể chạy chương trình với dòng lệnh sau:

```
$ ./hello.py
```

Điều này sẽ hiển thị đầu ra sau:

```
Hello World
```



1. Tại sao chương trình đầu tiên được gọi là Hello World?
   - Đó chỉ là một chương trình đơn giản để kiểm tra cú pháp cơ bản và cấu hình trình biên dịch/phiên dịch của ngôn ngữ lập trình Python.

2. Có cần cài đặt Python để chạy chương trình Hello World không?
   - Có, việc cài đặt Python là cần thiết để chạy chương trình Hello World.

3. Làm thế nào để chạy một chương trình Python mà không cần cài đặt nó?
   - Python đã phát triển một môi trường trực tuyến nơi bạn có thể chạy mã của mình. Bạn có thể sử dụng trình biên dịch trực tuyến của Python để chạy chương trình Python của mình.

4. Sự khác biệt giữa Chương trình Đầu tiên và Chương trình Hello World trong Python là gì?
   - Không có sự khác biệt. Chương trình đầu tiên của Python thường được biết đến là chương trình Hello World.

5. Phương pháp/những phương pháp nào để in ra Hello World hoặc bất kỳ thông điệp nào khác?
   - Bạn có thể sử dụng các phương pháp sau:
     + Phương thức print()
     + Phương thức sys.stdout.write() bằng cách nhập mô-đun sys
     + Sử dụng f-string của Python

Đó là một bản tóm tắt về cách viết và thực thi chương trình Hello World trong Python cùng với một số câu hỏi thường gặp liên quan. Mỗi dòng code mới là một bước tiến mới trên con đường thành thạo Python. Chúc bạn thành công!

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 05. Python - Các Lĩnh Vực Ứng Dụng',
    'Bài 05. Python - Các Lĩnh Vực Ứng Dụng',
    5,
    'Python là một ngôn ngữ lập trình đa năng phổ biến, được sử dụng trong nhiều lĩnh vực ứng dụng khác nhau. Dưới đây là một cái nhìn tổng quan về các lĩnh vực ứng dụng chính của Python:



Python đã trở thành công cụ quan trọng đối với các nhà khoa học dữ liệu. Các thư viện như NumPy, Pandas, và Matplotlib được sử dụng rộng rãi để phân tích và biểu đồ hóa dữ liệu. Điều này giúp các doanh nghiệp phát hiện thông tin quan trọng từ dữ liệu và đưa ra các quyết định chiến lược.



Python cung cấp các thư viện như Scikit-learn và TensorFlow để xây dựng các mô hình máy học. Các ứng dụng của học máy bao gồm dự đoán xu hướng, chẩn đoán y tế, phân tích giỏ hàng mua sắm và dự báo doanh số bán hàng.



Python có các framework phát triển web như Django, Pyramid và Flask giúp tạo và triển khai ứng dụng web nhanh chóng. Các phiên bản mới của Python hỗ trợ lập trình bất đồng bộ, giúp phát triển ứng dụng web và API hiệu suất cao.



Thư viện OpenCV là một công cụ phổ biến để xử lý hình ảnh và thị giác máy tính. OpenCV được sử dụng trong nhiều lĩnh vực như robot học, giám sát công nghiệp và nhận diện khuôn mặt.



Python thích hợp cho việc phát triển ứng dụng nhúng và IoT. Micropython là một phiên bản nhẹ dành cho vi điều khiển nhúng như Arduino và Raspberry Pi.



Python được sử dụng để tự động hóa các công việc như sao lưu dữ liệu định kỳ. Các sản phẩm như Maya sử dụng Python API để viết các script tự động hóa.



Python là một lựa chọn tuyệt vời cho việc xây dựng các ứng dụng desktop GUI thân thiện với người dùng. Các thư viện như Tkinter, PyQt và WxPython cho phép tạo giao diện người dùng đồ họa.



Python thường được sử dụng để xây dựng các ứng dụng dòng lệnh. Các thư viện như argparse giúp phân tích các đối số dòng lệnh.



Các kỹ sư CAD có thể sử dụng Python để tự động hóa các công việc lặp đi lặp lại trong thiết kế.



Python cũng được sử dụng để phát triển các trò chơi máy tính. Các thư viện như Pygame và Kivy cho phép xây dựng các ứng dụng trò chơi đa nền tảng.

Python mang lại sự linh hoạt và hiệu suất cao cho nhiều loại ứng dụng khác nhau, làm cho nó trở thành một trong những ngôn ngữ lập trình phổ biến nhất hiện nay.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 06. Python - Trình Diễn và Các Chế Độ Hoạt Động',
    'Bài 06. Python - Trình Diễn và Các Chế Độ Hoạt Động',
    6,
    'Python là một ngôn ngữ dựa trên trình diễn viên. Trong hệ thống Linux, chương trình thực thi Python được cài đặt trong thư mục /usr/bin/. Đối với Windows, chương trình thực thi (python.exe) được tìm thấy trong thư mục cài đặt (ví dụ: C:\python311).

Hướng dẫn này sẽ giúp bạn hiểu cách Trình Diễn Python hoạt động ở chế độ tương tác và chế độ viết kịch bản. Mã Python được thực thi bằng cách từng câu lệnh một. Trình diễn viên Python có hai thành phần. Trình dịch kiểm tra câu lệnh để kiểm tra cú pháp. Nếu tìm thấy đúng, nó tạo ra một mã byte trung gian. Có một máy ảo Python sau đó chuyển đổi mã byte thành nhị phân cơ bản và thực thi nó. 
Sơ đồ dưới đây mô tả cơ chế:



Trình diễn viên Python có hai chế độ: chế độ tương tác và chế độ viết kịch bản.



Khi được khởi chạy từ một dòng lệnh mà không có tùy chọn bổ sung, một lời nhắc Python >>> xuất hiện và trình diễn viên Python hoạt động dựa trên nguyên tắc REPL (Đọc, Đánh Giá, In, Lặp). Mỗi lệnh nhập vào trước dấu nhắc Python được đọc, dịch và thực thi. Một phiên tương tác điển hình như sau.

```
>>> price = 100
>>> qty = 5
>>> total = price * qty
>>> total
500
>>> print("Tổng = ", total)
Tổng = 500
```

Để đóng phiên tương tác, nhập ký tự cuối dòng (ctrl+D cho Linux và ctrl+Z cho Windows). Bạn cũng có thể gõ quit() trước dấu nhắc Python và nhấn Enter để trở về dấu nhắc hệ điều hành.

```
>>> quit()
$
```

Bộ môi trường tương tác có sẵn với bản phân phối Python chuẩn không được trang bị các tính năng như chỉnh sửa dòng, tìm kiếm lịch sử, tự động hoàn thành v.v. Bạn có thể sử dụng các phần mềm trình diễn tương tác nâng cao khác như IPython và bpython để có các chức năng bổ sung.



Thay vì nhập và nhận kết quả của một hướng dẫn một lần như trong môi trường tương tác, bạn có thể lưu một tập hợp các hướng dẫn trong một tệp văn bản, đảm bảo rằng nó có phần mở rộng .py, và sử dụng tên đó làm tham số dòng lệnh cho lệnh Python.

Lưu các dòng sau đây vào prog.py, với sự sử dụng của bất kỳ trình soạn thảo văn bản nào như vim trên Linux hoặc Notepad trên Windows.

```python
print("Chương trình đầu tiên của tôi")
price = 100
qty = 5
total = price * qty
print("Tổng = ", total)
```

Khi chúng ta thực thi chương trình trên máy tính Windows, nó sẽ tạo ra kết quả sau:

```
C:\Users\Acer>python prog.py
Chương trình đầu tiên của tôi
Tổng = 500
```

Lưu ý rằng mặc dù Python thực thi toàn bộ tập lệnh một cách liên tục, nhưng bên trong, nó vẫn được thực thi theo dòng.

Trong trường hợp của bất kỳ ngôn ngữ dựa trên trình biên dịch nào như Java, mã nguồn không được chuyển đổi sang mã byte trừ khi toàn bộ mã nguồn không có lỗi. Trong Python, ngược lại, các câu lệnh được thực thi cho đến khi gặp lỗi đầu tiên.

Hãy giả định một lỗi một cách cố ý trong mã trên.

```python
print("Chương trình đầu tiên của tôi")
price = 100
qty = 5
total = prive * qty #Lỗi ở câu lệnh này
print("Tổng = ", total)
```

Chú ý biến viết sai prive thay vì price. Hãy thử thực thi lại chương trình như trước:

```
C:\Users\Acer>python prog.py
Chương trình đầu tiên của tôi
Traceback (most recent call last):
  File "C:\Python311\prog.py", line 4, in <module>
    total = prive * qty
NameError: name ''prive'' is not defined. Did you mean: ''price''?
```

Lưu ý rằng các câu lệnh trước câu lệnh lỗi được thực thi trước và sau đó thông báo lỗi xuất hiện. Do đó, bây giờ đã rõ ràng rằng kịch bản Python được thực thi theo cách thông dịch.



Ngoài việc thực thi kịch bản Python như trên, chính kịch bản cũng có thể là một tệp tự thực thi trong Linux, giống như một tập lệnh shell. Bạn phải thêm một dòng shebang ở đầu kịch bản. Dòng shebang chỉ ra loại trình diễn Python nào được sử dụng để giải thích các câu lệnh Python trong kịch bản. Dòng đầu tiên của kịch bản bắt đầu bằng #! và tiếp theo là đường dẫn đến trình diễn Python.

Chỉnh sửa kịch bản prog.py như sau:

```python


print("Chương trình đầu tiên của tôi")
price = 100
qty = 5
total = price * qty
print("Tổng = ", total)
```

Để đánh dấu kịch bản là tự thực thi, sử dụng lệnh chmod

```
$ chmod +x prog.py
```

Bạn có thể thực thi kịch bản trực tiếp, mà không cần sử dụng nó như một đối số dòng lệnh.

```
$ ./hello.py
```



IPython (viết tắt của Interactive Python) là một môi trường tương tác nâng cao và mạnh mẽ cho Python với nhiều chức năng so với shell Python tiêu chuẩn. IPython được phát triển ban đầu bởi Fernando Perez vào năm 2001.

IPython có các tính năng quan trọng sau đây:

- Khả năng nội suy đối tượng của IPython để kiểm tra các thuộc tính của một đối tượng trong thời gian chạy.
- Cú pháp sáng tạo của nó giúp xác định các phần tử ngôn ngữ như từ khóa, biến v.v.
- Lịch sử các tương tác được lưu trữ bên trong và có thể được tạo lại.
- Tự động hoàn thành của từ khóa, biến và tên hàm là một trong những tính năng quan trọng nhất.
- Hệ thống lệnh phép của IPython hữu ích để kiểm soát môi trường Python và thực hiện các tác vụ hệ điều hành.

Nó là nhân chính chính cho notebook Jupyter và các công cụ phía trước khác của Dự án Jupyter.

Cài đặt IPython với công cụ cài đặt PIP.

```
pip3 install ipython
```

Khởi chạy IPython từ dòng lệnh

```
C:\Users\Acer>ipython
Python 3.11.2 (tags/v3.11.2:878ead1, Feb 7 2023, 16:38:35) [MSC v.1934
64 bit (AMD64)] on win32
Type ''copyright'', ''credits'' or ''license'' for more information
IPython 8.4.0 -- An enhanced Interactive Python. Type ''?'' for help.
In [1]:
```

Thay vì dấu nhắc >>> thông thường như trong trình diễn viên tiêu chuẩn, bạn sẽ thấy hai dấu nhắc quan trọng của IPython được giải thích dưới đây −

- In[1] xuất hiện trước bất kỳ biểu thức nhập nào.
- Out[1] xuất hiện trước Kết quả xuất hiện.

```
In [1]: price = 100
In [2]: quantity = 5
In [3]: total = price * quantity
In [4]: total
Out[4]: 500
In [5]:
```

Hoàn thành tab là một trong những cải tiến hữu ích nhất do IPython cung cấp. IPython hiện ra danh sách phương thức phù hợp khi bạn nhấn phím tab sau dấu chấm trước đối tượng.

IPython cung cấp thông tin (nội suy) của bất kỳ đối tượng nào bằng cách đặt ? trước nó. Điều này bao gồm chuỗi tài liệu, định nghĩa hàm và chi tiết constructor của lớp. Ví dụ, để khám phá đối tượng chuỗi var được xác định ở trên, nhập var? vào dấu nhắc nhập.

```
In [5]: var = "Hello World"
In [6]: var?
Type: str
String form: Hello World
Length: 11
Docstring
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 07. Python - Thiết Lập Môi Trường',
    'Bài 07. Python - Thiết Lập Môi Trường',
    7,
    'Bước đầu tiên trong hành trình học Python là cài đặt nó trên máy tính của bạn. Hiện nay, hầu hết các máy tính, đặc biệt là có hệ điều hành Linux, đã có Python được cài đặt sẵn. Tuy nhiên, có thể nó không phải là phiên bản mới nhất.

Python có sẵn trên nhiều nền tảng khác nhau bao gồm Linux và Mac OS X. Hãy hiểu cách thiết lập môi trường Python của chúng ta.



Mở một cửa sổ terminal và gõ "python" để tìm hiểu xem nó đã được cài đặt chưa và phiên bản nào đã được cài đặt. Nếu Python đã được cài đặt sẵn thì bạn sẽ nhận được một thông báo giống như sau:

```bash
$ python
Python 3.11.2 (main, Feb 8 2023, 14:49:24) [GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.

>>>
```



Mã nguồn, nhị phân, tài liệu, tin tức, v.v., mới nhất và hiện tại, đều có sẵn trên trang web chính thức của Python [https://www.python.org/](https://www.python.org/).

Bạn có thể tải về tài liệu Python từ [https://www.python.org/doc/](https://www.python.org/doc/). Tài liệu có sẵn dưới dạng HTML, PDF và PostScript.



Phân phối Python có sẵn cho nhiều nền tảng khác nhau. Bạn chỉ cần tải mã nhị phân phù hợp với nền tảng của mình và cài đặt Python.

Nếu mã nhị phân cho nền tảng của bạn không có sẵn, bạn cần một trình biên dịch C để biên dịch mã nguồn thủ công. Việc biên dịch mã nguồn cung cấp nhiều linh hoạt hơn trong việc lựa chọn các tính năng mà bạn cần trong cài đặt của mình.

Dưới đây là một cái nhìn nhanh chóng về cách cài đặt Python trên các nền tảng khác nhau:



Để kiểm tra xem Python đã được cài đặt sẵn chưa, mở terminal Linux và nhập lệnh sau:

```bash
$ python3.11 --version
```

Trong Ubuntu Linux, cách dễ nhất để cài đặt Python là sử dụng apt – Công cụ Đóng Gói Nâng Cao. Luôn luôn được khuyến khích cập nhật danh sách các gói trong tất cả các kho lưu trữ được cấu hình.

```bash
$ sudo apt update
```

Ngay cả sau khi cập nhật, phiên bản Python mới nhất có thể không có sẵn để cài đặt, phụ thuộc vào phiên bản Ubuntu bạn đang sử dụng. Để khắc phục điều này, hãy thêm kho deadsnakes.

```bash
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:deadsnakes/ppa
```

Cập nhật lại danh sách các gói.

```bash
$ sudo apt update
```

Để cài đặt phiên bản Python 3.11 mới nhất, nhập lệnh sau vào terminal:

```bash
$ sudo apt-get install python3.11
```

Kiểm tra xem nó đã được cài đặt đúng cách chưa.

```bash
$ python3
Python 3.11.2 (main, Feb 8 2023, 14:49:24) [GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.

>>> print("Hello World")
Hello World
```





Dưới đây là các bước đơn giản để cài đặt Python trên máy Unix/Linux:

1. Mở trình duyệt Web và truy cập vào [https://www.python.org/downloads/](https://www.python.org/downloads/).
2. Theo đường link để tải mã nguồn nén có sẵn cho Unix/Linux.
3. Tải xuống và giải nén các tệp.
4. Chỉnh sửa tệp Modules/Setup nếu bạn muốn tùy chỉnh một số tùy chọn.
5. Bây giờ thực hiện các lệnh sau:

```bash
$ ./configure # chạy tập lệnh configure
$ make # biên dịch mã nguồn
$ make install # cài đặt
```

Điều này cài đặt Python ở vị trí tiêu chuẩn /usr/local/bin và các thư viện của nó ở /usr/local/lib/pythonXX, trong đó XX là phiên bản của Python.



Red Hat Enterprise Linux (RHEL 8) không cài đặt Python 3 theo mặc định. Chúng ta thường sử dụng lệnh yum trên CentOS và các biến thể liên quan khác. Quy trình cài đặt Python-3 trên RHEL 8 như sau:

```bash
$ sudo yum install python3
```



Lưu ý rằng Python từ phiên bản 3.10 trở đi không thể cài đặt trên các hệ điều hành Windows 7 hoặc cũ hơn.

Cách khuyến nghị để cài đặt Python là sử dụng trình cài đặt chính thức. Một liên kết đến phiên bản ổn định mới nhất được đưa ra trên trang chủ. Nó cũng được tìm thấy tại [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/).

Bạn có thể tìm thấy các gói nhúng và trình cài đặt cho cả kiến trúc 32 và 64 bit.

![](https://www.python.org/static/img/emacs.png)

Hãy tải xuống trình cài đặt 64 bit Windows.

[Double click](https://www.python.org/ftp/python/3.11.2/python-3.11.2-amd64.exe) vào tệp đã tải xuống để bắt đầu quá trình cài đặt.

Mặc dù bạn có thể tiếp tục bằng cách nhấn nút Cài đặt Ngay bây giờ, nhưng nên chọn thư mục cài đặt với đường dẫn ngắn hơn, và đánh dấu ô kiểm thứ hai để cập nhật biến PATH.

Chấp nhận các giá trị mặc định cho các bước còn lại trong thuật sĩ cài đặt này để hoàn tất quá trình cài đặt.

Mở terminal Command Prompt trên Windows và chạy Python để kiểm tra việc cài đặt đã thành công hay không.

```bash
C:\Users\Acer>python
Python 3.11.2 (tags/v3.11.2:878ead1, Feb 7 2023, 16:38:35) [MSC v.1934
64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Thư viện chuẩn của Python có một mô-đun thực thi được gọi là IDLE – viết tắt của Môi Trường Phát Triển và Học Tập Tích Hợp. Tìm nó từ menu Start của Windows và khởi chạy.

![](https://www.python.org/static/img/pythonwin_screenshot.jpg)

IDLE chứa Python shell (trình thông dịch tương tác) và một trình soạn thảo văn bản đa cửa sổ có thể tùy chỉnh với các tính năng như làm nổi bật cú pháp, lùi thông minh, hoàn thành tự động, v.v. Nó là đa nền tảng nên hoạt động giống nhau trên Windows, MacOS và Linux. Nó cũng có một bộ gỡ lỗi với khả năng đặt điểm dừng, bước tiếp theo và xem các không gian tên toàn cục và cục bộ.

Dưới đây là các bước để cài đặt Python trên máy Windows.

1. Mở trình duyệt Web và truy cập vào [https://www.python.org/downloads/](https://www.python.org/downloads/).
2. Theo liên kết cho tệp cài đặt Windows python-XYZ.msi nơi XYZ là phiên bản bạn cần cài đặt.
3. Để sử dụng trình cài đặt python-XYZ.msi này, hệ thống Windows phải hỗ trợ Trình cài đặt Microsoft 2.0. Lưu tệp cài đặt xuống máy cục bộ của bạn và sau đó chạy nó để biết máy của bạn có hỗ trợ MSI hay không.
4. Chạy tệp đã tải xuống. Điều này đưa ra Trình cài đặt Python, rất dễ sử dụng. Chỉ cần chấp nhận các thiết lập mặc định, chờ đợi cho đến khi cài đặt hoàn tất và bạn đã xong.



Các máy Mac gần đây đi kèm với Python được cài đặt sẵn, nhưng nó có thể đã cũ vài năm. Truy cập [http://www.python.org/download/mac/](http://www.python.org/download/mac/) để biết hướng dẫn cách lấy phiên bản hiện tại cùng với các công cụ bổ sung để hỗ trợ phát triển trên Mac. Đối với các phiên bản cũ hơn của macOS trước khi Mac OS X 10.3 (phát hành vào năm 2003), có sẵn MacPython.

Jack Jansen duy trì nó và bạn có thể truy cập vào toàn bộ tài liệu tại trang web của anh ấy − [https://github.com/jackjansen](https://github.com/jackjansen). Bạn có thể tìm thấy các thông tin chi tiết về cách cài đặt hoàn chỉnh cho việc cài đặt Mac OS.



Các chương trình và các tệp thực thi khác có thể nằm ở nhiều thư mục khác nhau, vì vậy hệ điều hành cung cấp một đường dẫn tìm kiếm liệt kê các thư mục mà hệ điều hành tìm kiếm các tệp thực thi.

Đường dẫn được lưu trữ trong một biến môi trường, là một chuỗi có tên được duy trì bởi hệ điều hành. Biến này chứa thông tin có sẵn cho bộ nhớ đệm lệnh và các chương trình khác.

Biến đường dẫn được đặt tên là PATH trong Unix hoặc Path trong Windows (Unix phân biệt chữ hoa; Windows không phân biệt chữ hoa).

Trong macOS, trình cài đặt xử lý các chi tiết về đường dẫn. Để gọi trình thông dịch Python từ bất kỳ thư mục cụ thể nào, bạn phải thêm thư mục Python vào đường dẫn của mình.



Để thêm thư mục Python vào đường dẫn cho một phiên trong Unix:

- Trong shell csh − gõ `setenv PATH "$PATH:/usr/local/bin/python"` và nhấn Enter.
- Trong shell bash (Linux) − gõ `export PATH="$PATH:/usr/local/bin/python"` và nhấn Enter.
- Trong shell sh hoặc ksh − gõ `PATH="$PATH:/usr/local/bin/python"` và nhấn Enter.



Để thêm thư mục Python vào đường dẫn cho một phiên trong Windows:

- Ở dấu nhắc lệnh − gõ `path %path%;C:\Python` và nhấn Enter.

Biến `PYTHONPATH` có vai trò tương tự như `PATH`. Biến này cho biết trình thông dịch Python nơi nào để đặt các tệp mô-đun được nhập vào một chương trình. Nó nên bao gồm thư viện nguồn Python và các thư mục chứa mã nguồn Python. `PYTHONPATH` đôi khi được thiết lập trước bởi trình cài đặt Python.

Biến `PYTHONSTARTUP` chứa đường dẫn của một tệp khởi tạo chứa mã nguồn Python. Nó được thực thi mỗi khi bạn bắt đầu trình thông dịch. Nó có tên là .pythonrc.py trong Unix và nó chứa các lệnh để tải các tiện ích hoặc sửa đổi `PYTHONPATH`.

Biến `PYTHONCASEOK` được sử dụng trong Windows để hướng dẫn Python tìm kiếm sự phù hợp không phân biệt chữ hoa đầu tiên trong một câu lệnh nhập. Đặt biến này thành bất kỳ giá trị nào để kích hoạt nó.

Biến `PYTHONHOME` là một đường dẫn thư mục mô-đun thay thế. Thông thường nó được nhúng trong các thư mục `PYTHONSTARTUP` hoặc `PYTHONPATH` để làm cho việc chuyển đổi thư viện mô-đun dễ dàng hơn.


Có ba cách khác nhau để bắt đầu Python:



Bạn có thể bắt đầu Python từ Unix, DOS, hoặc bất kỳ hệ thống nào cung cấp cho bạn một bộ thông dịch dòng lệnh hoặc cửa sổ shell.

Nhập `python` vào dòng lệnh để khởi động trình thông dịch tương tác và bắt đầu lập trình Python ngay trên dòng lệnh hoặc cửa sổ shell. 



Một số môi trường phát triển tích hợp (IDE) như PyCharm, Visual Studio Code, hoặc IDLE (môi trường phát triển Python mặc định) cung cấp giao diện đồ họa cho việc phát triển Python. Bạn có thể bắt đầu một dự án Python mới và viết mã Python trong môi trường IDE một cách thuận tiện.



Jupyter Notebook là một công cụ phổ biến cho việc phân tích dữ liệu và phát triển Python tương tác. Nó cung cấp một giao diện web cho phép bạn viết và chạy mã Python theo từng phần, cùng với việc chia sẻ mã, kết quả và thông tin bổ sung trong một tài liệu tương tác.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 08. Python - Môi Trường Ảo',
    'Bài 08. Python - Môi Trường Ảo',
    8,
    'Trong hướng dẫn này, chúng ta sẽ tìm hiểu về các môi trường ảo trong Python và cách tạo và kích hoạt một môi trường ảo để xây dựng một ứng dụng Python.



Môi trường ảo Python tạo ra một cài đặt Python ảo bên trong một thư mục dự án. Người dùng sau đó có thể cài đặt và quản lý các gói Python cho mỗi dự án. Điều này cho phép người dùng có thể cài đặt các gói và sửa đổi môi trường Python của họ mà không sợ làm hỏng các gói được cài đặt trong các môi trường khác.



Một môi trường ảo Python là:

- Được xem như là một thứ không cần thiết.
- Được sử dụng để chứa một bản cụ thể của trình thông dịch Python và các thư viện và tập lệnh phần mềm cần thiết để hỗ trợ một dự án.
- Được chứa trong một thư mục, thông thường được đặt tên là venv hoặc .venv trong thư mục dự án.
- Không được coi là có thể di chuyển hoặc sao chép.

Khi bạn cài đặt phần mềm Python trên máy tính của mình, nó sẽ có sẵn để sử dụng từ bất kỳ đâu trên hệ thống tệp. Đây là một cài đặt toàn cầu trên toàn hệ thống.



Chức năng này được hỗ trợ bởi module venv trong bản phân phối Python tiêu chuẩn. Sử dụng các lệnh sau để tạo một môi trường ảo mới.

```bash
C:\Users\Acer>md\pythonapp
C:\Users\Acer>cd\pythonapp
C:\pythonapp>python -m venv myvenv
```

Ở đây, myvenv là thư mục mà một môi trường ảo Python mới sẽ được tạo ra hiển thị các cấu trúc thư mục sau:

```
Directory of C:\pythonapp\myvenv
22-02-2023 09:53 <DIR> .
22-02-2023 09:53 <DIR> ..
22-02-2023 09:53 <DIR> Include
22-02-2023 09:53 <DIR> Lib
22-02-2023 09:53 77 pyvenv.cfg
22-02-2023 09:53 <DIR> Scripts
```

Các tiện ích để kích hoạt và vô hiệu hóa môi trường ảo cũng như bản sao cục bộ của trình thông dịch Python sẽ được đặt trong thư mục Scripts.

```bash
Directory of C:\pythonapp\myvenv\scripts
22-02-2023 09:53 <DIR> .
22-02-2023 09:53 <DIR> ..
22-02-2023 09:53 2,063 activate
22-02-2023 09:53 992 activate.bat
22-02-2023 09:53 19,611 Activate.ps1
22-02-2023 09:53 393 deactivate.bat
22-02-2023 09:53 106,349 pip.exe
22-02-2023 09:53 106,349 pip3.10.exe
22-02-2023 09:53 106,349 pip3.exe
22-02-2023 09:53 242,408 python.exe
22-02-2023 09:53 232,688 pythonw.exe
```



Để kích hoạt môi trường ảo mới này, thực hiện activate.bat trong thư mục Scripts.

```bash
(myvenv) C:\pythonapp>
```

Lưu ý tên của môi trường ảo trong dấu ngoặc đơn. Thư mục Scripts chứa bản sao cục bộ của trình thông dịch Python. Bạn có thể bắt đầu một phiên Python trong môi trường ảo này.



Để xác nhận liệu phiên Python này có ở trong môi trường ảo hay không, hãy kiểm tra sys.path.

```bash
(myvenv) C:\pythonapp>python
Python 3.10.1 (tags/v3.10.1:2cd268a, Dec 6 2021, 19:10:37) [MSC v.1929
64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys.path
['''', ''C:\\Python310\\python310.zip'', ''C:\\Python310\\DLLs'',
''C:\\Python310\\lib'', ''C:\\Python310'', ''C:\\pythonapp\\myvenv'',
''C:\\pythonapp\\myvenv\\lib\\site-packages'']
>>>
```

Thư mục Scripts của môi trường ảo này cũng chứa các tiện ích pip. Nếu bạn cài đặt một gói từ PyPI, gói đó sẽ chỉ hoạt động trong môi trường ảo hiện tại.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 09. Python - Hướng dẫn về Cú Pháp',
    'Bài 09. Python - Hướng dẫn về Cú Pháp',
    9,
    'Trong hướng dẫn này, chúng ta sẽ tìm hiểu về cú pháp trong Python và cách tạo và kích hoạt một môi trường ảo để xây dựng ứng dụng Python.



Môi trường ảo Python tạo ra một cài đặt ảo của Python trong một thư mục dự án. Người dùng sau đó có thể cài đặt và quản lý các gói Python cho mỗi dự án. Điều này cho phép người dùng cài đặt gói và sửa đổi môi trường Python mà không lo sợ làm hỏng các gói được cài đặt trong các môi trường khác.



Một môi trường ảo Python là:

- Được coi là có thể bỏ đi.
- Được sử dụng để chứa một trình thông dịch Python cụ thể và các thư viện và tập lệnh cần thiết để hỗ trợ một dự án.
- Được chứa trong một thư mục, thường là có tên là venv hoặc .venv trong thư mục dự án.
- Không được coi là có thể di chuyển hoặc sao chép.



Chức năng này được hỗ trợ bởi module venv trong bản phân phối Python tiêu chuẩn. Sử dụng các lệnh sau để tạo một môi trường ảo mới.

```bash
mkdir pythonapp
cd pythonapp
python -m venv myvenv
```

Ở đây, myvenv là thư mục mà một môi trường ảo Python mới sẽ được tạo ra với cấu trúc thư mục như sau:

```
Directory of C:\pythonapp\myvenv
22-02-2023 09:53 <DIR> .
22-02-2023 09:53 <DIR> ..
22-02-2023 09:53 <DIR> Include
22-02-2023 09:53 <DIR> Lib
22-02-2023 09:53 77 pyvenv.cfg
22-02-2023 09:53 <DIR> Scripts
```

Các tiện ích để kích hoạt và vô hiệu hóa môi trường ảo cũng như bản sao cục bộ của trình thông dịch Python sẽ được đặt trong thư mục Scripts.



Để kích hoạt môi trường ảo mới này, thực thi activate.bat trong thư mục Scripts.

```bash
myvenv\scripts\activate
```

Lưu ý tên của môi trường ảo trong dấu ngoặc đơn. Thư mục Scripts chứa một bản sao cục bộ của trình thông dịch Python. Bạn có thể bắt đầu một phiên Python trong môi trường ảo này.



Để xác nhận liệu phiên Python này có trong môi trường ảo hay không, kiểm tra sys.path.

```bash
python
```

```python
Python 3.10.1 (tags/v3.10.1:2cd268a, Dec 6 2021, 19:10:37) [MSC v.1929
64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys.path
['''', ''C:\\Python310\\python310.zip'', ''C:\\Python310\\DLLs'',
''C:\\Python310\\lib'', ''C:\\Python310'', ''C:\\pythonapp\\myvenv'',
''C:\\pythonapp\\myvenv\\lib\\site-packages'']
```

Thư mục Scripts của môi trường ảo này cũng chứa các tiện ích pip. Nếu bạn cài đặt một gói từ PyPI, gói đó sẽ chỉ hoạt động trong môi trường ảo hiện tại.





Chúng ta hãy thực thi một chương trình Python để in ra "Hello, World!" ở hai chế độ lập trình Python khác nhau. (a) Lập trình Chế Độ Tương Tác (b) Lập Trình Chế Độ Kịch Bản.



Chúng ta có thể gọi trình thông dịch Python từ dòng lệnh bằng cách nhập python tại dấu nhắc lệnh như sau:

```bash
$ python3
```

```python
Python 3.10.6 (main, Mar 10 2023, 10:55:28) [GCC 11.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Ở đây >>> cho biết Dấu Nhắc Lệnh Python nơi bạn có thể nhập các lệnh của mình. Hãy nhập văn bản sau tại dấu nhắc Python và nhấn Enter:

```python
>>> print ("Hello, World!")
```

Nếu bạn đang chạy phiên bản cũ hơn của Python, như Python 2.4.x, thì bạn cần sử dụng câu lệnh print mà không có dấu ngoặc đơn như in print "Hello, World!". Tuy nhiên, trong phiên bản Python 3.x, điều này tạo ra kết quả sau:

```
Hello, World!
```



Chúng ta có thể gọi trình thông dịch Python với tham số script để bắt đầu thực thi kịch bản và tiếp tục cho đến khi kịch bản kết thúc. Khi kịch bản kết thúc, trình thông dịch không còn hoạt động nữa.

Hãy viết một chương trình Python đơn giản trong một tập tin script, là một tệp văn bản đơn giản. Các tệp Python có phần mở rộng .py. Nhập mã nguồn sau vào một tệp test.py:

```python
print ("Hello, World!")
```

Chúng ta giả sử rằng bạn đã cài đặt đường dẫn trình thông dịch Python trong biến PATH. Bây giờ, hãy thử chạy chương trình này như sau:

```bash
$ python3 test.py
```

Kết quả sẽ là:

```
Hello, World!
```

Hãy thử một cách khác để thực thi một kịch bản Python. Đây là tệp test.py được sửa đổi:

```python


print ("Hello, World!")
```

Chúng ta giả sử rằng bạn đã cài đặt trình thông dịch Python có sẵn trong thư mục /usr/bin. Bây giờ, hãy thử chạy chương trình này như sau:

```bash
$ chmod +x test.py     # Điều này làm cho tệp có thể thực thi được
$ ./test.py
```

Kết quả sẽ là:

```
Hello, World!
```



Một nhận dạng Python là một tên được sử dụng để xác định một biến, hàm, lớp, module hoặc đối tượng khác. Một nhận dạng bắt đầu bằng một chữ cái A đến Z hoặc a đến z hoặc một gạch dưới (_) theo sau là không hoặc nhiều chữ cái, gạch dưới và chữ số (0 đến 9).

Python không cho phép các ký tự dấu chấm câu như @, $ và % trong nhận dạng.

Python là một ngôn ngữ lập trình phân biệt chữ hoa chữ thường. Do đó, Manpower và manpower là hai nhận dạng khác nhau trong Python.

Dưới đây là các quy tắc đặt tên cho các nhận dạng Python:

- Tên lớp Python bắt đầu bằng một chữ cái in hoa. Tất cả các nhận dạng khác bắt đầu bằng một chữ cái thường.
- Bắt đầu một nhận dạng với một gạch dưới đơn làm cho nhận dạng là một nhận dạng riêng tư.
- Bắt đầu một nhận dạng với hai gạch dưới đầu tiên chỉ ra một nhận dạng mạnh mẽ riêng tư.
- Nếu nhận dạng cũng kết thúc với hai gạch dưới, nhận dạng là một tên đặc biệt được định nghĩa bởi ngôn ngữ.



Danh sách sau đây hiển thị các từ khóa Python. Đây là các từ khóa được dành riêng và bạn không thể sử dụng chúng như tên hằng số hoặc biến hoặc bất kỳ nhận dạng nào khác. Tất cả các từ khóa Python chứa các chữ cái thường.

```
and     as      assert
break   class   continue
def     del     elif
else    except  False
finally for     from
global  if      import
in      is      lambda
None    nonlocal    not
or      pass   
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 10. Biến trong Python',
    'Bài 10. Biến trong Python',
    10,
    'Biến Python là các vị trí bộ nhớ được dành riêng để lưu trữ các giá trị trong chương trình Python. Điều này có nghĩa là khi bạn tạo một biến, bạn đặt dành một số không gian trong bộ nhớ.

Dựa trên kiểu dữ liệu của một biến, trình thông dịch Python phân bổ bộ nhớ và quyết định những gì có thể được lưu trữ trong bộ nhớ dành riêng đó. Do đó, bằng cách gán các kiểu dữ liệu khác nhau cho các biến Python, bạn có thể lưu trữ số nguyên, số thập phân hoặc ký tự trong các biến này.



Các mục dữ liệu thuộc các loại dữ liệu khác nhau được lưu trữ trong bộ nhớ của máy tính. Các vị trí bộ nhớ của máy tính có một số hoặc địa chỉ, được biểu diễn bên trong dưới dạng nhị phân. Dữ liệu cũng được lưu trữ dưới dạng nhị phân vì máy tính hoạt động theo nguyên lý biểu diễn nhị phân. Trong biểu đồ dưới đây, một chuỗi May và một số 18 được hiển thị là được lưu trữ tại các vị trí bộ nhớ.

[Memory Diagram]

Nếu bạn biết ngôn ngữ hợp ngữ, bạn sẽ chuyển đổi các mục dữ liệu này và địa chỉ bộ nhớ, và đưa ra một hướng dẫn ngôn ngữ máy. Tuy nhiên, điều này không dễ dàng đối với mọi người. Trình dịch ngôn ngữ như trình thông dịch Python thực hiện loại chuyển đổi này. Nó lưu trữ đối tượng trong một vị trí bộ nhớ được chọn ngẫu nhiên. Hàm id() được tích hợp sẵn trong Python trả về địa chỉ nơi đối tượng được lưu trữ.

```python
>>> "May"
May
>>> id("May")
2167264641264

>>> 18
18
>>> id(18)
140714055169352
```

Khi dữ liệu được lưu trữ trong bộ nhớ, nó nên được truy cập lặp đi lặp lại để thực hiện một quy trình nhất định. Rõ ràng, việc trích xuất dữ liệu từ ID của nó là rườm rà. Ngôn ngữ cao cấp như Python giúp cho việc đặt một biệt danh hoặc nhãn phù hợp để tham chiếu đến vị trí bộ nhớ.

Trong ví dụ trên, hãy đặt nhãn cho vị trí của May là month và vị trí mà 18 được lưu trữ là age. Python sử dụng toán tử gán (=) để liên kết một đối tượng với nhãn.

```python
>>> month = "May"
>>> age = 18
```

Đối tượng dữ liệu (May) và tên của nó (month) có cùng id(). id() của 18 và age cũng giống nhau.

```python
>>> id(month)
2167264641264
>>> id(age)
140714055169352
```

Nhãn là một nhận dạng. Thông thường, nó được gọi là một biến. Một biến Python là một tên biểu tượng là một tham chiếu hoặc con trỏ đến một đối tượng.



Biến Python không cần khai báo rõ ràng để đặt dành không gian bộ nhớ hoặc bạn có thể nói để tạo ra một biến. Một biến Python được tạo ra tự động khi bạn gán một giá trị cho nó. Dấu bằng (=) được sử dụng để gán giá trị cho biến.

Toán hạng bên trái của toán tử = là tên của biến và toán hạng bên phải của toán tử = là giá trị được lưu trữ trong biến.



Ví dụ này tạo ra các loại biến khác nhau (một số nguyên, một số thực và một chuỗi).

```python
counter = 100          # Tạo ra một biến số nguyên
miles = 1000.0         # Tạo ra một biến số thực
name = "8 Sync Dev"      # Tạo ra một biến chuỗi
```



Sau khi chúng ta tạo một biến Python và gán một giá trị cho nó, chúng ta có thể in nó bằng cách sử dụng hàm print(). Dưới đây là phần mở rộng của ví dụ trước và chỉ ra cách in các biến khác nhau trong Python:



Ví dụ này in các biến.

```python
counter = 100          # Tạo ra một biến số nguyên
miles = 1000.0         # Tạo ra một biến số thực
name = "8 Sync Dev"      # Tạo ra một biến chuỗi

print(counter)
print(miles)
print(name)
```

Ở đây, 100, 1000.0 và "8 Sync Dev" là các giá trị được gán cho các biến counter, miles và name, tương ứng. Khi chạy chương trình Python trên, điều này tạo ra kết quả.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 11. Tài liệu Hướng dẫn về Các Loại Dữ Liệu và Ép Kiểu trong Python',
    'Bài 11. Tài liệu Hướng dẫn về Các Loại Dữ Liệu và Ép Kiểu trong Python',
    11,
    'Trong lập trình, dữ liệu là một phần quan trọng và đóng vai trò quan trọng trong việc xử lý thông tin. Trong Python, các loại dữ liệu được sử dụng để định nghĩa loại dữ liệu mà ta sẽ lưu trữ trong một biến và xử lý trong chương trình. Dữ liệu được lưu trữ trong bộ nhớ của máy tính có thể là nhiều loại khác nhau, ví dụ: tuổi của một người được lưu trữ dưới dạng một giá trị số và địa chỉ của họ được lưu trữ dưới dạng các ký tự chữ và số.



Python hỗ trợ nhiều loại dữ liệu tích hợp sẵn, bao gồm:

1. **Dữ liệu Số:** int, float, complex
2. **Dữ liệu Chuỗi:** str (kiểu dữ liệu dạng văn bản)
3. **Dữ liệu Dãy:** list, tuple, range
4. **Dữ liệu Nhị Phân:** bytes, bytearray, memoryview
5. **Dữ liệu Ánh Xạ:** dict
6. **Dữ liệu Boolean:** bool
7. **Dữ liệu Tập hợp:** set, frozenset
8. **Dữ liệu None:** NoneType



Dữ liệu số trong Python được sử dụng để lưu trữ các giá trị số. Có bốn loại số khác nhau trong Python:

- **int:** Số nguyên
- **float:** Số thực
- **complex:** Số phức

Ví dụ:

```python
var1 = 1       # int
var2 = True    # bool
var3 = 10.023  # float
var4 = 10+3j   # complex
```



Dữ liệu chuỗi trong Python là một chuỗi gồm một hoặc nhiều ký tự Unicode, được bao quanh bởi dấu nháy đơn, dấu nháy kép hoặc dấu nháy ba. Chuỗi trong Python là không thể thay đổi, có nghĩa là khi bạn thực hiện một phép toán trên chuỗi, bạn luôn tạo ra một đối tượng chuỗi mới cùng loại, thay vì biến đổi một chuỗi hiện tại.

```python
str1 = ''Hello World!''
```



Dãy trong Python là một tập hợp có thứ tự của các phần tử. Có ba loại dãy trong Python:

- **List:** Dãy có thể thay đổi
- **Tuple:** Dãy không thể thay đổi
- **Range:** Dãy số liên tục

Ví dụ:

```python
list1 = [1, 2, 3, 4, 5]     # list
tuple1 = (1, 2, 3, 4, 5)    # tuple
range1 = range(1, 6)        # range
```



Dữ liệu nhị phân trong Python là cách biểu diễn dữ liệu dưới dạng một chuỗi các chữ số nhị phân, chỉ bao gồm các số 0 và 1. Python cung cấp ba cách khác nhau để biểu diễn dữ liệu nhị phân:

- **bytes:** Dữ liệu bytes không thể thay đổi
- **bytearray:** Dữ liệu bytearray có thể thay đổi
- **memoryview:** Dữ liệu memoryview

Ví dụ:

```python
bytes1 = b''Hello''           # bytes
bytearray1 = bytearray(b''Hello'')  # bytearray
```



Dữ liệu ánh xạ trong Python là một cấu trúc dữ liệu dạng hash table. Mỗi phần tử trong ánh xạ được xác định bằng một cặp key:value. Trong Python, ánh xạ là một đối tượng của lớp dict.

```python
dict1 = {''name'': ''John'', ''age'': 30, ''city'': ''New York''}  # dict
```



Dữ liệu Boolean trong Python biểu diễn một trong hai giá trị: True hoặc False. Dữ liệu Boolean thường được sử dụng để kiểm tra điều kiện trong các biểu thức điều kiện.

```python
bool1 = True   # bool
bool2 = False  # bool
```



Đôi khi, bạn có thể cần thực hiện chuyển đổi giữa các loại dữ liệu Python. Để chuyển đổi dữ liệu giữa các loại khác nhau trong Python, bạn đơn giản sử dụng tên loại dữ liệu như một hàm.

Ví dụ:

```python
a = int(1)        # Ép kiểu thành số nguyên
b = float(2.2)    # Ép kiểu thành số thực
c = str(3.3)      # Ép kiểu thành chuỗi
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 12. Hướng dẫn Ép Kiểu trong Python',
    'Bài 12. Hướng dẫn Ép Kiểu trong Python',
    12,
    'Ép kiểu trong lập trình là quá trình chuyển đổi một đối tượng từ một kiểu dữ liệu sang kiểu dữ liệu khác. Trong phần này, chúng ta sẽ tìm hiểu về việc ép kiểu trong lập trình Python.

Ép kiểu trong Python là quá trình chuyển đổi một giá trị của một kiểu dữ liệu sang một kiểu dữ liệu khác. Python hỗ trợ hai loại ép kiểu - ép kiểu ngầm định và ép kiểu tường minh.



Khi bất kỳ trình biên dịch/ngôn ngữ nào tự động chuyển đổi đối tượng của một kiểu sang kiểu khác, đó được gọi là ép kiểu tự động hoặc ngầm định. Python là một ngôn ngữ có kiểu dữ liệu mạnh mẽ. Nó không cho phép chuyển đổi kiểu tự động giữa các kiểu dữ liệu không liên quan. Ví dụ, một chuỗi không thể được chuyển đổi thành bất kỳ kiểu số nào. Tuy nhiên, một số nguyên có thể được ép kiểu thành số thực. Các ngôn ngữ khác như JavaScript là ngôn ngữ có kiểu dữ liệu yếu, trong đó một số nguyên được ép kiểu thành chuỗi để nối chuỗi.

Lưu ý rằng yêu cầu bộ nhớ cho mỗi kiểu dữ liệu là khác nhau. Ví dụ, một đối tượng số nguyên trong Python chiếm 4 byte bộ nhớ, trong khi một đối tượng số thực cần 8 byte vì phần thập phân của nó. Do đó, trình thông dịch Python không tự động chuyển đổi một số thực sang số nguyên, vì điều này sẽ dẫn đến mất dữ liệu. Ngược lại, số nguyên có thể dễ dàng được chuyển đổi thành số thực bằng cách đặt phần thập phân của nó bằng 0.

Ép kiểu ngầm định từ số nguyên sang số thực xảy ra khi thực hiện bất kỳ phép toán số học nào giữa các toán hạng số nguyên và số thực.

Giả sử chúng ta có một biến số nguyên và một biến số thực:

```python
a = 10   # Đối tượng số nguyên
b = 10.5 # Đối tượng số thực
```

Để thực hiện phép cộng giữa chúng, 10 - đối tượng số nguyên được nâng cấp thành 10.0. Đây là một số thực, nhưng tương đương với giá trị số của nó trước đó. Bây giờ chúng ta có thể thực hiện phép cộng của hai số thực.

```python
c = a + b
print(c)  # Output: 20.5
```

Trong ép kiểu ngầm định, một đối tượng Python với kích thước byte nhỏ hơn được nâng cấp để phù hợp với kích thước byte lớn hơn của đối tượng khác trong phép toán. Ví dụ, một đối tượng Boolean được nâng cấp trước thành số nguyên, sau đó trở thành số thực, trước khi thực hiện phép cộng với một đối tượng số thực. Trong ví dụ sau, chúng ta cố gắng cộng một đối tượng Boolean với một số thực. Lưu ý rằng True tương đương với 1 và False tương đương với 0.

```python
a = True
b = 10.5
c = a + b
print(c)  # Output: 11.5
```



Mặc dù ép kiểu tự động hoặc ngầm định chỉ giới hạn ở việc chuyển đổi từ số nguyên sang số thực, bạn có thể sử dụng các hàm tích hợp sẵn của Python như int(), float() và str() để thực hiện các chuyển đổi tường minh như chuỗi thành số nguyên.



Hàm int() tích hợp sẵn của Python chuyển đổi một hằng số số nguyên thành một đối tượng số nguyên, một số thực thành số nguyên, và một chuỗi thành số nguyên nếu chuỗi đó có biểu diễn số nguyên hợp lệ.

Nếu đối số cho hàm int() là một đối tượng số thực hoặc biểu thức số thực, nó trả về một đối tượng số nguyên. Ví dụ:

```python
a = int(10.5)     # Chuyển đổi một đối tượng số thực thành số nguyên
print(a)          # Output: 10
```

Nếu đối số cho hàm int() là một đối tượng Boolean, giá trị trả về là số nguyên 1.

```python
a = int(True)     # Chuyển đổi một đối tượng Boolean thành số nguyên
print(a)          # Output: 1
```

Chuyển đổi từ chuỗi thành số nguyên chỉ xảy ra nếu chuỗi đó chứa biểu diễn số nguyên hợp lệ.

```python
a = int("100")    # Chuyển đổi một chuỗi thành số nguyên
print(a)          # Output: 100
```

Nếu chuỗi chứa một biểu diễn không hợp lệ của số nguyên, Python sẽ raise một ValueError.

```python
a = int("10.5")   # Lỗi: chuỗi không hợp lệ cho int()
```



Hàm float() của Python chuyển đổi một hằng số số nguyên thành một đối tượng số thực, một số thực thành một số thực, và một chuỗi thành một số thực nếu chuỗi đó có biểu diễn số thực hợp lệ.

Nếu đối số cho hàm float() là một đối tượng số nguyên, nó trả về một đối tượng số thực.

```python
a = float(100)    # Chuyển đổi một đối tượng số nguyên thành số thực
print(a)          # Output: 100.0
```

Nếu đối số cho hàm float() là một chuỗi, và chuỗi đó chứa một biểu diễn số thực hợp lệ, nó sẽ trả về một đối tượng số thực.

```python
a = float("10.5") # Chuyển đổi một chuỗi thành số thực
print(a)          # Output: 10.5
```

Nếu chuỗi chứa một biểu diễn không hợp lệ của số thực, Python sẽ raise một ValueError.

```python
a = float("Hello") # Lỗi: chuỗi không hợp lệ cho float()
```



Hàm str() của Python chuyển đổi một đối tượng thành một biểu diễn chuỗi của đối tượng đó.

```python
a = str(10)     # Chuyển đổi một số nguyên thành chuỗi
print(a)        # Output: ''10''
```

```python
a = str(10.5)   # Chuyển đổi một số thực thành chuỗi
print(a)        # Output: ''10.5''
```

```python
a = str(True)   # Chuyển đổi một Boolean thành chuỗi
print(a)        # Output: ''True''
```

Hàm str() cũng có thể chuyển đổi một danh sách hoặc một bộ thành một chuỗi.

```python
a = str([1, 2, 3])    # Chuyển đổi một danh sách thành chuỗi
print(a)              # Output: ''[1, 2, 3]''
```

```python
a = str((1, 2, 3))    # Chuyển đổi một bộ thành chuỗi
print(a)              # Output: ''(1, 2, 3)''
```



Trong Python, ép kiểu là một phần quan trọng của việc xử lý dữ liệu. Bằng cách sử dụng các hàm tích hợp sẵn như int(), float() và str(), bạn có thể chuyển đổi giữa các kiểu dữ liệu một cách dễ dàng và linh hoạt. Điều này cho phép bạn làm việc với dữ liệu một cách hiệu quả trong các ứng dụng Python của mình.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 13. Hệ thống Unicode trong Python',
    'Bài 13. Hệ thống Unicode trong Python',
    13,
    'Các ứng dụng phần mềm thường cần hiển thị các thông điệp ra màn hình bằng nhiều ngôn ngữ khác nhau như Tiếng Anh, Tiếng Pháp, Tiếng Nhật, Tiếng Do Thái hoặc Tiếng Hindi. Kiểu chuỗi của Python sử dụng Tiêu chuẩn Unicode để biểu diễn các ký tự. Điều này giúp cho chương trình có thể làm việc với tất cả các ký tự khác nhau này.

Một ký tự là thành phần nhỏ nhất của một văn bản. ''A'', ''B'', ''C'', v.v., tất cả đều là các ký tự khác nhau. Tương tự như vậy là ''È'' và ''Í''. Một chuỗi Unicode là một chuỗi các điểm mã, là các số từ 0 đến 0x10FFFF (tương đương với 1.114.111 dạng thập phân). Chuỗi này của các điểm mã cần được biểu diễn trong bộ nhớ dưới dạng một tập hợp các đơn vị mã, và các đơn vị mã sau đó được ánh xạ thành các byte 8-bit.



Một chuỗi các điểm mã được biểu diễn trong bộ nhớ dưới dạng một tập hợp các đơn vị mã, ánh xạ thành các byte 8-bit. Quy tắc cho việc dịch một chuỗi Unicode thành một chuỗi byte được gọi là mã hóa ký tự.

Có ba loại mã hóa: UTF-8, UTF-16 và UTF-32. UTF viết tắt của Unicode Transformation Format.



Từ Python 3.0 trở đi, Python tích hợp sẵn hỗ trợ cho Unicode. Kiểu str chứa các ký tự Unicode, do đó bất kỳ chuỗi nào được tạo bằng cú pháp chuỗi đơn, chuỗi kép hoặc chuỗi ba dấu ngoặc kép đều được lưu trữ dưới dạng Unicode. Mã hóa mặc định cho mã nguồn Python là UTF-8.

Do đó, chuỗi có thể chứa biểu diễn chữ của một ký tự Unicode (3/4) hoặc giá trị Unicode của nó (\u00BE).



```python
var = "3/4"
print(var)
var = "\u00BE"
print(var)
```

Đoạn mã trên sẽ tạo ra đầu ra như sau:

```
3/4
¾
```



Trong ví dụ sau, một chuỗi ''10'' được lưu trữ bằng các giá trị Unicode của 1 và 0, lần lượt là \u0031 và u0030.

```python
var = "\u0031\u0030"
print(var)
```

Nó sẽ tạo ra đầu ra sau:

```
10
```

Chuỗi hiển thị văn bản dưới dạng dễ đọc cho con người, và byte lưu trữ các ký tự dưới dạng dữ liệu nhị phân. Mã hóa chuyển đổi dữ liệu từ một chuỗi ký tự thành một chuỗi byte. Giải mã chuyển đổi các byte trở lại thành các ký tự và ký hiệu dễ đọc cho con người. Quan trọng là không nên nhầm lẫn giữa hai phương pháp này. `encode` là một phương thức chuỗi, trong khi `decode` là một phương thức của đối tượng byte của Python.



Trong ví dụ sau, chúng ta có một biến chuỗi mà gồm các ký tự ASCII. ASCII là một phần của bộ ký tự Unicode. Phương thức `encode()` được sử dụng để chuyển đổi nó thành một đối tượng byte.

```python
string = "Hello"
tobytes = string.encode(''utf-8'')
print(tobytes)
string = tobytes.decode(''utf-8'')
print(string)
```

Phương thức `decode()` chuyển đổi đối tượng byte trở lại thành đối tượng str. Phương thức mã hóa được sử dụng là utf-8.

```
b''Hello''
Hello
```



Trong ví dụ sau, biểu tượng Rupee (₹) được lưu trữ trong biến bằng giá trị Unicode của nó. Chúng tôi chuyển đổi chuỗi thành byte và sau đó trở lại str.

```python
string = "\u20B9"
print(string)
tobytes = string.encode(''utf-8'')
print(tobytes)
string = tobytes.decode(''utf-8'')
print(string)
```

Khi bạn thực thi mã trên, nó sẽ tạo ra đầu ra sau:

```
₹
b''\xe2\x82\xb9''
₹
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 14. Python - Các Kiểu Chữ Số',
    'Bài 14. Python - Các Kiểu Chữ Số',
    14,
    '**1. Giới Thiệu về Các Kiểu Chữ Số trong Python**

Các kiểu chữ số hoặc hằng số trong Python là cách biểu diễn một giá trị cố định trong mã nguồn. Khác với biến, các hằng số (123, 4.3, "Hello") là các giá trị tĩnh hoặc bạn có thể nói là các hằng số không thay đổi trong suốt hoạt động của chương trình hoặc ứng dụng. Ví dụ, trong câu lệnh gán sau:

```python
x = 10
```

Ở đây, 10 là một hằng số là giá trị số, được lưu trữ trực tiếp trong bộ nhớ. Tuy nhiên, trong Python, bạn có thể khai báo một hằng số bằng cách sử dụng từ khoá const. Điều này đảm bảo rằng giá trị của hằng số không thay đổi trong suốt quá trình chạy của chương trình.

```python
y = x*2
```

Ở đây, ngay cả khi biểu thức tính toán ra 20, nó không được thêm vào mã nguồn một cách trực tiếp. Bạn cũng có thể khai báo một đối tượng int bằng hàm `int()` tích hợp sẵn. Tuy nhiên, đây cũng là một cách khởi tạo gián tiếp và không phải là sử dụng các hằng số.

```python
x = int(10)
```

**2. Các Loại Kiểu Chữ Số trong Python**

Python cung cấp các hằng số sau sẽ được giải thích trong bài hướng dẫn này:

- Kiểu Chữ Số Nguyên
- Kiểu Chữ Số Phẩy Động
- Kiểu Chữ Số Phức
- Kiểu Chữ Số Chuỗi
- Kiểu Chữ Số Danh Sách
- Kiểu Chữ Số Tuple
- Kiểu Chữ Số Từ Điển

**3. Kiểu Chữ Số Nguyên Python**

Bất kỳ biểu diễn nào chỉ bao gồm các ký tự số (0 đến 9) sẽ tạo ra một đối tượng kiểu int. Đối tượng được khai báo như vậy có thể được tham chiếu bằng một biến bằng toán tử gán.

**Ví dụ: Biểu Diễn Số Thập Phân**

```python
x = 10
y = -25
z = 0
```

**Ví dụ: Biểu Diễn Số Bát Phân**

Python cho phép một số nguyên được biểu diễn dưới dạng số bát phân hoặc số thập lục phân. Một biểu diễn số học với chỉ tám ký tự số (0 đến 7) nhưng được tiền tố bởi 0o hoặc 0O là một số bát phân trong Python.

```python
x = 0O34
```

**Ví dụ: Biểu Diễn Số Thập Lục Phân**

Tương tự, một chuỗi các ký tự thập lục phân (0 đến 9 và a đến f), tiền tố bởi 0x hoặc 0X đại diện cho một số nguyên dưới dạng thập lục phân trong Python.

```python
x = 0X1C
```

**Ví dụ: Biểu Diễn Số Thập Phân và Thập Lục Phân**

Tuy nhiên, có thể lưu ý rằng, ngay cả khi bạn sử dụng biểu diễn số học bát phân hoặc thập lục phân, Python nội bộ xem xét chúng như là kiểu int.

```python

x = 0O34
print("0O34 trong bát phân là", x, type(x))

x = 0X1c
print("0X1c trong Thập lục phân là", x, type(x))
```

Khi bạn chạy mã này, nó sẽ tạo ra đầu ra sau:

```
0O34 trong bát phân là 28 <class ''int''>
0X1c trong Thập lục phân là 28 <class ''int''>
```

**4. Kiểu Chữ Số Phẩy Động Python**

Một số phẩy động bao gồm một phần nguyên và một phần thập phân. Theo quy ước, một ký tự dấu chấm thập phân (.) phân tách hai phần này trong biểu diễn hằng số của một số thực.

**Ví dụ: Kiểu Chữ Số Phẩy Động**

```python
x = 25.55
y = 0.05
z = -12.2345
```

Đối với một số thực quá lớn hoặc quá nhỏ, trong đó số chữ số trước hoặc sau dấu thập phân là nhiều hơn, một biểu diễn khoa học được sử dụng cho biểu diễn hằng số ngắn gọn. Ký hiệu E hoặc e được theo sau bởi số nguyên dương hoặc số nguyên âm, đến sau phần nguyên.

**Ví dụ: Kiểu Chữ Số Phẩy Động Biểu Diễn Khoa Học**

Ví dụ, số 1.23E05 tương đương với 123000.00. Tương tự, 1.23e-2 tương đương với 0.0123.

```python

x = 1.23
print("1.23 trong kiểu chữ số phẩy động thông thường là", x, type(x))

x = 1.23E5
print("1.23E5 trong biểu diễn khoa học là", x, type(x))
x = 1.23E-2
print("1.23E-2 trong biểu diễn khoa học là", x, type(x))
```

Ở đây, bạn sẽ nhận được đầu ra sau:

```
1.23 trong kiểu chữ số phẩy động thông thường là 1.23 <class ''float''>
1.23E5 trong biểu diễn khoa học là 123000.0 <class ''float''>
1.23E-2 trong biểu diễn khoa học là 0.0123 <class ''float''>
```

**5. Kiểu Chữ Số Phức Python**

Một số phức bao gồm một phần thực và một phần ảo. Phần ảo là bất kỳ số nào (nguyên hoặc phẩy động) nhân với căn bậc hai của "-1" (√ −1). Trong biểu diễn hằng số, (−1−−−√
) được biểu diễn bởi "j" hoặc "J". Do đó, một biểu diễn hằng số phức có dạng x+yj.

**Ví dụ: Biểu Diễn Kiểu Chữ Số Phức**

```python

x = 2+3j
print("2+3j trong biểu diễn kiểu chữ số phức là", x, type(x))
y = 2.5+4.6j
print("2.5+4.6j trong biểu diễn kiểu chữ số phức là", x, type(x))
```

Mã này sẽ tạo ra đầu ra sau:

```
2+3j trong biểu diễn kiểu chữ số phức là (2+3j) <class ''complex''>
2.5+4.6j trong biểu diễn kiểu chữ số phức là (2+3j) <class ''complex''>
```

**6. Kiểu Chữ Số Chuỗi Python**

Một đối tượng chuỗi là một trong các loại dữ liệu dãy trong Python. Đó là một dãy không thể thay đổi của các điểm mã Unicode. Điểm mã là một số tương ứng với một ký tự theo tiêu chuẩn Unicode. Chuỗi là các đối tượng của lớp ''str'' tích hợp sẵn của Python.

Chuỗi chữ số được viết bằng cách bao bọc một chuỗi các ký tự trong dấu nháy đơn (''hello''), dấu nháy kép ("hello") hoặc ba dấu nháy (''''''hello'''''' hoặc """hello""").

**Ví dụ: Biểu Diễn Kiểu Chữ Số Chuỗi**

```python
var1 = ''hello''
print("''hello'' trong dấu nháy đơn là:", var1, type(var1))
var2 = "hello"
print(''"hello" trong dấu nháy kép là:'', var1, type(var1))
var3 = ''''''hello''''''
print("''''''hello'''''' trong ba dấu nháy là:", var1, type(var1))
var4 = """hello"""
print(''"""hello""" trong ba dấu nháy là:'', var1, type(var1))
```

Ở đây, bạn sẽ nhận được đầu ra sau:

```
''hello'' trong dấu nháy đơn là: hello <class ''str''>
"hello" trong dấu nháy kép là: hello <class ''str''>
''''''hello'''''' trong ba dấu nháy là: hello <class ''str''>
"""hello""" trong ba dấu nháy là: hello <class ''str''>
```

**Ví dụ: Biểu Diễn Kiểu Chữ Số Chuỗi Với Dấu Nháy Đôi Trong Chuỗi**

Nếu cần nhúng dấu nháy kép là một phần của chuỗi, chuỗi chính phải được đặt trong dấu nháy đơn. Ngược lại, nếu văn bản có dấu nháy đơn cần được nhúng, chuỗi phải được viết trong dấu nháy kép.

```python
var1 = ''Welcome to "Python Tutorial" from 8 Sync Dev''
print(var1)
var2 = "Welcome to ''Python Tutorial'' from 8 Sync Dev"
print(var2)
```

Nó sẽ tạo ra đầu ra sau:

```
Welcome to "Python Tutorial" from 8 Sync Dev
Welcome to ''Python Tutorial'' from 8 Sync Dev
```

**7. Kiểu Chữ Số Danh Sách Python**

Đối tượng danh sách trong Python là một bộ sưu tập các đối tượng của các kiểu dữ liệu khác nhau. Danh sách là một bộ sưu tập được sắp xếp các mục không nhất thiết cùng loại. Các đối tượng cá nhân trong bộ sưu tập có thể được truy cập bằng chỉ số bắt đầu từ không.

Biểu diễn hằng số của một đối tượng danh sách được thực hiện với một hoặc nhiều mục được phân tách bằng dấu phẩy và được bao bọc trong dấu ngoặc vuông [].

**Ví dụ: Biểu Diễn Kiểu Chữ Số Danh Sách**

```python
L1 = [1, "Ravi", 75.50, True]
print(L1, type(L1))
```

Nó sẽ tạo ra đầu ra sau:

```
[1, ''Ravi'', 75.5, True] <class ''list''>
```

**8. Kiểu Chữ Số Tuple Python**

Đối tượng tuple trong Python là một bộ sưu tập các đối tượng của các kiểu dữ liệu khác nhau. Tuple là một bộ sưu tập được sắp xếp các mục không nhất thiết cùng loại. Các đối tượng cá nhân trong bộ sưu tập có thể được truy cập bằng chỉ số bắt đầu từ không.

Biểu diễn hằng số của một đối tượng tuple được thực hiện với một hoặc nhiều mục được phân tách bằng dấu phẩy và được bao bọc trong dấu ngoặc đơn ().

**Ví dụ: Biểu Diễn Kiểu Chữ Số Tuple**

```python
T1 = (1, "Ravi", 75.50, True)
print(T1, type(T1))
```

Nó sẽ tạo ra đầu ra sau:

```
(1, ''Ravi'', 75.5, True) <class ''tuple''>
```

**Ví dụ: Biểu Diễn Kiểu Chữ Số Tuple Không Có Dấu Ngoặc Đơn**

Dấu phân cách mặc định cho chuỗi Python là dấu ngoặc đơn, có nghĩa là một chuỗi phân tách bằng dấu phẩy mà không có dấu ngoặc đơn cũng tạo ra một tuple.

```python
T1 = 1, "Ravi", 75.50, True
print(T1, type(T1))
```

Ở đây, bạn cũng sẽ nhận được đầu ra:

```
(1, ''Ravi'', 75.5, True) <class ''tuple''>
```

**9. Kiểu Chữ Số Từ Điển Python**

Giống như danh sách hoặc tuple, từ điển cũng là một kiểu dữ liệu bộ sưu tập. Tuy nhiên, nó không phải là một chuỗi. Đó là một bộ sưu tập không có thứ tự của các mục, mỗi mục là một cặp khóa-giá trị. Giá trị được gán cho khóa bằng dấu ":". Một hoặc nhiều cặp khóa:giá trị phân tách bằng dấu phẩy được đặt trong dấu ngoặc nhọn để tạo ra một đối tượng từ điển.

**Ví dụ: Biểu Diễn Kiểu Chữ Số Từ Điển**

```python
capitals = {"USA": "New York", "France": "Paris", "Japan": "Tokyo", "India": "New Delhi"}
numbers = {1: "one", 2: "Two", 3: "three", 4: "four"}
points = {"p1": (10, 10), "p2": (20, 20)}

print(capitals, type(capitals))
print(numbers, type(numbers))
print(points, type(points))
```

Đối tượng từ điển có thể sử dụng một đối tượng không thay đổi làm khóa. Số, chuỗi hoặc tuple có thể được sử dụng làm khóa. Một khóa không thể xuất hiện nhiều hơn một lần trong một bộ sưu tập. Nếu một khóa xuất hiện nhiều lần, chỉ có khóa cuối cùng được giữ lại. Giá trị có thể là bất kỳ kiểu dữ liệu nào. Một giá trị có thể được gán cho nhiều hơn một khóa. Ví dụ:

```python
staff = {"Krishna": "Officer", "Rajesh": "Manager", "Ragini": "officer", "Anil": "Clerk", "Kavita": "Manager"}
```

Hy vọng rằng những giải thích trên đã giúp bạn hiểu rõ về các loại kiểu chữ số trong Python. 

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 15. Python - Các Toán Tử',
    'Bài 15. Python - Các Toán Tử',
    15,
    'Các toán tử trong Python là những ký hiệu đặc biệt (đôi khi được gọi là từ khóa) được sử dụng để thực hiện các phép toán phổ biến trên một hoặc nhiều toán hạng (giá trị, biến hoặc biểu thức).

Python hỗ trợ các loại toán tử sau:

- Toán tử số học
- Toán tử so sánh (tương đối)
- Toán tử gán
- Toán tử logic
- Toán tử bitwise (bit)
- Toán tử thành viên
- Toán tử nhận diện

Chúng ta sẽ xem xét từng loại toán tử một.



Toán tử số học được sử dụng để thực hiện các phép toán cơ bản như cộng, trừ, nhân, chia, vv.

Giả sử biến `a` chứa giá trị 10 và biến `b` chứa giá trị 20, sau đó:

| Toán tử | Tên             | Ví dụ           |
| ------- | --------------- | --------------- |
| +       | Cộng            | `a + b = 30`    |
| -       | Trừ             | `a - b = -10`   |
| *       | Nhân            | `a * b = 200`   |
| /       | Chia            | `b / a = 2`     |
| %       | Chia lấy dư     | `b % a = 0`     |
| **      | Lũy thừa        | `a**b = 10**20` |
| //      | Chia lấy nguyên | `9//2 = 4`      |

Ví dụ về Toán tử Số học Python:

```python
a = 21
b = 10
c = 0

c = a + b
print("a: {} b: {} a+b: {}".format(a, b, c))

c = a - b
print("a: {} b: {} a-b: {}".format(a, b, c))

c = a * b
print("a: {} b: {} a*b: {}".format(a, b, c))

c = a / b
print("a: {} b: {} a/b: {}".format(a, b, c))

c = a % b
print("a: {} b: {} a%b: {}".format(a, b, c))

a = 2
b = 3
c = a**b 
print("a: {} b: {} a**b: {}".format(a, b, c))

a = 10
b = 5
c = a//b 
print("a: {} b: {} a//b: {}".format(a, b, c))
```

Kết quả:

```
a: 21 b: 10 a+b: 31
a: 21 b: 10 a-b: 11
a: 21 b: 10 a*b: 210
a: 21 b: 10 a/b: 2.1
a: 21 b: 10 a%b: 1
a: 2 b: 3 a**b: 8
a: 10 b: 5 a//b: 2
```



Toán tử so sánh so sánh các giá trị ở hai bên và quyết định mối quan hệ giữa chúng.

Giả sử biến `a` chứa giá trị 10 và biến `b` chứa giá trị 20, sau đó:

| Toán tử | Tên               | Ví dụ                 |
| ------- | ----------------- | --------------------- |
| ==      | Bằng              | `(a == b)` không đúng |
| !=      | Không bằng        | `(a != b)` đúng       |
| >       | Lớn hơn           | `(a > b)` không đúng  |
| <       | Nhỏ hơn           | `(a < b)` đúng        |
| >=      | Lớn hơn hoặc bằng | `(a >= b)` không đúng |
| <=      | Nhỏ hơn hoặc bằng | `(a <= b)` đúng       |

Ví dụ về Toán tử So sánh Python:

```python
a = 21
b = 10

if (a == b):
   print("Dòng 1 - a bằng b")
else:
   print("Dòng 1 - a không bằng b")

if (a != b):
   print("Dòng 2 - a không bằng b")
else:
   print("Dòng 2 - a bằng b")

if (a < b):
   print("Dòng 3 - a nhỏ hơn b")
else:
   print("Dòng 3 - a không nhỏ hơn b")

if (a > b):
   print("Dòng 4 - a lớn hơn b")
else:
   print("Dòng 4 - a không lớn hơn b")

a, b = b, a  # Giá trị của a và b đã đổi. a trở thành 10, b trở thành 21

if (a <= b):
   print("Dòng 5 - a nhỏ hơn hoặc bằng b")
else:
   print("Dòng 5 - a không nhỏ hơn hoặc bằng b")

if (b >= a):
   print("Dòng 6 - b lớn hơn hoặc bằng b")
else:
   print("Dòng 6 - b không lớn hơn hoặc bằng b")
```

Kết quả:

```
Dòng 1 - a không bằng b
Dòng 2 - a không bằng b
Dòng 3 - a không nhỏ hơn b
Dòng 4 - a lớn hơn b
Dòng 5 - a nhỏ hơn hoặc bằng b
Dòng 6 - b lớn hơn hoặc bằng a
```




Toán tử gán được sử dụng để gán giá trị cho các biến. Bảng dưới đây liệt kê tất cả các toán tử gán trong Python:

| Toán tử | Ví dụ     | Tương đương  |
| ------- | --------- | ------------ |
| =       | `a = 10`  | `a = 10`     |
| +=      | `a += 30` | `a = a + 30` |
| -=      | `a -= 15` | `a = a - 15` |
| *=      | `a *= 10` | `a = a * 10` |
| /=      | `a /= 5`  | `a = a / 5`  |
| %=      | `a %= 5`  | `a = a % 5`  |
| **=     | `a **= 4` | `a = a ** 4` |
| //=     | `a //= 5` | `a = a // 5` |
| &=      | `a &= 5`  | `a = a & 5`  |
| \|=     | `a \|= 5` | `a = a \| 5` |
| ^=      | `a ^= 5`  | `a = a ^ 5`  |
| >>=     | `a >>= 5` | `a = a >> 5` |
| <<=     | `a <<= 5` | `a = a << 5` |

Ví dụ về Toán tử Gán Python:

```python
a = 21
b = 10
c = 0
print("a: {} b: {} c : {}".format(a, b, c))

c = a + b
print("a: {}  c = a + b: {}".format(a, c))

c += a
print("a: {} c += a: {}".format(a, c))

c *= a
print("a: {} c *= a: {}".format(a, c))

c /= a
print("a: {} c /= a : {}".format(a, c))

c = 2
print("a: {} b: {} c : {}".format(a, b, c))
c %= a
print("a: {} c %= a: {}".format(a, c))

c **= a
print("a: {} c **= a: {}".format(a, c))

c //= a
print("a: {} c //= a: {}".format(a, c))
```

Kết quả:

```
a: 21 b: 10 c : 0
a: 21  c = a + b: 31
a: 21 c += a: 52
a: 21 c *= a: 1092
a: 21 c /= a : 52.0
a: 21 b: 10 c : 2
a: 21 c %= a: 2
a: 21 c **= a: 2097152
a: 21 c //= a: 99864
```



Toán tử Bitwise hoạt động trên các bit và thực hiện các phép toán bit từng bit. Những toán tử này được sử dụng để so sánh các số nhị phân.

Python hỗ trợ các toán tử Bitwise sau:

| Toán tử | Tên       | Ví dụ    |
| ------- | --------- | -------- |
| &       | AND       | `a & b`  |
| \|      | OR        | `a \| b` |
| ^       | XOR       | `a ^ b`  |
| ~       | NOT       | `~a`     |
| <<      | Dịch trái | `a << 3` |
| >>      | Dịch phải | `a >> 3` |

Ví dụ về Toán tử Bitwise Python:

```python
a = 20            
b = 10            

print(''a ='', a, '':'', bin(a), ''b ='', b, '':'', bin(b))
c = 0

c = a & b        
print("Kết quả của AND là ", c, '':'', bin(c))

c = a | b     
print("Kết quả của OR là ", c, '':'', bin(c))

c = a ^ b        
print("Kết quả của XOR là ", c, '':'', bin(c))

c = ~a           
print("Kết quả của NOT là ", c, '':'', bin(c))

c = a << 2       
print("Kết quả của Dịch trái là ", c, '':'', bin(c))

c = a >> 2       
print("Kết quả của Dịch phải là ", c, '':'', bin(c))
```

Kết quả:

```
a = 20 : 0b10100 b = 10 : 0b1010
Kết quả của AND là  0 : 0b0
Kết quả của OR là  30 : 0b11110
Kết quả của XOR là  30 : 0b11110
Kết quả của NOT là  -21 : -0b10101
Kết quả của Dịch trái là  80 : 0b1010000
Kết quả của Dịch phải là  5 : 0b101
```



Toán tử logic Python được sử dụng để kết hợp hai hoặc nhiều điều kiện và kiểm tra kết quả cuối cùng. Có ba toán tử logic sau được hỗ trợ bởi ngôn ngữ Python:

| Toán tử | Tên | Ví dụ     |
| ------- | --- | --------- |
| and     | AND | `a and b` |
| or      | OR  | `a or b`  |
| not     | NOT | `not(a)`  |

Ví dụ về Toán tử Logic Python:

```python
var = 5

print(var > 3 and var < 10)
print(var > 3 or var < 4)
print(not (var > 3 and var < 10))
```

Kết quả:

```
True
True
False
```



Toán tử thành viên của Python kiểm tra sự tồn tại của một biến trong một chuỗi, như chuỗi, danh sách hoặc tuple. Có hai toán tử thành viên như sau:

| Toán tử | Mô tả                                                                | Ví dụ        |
| ------- | -------------------------------------------------------------------- | ------------ |
| in      | Trả về True nếu nó tìm thấy một biến trong chuỗi được chỉ định       | `a in b`     |
| not in  | Trả về True nếu nó không tìm thấy một biến trong chuỗi được chỉ định | `a not in b` |

Ví dụ về Toán tử Thành viên Python:

```python
a = 10
b = 20
list = [1, 2, 3, 4, 5]

print("a:", a, "b:", b, "list:", list)

if (a in list):
   print("a có trong danh sách đã cho")
else:
   print("a không có trong danh sách đã cho")

if (b not in list):
   print("b không có trong danh sách đã cho")
else:
   print("b có trong danh sách đã cho")

c = b / a
print("c:", c, "list:", list)

if (c in list):
   print("c có trong danh sách đã cho")
else:
    print("c không có trong danh sách đã cho")
```

Kết quả:

```
a: 10 b: 20 list: [1, 2, 3, 4, 5]
a không có trong danh sách đã cho
b không có trong danh sách đã cho
c có trong danh sách đã cho
```



Toán tử nhận diện so sánh các vị trí bộ nhớ của hai đối tượng. Có hai toán tử nhận diện như sau:

| Toán tử | Mô tả                                                        | Ví dụ        |
| ------- | ------------------------------------------------------------ | ------------ |
| is      | Trả về True nếu cả hai biến đều trỏ đến cùng một đối tượng   | `a is b`     |
| is not  | Trả về True nếu cả hai biến không trỏ đến cùng một đối tượng | `a is not b` |

Ví dụ về Toán tử Nhận diện Python:

```python
a = [1, 2, 3, 4, 5]
b = [1, 2, 3, 4, 5]
c = a

print(a is c)
print(a is b)

print(a is not c)
print(a is not b)
```

Kết quả:

```
True
False
False
True
```



Bảng dưới đây liệt kê tất cả các toán tử từ ưu tiên cao nhất đến thấp nhất.

| STT | Toán tử                                    | Mô tả                                    |
| --- | ------------------------------------------ | ---------------------------------------- |
| 1   | **                                         | Lũy thừa                                 |
| 2   | ~ + -                                      | Bù 1, dấu âm, dấu dương                  |
| 3   | * / % //                                   | Nhân, chia, chia lấy dư, chia lấy nguyên |
| 4   | + -                                        | Cộng, trừ                                |
| 5   | >> <<                                      | Dịch trái, dịch phải                     |
| 6   | &                                          | AND                                      |
| 7   | ^ \|                                       | XOR, OR                                  |
| 8   | <= < > >=                                  | So sánh                                  |
| 9   | == !=                                      | So sánh                                  |
| 10  | = %= /= //= -= += *= **= <<= >>= &= \|= ^= | Gán                                      |
| 11  | is is not                                  | Nhận diện                                |
| 12  | in not in                                  | Thành viên                               |
| 13  | not or and                                 | Logic                                    |

Đây là tài liệu về các toán tử trong Python. Hy vọng nó hữu ích cho bạn!


Trên đây là tài liệu chi tiết về các toán tử trong Python, được viết bằng tiếng Việt với định dạng đẹp và tổ chức cấu trúc rõ ràng. 

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 16. Python - Các Toán Tử Số Học',
    'Bài 16. Python - Các Toán Tử Số Học',
    16,
    'Trong Python, các số là loại dữ liệu được sử dụng phổ biến nhất. Python sử dụng các ký hiệu giống như các phép toán số học cơ bản mà mọi người đều quen thuộc, tức là "+" cho phép cộng, "-" cho phép trừ, "*" cho phép nhân (hầu hết các ngôn ngữ lập trình sử dụng "*" thay vì "x" như được sử dụng trong toán học / đại số), và "/" cho phép chia (một lần nữa cho "÷" được sử dụng trong Toán học).

Ngoài ra, Python định nghĩa một số toán tử số học khác. Chúng là "%" (Phần dư), "**" (Lũy thừa) và "//" (Chia lấy phần nguyên).



Các toán tử số học là các toán tử nhị phân vì chúng hoạt động trên hai toán hạng. Python hỗ trợ hoàn toàn phép tính hỗn hợp. Đó là, hai toán hạng có thể thuộc hai loại số khác nhau. Trong tình huống như vậy, Python mở rộng toán hạng hẹp hơn. Một đối tượng số nguyên hẹp hơn một đối tượng số thực, và số thực hẹp hơn số phức. Do đó, kết quả của phép toán số học giữa số nguyên và số thực là một số thực. Kết quả của số thực và một số phức là một số phức, tương tự, phép tính trên một số nguyên và một đối tượng số phức sẽ cho kết quả là một đối tượng số phức.



Dưới đây là bảng liệt kê tất cả các toán tử số học có sẵn trong Python:

| Toán tử | Tên         | Ví dụ        |
| ------- | ----------- | ------------ |
| +       | Cộng        | a + b = 30   |
| -       | Trừ         | a – b = -10  |
| *       | Nhân        | a * b = 200  |
| /       | Chia        | b / a = 2    |
| %       | Phần dư     | b % a = 0    |
| **      | Lũy thừa    | a**b =10**20 |
| //      | Chia lấy dư | 9//2 = 4     |

Hãy cùng tìm hiểu các toán tử này thông qua các ví dụ.



Toán tử này được phát âm là "cộng", là một toán tử số học cơ bản. Nó cộng hai toán hạng số học ở hai bên và trả về kết quả cộng.



Trong ví dụ sau, hai biến số nguyên là các toán hạng cho toán tử "+".

```python
a=10
b=20
print ("Tổng của hai số nguyên:")
print ("a =",a,"b =",b,"tổng =",a+b)
```

Nó sẽ tạo ra đầu ra sau:

```
Tổng của hai số nguyên
a = 10 b = 20 tổng = 30
```



Cộng một số nguyên và một số thực sẽ cho kết quả là một số thực.

```python
a=10
b=20.5
print ("Tổng của số nguyên và số thực")
print ("a =",a,"b =",b,"tổng =",a+b)
```

Nó sẽ tạo ra đầu ra sau:

```
Tổng của số nguyên và số thực
a = 10 b = 20.5 tổng = 30.5
```



Kết quả của việc thêm số thực vào số phức là một số phức.

```python
a=10+5j
b=20.5
print ("Tổng của số phức và số thực")
print ("a=",a,"b=",b,"tổng=",a+b)
```

Nó sẽ tạo ra đầu ra sau:

```
Tổng của số phức và số thực
a= (10+5j) b= 20.5 tổng= (30.5+5j)
```



Toán tử này, được biết đến như là "trừ", trừ toán hạng thứ hai khỏi toán hạng đầu tiên. Số kết quả là âm nếu toán hạng thứ hai lớn hơn.



Ví dụ đầu tiên cho thấy sự trừ của hai số nguyên.

```python
a=10
b=20
print ("Hiệu của hai số nguyên:")
print ("a =",a,"b =",b,"a-b =",a-b)
print ("a =",a,"b =",b,"b-a =",b-a)
```

Kết quả:

```
Hiệu của hai số nguyên
a = 10 b = 20 a-b = -10
a = 10 b = 20 b-a = 10
```



Phép trừ của một số nguyên và một số thực tuân theo nguyên tắc tương tự.

```python
a=10
b=20.5
print ("Hiệu của python số nguyên và số thực")
print ("a=",a,"b=",b,"a-b=",a-b)
print ("a=",a,"b=",b,"b-a=",b-a)
```

Nó sẽ tạo ra đầu ra sau:

```
Hiệu của số nguyên và số thực
a= 10 b= 20.5 a-b= -10.5
a= 10 b= 20.5 b-a= 10.5
```



Trong phép trừ liên quan đến một số phức và một số thực, phần thực được sử dụng trong phép tính.

```python
a=10+5j
b=20.5
print ("Hiệu của số phức và số thực")
print ("a=",a,"b=",b,"a-b=",a-b)
print ("a=",a,"b=",b,"b-a=",b-a)
```

Nó sẽ tạo ra đầu ra sau:

```
Hiệu của số phức và số thực
a= (10+5j) b= 20.5 a-b= (-10.5+5j)
a= (10+5j) b= 20.5 b-a= (10.5-5j)
```



Ký hiệu * (dấu hoa thị) được định nghĩa như một toán tử nhân trong Python (như trong nhiều ngôn ngữ). Nó trả về tích của hai toán hạng ở hai bên của nó. Nếu bất kỳ toán hạng nào là số âm, kết quả cũng là số âm. Nếu cả hai đều âm, kết quả là dương. Thay đổi thứ tự của các toán hạng không làm thay đổi kết quả.



```python
a=10
b=20
print ("Tích của hai số nguyên")
print ("a =",a,"b =",b,"a*b =",a*b)
```

Nó sẽ tạo ra đầu ra sau:

```
Tích của hai số nguyên
a = 10 b = 20 a*b = 200
```



Trong phép nhân, một toán hạng số thực có thể có một biểu thức thập phân tiêu chuẩn, hoặc một biểu thức khoa học.

```python
a=10
b=20.5
print ("Tích của số nguyên và số thực")
print ("a=",a,"b=",b,"a*b=",a*b)

a=-5.55
b=6.75E-3
print ("Tích của số thực và số thực")
print ("a =",a,"b =",b,"a*b =",a*b)
```

Nó sẽ tạo ra đầu ra sau:

```
Tích của số nguyên và số thực
a = 10 b = 20.5 a-b = -10.5
Tích của số thực và số thực
a = -5.55 b = 0.00675 a*b = -0.037462499999999996
```



Đối với phép nhân có một toán hạng số phức, toán hạng khác nhân cả phần thực và phần ảo.

```python
a=10+5j
b=20.5
print ("Tích của số phức và số thực")
print ("a =",a,"b =",b,"a*b =",a*b)
```

Nó sẽ tạo ra đầu ra sau:

```
Tích của số phức và số thực
a = (10+5j) b = 20.5 a*b = (205+102.5j)
```



Toán tử "/" (dấu gạch chéo) thường được gọi là gạch chéo phía trước. Kết quả của toán tử chia là tử số (toán hạng bên trái) chia cho mẫu số (toán hạng bên phải). Số kết quả là âm nếu bất kỳ toán hạng nào là số âm. Vì vô cùng không thể được lưu trữ trong bộ nhớ, Python ném ra lỗi ZeroDivisionError nếu mẫu số là 0. Kết quả của toán tử chia trong Python luôn là một số thực, ngay cả khi cả hai toán hạng đều là số nguyên.



```python
a=10
b=20
print ("Chia của hai số nguyên")
print ("a=",a,"b=",b,"a/b=",a/b)
print ("a=",a,"b=",b,"b/a=",b/a)
```

Nó sẽ tạo ra đầu ra sau:

```
Chia của hai số nguyên
a= 10 b= 20 a/b= 0.5
a= 10 b= 20 b/a= 2.0
```



Trong phép chia, một toán hạng số thực có thể có một biểu thức thập phân tiêu chuẩn, hoặc một biểu thức khoa học.

```python
a=10
b=-20.5
print ("Chia của số nguyên và số thực")
print ("a=",a,"b=",b,"a/b=",a/b)

a=-2.50
b=1.25E2
print ("Chia của số thực và số thực")
print ("a=",a,"b=",b,"a/b=",a/b)
```

Nó sẽ tạo ra đầu ra sau:

```
Chia của số nguyên và số thực
a= 10 b= -20.5 a/b= -0.4878048780487805
Chia của số thực và số thực Số nguyên và số thực
```python
a=10
b=20.5
print ("Hiệu của số nguyên và số thực")
print ("a=",a,"b=",b,"a-b=",a-b)
print ("a=",a,"b=",b,"b-a=",b-a)
```
Sẽ tạo ra đầu ra sau:

```
Hiệu của số nguyên và số thực
a= 10 b= 20.5 a-b= -10.5
a= 10 b= 20.5 b-a= 10.5
```



Trong phép trừ liên quan đến một số phức và một số thực, thành phần thực được sử dụng trong phép tính.

```python
a=10+5j
b=20.5
print ("Hiệu của số phức và số thực")
print ("a=",a,"b=",b,"a-b=",a-b)
print ("a=",a,"b=",b,"b-a=",b-a)
```

Nó sẽ tạo ra đầu ra sau:

```
Hiệu của số phức và số thực
a= (10+5j) b= 20.5 a-b= (-10.5+5j)
a= (10+5j) b= 20.5 b-a= (10.5-5j)
```



Ký hiệu * (asterisk) được định nghĩa là toán tử nhân trong Python (như trong nhiều ngôn ngữ). Nó trả về tích của hai toán hạng ở hai bên. Nếu bất kỳ toán hạng nào là số âm, kết quả cũng là số âm. Nếu cả hai đều âm, kết quả là dương. Thay đổi thứ tự của các toán hạng không làm thay đổi kết quả.



```python
a=10
b=20
print ("Tích của hai số nguyên")
print ("a =",a,"b =",b,"a*b =",a*b)
```

Sẽ tạo ra đầu ra sau:

```
Tích của hai số nguyên
a = 10 b = 20 a*b = 200
```



Trong phép nhân, một toán hạng số thực có thể có một biểu diễn thập phân tiêu chuẩn hoặc một biểu diễn toán học.

```python
a=10
b=20.5
print ("Tích của số nguyên và số thực")
print ("a=",a,"b=",b,"a*b=",a*b)

a=-5.55
b=6.75E-3
print ("Tích của số thực và số thực")
print ("a =",a,"b =",b,"a*b =",a*b)
```

Sẽ tạo ra đầu ra sau:

```
Tích của số nguyên và số thực
a = 10 b = 20.5 a-b = -10.5
Tích của số thực và số thực
a = -5.55 b = 0.00675 a*b = -0.037462499999999996
```



Đối với phép nhân liên quan đến một toán hạng phức, toán hạng còn lại nhân cả phần thực và phần ảo.

```python
a=10+5j
b=20.5
print ("Tích của số phức và số thực")
print ("a =",a,"b =",b,"a*b =",a*b)
```

Sẽ tạo ra đầu ra sau:

```
Tích của số phức và số thực
a = (10+5j) b = 20.5 a*b = (205+102.5j)
```



Dấu "/" thường được gọi là dấu gạch chéo. Kết quả của toán tử chia là tử số (toán hạng trái) chia cho mẫu số (toán hạng phải). Số kết quả là âm nếu bất kỳ toán hạng nào là số âm. Vì vô hạn không thể được lưu trữ trong bộ nhớ, Python ném ra ZeroDivisionError nếu mẫu số là 0. Kết quả của toán tử chia trong Python luôn là một số thực, ngay cả khi cả hai toán hạng đều là số nguyên.



```python
a=10
b=20
print ("Chia của hai số nguyên")
print ("a=",a,"b=",b,"a/b=",a/b)
print ("a=",a,"b=",b,"b/a=",b/a)
```

Sẽ tạo ra đầu ra sau:

```
Chia của hai số nguyên
a= 10 b= 20 a/b= 0.5
a= 10 b= 20 b/a= 2.0
```



Trong phép chia, một toán hạng số thực có thể có một biểu diễn thập phân tiêu chuẩn hoặc một biểu diễn toán học.

```python
a=10
b=-20.5
print ("Chia của số nguyên và số thực")
print ("a=",a,"b=",b,"a/b=",a/b)
a=-2.50
b=1.25E2
print ("Chia của số thực và số thực")
print ("a=",a,"b=",b,"a/b=",a/b)
```

Sẽ tạo ra đầu ra sau:

```
Chia của số nguyên và số thực
a= 10 b= -20.5 a/b= -0.4878048780487805
Chia của số thực và số thực
a= -2.50 b= 125.0 a/b= -0.02
```



Khi một trong các toán hạng là một số phức, phép chia giữa toán hạng còn lại và cả hai phần của đối tượng số phức (phần thực và ảo) đều xảy ra.

```python
a=7.5+7.5j
b=2.5
print ("Chia của số phức và số thực")
print ("a =",a,"b =",b,"a/b =",a/b)
print ("a =",a,"b =",b,"b/a =",b/a)
```

Sẽ tạo ra đầu ra sau:

```
Chia của số phức và số thực
a = (7.5+7.5j) b = 2.5 a/b = (3+3j)
a = (7.5+7.5j) b = 2.5 b/a = (0.16666666666666666-0.16666666666666666j)
```

Nếu tử số là 0, kết quả của phép chia luôn là 0 ngoại trừ khi mẫu số là 0, trong trường hợp này, Python ném ra ZeroDivisionError với thông báo lỗi Phép Chia Cho Không.

```python
a=0
b=2.5
print ("a=",a,"b=",b,"a/b=",a/b)
print ("a=",a,"b=",b,"b/a=",b/a)
```

Sẽ tạo ra đầu ra sau:

```
a= 0 b= 2.5 a/b= 0.0
Traceback (most recent call last):
  File "C:\Users\mlath\examples\example.py", line 20, in <module>
     print ("a=",a,"b=",b,"b/a=",b/a)
                                 ~^~
ZeroDivisionError: float division by zero
```



Python định nghĩa ký hiệu "%" được gọi là ký hiệu Phần Trăm, là toán tử Lấy Dư (hoặc phần dư). Nó trả về phần dư sau khi mẫu số chia tử số. Nó cũng có thể được gọi là toán tử dư dư. Kết quả của toán tử lấy dư là số còn lại sau khi chia tỷ lệ nguyên. Ví dụ, khi 10 chia 3, tỷ lệ là 3 và phần dư là 1. Do đó, 10%3 (thường được phát âm là 10 mod 3) kết quả là 1.



Nếu cả hai toán hạng đều là số nguyên, giá trị phần dư là một số nguyên. Nếu tử số có thể chia hết, phần dư là 0. Nếu tử số nhỏ hơn mẫu số, phần dư bằng tử số. Nếu mẫu số là 0, Python ném ra ZeroDivisionError.

```python
a=10
b=2
print ("a=",a, "b=",b, "a%b=", a%b)
a=10
b=4
print ("a=",a, "b=",b, "a%b=", a%b)
print ("a=",a, "b=",b, "b%a=", b%a)
a=0
b=10
print ("a=",a, "b=",b, "a%b=", a%b)
print ("a=", a, "b=", b, "b%a=",b%a)
```

Sẽ tạo ra đầu ra sau:

```
a= 10 b= 2 a%b= 0
a= 10 b= 4 a%b= 2
a= 10 b= 4 b%a= 4
a= 0 b= 10 a%b= 0
Traceback (most recent call last):
  File "C:\Users\mlath\examples\example.py", line 13, in <module>
    print ("a=", a, "b=", b, "b%a=",b%a)
                                    ~^~
ZeroDivisionError: integer modulo by zero
```



Nếu một trong các toán hạng là một số thực, giá trị mod luôn là số thực.

```python
a=10
b=2.5
print ("a=",a, "b=",b, "a%b=", a%b)
a=10
b=1.5
print ("a=",a, "b=",b, "a%b=", a%b)
a=7.7
b=2.5
print ("a=",a, "b=",b, "a%b=", a%b)
a=12.4
b=3
print ("a=",a, "b=",b, "a%b=", a%b)
```

Sẽ tạo ra đầu ra sau:

```
a= 10 b= 2.5 a%b= 0.0
a= 10 b= 1.5 a%b= 1.0
a= 7.7 b= 2.5 a%b= 0.20000000000000018
a= 12.4 b= 3 a%b= 0.40000000000000036
```
*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 17. Python - Toán tử So sánh',
    'Bài 17. Python - Toán tử So sánh',
    17,
    'Toán tử so sánh trong Python rất quan trọng trong các câu lệnh điều kiện của Python (if, else và elif) và các câu lệnh lặp (while và for loops). Các toán tử so sánh cũng được gọi là các toán tử quan hệ. Một số toán tử được biết đến là "<" đại diện cho toán tử nhỏ hơn, và ">" đại diện cho toán tử lớn hơn.

Python sử dụng thêm hai toán tử nữa, kết hợp "=" với hai toán tử này. Toán tử "<=" đại diện cho toán tử nhỏ hơn hoặc bằng và toán tử ">=" đại diện cho toán tử lớn hơn hoặc bằng.


Các Toán tử So sánh Khác nhau trong Python

Python có thêm hai toán tử so sánh dưới dạng "==" và "!=". Chúng được sử dụng cho các toán tử bằng và khác. Do đó, có sáu toán tử so sánh trong Python và chúng được liệt kê dưới đây trong bảng này:

- <	Ít hơn	a<b
- >	Lớn hơn	a>b
- <=	Nhỏ hơn hoặc bằng	a<=b
- >=	Lớn hơn hoặc bằng	a>=b
- ==	Bằng	a==b
- !=	Không bằng	a!=b

Các toán tử so sánh là nhị phân theo tính chất, yêu cầu hai toán hạng. Một biểu thức liên quan đến một toán tử so sánh được gọi là biểu thức Boolean, và luôn trả về True hoặc False.

**Ví dụ**
```python
a = 5
b = 7
print(a > b)
print(a < b)
```
Kết quả sẽ là:

```
False
True
```

Cả hai toán hạng có thể là các biến, biểu thức hoặc các biểu thức Python. Vì Python hỗ trợ toán hạng kết hợp, bạn có thể có bất kỳ loại số học nào.

**Ví dụ**
```python

a = 5
b = 7
print("Cả hai toán hạng đều là số nguyên")
print("a =", a, "b =", b, "a > b là", a > b)
print("a =", a, "b =", b, "a < b là", a < b)
```

**Python - Các Toán tử So sánh**

**Toán tử So sánh trong Python**

Toán tử so sánh trong Python rất quan trọng trong các câu lệnh điều kiện của Python (if, else và elif) và các câu lệnh lặp (vòng lặp while và for). Các toán tử so sánh còn được gọi là các toán tử quan hệ. Một số toán tử nổi tiếng là "<" đại diện cho toán tử nhỏ hơn, và ">" đại diện cho toán tử lớn hơn.

Python sử dụng thêm hai toán tử nữa, kết hợp với dấu "=" với hai toán tử này. Dấu "<=" đại diện cho toán tử nhỏ hơn hoặc bằng và dấu ">=" đại diện cho toán tử lớn hơn hoặc bằng.

**Các Toán tử So sánh Khác nhau trong Python**

Python có thêm hai toán tử so sánh dưới dạng "==" và "!=". Chúng được sử dụng cho các toán tử bằng và không bằng. Do đó, có sáu toán tử so sánh trong Python và chúng được liệt kê dưới đây trong bảng:

- < 	So sánh nhỏ hơn 	a < b
- > 	So sánh lớn hơn 	a > b
- <= 	Nhỏ hơn hoặc bằng 	a <= b
- >= 	Lớn hơn hoặc bằng 	a >= b
- == 	Bằng 	a == b
- != 	Không bằng 	a != b

Các toán tử so sánh là nhị phân, yêu cầu hai toán hạng. Một biểu thức liên quan đến một toán tử so sánh được gọi là một biểu thức Boolean và luôn trả về True hoặc False.

**Ví dụ**

```python
a = 5
b = 7
print(a > b)
print(a < b)
```

Kết quả sẽ là:

```
False
True
```

Cả hai toán hạng có thể là các hằng số Python, biến hoặc biểu thức. Vì Python hỗ trợ phép tính kết hợp, bạn có thể có bất kỳ kiểu số nào.

**Ví dụ**

Dưới đây là mã minh họa về việc sử dụng các toán tử so sánh của Python với các số nguyên:

```python
print("Cả hai toán hạng đều là số nguyên")
a = 5
b = 7
print("a=", a, "b=", b, "a > b là", a > b)
print("a=", a, "b=", b, "a < b là", a < b)
print("a=", a, "b=", b, "a == b là", a == b)
print("a=", a, "b=", b, "a != b là", a != b)
```

Kết quả sẽ là:

```
Cả hai toán hạng đều là số nguyên
a= 5 b= 7 a > b là False
a= 5 b= 7 a < b là True
a= 5 b= 7 a == b là False
a= 5 b= 7 a != b là True
```

**So sánh của Số thực**

Trong ví dụ dưới đây, một toán hạng số nguyên và một toán hạng số thực được so sánh.

**Ví dụ**

```python
print("So sánh của số nguyên và số thực")
a = 10
b = 10.0
print("a=", a, "b=", b, "a > b là", a > b)
print("a=", a, "b=", b, "a < b là", a < b)
print("a=", a, "b=", b, "a == b là", a == b)
print("a=", a, "b=", b, "a != b là", a != b)
```

Kết quả sẽ là:

```
So sánh của số nguyên và số thực
a= 10 b= 10.0 a > b là False
a= 10 b= 10.0 a < b là False
a= 10 b= 10.0 a == b là True
a= 10 b= 10.0 a != b là False
```

**So sánh của Số phức**

Mặc dù đối tượng phức là một loại dữ liệu số trong Python, hành vi của nó khác biệt so với các loại dữ liệu khác. Python không hỗ trợ các toán tử < và >, tuy nhiên, nó hỗ trợ các toán tử bằng (==) và toán tử không bằng (!=).

**Ví dụ**

```python
print("So sánh của số phức")
a = 10 + 1j
b = 10 - 1j
print("a=", a, "b=", b, "a == b là", a == b)
print("a=", a, "b=", b, "a != b là", a != b)
```

Kết quả sẽ là:

```
So sánh của số phức
a= (10+1j) b= (10-1j) a == b là False
a= (10+1j) b= (10-1j) a != b là True
```

Bạn sẽ nhận được một TypeError khi sử dụng các toán tử nhỏ hơn hoặc lớn hơn.

**Ví dụ**

```python
print("So sánh của số phức")
a = 10 + 1j
b = 10 - 1j
print("a=", a, "b=", b, "a < b là", a < b)
print("a=", a, "b=", b, "a > b là", a > b)
```

Kết quả sẽ là:

```
So sánh của số phức
Traceback (most recent call last):
  File "C:\Users\mlath\examples\example.py", line 5, in <module>
    print("a=", a, "b=", b, "a < b là", a < b)
TypeError: ''<'' not supported between instances of ''complex'' and ''complex''
```

**So sánh của Kiểu Boolean**

Các đối tượng Boolean trong Python thực sự là số nguyên: True là 1 và False là 0. Trong thực tế, Python coi bất kỳ số khác không nào là True. Trong Python, việc so sánh các đối tượng Boolean là có thể. "False < True" là True!

**Ví dụ**

```python
print("So sánh của Kiểu Boolean")
a = True
b = False
print("a=", a, "b=", b, "a < b là", a < b)
print("a=", a, "b=", b, "a > b là", a > b)
print("a=", a, "b=", b, "a == b là", a == b)
print("a=", a, "b=", b, "a != b là", a != b)
```

Kết quả sẽ là:

```
So sánh của Kiểu Boolean
a= True b= False a < b là False
a= True b= False a > b là True
a= True b= False a == b là False
a= True b= False a != b là True
```

**So sánh của Các loại Dãy**

Trong Python, chỉ có thể thực hiện so sánh của các đối tượng dãy tương tự. Một đối tượng chuỗi có thể so sánh với một chuỗi khác chỉ. Một danh sách không thể được so sánh với một tuple, ngay cả khi cả hai đều có các phần tử giống nhau.

**Ví dụ**

```python
print("So sánh của các loại dãy khác nhau")
a = (1, 2, 3)
b = [1, 2, 3]
print("a=", a, "b=", b, "a < b là", a < b)
```

Kết quả sẽ là:

```
So sánh của các loại dãy khác nhau
Traceback (most recent call last):
  File "C:\Users\mlath\examples\example.py", line 5, in <module>
    print("a=", a, "b=", b, "a < b là", a < b)
TypeError: ''<'' not supported between instances of ''tuple'' and ''list''
```

Các đối tượng dãy được so sánh bằng cơ chế sắp xếp từ điển. So sánh bắt đầu từ mục tại chỉ mục 0. Nếu chúng bằng nhau, so sánh di chuyển đến chỉ mục tiếp theo cho đến khi các mục tại một chỉ mục nhất định không bằng nhau hoặc một trong hai dãy đã hết. Nếu một dãy là một phần dãy con ban đầu của dãy kia, dãy ngắn hơn sẽ là dãy nhỏ hơn.

Sự khác biệt giữa hai toán hạng phụ thuộc vào sự khác biệt giữa các giá trị của các mục tại chỉ mục mà chúng không bằng nhau. Ví dụ, ''BAT'' > ''BAR'' là True, vì T đến sau R trong thứ tự Unicode.

Nếu tất cả các mục của hai dãy so sánh bằng nhau, các dãy được coi là bằng nhau.

**Ví dụ**

```python
print("So sánh của chuỗi")
a = ''BAT''
b = ''BALL''
print("a=", a, "b=", b, "a < b là", a < b)
print("a=", a, "b=", b, "a > b là", a > b)
print("a=", a, "b=", b, "a == b là", a == b)
print("a=", a, "b=", b, "a != b là", a != b)
```

Kết quả sẽ là:

```
So sánh của chuỗi
a= BAT b= BALL a < b là False
a= BAT b= BALL a > b là True
a= BAT b= BALL a == b là False
a= BAT b= BALL a != b là True
```

Trong ví dụ dưới đây, hai đối tượng tuple được so sánh:

**Ví dụ**

```python
print("So sánh của các tuples")
a = (1, 2, 4)
b = (1, 2, 3)
print("a=", a, "b=", b, "a < b là", a < b)
print("a=", a, "b=", b, "a > b là", a > b)
print("a=", a, "b=", b, "a == b là", a == b)
print("a=", a, "b=", b, "a != b là", a != b)
```

Kết quả sẽ là:

```
a= (1, 2, 4) b= (1, 2, 3) a < b là False
a= (1, 2, 4) b= (1, 2, 3) a > b là True
a= (1, 2, 4) b= (1, 2,à 3) a==b là False
a= (1, 2, 4) b= (1, 2, 3) a != b là True
```

**So sánh của Các Đối tượng Từ điển**

Việc sử dụng các toán tử "<" và ">" cho từ điển của Python không được định nghĩa. Trong trường hợp của các toán hạng này, TypeError: ''<'' not supported between instances of ''dict'' and ''dict'' được báo cáo.

So sánh bằng kiểm tra xem độ dài của cả hai mục từ điển có giống nhau không. Độ dài của từ điển là số cặp khóa-giá trị trong đó.

Các từ điển Python đơn giản chỉ được so sánh bằng độ dài. Từ điển có ít phần tử hơn được coi là nhỏ hơn một từ điển có nhiều phần tử.

**Ví dụ**

```python
print("So sánh của các đối tượng từ điển")
a = {1: 1, 2: 2}
b = {2: 2, 1: 1, 3: 3}
print("a=", a, "b=", b, "a == b là", a == b)
print("a=", a, "b=", b, "a != b là", a != b)
```

Kết quả sẽ là:

```
So sánh của các đối tượng từ điển
a= {1: 1, 2: 2} b= {2: 2, 1: 1, 3: 3} a==b là False
a= {1: 1, 2: 2} b= {2: 2, 1: 1, 3: 3} a!=b là True
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 18. Hướng dẫn sử dụng Toán tử Gán trong Python',
    'Bài 18. Hướng dẫn sử dụng Toán tử Gán trong Python',
    18,
    'Toán tử = (bằng) được định nghĩa là toán tử gán trong Python. Giá trị của biểu thức Python ở bên phải của nó được gán cho một biến duy nhất ở bên trái. Toán tử = (bằng) như trong lập trình nói chung (và Python cụ thể) không nên bị nhầm lẫn với việc sử dụng trong Toán học, nơi nó chỉ ra rằng các biểu thức ở cả hai bên của ký hiệu bằng nhau.



Xem xét các câu lệnh Python sau:

```python
a = 10
b = 5
a = a + b
print(a)
```

Ở lần gọi đầu tiên, ít nhất đối với một người mới vào lập trình nhưng biết toán học, câu lệnh "a=a+b" trông lạ lùng. Làm sao a có thể bằng "a+b"? Tuy nhiên, cần nhấn mạnh rằng ký hiệu = là một toán tử gán ở đây và không được sử dụng để chỉ sự bằng nhau của LHS và RHS.

Bởi vì nó là một phép gán, biểu thức bên phải được tính toán thành 15, giá trị được gán cho a.

Trong câu lệnh "a += b", hai toán tử "+" và "=" có thể được kết hợp trong một toán tử "+=". Nó được gọi là toán tử cộng và gán. Trong một câu lệnh đơn, nó thực hiện phép cộng của hai toán hạng "a" và "b", và kết quả được gán cho toán hạng bên trái, tức là "a".



Ngoài toán tử gán đơn giản, Python cung cấp thêm một số toán tử gán khác cho việc sử dụng nâng cao. Chúng được gọi là toán tử tích lũy hoặc tăng cường. Trong chương này, chúng ta sẽ tìm hiểu cách sử dụng các toán tử gán tăng cường được định nghĩa trong Python.

Python có các toán tử gán tăng cường cho tất cả các toán tử số học và so sánh.

Các toán tử gán tăng cường của Python kết hợp phép cộng và gán trong một câu lệnh. Vì Python hỗ trợ phép tính hỗn hợp, hai toán tử hạng có thể thuộc các loại khác nhau. Tuy nhiên, loại của toán tử trái sẽ thay đổi thành toán tử bên phải, nếu nó rộng hơn.



Toán tử += là một toán tử tăng cường. Nó cũng được gọi là toán tử cộng tích lũy, vì nó thêm "b" vào "a" và gán kết quả trở lại một biến.

Dưới đây là các toán tử gán tăng cường trong Python:

- Toán tử Tăng cường Cộng
- Toán tử Tăng cường Trừ
- Toán tử Tăng cường Nhân
- Toán tử Tăng cường Chia
- Toán tử Tăng cường Phần dư
- Toán tử Tăng cường Số mũ
- Toán tử Tăng cường Chia lấy phần nguyên



Các ví dụ sau sẽ giúp bạn hiểu cách hoạt động của toán tử "+=":

```python
a = 10
b = 5
print("Tăng cường cộng của số nguyên và số nguyên")
a += b  # tương đương với a = a + b
print("a =", a, "type(a):", type(a))

a = 10
b = 5.5
print("Tăng cường cộng của số nguyên và số thực")
a += b  # tương đương với a = a + b
print("a =", a, "type(a):", type(a))

a = 10.50
b = 5 + 6j
print("Tăng cường cộng của số thực và số phức")
a += b  # tương đương với a = a + b
print("a =", a, "type(a):", type(a))
```

Nó sẽ tạo ra đầu ra sau:

```
Tăng cường cộng của số nguyên và số nguyên
a= 15 type(a): <class ''int''>
Tăng cường cộng của số nguyên và số thực
a= 15.5 type(a): <class ''float''>
Tăng cường cộng của số thực và số phức
a= (15.5+6j) type(a): <class ''complex''>
```



Sử dụng ký hiệu -= để thực hiện phép trừ và gán trong một câu lệnh. Câu lệnh "a -= b" thực hiện phép gán "a = a - b". Các toán hạng có thể là bất kỳ kiểu số nào. Python thực hiện chuyển đổi kiểu ngầm định trên đối tượng có kích thước nhỏ hơn.

```python
a = 10
b = 5
print("Tăng cường trừ của số nguyên và số nguyên")
a -= b  # tương đương với a = a - b
print("a =", a, "type(a):", type(a))

a = 10
b = 5.5
print("Tăng cường trừ của số nguyên và số thực")
a -= b  # tương đương với a = a - b
print("a =", a, "type(a):", type(a))

a = 10.50
b = 5 + 6j
print("Tăng cường trừ của số thực và số phức")
a -= b  # tương đương với a = a - b
print("a =", a, "type(a):", type(a))
```

Kết quả sẽ là:

```
Tăng cường trừ của số nguyên và số nguyên
a= 5 type(a): <class ''int''>
Tăng cường trừ của số nguyên và số thực
a= 4.5 type(a): <class ''float''>
Tăng cường trừ của số thực và số phức
a= (5.5-6j) type(a): <class ''complex''>
```



Toán tử "*=" hoạt động theo cùng một nguyên tắc. "a *= b" thực hiện phép nhân và gán, và tương đương với "a = a * b". Trong trường hợp nhân tăng cường của hai số phức, quy tắc nhân như đã thảo luận trong chương trước được áp dụng.

```python
a = 10
b = 5
print("Tăng cường nhân của số nguyên và số nguyên")
a *= b  # tương đương với a = a * b
print("a =", a, "type(a):", type(a))

a = 10
b = 5.5
print("Tăng cường nhân của số nguyên và số thực")
a *= b  # tương đương với a = a * b
print("a =", a, "type(a):", type(a))

a = 6 + 4j
b = 3 + 2j
print("Tăng cường nhân của số phức và số phức")
a *= b  # tương đương với a = a * b
print("a =", a, "type(a):", type(a))
```

Kết quả sẽ là:

```
Tăng cường nhân của số nguyên và số nguyên
a= 50 type(a): <class ''int''>
Tăng cường nhân của số nguyên và số thực
a= 55.0 type(a): <class ''float''>
Tăng cường nhân của số phức và số phức
a= (10+24j) type(a): <class ''complex''>
```



Ký hiệu kết hợp "/=" hoạt động như một toán tử chia và gán, vì vậy "a /= b" tương đương với "a = a / b". Phép chia của toán hạng int hoặc float là float. Chia hai số phức trả về một số phức.

```python
a = 10
b = 5
print("Tăng cường chia của số nguyên và số nguyên")
a /= b  # tương đương với a = a / b
print("a =", a, "type(a):", type(a))

a = 10
b = 5.5
print("Tăng cường chia của số nguyên và số thực")
a /= b  # tương đương với a = a / b
print("a =", a, "type(a):", type(a))

a = 6 + 4j
b = 3 + 2j
print("Tăng cường chia của số phức và số phức")
a /= b  # tương đương với a = a / b
print("a =", a, "type(a):", type(a))
```

Kết quả sẽ là:

```
Tăng cường chia của số nguyên và số nguyên
a= 2.0 type(a): <class ''float''>
Tăng cường chia của số nguyên và số thực
a= 1.8181818181818181 type(a): <class ''float''>
Tăng cường chia của số phức và số phức
a= (2+0j) type(a): <class ''complex''>
```



Để thực hiện phép chia lấy phần dư và gán trong một câu lệnh, sử dụng toán tử "%=". Như toán tử phần dư, phiên bản tăng cường của nó cũng không được hỗ trợ cho số phức.

```python
a = 10
b = 5
print("Tăng cường phần dư của số nguyên và số nguyên")
a %= b  # tương đương với a = a % b
print("a =", a, "type(a):", type(a))

a = 10
b = 5.5
print("Tăng cường phần dư của số nguyên và số thực")
a %= b  # tương đương với a = a % b
print("a =", a, "type(a):", type(a))
```

Kết quả sẽ là:

```
Tăng cường phần dư của số nguyên và số nguyên
a= 0 type(a): <class ''int''>
Tăng cường phần dư của số nguyên và số thực
a= 4.5 type(a): <class ''float''>
```



Toán tử "**=" dẫn đến việc tính toán "a" lũy thừa "b", và gán giá trị trở lại "a". Dưới đây là một số ví dụ:

```python
a = 10
b = 5
print("Tăng cường số mũ với số nguyên và số nguyên")
a **= b  # tương đương với a = a ** b
print("a =", a, "type(a):", type(a))

a = 10
b = 5.5
print("Tăng cường số mũ với số nguyên và số thực")
a **= b  # tương đương với a = a ** b
print("a =", a, "type(a):", type(a))

a = 6 + 4j
b = 3 + 2j
print("Tăng cường số mũ với số phức và số phức")
a **= b  # tương đương với a = a ** b
print("a =", a, "type(a):", type(a))
```

Kết quả sẽ là:

```
Tăng cường số mũ với số nguyên và số nguyên
a= 100000 type(a): <class ''int''>
Tăng cường số mũ với số nguyên và số thực
a= 316227.7660168379 type(a): <class ''float''>
Tăng cường số mũ với số phức và số phức
a= (97.52306038414744-62.22529992036203j) type(a): <class ''complex''>
```



Đối với phép chia lấy phần nguyên và gán trong một câu lệnh, sử dụng toán tử "//=". "a //= b" tương đương với "a = a // b". Toán tử này không thể sử dụng với số phức.

```python
a = 10
b = 5
print("Tăng cường chia lấy phần nguyên với số nguyên và số nguyên")
a //= b  # tương đương với a = a // b
print("a =", a, "type(a):", type(a))

a = 10
b = 5.5
print("Tăng cường chia lấy phần nguyên với số nguyên và số thực")
a //= b  # tương đương với a = a // b
print("a =", a, "type(a):", type(a))
```

Kết quả sẽ là:

```
Tăng cường chia lấy phần nguyên với số nguyên và số nguyên
a= 2 type(a): <class ''int''>
Tăng cường chia lấy phần nguyên với số nguyên và số thực
a= 1.0 type(a): <class ''float''>
```



Trên đây là các toán tử gán trong Python cùng với các toán tử tăng cường. Chúng giúp rút ngắn và làm cho mã nguồn trở nên rõ ràng hơn trong các tình huống mà bạn cần thực hiện một phép tính và gán giá trị lại cho biến.

Khi sử dụng các toán tử này, hãy nhớ rằng chúng có thể giúp làm cho mã nguồn của bạn trở nên dễ đọc hơn và giảm thiểu việc lặp lại mã. Tuy nhiên, cũng cần chú ý để không làm cho mã của bạn trở nên quá phức tạp hoặc khó hiểu bằng cách sử dụng quá nhiều toán tử trong một câu lệnh.

Hy vọng rằng bạn đã hiểu rõ về cách sử dụng và ứng dụng các toán tử gán trong Python sau khi đọc qua tài liệu này.',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 19. Toán Tử Logic trong Python',
    'Bài 19. Toán Tử Logic trong Python',
    19,
    'Toán tử logic trong Python được sử dụng để tạo ra các biểu thức logic phức tạp. Mỗi toán hạng cho các toán tử logic này chính là một biểu thức logic. Ví dụ:


```python
age > 16 and marks > 80
percentage < 50 or attendance < 75
```

Cùng với từ khóa `False`, Python hiểu `None`, số không của tất cả các loại, và các chuỗi rỗng (chuỗi, tuple, list), từ điển rỗng và tập hợp rỗng là `False`. Tất cả các giá trị khác được coi là `True`.

Trong Python, có ba toán tử logic. Chúng là "and", "or" và "not". Chúng phải ở dạng viết thường.



Đối với biểu thức logic phức tạp, cả hai toán hạng phải đều là `True` để biểu thức trở thành `True`. Nếu bất kỳ hoặc cả hai toán hạng đều đánh giá thành `False`, biểu thức trả về `False`.


Bảng dưới đây hiển thị các trường hợp:

| a   | b   | a and b |
| --- | --- | ------- |
| F   | F   | F       |
| F   | T   | F       |
| T   | F   | F       |
| T   | T   | T       |



Ngược lại, toán tử or trả về `True` nếu bất kỳ một trong các toán hạng là `True`. Đối với biểu thức logic phức tạp, cả hai toán hạng phải đều là `False` để biểu thức trở thành `False`.


Bảng dưới đây hiển thị kết quả của toán tử "or" với các điều kiện khác nhau:

| a   | b   | a or b |
| --- | --- | ------ |
| F   | F   | F      |
| F   | T   | T      |
| T   | F   | T      |
| T   | T   | T      |



Đây là một toán tử một ngôi. Trạng thái của toán hạng logic theo sau sẽ được đảo ngược. Kết quả là, not True trở thành False và not False trở thành True.


| a   | not (a) |
| --- | ------- |
| F   | T       |
| T   | F       |



Biểu thức "x and y" đầu tiên đánh giá "x". Nếu "x" là `False`, giá trị của nó được trả về; nếu không, "y" được đánh giá và giá trị kết quả được trả về.

Biểu thức "x or y" đầu tiên đánh giá "x"; nếu "x" là `True`, giá trị của nó được trả về; nếu không, "y" được đánh giá và giá trị kết quả được trả về.



Dưới đây là một số trường hợp sử dụng của các toán tử logic:


```python
x = 10
y = 20
print("x > 0 and x < 10:",x > 0 and x < 10)
print("x > 0 and y > 10:",x > 0 and y > 10)
print("x > 10 or y > 10:",x > 10 or y > 10)
print("x%2 == 0 and y%2 == 0:",x%2 == 0 and y%2 == 0)
print ("not (x+y>15):", not (x+y)>15)
```
Kết quả sẽ là:

```
x > 0 and x < 10: False
x > 0 and y > 10: True
x > 10 or y > 10: True
x%2 == 0 and y%2 == 0: True
not (x+y>15): False
```


Chúng ta có thể sử dụng các toán hạng không phải boolean với các toán tử logic. Ở đây, chúng ta cần nhớ rằng bất kỳ số khác không và các chuỗi không rỗng sẽ được đánh giá thành `True`. Do đó, các bảng chân trị của các toán tử logic cũng áp dụng.

Trong ví dụ dưới đây, các toán hạng số được sử dụng cho các toán tử logic. Các biến "x", "y" được đánh giá thành `True`, "z" là `False`.

```python
x = 10
y = 20
z = 0
print("x and y:",x and y)
print("x or y:",x or y)
print("z or x:",z or x)
print("y or z:", y or z)
```
Kết quả sẽ là:

```
x and y: 20
x or y: 10
z or x: 10
y or z: 20
```


Biến chuỗi được coi là `True` và tuple rỗng là `False` trong ví dụ dưới đây.

```python
a="Hello"
b=tuple()
print("a and b:",a and b)
print("b or a:",b or a)
```
Kết quả sẽ là:

```
a and b: ()
b or a: Hello
```


Cuối cùng, hai đối tượng danh sách dưới đây là không rỗng. Do đó, x and y trả về phần sau cùng, và x or y trả về phần đầu tiên.

```python
x=[1,2,3]
y=[10,20,30]
print("x and y:",x and y)
print("x or y:",x or y)
```
Kết quả sẽ là:

```
x and y: [10, 20, 30]
x or y: [1, 2, 3]
```

Các ví dụ trên giúp bạn hiểu rõ về cách sử dụng và hoạt động của các toán tử logic trong Python. Hãy áp dụng chúng vào mã của bạn và tận dụng tính linh hoạt mà chúng mang lại!

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 20. Python - Toán Tử Bitwise',
    'Bài 20. Python - Toán Tử Bitwise',
    20,
    'Toán tử bitwise trong Python thường được sử dụng để thực hiện các phép toán bitwise trên các đối tượng kiểu số nguyên. Tuy nhiên, thay vì xem xét đối tượng như một thể, nó được xem xét như một chuỗi các bit. Các phép toán khác nhau được thực hiện trên từng bit trong chuỗi.

Python có sáu toán tử bitwise - &, |, ^, ~, << và >>. Tất cả các toán tử này (ngoại trừ ~) đều là nhị phân, có nghĩa là chúng hoạt động trên hai toán hạng. Mỗi toán hạng là một chữ số nhị phân (bit) 1 hoặc 0.

Dưới đây là các toán tử bitwise trong Python:

- Toán tử AND bitwise
- Toán tử OR bitwise
- Toán tử XOR bitwise
- Toán tử NOT bitwise
- Toán tử Dịch Trái bitwise
- Toán tử Dịch Phải bitwise



Toán tử AND bitwise có một số tương đồng với toán tử and logic. Nó chỉ trả về True nếu cả hai toán hạng bit đều là 1 (tức là True). Tất cả các kết hợp là:

- 0 & 0 là 0
- 1 & 0 là 0
- 0 & 1 là 0
- 1 & 1 là 1

Ví dụ về Toán Tử AND Bitwise trong Python:

```python
a = 60
b = 13
print ("a:", a, "b:", b, "a & b:", a & b)
```

Kết quả sẽ là:

```
a: 60 b: 13 a & b: 12
```

Để hiểu cách Python thực hiện phép toán, lấy giá trị nhị phân tương ứng của mỗi biến.

```python
print ("a:", bin(a))
print ("b:", bin(b))
```

Sẽ tạo ra đầu ra sau:

```
a: 0b111100
b: 0b1101
```



Ký hiệu "|" (gọi là dấu pipe) là toán tử OR bitwise. Nếu bất kỳ bit toán hạng nào là 1, kết quả là 1, nếu không, là 0.

- 0 | 0 là 0
- 0 | 1 là 1
- 1 | 0 là 1
- 1 | 1 là 1

Ví dụ về Toán Tử OR Bitwise trong Python:

```python
a = 60
b = 13
print ("a:", a, "b:", b, "a | b:", a | b)
```

Kết quả sẽ là:

```
a: 60 b: 13 a | b: 61
```



Thuật ngữ XOR đại diện cho OR độc quyền. Nó có nghĩa là kết quả của phép toán OR trên hai bit sẽ là 1 nếu chỉ có một trong hai bit là 1.

- 0 ^ 0 là 0
- 0 ^ 1 là 1
- 1 ^ 0 là 1
- 1 ^ 1 là 0

Ví dụ về Toán Tử XOR Bitwise trong Python:

```python
a = 60
b = 13
print ("a:", a, "b:", b, "a ^ b:", a ^ b)
```

Kết quả sẽ là:

```
a: 60 b: 13 a ^ b: 49
```

Chúng ta hiện thực phép XOR bitwise theo cách thủ công.

```python
0011 1100
    ^
0000 1101
-------------
0011 0001
```

Hàm int() sẽ cho kết quả 00110001 là 49.

```python
int(''00110001'',2)
```



Toán tử này là tương đương nhị phân của toán tử NOT logic. Nó đảo ngược từng bit để 1 được thay thế bằng 0 và ngược lại, và trả về bù của số ban đầu. Python sử dụng phương pháp của 2. Đối với số nguyên dương, nó được thu được đơn giản bằng cách đảo ngược các bit. Đối với số âm, -x, nó được viết bằng biểu diễn bit cho (x-1) với tất cả các bit đảo ngược (chuyển từ 1 thành 0 hoặc từ 0 thành 1).

Ví dụ về Toán Tử NOT Bitwise trong Python:

```python
a = 60
print ("a:", a, "~a:", ~a)
```

Kết quả sẽ là:

```
a: 60 ~a: -61
```



Toán tử dịch trái dịch các bit có ý nghĩa nhất sang phải bởi số nằm bên phải của ký hiệu "<<" . Vì vậy, "x << 2" làm cho hai bit của biểu diễn nhị phân của x bị dịch sang phải.

Ví dụ về Toán Tử Dịch Trái Bitwise trong Python:

```python
a = 60
print ("a:", a, "a << 2:", a << 2)
```

Kết quả sẽ là:

```
a: 60 a << 2: 240
```



Toán tử dịch phải dịch các bit có ý nghĩa nhỏ nhất sang trái bởi số nằm bên phải của ký hiể ">>". Do đó, "x >> 2" làm cho hai bit của biểu diễn nhị phân của x bị dịch sang trái.

Ví dụ về Toán Tử Dịch Phải Bitwise trong Python:

```python
a = 60
print ("a:", a, "a >> 2:", a >> 2)
```

Kết quả sẽ là:

```
a: 60 a >> 2: 15
```

Hoạt động dịch phải thủ công trên 60 được thể hiện dưới đây:

```plaintext
   0011 1100
   >>
   2
   -------------
   0000 1111
```

Sử dụng hàm int() để chuyển đổi số nhị phân trên thành số nguyên. Đó là 15.

```python
int(''00001111'',2)
```

Đây là hướng dẫn về các toán tử bitwise trong Python. Đây là một phần quan trọng của ngôn ngữ lập trình Python, đặc biệt hữu ích khi làm việc với các phép toán bitwise trên các số nguyên.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 21. Toán tử thành viên trong Python',
    'Bài 21. Toán tử thành viên trong Python',
    21,
    'Toán tử thành viên trong Python giúp chúng ta xác định xem một phần tử có xuất hiện trong một đối tượng kiểu container cho trước hay không, hoặc nói cách khác, xem một phần tử có là thành viên của đối tượng kiểu container cho trước không.



Python có hai toán tử thành viên: in và not in. Cả hai đều trả về kết quả là Boolean. Kết quả của toán tử in là ngược lại với toán tử not in.



Toán tử "in" được sử dụng để kiểm tra xem một chuỗi con có hiện diện trong một chuỗi lớn hơn, bất kỳ phần tử nào có hiện diện trong một danh sách hoặc tuple, hoặc một danh sách con hoặc tuple con được bao gồm trong một danh sách hoặc tuple.



```python
var = "8 Sync Dev"
a = "P"
b = "tor"
c = "in"
d = "To"
print (a, "in", var, ":", a in var)
print (b, "in", var, ":", b in var)
print (c, "in", var, ":", c in var)
print (d, "in", var, ":", d in var)
```

Kết quả sẽ là:

```
P in 8 Sync Dev : True
tor in 8 Sync Dev : True
in in 8 Sync Dev : True
To in 8 Sync Dev : False
```



Toán tử "not in" được sử dụng để kiểm tra xem một chuỗi với giá trị cho trước không hiện diện trong đối tượng như chuỗi, danh sách, tuple, v.v.



```python
var = "8 Sync Dev"
a = "P"
b = "tor"
c = "in"
d = "To"
print (a, "not in", var, ":", a not in var)
print (b, "not in", var, ":", b not in var)
print (c, "not in", var, ":", c not in var)
print (d, "not in", var, ":", d not in var)
```

Kết quả sẽ là:

```
P not in 8 Sync Dev : False
tor not in 8 Sync Dev : False
in not in 8 Sync Dev : False
To not in 8 Sync Dev : True
```



Bạn có thể sử dụng toán tử "in/not in" để kiểm tra sự hiện diện của một phần tử trong danh sách hoặc tuple.

```python
var = [10,20,30,40]
a = 20
b = 10
c = a-b
d = a/2
print (a, "in", var, ":", a in var)
print (b, "not in", var, ":", b not in var)
print (c, "in", var, ":", c in var)
print (d, "not in", var, ":", d not in var)
```

Kết quả sẽ là:

```
20 in [10, 20, 30, 40] : True
10 not in [10, 20, 30, 40] : False
10 in [10, 20, 30, 40] : True
10.0 not in [10, 20, 30, 40] : False
```

Trong trường hợp cuối cùng, "d" là một số thực nhưng vẫn so sánh với True với 10 (một số nguyên) trong danh sách. Ngay cả khi một số được biểu diễn dưới các định dạng khác nhau như nhị phân, bát phân hoặc thập lục phân được cung cấp, các toán tử thành viên vẫn cho biết liệu nó có trong chuỗi hay không.



Tuy nhiên, nếu bạn thử kiểm tra xem hai số kế tiếp có xuất hiện trong một danh sách hoặc tuple không, toán tử in sẽ trả về False. Nếu danh sách/tuple chứa các số kế tiếp như một chuỗi chính nó, thì nó sẽ trả về True.

```python
var = (10,20,30,40)
a = 10
b = 20
print ((a,b), "in", var, ":", (a,b) in var)
var = ((10,20),30,40)
a = 10
b = 20
print ((a,b), "in", var, ":", (a,b) in var)
```

Kết quả sẽ là:

```
(10, 20) in (10, 20, 30, 40) : False
(10, 20) in ((10, 20), 30, 40) : True
```



Toán tử thành viên của Python cũng hoạt động tốt với các đối tượng tập hợp.

```python
var = {10,20,30,40}
a = 10
b = 20
print (b, "in", var, ":", b in var)
var = {(10,20),30,40}
a = 10
b = 20
print ((a,b), "in", var, ":", (a,b) in var)
```

Kết quả sẽ là:

```
20 in {40, 10, 20, 30} : True
(10, 20) in {40, 30, (10, 20)} : True
```



Sử dụng các toán tử in cũng như not in với đối tượng từ điển là được cho phép. Tuy nhiên, Python chỉ kiểm tra sự thành viên với tập hợp của các khóa và không phải giá trị.

```python
var = {1:10, 2:20, 3:30}
a = 2
b = 20
print (a, "in", var, ":", a in var)
print (b, "in", var, ":", b in var)
```

Kết quả sẽ là:

```
2 in {1: 10, 2: 20, 3: 30} : True
20 in {1: 10, 2: 20, 3: 30} : False
```

Đó là một bản dịch chi tiết và rõ ràng về toán tử thành viên trong Python. Hy vọng nó giúp bạn hiểu rõ về cách sử dụng các toán tử này trong các tình huống khác nhau.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 22. Python - Toán Tử Nhận Dạng',
    'Bài 22. Python - Toán Tử Nhận Dạng',
    22,
    'Toán tử nhận dạng trong Python so sánh các đối tượng để xác định liệu chúng có chia sẻ cùng một bộ nhớ và tham chiếu đến cùng một loại đối tượng (kiểu dữ liệu) hay không.



Toán tử ''is'' trả về True nếu cả hai đối tượng của toán hạng chia sẻ cùng một vị trí bộ nhớ. Vị trí bộ nhớ của đối tượng có thể được lấy thông qua hàm "id()". Nếu "id()" của cả hai biến giống nhau, toán tử "is" trả về True.



```python
a = [1, 2, 3, 4, 5]
b = [1, 2, 3, 4, 5]
c = a


print(a is c)
print(a is b)


print("id(a) : ", id(a))
print("id(b) : ", id(b))
print("id(c) : ", id(c))
```

Kết quả sẽ là:

```
True
False
id(a) :  140114091859456
id(b) :  140114091906944
id(c) :  140114091859456
```



Toán tử ''is not'' trả về True nếu cả hai đối tượng của toán hạng không chia sẻ cùng một vị trí bộ nhớ hoặc cả hai toán hạng không phải là cùng một đối tượng.



```python
a = [1, 2, 3, 4, 5]
b = [1, 2, 3, 4, 5]
c = a


print(a is not c)
print(a is not b)


print("id(a) : ", id(a))
print("id(b) : ", id(b))
print("id(c) : ", id(c))
```

Kết quả sẽ là:

```
False
True
id(a) :  140559927442176
id(b) :  140559925598080
id(c) :  140559927442176
```





```python
a="8 Sync Dev"
b=a
print ("id(a), id(b):", id(a), id(b))
print ("a is b:", a is b)
print ("b is not a:", b is not a)
```

Kết quả sẽ là:

```
id(a), id(b): 2739311598832 2739311598832
a is b: True
b is not a: False
```

Trong trường hợp các đối tượng là các danh sách và bộ dữ liệu, chúng có cách hoạt động khác nhau, điều này có thể nhìn lạ trong trường hợp đầu tiên. Trong ví dụ dưới đây, hai danh sách "a" và "b" chứa các mục giống nhau. Nhưng id() của chúng khác nhau.



```python
a=[1,2,3]
b=[1,2,3]
print ("id(a), id(b):", id(a), id(b))
print ("a is b:", a is b)
print ("b is not a:", b is not a)
```

Kết quả sẽ là:

```
id(a), id(b): 1552612704640 1552567805568
a is b: False
b is not a: True
```

Các đối tượng danh sách hoặc bộ dữ liệu chỉ chứa các vị trí bộ nhớ của các mục riêng lẻ và không phải là các mục đó. Do đó, "a" chứa các địa chỉ của các đối tượng số nguyên 10, 20 và 30 ở một vị trí nhất định có thể khác nhau so với "b".



```python
print (id(a[0]), id(a[1]), id(a[2]))
print (id(b[0]), id(b[1]), id(b[2]))
```

Kết quả sẽ là:

```
140734682034984 140734682035016 140734682035048
140734682034984 140734682035016 140734682035048
```

Vì vị trí khác biệt của "a" và "b", toán tử "is" trả về False ngay cả khi hai danh sách chứa cùng các số giống nhau.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 23. Python - Ưu Tiên Toán Tử',
    'Bài 23. Python - Ưu Tiên Toán Tử',
    23,
    'Trong Python, một biểu thức bao gồm một hoặc nhiều biến, hằng số và toán tử (toán tử số học, logic, bitwise, v.v.). Trình thông dịch Python đánh giá biểu thức và kết quả được gán cho một biến hoặc được sử dụng trong một câu lệnh khác. Trình thông dịch thực hiện các hoạt động khác nhau tùy thuộc vào ưu tiên của các toán tử.



Một biểu thức có thể chứa nhiều toán tử được đánh giá. Ưu tiên toán tử xác định thứ tự mà các toán tử được đánh giá. Nói cách khác, thứ tự đánh giá toán tử được xác định bởi ưu tiên toán tử.

Nếu một biểu thức cụ thể chứa nhiều toán tử, thứ tự đánh giá của chúng được xác định bởi thứ tự ưu tiên. Ví dụ, xem xét biểu thức sau:

```
>>> a = 2+3*5
```

Ở đây, giá trị của a sẽ là gì? - có thể là 17 (nhân 3 với 5 trước và sau đó cộng 2) hoặc 25 (cộng 2 và 3 và sau đó nhân với 5)? Nguyên tắc ưu tiên toán tử của Python xuất hiện ở đây.

Nếu chúng ta chỉ xem xét các toán tử số học trong Python, nguyên tắc BODMAS truyền thống cũng được sử dụng bởi trình thông dịch Python, trong đó dấu ngoặc được đánh giá trước, các toán tử chia và nhân tiếp theo, tiếp theo là cộng và trừ. Do đó, a sẽ trở thành 17 trong biểu thức trên.

Ngoài ưu tiên toán tử, tính kết hợp của các toán tử cũng quan trọng. Nếu một biểu thức bao gồm các toán tử có cùng mức ưu tiên, tính kết hợp xác định thứ tự. Hầu hết các toán tử có tính kết hợp từ trái sang phải. Điều đó có nghĩa là toán tử ở bên trái được đánh giá trước toán tử ở bên phải.

Hãy xem xét một biểu thức khác:

```
>>> b = 10/5*4
```

Trong trường hợp này, cả * (nhân) và / (chia) đều có cùng mức ưu tiên. Tuy nhiên, nguyên tắc tính kết hợp từ trái sang phải thực hiện phép chia trước (10/5 = 2) và sau đó phép nhân (2*4 = 8).



Bảng sau liệt kê tất cả các toán tử trong Python theo thứ tự giảm dần của ưu tiên. Các toán tử trong cùng một ô dưới cột Toán Tử có cùng ưu tiên.

| Sr.No. | Toán Tử & Mô Tả                              |
| ------ | -------------------------------------------- |
| 1      | (),[], {}                                    |
| 2      | [index], [index:index]                       |
| 3      | await x                                      |
| 4      | **                                           |
| 5      | +x, -x, ~x                                   |
| 6      | *, @, /, //, %                               |
| 7      | +, -                                         |
| 8      | <<, >>                                       |
| 9      | &                                            |
| 10     | ^                                            |
| 11     | \|                                           |
| 12     | in, not in, is, is not, <, <=, >, >=, !=, == |
| 13     | not x                                        |
| 14     | and                                          |
| 15     | or                                           |
| 16     | if – else                                    |
| 17     | lambda                                       |
| 18     | :=                                           |



```python
a = 20
b = 10
c = 15
d = 5
e = 0

e = (a + b) * c / d       #( 30 * 15 ) / 5
print ("Giá trị của (a + b) * c / d là ",  e)

e = ((a + b) * c) / d     # (30 * 15 ) / 5
print ("Giá trị của ((a + b) * c) / d là ",  e)

e = (a + b) * (c / d);    # (30) * (15/5)
print ("Giá trị của (a + b) * (c / d) là ",  e)

e = a + (b * c) / d;      #  20 + (150/5)
print ("Giá trị của a + (b * c) / d là ",  e)
```

Khi bạn thực thi chương trình trên, nó sẽ cho ra kết quả sau:

```
Giá trị của (a + b) * c / d là  90.0
Giá trị của ((a + b) * c) / d là  90.0
Giá trị của (a + b) * (c / d) là  90.0
Giá trị của a + (b * c) / d là  50.0
```

Trong các ví dụ này:

- Biểu thức thứ nhất `e = (a + b) * c / d` tính toán phép nhân trước `(a + b)` và sau đó chia cho `d`.
- Biểu thức thứ hai `e = ((a + b) * c) / d` sử dụng ngoặc để chỉ định thứ tự đánh giá, cũng cho ra kết quả như biểu thức đầu tiên.
- Biểu thức thứ ba `e = (a + b) * (c / d)` sử dụng ngoặc để chỉ định thứ tự đánh giá, và kết quả cũng giống như hai biểu thức trước đó.
- Biểu thức cuối cùng `e = a + (b * c) / d` thực hiện phép nhân trước `(b * c)` và sau đó chia cho `d`.

Như bạn có thể thấy, việc hiểu và sử dụng đúng ưu tiên toán tử là rất quan trọng để đảm bảo tính chính xác của các biểu thức trong Python.



Trên, chúng ta đã thảo luận về ưu tiên toán tử trong Python, một khía cạnh quan trọng giúp xác định thứ tự đánh giá các toán tử trong biểu thức. 

Điều này cho phép chúng ta hiểu cách Python xử lý các phép tính và đảm bảo rằng kết quả của biểu thức là chính xác. Bằng cách hiểu và áp dụng đúng ưu tiên toán tử, chúng ta có thể viết mã Python hiệu quả và tránh gây hiểu nhầm trong quá trình tính toán.

Ngoài ra, bảng ưu tiên toán tử cũng là một tài liệu tham khảo hữu ích, giúp bạn dễ dàng nhận biết thứ tự ưu tiên của các toán tử khác nhau trong Python.

Với kiến thức này, bạn có thể tự tin hơn khi làm việc với các biểu thức phức tạp trong Python và tối ưu hóa mã của mình.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 24. Python - Chú thích',
    'Bài 24. Python - Chú thích',
    24,
    'Chú thích trong một chương trình máy tính là một phần văn bản được đặt ra để giải thích hoặc mô tả trong mã nguồn và không được xem xét bởi trình biên dịch/trình thông dịch khi tạo mã ngôn ngữ máy. Việc sử dụng chú thích một cách phong phú trong chương trình nguồn giúp mọi người hiểu rõ hơn về cú pháp, cách sử dụng và logic của thuật toán vv., miễn là nó được chú thích một cách đẹp mắt.



Chú thích trong Python giúp mã nguồn trở nên dễ hiểu hơn và chúng hoàn toàn bị bỏ qua bởi trình thông dịch, điều này có nghĩa là bạn có thể cung cấp bất kỳ số lượng chú thích nào bạn muốn trong chương trình của mình để làm cho nó trở nên dễ đọc và giải thích hơn.

Python hỗ trợ hai loại chú thích:



Trong một kịch bản Python, ký hiệu # đánh dấu sự bắt đầu của dòng chú thích. Nó có hiệu quả cho đến cuối dòng trong trình soạn thảo. Nếu # là ký tự đầu tiên của dòng, toàn bộ dòng sẽ được coi là một chú thích và trình thông dịch sẽ bỏ qua nó.

**Ví dụ về Chú thích trên Một Dòng trong Python:**

```python

print("Xin chào thế giới")



print("Bạn khỏe không?")  # Đây cũng là một chú thích nhưng sau một câu lệnh.
```



Trong Python, không có quy định để viết chú thích trên nhiều dòng, hoặc một chú thích dạng khối. (Như trong C/C++, nơi nhiều dòng bên trong /* .. */ được xem là chú thích trên nhiều dòng).

Mỗi dòng nên có ký tự # ở đầu để được đánh dấu là chú thích trong Python và đó là cách bạn có thể tạo chú thích trên nhiều dòng trong Python.

**Ví dụ về Chú thích trên Nhiều Dòng trong Python:**

```python




print("Xin chào thế giới")

"""
Đây là một chú thích trên nhiều dòng
có thể trải dài qua nhiều dòng.
"""
print("Xin chào thế giới")
```



Docstring Python cung cấp một cách thuận tiện để cung cấp tài liệu trợ giúp với các module Python, hàm, lớp và phương thức. Docstring sau đó sẽ được truy cập thông qua thuộc tính __doc__.

**Ví dụ về Chú thích với Docstring trong Python:**

```python
def add(a, b):
    """Hàm để cộng giá trị của a và b"""
    return a + b

print(add.__doc__)
```

Kết quả sẽ là:

```
Hàm để cộng giá trị của a và b
```

Việc sử dụng chú thích trong Python giúp mã nguồn trở nên dễ hiểu hơn và chúng hoàn toàn được bỏ qua bởi trình thông dịch. Điều này có nghĩa là bạn có thể cung cấp bất kỳ số lượng chú thích nào bạn muốn trong chương trình của mình để làm cho nó dễ đọc và rõ ràng hơn.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 25. Python - Nhập Dữ liệu từ Người Dùng',
    'Bài 25. Python - Nhập Dữ liệu từ Người Dùng',
    25,
    'Trong chương này, chúng ta sẽ tìm hiểu cách Python nhận dữ liệu đầu vào từ người dùng từ bảng điều khiển và hiển thị kết quả trên cùng một bảng điều khiển.

Mọi ứng dụng máy tính đều nên có một cơ chế để nhận đầu vào từ người dùng khi nó đang chạy. Điều này làm cho ứng dụng trở nên tương tác. Tùy thuộc vào cách phát triển, một ứng dụng có thể chấp nhận đầu vào từ người dùng dưới dạng văn bản nhập vào từ bảng điều khiển (sys.stdin), một giao diện đồ họa hoặc một giao diện dựa trên web.



Python cung cấp cho chúng ta hai hàm tích hợp sẵn để đọc đầu vào từ bàn phím.

1. Hàm input()
2. Hàm raw_input() (trong Python 2.7)



Khi bộ thông dịch gặp phải hàm input(), nó sẽ chờ đợi người dùng nhập dữ liệu từ luồng đầu vào tiêu chuẩn (bàn phím) cho đến khi phím Enter được nhấn. Các ký tự nhập có thể được lưu trữ trong một biến chuỗi để sử dụng sau này.



```python
var = input()
```



```python
name = input()
city = input()

print("Xin chào, Tên tôi là", name)
print("Tôi đến từ", city)
```

Trong ví dụ này, các biến `name` và `city` sẽ chứa dữ liệu mà người dùng nhập vào từ bàn phím.



Hàm raw_input() hoạt động tương tự như hàm input(), nhưng nó chỉ có sẵn trong Python 2.7 và đã được đổi tên thành input() trong Python 3.6.



```python
var = raw_input([prompt text])
```



```python
name = raw_input("Nhập tên của bạn: ")
city = raw_input("Nhập tên thành phố: ")

print("Xin chào, Tên tôi là", name)
print("Tôi đến từ", city)
```

Trong ví dụ này, hàm `raw_input()` sẽ hiển thị thông điệp nhắc người dùng trước khi nhập dữ liệu.



Chúng ta cũng có thể nhận dữ liệu số từ người dùng trong Python bằng cách sử dụng hàm `input()` và sau đó chuyển đổi đầu vào thành số nguyên hoặc số thực.



```python
width = int(input("Nhập chiều rộng: "))
height = int(input("Nhập chiều cao: "))

area = width * height
print("Diện tích hình chữ nhật = ", area)
```

Trong ví dụ này, chúng ta nhập chiều rộng và chiều cao từ người dùng và tính diện tích của hình chữ nhật. Để chuyển đổi đầu vào từ dạng chuỗi thành số nguyên, chúng ta sử dụng hàm `int()`.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 26. Python - Số',
    'Bài 26. Python - Số',
    26,
    'Python có sẵn hỗ trợ để lưu trữ và xử lý dữ liệu số (Python Numbers). Hầu hết thời gian bạn làm việc với số trong hầu hết các ứng dụng Python. Rõ ràng, bất kỳ ứng dụng máy tính nào cũng đều xử lý số. Hướng dẫn này sẽ thảo luận về các loại số Python khác nhau và các thuộc tính của chúng.



Có ba loại số được tích hợp sẵn trong Python:

1. Số nguyên (int)
2. Số dấu chấm động (float)
3. Số phức

Python cũng có một loại dữ liệu Boolean được tích hợp sẵn gọi là bool. Nó có thể được coi như một loại con của kiểu int, vì hai giá trị có thể có của nó là True và False biểu diễn cho các số nguyên 1 và 0 tương ứng.



Trong Python, bất kỳ số nào mà không có khả năng lưu trữ phần thập phân là số nguyên. (Lưu ý rằng nếu phần thập phân trong một số là 0, điều đó không có nghĩa là nó là một số nguyên. Ví dụ, một số 10.0 không phải là một số nguyên, nó là một số dấu chấm động với phần thập phân là 0 có giá trị số là 10.) Một số nguyên có thể là số 0, số nguyên dương hoặc số nguyên âm. Ví dụ, 1234, 0, -55 đều đại diện cho các số nguyên trong Python.

Có ba cách để tạo một đối tượng số nguyên. Bằng cách (a) biểu diễn literal, (b) bất kỳ biểu thức nào đánh giá thành một số nguyên, và (c) sử dụng hàm int().

Literal là một ký hiệu được sử dụng để biểu diễn một hằng số trực tiếp trong mã nguồn. Ví dụ:

```python
a = 10
```

Tuy nhiên, xem xét việc gán biến số nguyên c như sau.

```python
a = 10
b = 20
c = a + b

print ("a:", a, "type:", type(a))
print ("c:", c, "type:", type(c))
```

Nó sẽ tạo ra đầu ra sau:

```
a: 10 type: <class ''int''>
c: 30 type: <class ''int''>
```

Ở đây, c thực sự là một biến số nguyên, nhưng biểu thức a + b được đánh giá trước và giá trị của nó được gán gián tiếp cho c.

Phương pháp thứ ba để tạo một đối tượng số nguyên là với giá trị trả về của hàm int(). Nó chuyển đổi một số dấu chấm động hoặc một chuỗi thành một số nguyên.

```python
a = int(10.5)
b = int("100")
```

Bạn có thể biểu diễn một số nguyên dưới dạng số nhị phân, bát phân hoặc số thập lục phân. Tuy nhiên, bên trong, đối tượng được lưu trữ là một số nguyên.



Một số gồm chỉ các chữ số nhị phân (1 và 0) và tiền tố bằng "0b" là một số nhị phân. Nếu bạn gán một số nhị phân cho một biến, nó vẫn là một biến số nguyên.

Để biểu diễn một số nguyên dưới dạng nhị phân, lưu trữ trực tiếp dưới dạng literal, hoặc sử dụng hàm int(), trong đó cơ sở được đặt thành 2.

```python
a = 0b101
print ("a:", a, "type:", type(a))

b = int("0b101011", 2)
print ("b:", b, "type:", type(b))
```

Nó sẽ tạo ra đầu ra sau:

```
a: 5 type: <class ''int''>
b: 43 type: <class ''int''>
```

Cũng có một hàm bin() trong Python. Nó trả về một chuỗi nhị phân tương đương của một số nguyên.

```python
a = 43
b = bin(a)
print ("Số Nguyên:", a, "Tương đương nhị phân:", b)
```

Nó sẽ tạo ra đầu ra sau:

```
Số Nguyên: 43 Tương đương nhị phân: 0b101011
```



Một số bát phân được tạo thành từ các chữ số từ 0 đến 7. Để chỉ ra rằng số nguyên sử dụng chú thích bát phân, cần được tiền tố bằng "0o" (viết thường o) hoặc "0O" (viết hoa o). Biểu diễn literal của số bát phân như sau:

```python
a = 0O107
print (a, type(a))
```

Nó sẽ tạo ra đầu ra sau:

```
71 <class ''int''>
```

Lưu ý rằng đối tượng được lưu trữ bên trong là số nguyên

**Số phức trong Python:**

Trong Python, số phức được biểu diễn bằng một phần thực và một phần ảo, trong đó phần ảo được ký hiệu bằng chữ "j". Một số phức có thể được tạo bằng cách sử dụng hàm complex() hoặc bằng cách cung cấp một số thực và một số ảo cho hàm này.

Ví dụ:

```python

z1 = complex(2, 3)
print(z1)  # Kết quả: (2+3j)


z2 = 4 + 5j
print(z2)  # Kết quả: (4+5j)
```

Khi làm việc với số phức, bạn có thể truy cập phần thực và phần ảo của số phức bằng cách sử dụng các thuộc tính `real` và `imag`, tương ứng.

```python
z = 2 + 3j
print("Phần thực:", z.real)  # Kết quả: 2.0
print("Phần ảo:", z.imag)    # Kết quả: 3.0
```

Các phép toán cơ bản như cộng, trừ, nhân và chia cũng được hỗ trợ cho số phức trong Python. Ví dụ:

```python
z1 = 2 + 3j
z2 = 4 + 5j


sum_z = z1 + z2
print("Tổng:", sum_z)  # Kết quả: (6+8j)


product_z = z1 * z2
print("Tích:", product_z)  # Kết quả: (-7+22j)
```

Để tính số phức liên conjuate (nghịch đảo của số phức), bạn có thể sử dụng phương thức `conjugate()`.

```python
z = 2 + 3j
conjugate_z = z.conjugate()
print("Liên conjuguate của z:", conjugate_z)  # Kết quả: (2-3j)
```

Ngoài ra, Python cũng cung cấp một số hàm toán học cho số phức như `abs()`, `phase()`, và `polar()` để tính giá trị tuyệt đối, góc và biểu diễn dạng cực của số phức.

```python
z = 3 + 4j


abs_z = abs(z)
print("Giá trị tuyệt đối:", abs_z)  # Kết quả: 5.0


phase_z = phase(z)
print("Góc của số phức:", phase_z)  # Kết quả: 0.9272952180016122 (đơn vị radian)


polar_z = polar(z)
print("Biểu diễn cực:", polar_z)  # Kết quả: (5.0, 0.9272952180016122)
```

Đó là cách bạn có thể làm việc với số phức trong Python, bao gồm cách tạo, thực hiện các phép toán và truy cập các thuộc tính và phương thức của chúng.',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 1: Kiến thức cơ bản về Python' LIMIT 1),
    'Bài 27. Python - Booleans',
    'Bài 27. Python - Booleans',
    27,
    'Trong Python, bool là một loại con của kiểu int. Một đối tượng bool có hai giá trị có thể là True hoặc False, và nó được khởi tạo bằng các từ khóa True và False của Python.



```python
a = True
b = False
print(type(a), type(b))
```

Output:

```
<class ''bool''> <class ''bool''>
```

Một đối tượng bool được chấp nhận làm đối số cho các hàm chuyển đổi kiểu. Với True là đối số, hàm int() trả về 1, float() trả về 1.0; trong khi đối với False, chúng trả về 0 và 0.0 tương ứng. Chúng ta có một phiên bản một đối số của hàm complex().

Nếu đối số là một đối tượng phức tạp, nó được xem như phần thực, thiết lập hệ số ảo thành 0.



```python
a = int(True)
print("bool to int:", a)
a = float(False)
print("bool to float:", a)
a = complex(True)
print("bool to complex:", a)
```

Kết quả khi chạy mã này sẽ như sau:

```
bool to int: 1
bool to float: 0.0
bool to complex: (1+0j)
```



Biểu thức boolean trong Python là một biểu thức mà đánh giá thành một giá trị Boolean. Nó gần như luôn luôn liên quan đến một toán tử so sánh. Trong ví dụ dưới đây, chúng ta sẽ thấy làm thế nào các toán tử so sánh có thể cho chúng ta các giá trị Boolean. Phương thức bool() được sử dụng để trả về giá trị đúng hoặc sai của một biểu thức.

Cú pháp: bool([x])

Trả về True nếu X đánh giá thành True, ngược lại trả về False.

Nếu không có tham số, nó trả về False.

Dưới đây là các ví dụ sử dụng các chuỗi số và các giá trị Boolean làm tham số cho hàm bool. Kết quả được trả về là true hoặc false tùy thuộc vào tham số.



```python

a = True
print(bool(a))


a = False
print(bool(a))


a = 0.0
print(bool(a))


a = 1.0
print(bool(a))


a = 5
b = 10
print(bool(a == b))


a = None
print(bool(a))


a = ()
print(bool(a))


a = {}
print(bool(a))


a = ''8 Sync Dev''
print(bool(a))
```
*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 0. Python - Luồng điều khiển',
    'Bài 0. Python - Luồng điều khiển',
    0,
    'Trong Python, luồng điều khiển của chương trình được điều chỉnh bằng các loại câu lệnh điều kiện, vòng lặp và cuộc gọi hàm khác nhau. Mặc định, các chỉ thị trong một chương trình máy tính được thực thi theo cách tuần tự, từ trên xuống dưới hoặc từ đầu đến cuối. Tuy nhiên, các chương trình thực thi theo cách tuần tự như vậy chỉ có thể thực hiện các nhiệm vụ đơn giản. Chúng ta muốn chương trình có khả năng ra quyết định, để nó thực hiện các bước khác nhau tùy thuộc vào các điều kiện khác nhau.

Hầu hết các ngôn ngữ lập trình bao gồm cả Python đều cung cấp chức năng để kiểm soát luồng thực thi của các chỉ thị. Thông thường, có hai loại câu lệnh kiểm soát luồng trong bất kỳ ngôn ngữ lập trình nào và Python cũng hỗ trợ chúng.



Câu lệnh ra quyết định được sử dụng trong các chương trình Python để làm cho chúng có khả năng quyết định xem nhóm các chỉ thị thay thế nào sẽ được thực thi, tùy thuộc vào giá trị của một biểu thức Boolean nhất định.

Để minh họa cách các câu lệnh ra quyết định hoạt động trong Python, bạn có thể sử dụng các cấu trúc điều kiện như `if`, `elif`, và `else`. Dưới đây là một đoạn mã ví dụ mô tả cách sử dụng các câu lệnh này để quyết định nhóm chỉ thị nào sẽ được thực thi dựa trên giá trị của một biểu thức Boolean.



```python



number = int(input("Nhập vào một số: "))


if number > 0:
    print(f"Số {number} là số dương.")
elif number < 0:
    print(f"Số {number} là số âm.")
else:
    print("Số bạn nhập vào là số không.")


age = int(input("Nhập vào tuổi của bạn: "))

if age < 13:
    print("Bạn là một đứa trẻ.")
elif 13 <= age < 20:
    print("Bạn là một thiếu niên.")
elif 20 <= age < 65:
    print("Bạn là một người trưởng thành.")
else:
    print("Bạn là một người cao tuổi.")
```



1. **Câu lệnh `if`**: Kiểm tra điều kiện đầu tiên (`number > 0`). Nếu đúng, câu lệnh bên trong khối `if` sẽ được thực thi.
2. **Câu lệnh `elif`**: Nếu điều kiện `if` đầu tiên không đúng, Python sẽ kiểm tra điều kiện tiếp theo (`number < 0`). Nếu điều kiện này đúng, câu lệnh bên trong khối `elif` sẽ được thực thi.
3. **Câu lệnh `else`**: Nếu không có điều kiện nào ở trên đúng, câu lệnh bên trong khối `else` sẽ được thực thi.
4. **Ví dụ thứ hai**: Sử dụng nhiều câu lệnh `elif` để kiểm tra nhiều điều kiện khác nhau và thực thi các khối mã tương ứng.



Python cung cấp các câu lệnh điều khiển if..elif..else như một phần của quyết định. Dưới đây là một ví dụ đơn giản sử dụng if..elif..else. Bạn có thể thử chạy chương trình này với các điểm khác nhau và xác minh kết quả.

```python
marks = 80
result = ""
if marks < 30:
   result = "Failed"
elif marks > 75:
   result = "Passed with distinction"
else:
   result = "Passed"

print(result)
```

Kết quả sẽ là:

```
Passed with distinction
```



Python hỗ trợ câu lệnh Match-Case, cũng có thể được sử dụng như một phần của quyết định. Dưới đây là một ví dụ đơn giản sử dụng câu lệnh match.

```python
def checkVowel(n):
   match n:
      case ''a'': return "Vowel alphabet"
      case ''e'': return "Vowel alphabet"
      case ''i'': return "Vowel alphabet"
      case ''o'': return "Vowel alphabet"
      case ''u'': return "Vowel alphabet"
      case _: return "Simple alphabet"

print (checkVowel(''a''))
print (checkVowel(''m''))
print (checkVowel(''o''))
```

Kết quả sẽ là:

```
Vowel alphabet
Simple alphabet
Vowel alphabet
```



Hầu hết các quy trình đòi hỏi một nhóm các chỉ thị được lặp đi lặp lại. Trong thuật ngữ lập trình, điều này được gọi là vòng lặp. Thay vì bước tiếp theo, nếu luồng được chuyển hướng về bất kỳ bước trước đó nào, nó tạo thành một vòng lặp.

Sơ đồ dưới đây minh họa cách vòng lặp hoạt động:


Nếu điều khiển quay lại mà không có điều kiện, nó tạo thành một vòng lặp vô hạn không mong muốn vì phần còn lại của mã sẽ không bao giờ được thực thi.

Trong một vòng lặp có điều kiện, việc lặp lại lặp đi lặp lại của một nhóm các chỉ thị tiếp tục cho đến khi một điều kiện nhất định được đáp ứng. Python hỗ trợ một số vòng lặp như vòng lặp for, vòng lặp while mà chúng ta sẽ nghiên cứu trong các chương tiếp theo.



Vòng lặp for lặp lại qua các mục của bất kỳ chuỗi nào, chẳng hạn như một danh sách, tuple hoặc một chuỗi.

Dưới đây là một ví dụ sử dụng Vòng lặp For để lặp qua một mảng trong Python:

```python
words = ["one", "two", "three"]
for x in words:
  print(x)
```

Kết quả sẽ là:

```
one
two
three
```



Vòng lặp while lặp lại một câu lệnh mục tiêu liên tục miễn là một biểu thức boolean cụ thể được đánh giá là đúng.

Dưới đây là một ví dụ sử dụng Vòng lặp While để in ra 5 số đầu tiên trong Python:

```python
i = 1
while i < 6:
  print(i)
  i += 1
```

Kết quả sẽ là:

```
1
2
3
4
5
```



nhảy

Các câu lệnh nhảy được sử dụng để nhảy đến một câu lệnh cụ thể bằng cách phá vỡ luồng thực thi hiện tại của chương trình. Trong Python, có hai câu lệnh nhảy là break và continue.



Nó chấm dứt vòng lặp hiện tại và tiếp tục thực thi tại câu lệnh tiếp theo.

Ví dụ dưới đây minh họa việc sử dụng câu lệnh break:

```python
x = 0

while x < 10:
    print("x:", x)
    if x == 5:
        print("Breaking...")
        break
    x += 1

print("End")
```

Kết quả sẽ là:

```
x: 0
x: 1
x: 2
x: 3
x: 4
x: 5
Breaking...
End
```



Nó bỏ qua việc thực thi của khối chương trình và trả lại điều khiển về đầu vòng lặp hiện tại để bắt đầu vòng lặp kế tiếp.

Ví dụ dưới đây minh họa việc sử dụng câu lệnh continue:

```python
for letter in "Python":
    # Bỏ qua khi chữ cái là ''h''
    if letter == "h":
        continue
    print("Current Letter :", letter)
```

Kết quả sẽ là:

```
Current Letter : P
Current Letter : y
Current Letter : t
Current Letter : o
Current Letter : n
```

Như vậy, các câu lệnh điều khiển và vòng lặp là các công cụ quan trọng giúp kiểm soát luồng thực thi của chương trình Python và tạo điều kiện cho quyết định và lặp lại các phần mã cần thiết.

_Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!_',
    30,
    TRUE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 1. Python - Ra Quyết Định',
    'Bài 1. Python - Ra Quyết Định',
    1,
    'Trong Python, khả năng ra quyết định được thực hiện thông qua các từ khóa if..elif...else. Từ khóa if yêu cầu một biểu thức boolean, theo sau bởi dấu hai chấm (:) để bắt đầu một khối được thụt vào. Các câu lệnh có cùng mức thụt vào sẽ được thực thi nếu biểu thức boolean trong câu lệnh if là Đúng. Nếu biểu thức không Đúng (False), trình thông dịch sẽ bỏ qua khối được thụt vào và tiếp tục thực thi các câu lệnh ở mức thụt vào trước đó.

Cấu trúc quyết định đánh giá nhiều biểu thức, tạo ra Kết quả TRUE hoặc FALSE. Bạn cần xác định hành động nào cần thực hiện và các câu lệnh nào sẽ được thực thi nếu Kết quả là TRUE hoặc FALSE.


Ngôn ngữ lập trình Python giả định bất kỳ giá trị không bằng không và không rỗng như TRUE, và nếu nó là không hoặc null, thì nó được giả định là giá trị FALSE.

Ngôn ngữ lập trình Python cung cấp các loại câu lệnh ra quyết định sau đây. Nhấp vào các liên kết sau đây để kiểm tra chi tiết của chúng.

**1.** Câu lệnh if

   Một câu lệnh if bao gồm một biểu thức boolean theo sau là một hoặc nhiều câu lệnh.

**2.** Câu lệnh if...else

   Một câu lệnh if có thể được theo sau bởi một câu lệnh else tùy chọn, thực thi khi biểu thức boolean là FALSE.

**3.** Câu lệnh if lồng nhau

   Bạn có thể sử dụng một câu lệnh if hoặc else if bên trong một câu lệnh if hoặc else if(s).

Hãy đi qua từng câu lệnh ra quyết định một cách ngắn gọn.



Nếu khối mã của một mệnh đề if chỉ bao gồm một dòng duy nhất, nó có thể được viết trên cùng một dòng với câu lệnh tiêu đề.

Dưới đây là một ví dụ về mệnh đề if trên một dòng:

```python


var = 100
if ( var == 100 ) : print ("Value of expression is 100")
print ("Good bye!")
```

Khi mã trên được thực thi, nó sẽ tạo ra kết quả sau:

```
Value of expression is 100
Good bye!
```

Đây là cách Python thực hiện ra quyết định trong các chương trình của mình. Các câu lệnh ra quyết định giúp chương trình lựa chọn hành động dựa trên các điều kiện cụ thể và là một phần quan trọng của việc kiểm soát luồng của chương trình.

Dưới đây là một ví dụ minh họa về cách sử dụng câu lệnh if để quyết định hành động dựa trên một biểu thức boolean:

```python

marks = 80

if marks < 30:
    result = "Failed"
elif marks > 75:
    result = "Passed with distinction"
else:
    result = "Passed"

print("Result:", result)
```

Kết quả sẽ là:

```
Result: Passed with distinction
```

Dưới đây là một ví dụ sử dụng câu lệnh if...else để xác định xem một ký tự là nguyên âm hay không:

```python

def checkVowel(character):
    if character in [''a'', ''e'', ''i'', ''o'', ''u'']:
        return "Vowel alphabet"
    else:
        return "Not a vowel alphabet"

print(checkVowel(''a''))  # Kết quả: Vowel alphabet
print(checkVowel(''b''))  # Kết quả: Not a vowel alphabet
```

Dưới đây là một ví dụ sử dụng câu lệnh if lồng nhau để kiểm tra số lớn nhất trong ba số:

```python

num1 = 10
num2 = 20
num3 = 15

if num1 >= num2:
    if num1 >= num3:
        largest = num1
    else:
        largest = num3
else:
    if num2 >= num3:
        largest = num2
    else:
        largest = num3

print("Largest number is:", largest)
```

Kết quả sẽ là:

```
Largest number is: 20
```

Như vậy, đây là một số ví dụ về cách sử dụng câu lệnh ra quyết định trong Python để thực hiện các hành động dựa trên điều kiện cụ thể.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 2. Python - Mệnh đề if',
    'Bài 2. Python - Mệnh đề if',
    2,
    'Trong Python, mệnh đề if thực hiện việc thực thi có điều kiện. Nó chứa một biểu thức logic để so sánh dữ liệu và quyết định được đưa ra dựa trên kết quả của sự so sánh đó.



```python
if biểu_thức:
   câu_lệnh(s)
```

Nếu biểu thức logic đánh giá thành TRUE, thì khối câu lệnh bên trong mệnh đề if sẽ được thực thi. Nếu biểu thức logic đánh giá thành FALSE, thì tập hợp câu lệnh đầu tiên sau khi kết thúc của mệnh đề if sẽ được thực thi.






Hãy xem xét một ví dụ về một khách hàng có được giảm giá 10% nếu số tiền mua hàng của anh ấy là > 1000; nếu không, thì không có giảm giá nào được áp dụng. Sơ đồ luồng dưới đây cho thấy toàn bộ quá trình ra quyết định.


Trong Python, trước tiên chúng ta thiết lập một biến giảm giá thành 0 và chấp nhận số tiền làm đầu vào từ người dùng.

Sau đó đến mệnh đề có điều kiện nếu số tiền > 1000. Đặt dấu : bắt đầu khối có điều kiện trong đó giảm giá được tính toán. Rõ ràng, giảm giá hoặc không, câu lệnh tiếp theo mặc định sẽ in số tiền - giảm giá. Nếu áp dụng, nó sẽ được trừ, nếu không, nó là 0.

```python
discount = 0
amount = 1200


if amount > 1000:
   discount = amount * 10 / 100

print("amount =", amount - discount)
```

Ở đây số tiền là 1200, do đó giảm giá 120 được trừ. Khi thực thi mã, bạn sẽ nhận được đầu ra sau đây:

```
amount = 1080.0
```

Thay đổi biến amount thành 800 và chạy lại mã. Lần này, không có giảm giá nào được áp dụng. Và, bạn sẽ nhận được đầu ra sau đây:

```
amount = 800
```

Đây là một số ví dụ về cách sử dụng mệnh đề if trong Python để thực hiện các hành động dựa trên điều kiện cụ thể.

_Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!_',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 3. Hướng dẫn Sử dụng Câu lệnh if-else trong Python',
    'Bài 3. Hướng dẫn Sử dụng Câu lệnh if-else trong Python',
    3,
    'Tài liệu này cung cấp hướng dẫn chi tiết về cách sử dụng câu lệnh if-else trong Python. Nó mô tả cách sử dụng if-else để kiểm tra điều kiện và thực thi các khối mã tương ứng dựa trên kết quả của điều kiện đó.





Câu lệnh if-else trong Python có cú pháp như sau:

```python
if điều_kiện:
    # Khối mã được thực thi
    # khi điều_kiện là True
else:
    # Khối mã được thực thi
    # khi điều_kiện là False
```




Để minh họa, xem ví dụ sau:

```python
age = 25
print("Tuổi: ", age)
if age >= 18:
    print("Bạn đủ điều kiện để bỏ phiếu")
else:
    print("Bạn không đủ điều kiện để bỏ phiếu")
```

Đầu tiên, thiết lập biến nguyên "age" thành 25.

Sau đó, sử dụng câu lệnh if với biểu thức "age>18" theo sau là ":" bắt đầu một khối mã; điều này sẽ được thực hiện nếu "age>=18" là True.

Để cung cấp khối else, sử dụng else: khối mã được thụt vào tiếp theo chứa thông báo "Không đủ điều kiện để bỏ phiếu" sẽ được thực hiện khi "age>=18" là False.

Khi thực thi mã này, bạn sẽ nhận được kết quả sau:

```
Tuổi: 25
Bạn đủ điều kiện để bỏ phiếu
```

Để kiểm tra khối else, hãy thay đổi tuổi thành 12 và chạy lại mã.

```
Tuổi: 12
Bạn không đủ điều kiện để bỏ phiếu
```



Câu lệnh if elif else cho phép bạn kiểm tra nhiều biểu thức và thực thi một khối mã ngay khi một trong các điều kiện đánh giá là True.

Tương tự như câu lệnh else, câu lệnh elif là tùy chọn. Tuy nhiên, khác với else, chỉ có thể có tối đa một câu lệnh elif; có thể có một số câu lệnh elif sau một câu lệnh if.



```python
if biểu_thức1:
    khối mã
elif biểu_thức2:
    khối mã
elif biểu_thức3:
    khối mã
else:
    khối mã
```



Hãy hiểu cách câu lệnh if elif else hoạt động, với ví dụ sau.

Cấu trúc giảm giá được sử dụng trong ví dụ trước đã được sửa đổi thành các mức giảm giá khác nhau:

- 20% trên số tiền vượt quá 10000,
- 10% cho số tiền giữa 5-10000,
- 5% nếu nó nằm giữa 1 đến 5000,
- không giảm giá nếu số tiền <1000.





Chúng ta có thể viết mã Python cho logic trên với câu lệnh if-else:

```python
amount = 2500
print(''Số tiền = '', amount)
if amount > 10000:
    discount = amount * 20 / 100
else:
    if amount > 5000:
        discount = amount * 10 / 100
    else:
        if amount > 1000:
            discount = amount * 5 / 100
        else:
            discount = 0

print(''Số tiền phải trả = '', amount - discount)
```

Đặt số tiền để kiểm tra tất cả các điều kiện có thể: 800, 2500, 7500 và 15000. Kết quả sẽ thay đổi tương ứng.

```
Số tiền: 800
Số tiền phải trả = 800
Số tiền: 2500
Số tiền phải trả = 2375.0
Số tiền: 7500
Số tiền phải trả = 6750.0
Số tiền: 15000
Số tiền phải trả = 12000.0
```

Mặc dù mã sẽ hoạt động hoàn hảo, nhưng nếu bạn nhìn vào việc thụt vào cấp độ tăng dần ở mỗi câu lệnh if và else, sẽ trở nên khó quản lý nếu còn nhiều điều kiện hơn.

Câu lệnh elif giúp mã dễ đọc và hiểu hơn.



```python
amount = 2500
print(''Số tiền = '', amount)
if amount > 10000:
    discount = amount * 20 / 100
elif amount > 5000:
    discount = amount * 10 / 100
elif amount > 1000:
    discount = amount * 5 / 100
else:
    discount = 0

print(''Số tiền phải trả = '', amount - discount)
```

Đặt số tiền để kiểm tra tất cả các điều kiện có thể: 800, 2500, 7500 và 15000. Kết quả sẽ thay đổi tương ứng.

```
Số tiền: 800
Số tiền phải trả = 800
Số tiền: 2500
Số tiền phải trả = 2375.0
Số tiền: 7500
Số tiền phải trả = 6750.0
Số tiền: 15000
Số tiền phải trả = 12000.0
```

Việc sử dụng câu lệnh elif giúp mã trở nên ngắn gọn và dễ đọc hơn, vì không cần thiết phải thụt vào mỗi lần có một điều kiện mới. Câu lệnh elif cũng giúp mã trở nên linh hoạt hơn khi cần thêm điều kiện kiểm tra.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 4. Hướng dẫn Sử dụng Câu lệnh if Lồng nhau trong Python',
    'Bài 4. Hướng dẫn Sử dụng Câu lệnh if Lồng nhau trong Python',
    4,
    'Tài liệu này mô tả cách sử dụng câu lệnh if lồng nhau trong Python. Câu lệnh if lồng nhau cho phép chúng ta kiểm tra các điều kiện nằm trong các điều kiện khác.



Cú pháp của câu lệnh if lồng nhau sẽ như sau:

```python
if biểu_thức1:
    # Khối mã
    if biểu_thức2:
        # Khối mã
    elif biểu_thức3:
        # Khối mã
    else:
        # Khối mã
elif biểu_thức4:
    # Khối mã
else:
    # Khối mã
```



Hãy xem một ví dụ để hiểu cách hoạt động của câu lệnh if lồng nhau.

```python
num = 8
print("num = ", num)
if num % 2 == 0:
    if num % 3 == 0:
        print("Chia hết cho 3 và 2")
    else:
        print("Chia hết cho 2 nhưng không chia hết cho 3")
else:
    if num % 3 == 0:
        print("Chia hết cho 3 nhưng không chia hết cho 2")
    else:
        print("Không chia hết cho cả 2 và 3")
```

Khi mã trên được thực thi, nó sẽ tạo ra kết quả sau:

```
num = 8
Chia hết cho 2 nhưng không chia hết cho 3
num = 15
Chia hết cho 3 nhưng không chia hết cho 2
num = 12
Chia hết cho 3 và 2
num = 5
Không chia hết cho cả 2 và 3
```

Trong ví dụ này, chúng ta kiểm tra xem số `num` có chia hết cho 2 hay không. Nếu có, chúng ta tiếp tục kiểm tra xem `num` có chia hết cho 3 không. Tùy thuộc vào kết quả của các điều kiện, chúng ta in ra thông điệp tương ứng.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 5. Python - Câu lệnh Match-Case',
    'Bài 5. Python - Câu lệnh Match-Case',
    5,
    'Trước phiên bản 3.10 của Python, Python thiếu một tính năng tương tự như switch-case trong C hoặc C++. Trong Python 3.10, một kỹ thuật phù hợp gọi là match-case đã được giới thiệu, tương tự như cấu trúc switch-case có sẵn trong C/C++/Java v.v.



Một câu lệnh match-case trong Python nhận một biểu thức và so sánh giá trị của nó với các mẫu liên tiếp được đưa ra dưới dạng một hoặc nhiều khối case. Việc sử dụng tương tự hơn với phù hợp mẫu trong các ngôn ngữ như Rust hoặc Haskell hơn là một câu lệnh switch trong C hoặc C++. Chỉ có mẫu đầu tiên phù hợp được thực thi. Cũng có thể trích xuất các thành phần (phần tử chuỗi hoặc thuộc tính đối tượng) từ giá trị vào các biến.

Việc sử dụng cơ bản của match-case là so sánh một biến với một hoặc nhiều giá trị.



Dưới đây là cú pháp của câu lệnh match-case trong Python:

```python
match biến:
   case ''mẫu 1'': câu lệnh 1
   case ''mẫu 2'': câu lệnh 2
   ...
   case ''mẫu n'': câu lệnh n
```



Dưới đây là một ví dụ về cách sử dụng câu lệnh match-case:

```python
def ngay_trong_tuan(n):
   match n:
      case 0: return "Thứ Hai"
      case 1: return "Thứ Ba"
      case 2: return "Thứ Tư"
      case 3: return "Thứ Năm"
      case 4: return "Thứ Sáu"
      case 5: return "Thứ Bảy"
      case 6: return "Chủ Nhật"
      case _: return "Số ngày không hợp lệ"
print(ngay_trong_tuan(3))
print(ngay_trong_tuan(6))
print(ngay_trong_tuan(7))
```

Khi mã trên được thực thi, nó sẽ tạo ra kết quả sau:

```
Thứ Năm
Chủ Nhật
Số ngày không hợp lệ
```



Câu lệnh match-case trong Python là một công cụ mạnh mẽ để kiểm tra nhiều trường hợp và thực thi các hành động phù hợp dựa trên giá trị của biến. Nó cung cấp một cú pháp rõ ràng và dễ hiểu để xử lý các tình huống phù hợp.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 6. Python - Vòng lặp',
    'Bài 6. Python - Vòng lặp',
    6,
    'Trong chương trình, các câu lệnh được thực thi theo thứ tự tuần tự: Câu lệnh đầu tiên trong một hàm được thực thi trước, tiếp theo là câu lệnh thứ hai, và cứ tiếp tục như vậy. Tuy nhiên, có những tình huống khi bạn cần thực thi một khối mã nhiều lần.

Ngôn ngữ lập trình cung cấp các cấu trúc điều khiển khác nhau cho phép quản lý các lệnh theo cách phức tạp hơn.



Các vòng lặp trong Python cho phép chúng ta thực thi một câu lệnh hoặc nhóm câu lệnh nhiều lần.




Ngôn ngữ lập trình Python cung cấp các loại vòng lặp sau để xử lý yêu cầu lặp lại:

1. **Vòng lặp while**: Lặp lại một câu lệnh hoặc nhóm câu lệnh trong khi một điều kiện nhất định là ĐÚNG. Nó kiểm tra điều kiện trước khi thực thi thân vòng lặp.

2. **Vòng lặp for**: Thực thi một chuỗi các câu lệnh nhiều lần và viết tắt mã quản lý biến vòng lặp.

3. **Vòng lặp lồng nhau**: Bạn có thể sử dụng một hoặc nhiều vòng lặp bên trong bất kỳ vòng lặp while, for hoặc do..while nào khác.



Các lệnh điều khiển vòng lặp thay đổi thứ tự thực thi từ thứ tự thông thường của nó. Khi thực thi rời khỏi một phạm vi, tất cả các đối tượng tự động được tạo ra trong phạm vi đó sẽ bị hủy.

Python hỗ trợ các lệnh điều khiển vòng lặp sau đây:

1. **Lệnh break**: Kết thúc câu lệnh vòng lặp và chuyển dẫn thực thi sang câu lệnh ngay sau vòng lặp.

2. **Lệnh continue**: Làm cho vòng lặp bỏ qua phần còn lại của thân vòng lặp và ngay lập tức kiểm tra lại điều kiện của nó trước khi lặp lại.

3. **Lệnh pass**: Lệnh pass trong Python được sử dụng khi một câu lệnh được yêu cầu cú pháp nhưng bạn không muốn thực hiện bất kỳ lệnh hoặc mã nào.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 7. Python - Vòng lặp For',
    'Bài 7. Python - Vòng lặp For',
    7,
    'Vòng lặp for trong Python có khả năng lặp qua các phần tử của bất kỳ chuỗi nào, chẳng hạn như một list, tuple hoặc một chuỗi.



```python
for biến_lặp in chuỗi:
    câu_lệnh(s)
```

Nếu một chuỗi chứa một danh sách biểu thức, nó sẽ được đánh giá trước. Sau đó, phần tử đầu tiên (tại chỉ mục 0) trong chuỗi được gán cho biến lặp.

Tiếp theo, khối câu lệnh được thực thi. Mỗi phần tử trong danh sách được gán cho biến lặp, và khối câu lệnh được thực thi cho đến khi toàn bộ chuỗi được tiêu thụ.




Ngôn ngữ lập trình Python cung cấp các loại vòng lặp sau để xử lý yêu cầu lặp lại:

1. **Vòng lặp while**: Lặp lại một câu lệnh hoặc nhóm câu lệnh trong khi một điều kiện nhất định là ĐÚNG. Nó kiểm tra điều kiện trước khi thực thi thân vòng lặp.

2. **Vòng lặp for**: Thực thi một chuỗi các câu lệnh nhiều lần và viết tắt mã quản lý biến vòng lặp.

3. **Vòng lặp lồng nhau**: Bạn có thể sử dụng một hoặc nhiều vòng lặp bên trong bất kỳ vòng lặp while, for hoặc do..while nào khác.





```python
zen = ''''''
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
''''''
for char in zen:
    if char not in ''aeiou'':
        print(char, end='''')
```



```python
numbers = (34, 54, 67, 21, 78, 97, 45, 44, 80, 19)
total = 0
for num in numbers:
    total += num
print("Tổng =", total)
```



```python
numbers = [34, 54, 67, 21, 78, 97, 45, 44, 80, 19]
for num in numbers:
    if num % 2 == 0:
        print(num)
```



```python
for num in range(5):
    print(num, end='' '')
print()

for num in range(10, 20):
    print(num, end='' '')
print()

for num in range(1, 10, 2):
    print(num, end='' '')
```



```python
numbers = [34, 54, 67, 21, 78]
indices = range(len(numbers))
for index in indices:
    print("index:", index, "number:", numbers[index])
```



```python
numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
for x in numbers:
    print(x)

numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
for x in numbers:
    print(x, ":", numbers[x])

numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
for x in numbers.items():
    print(x)

numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
for x, y in numbers.items():
    print(x, ":", y)
```



Với vòng lặp for trong Python, bạn có thể dễ dàng lặp qua các phần tử của một chuỗi, danh sách, tuple hoặc từ điển và thực thi các câu lệnh cho mỗi phần tử. Điều này giúp làm cho mã của bạn trở nên gọn gàng và dễ hiểu.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 8. Python - Vòng lặp For Else',
    'Bài 8. Python - Vòng lặp For Else',
    8,
    'Python hỗ trợ việc sử dụng câu lệnh "else" kết hợp với câu lệnh "for". Nếu câu lệnh "else" được sử dụng với một vòng lặp "for", câu lệnh "else" sẽ được thực thi khi chuỗi đã được duyệt qua trước khi điều khiển chuyển sang dòng lệnh chính.




Cú pháp sau đây của vòng lặp for với mệnh đề else tùy chọn:

```python
for biến in iterable:
    # các câu lệnh trong vòng lặp
    ...
else:
    # các câu lệnh trong mệnh đề else
    ...
```



Dưới đây là một ví dụ minh họa sự kết hợp của câu lệnh else với câu lệnh for trong Python. Cho đến khi đếm nhỏ hơn 5, số lần lặp lại được in ra. Khi nó trở thành 5, câu lệnh in trong khối else được thực thi, trước khi điều khiển chuyển sang câu lệnh tiếp theo trong chương trình chính.

```python
for count in range(6):
    print("Lần lặp {}".format(count))
else:
    print("Vòng lặp for đã kết thúc. Bây giờ là trong khối else")
print("Kết thúc vòng lặp for")
```

Kết quả khi chạy mã trên sẽ là:

```
Lần lặp 0
Lần lặp 1
Lần lặp 2
Lần lặp 3
Lần lặp 4
Lần lặp 5
Vòng lặp for đã kết thúc. Bây giờ là trong khối else
Kết thúc vòng lặp for
```



Với câu lệnh "else" kết hợp với vòng lặp "for" trong Python, bạn có thể thực hiện các hành động bổ sung sau khi vòng lặp kết thúc mà không cần kiểm tra điều kiện. Điều này giúp làm cho mã của bạn trở nên sạch sẽ và dễ hiểu.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 9. Python - Vòng lặp While',
    'Bài 9. Python - Vòng lặp While',
    9,
    'Thông thường, luồng thực thi các bước trong một chương trình máy tính diễn ra từ đầu đến cuối. Tuy nhiên, thay vì chuyển sang bước tiếp theo, nếu luồng được chuyển hướng lại đến bất kỳ bước nào trước đó, đó là một vòng lặp.



Một câu lệnh vòng lặp while trong ngôn ngữ lập trình Python thực hiện một câu lệnh mục tiêu lặp đi lặp lại miễn là một biểu thức boolean cụ thể là đúng.



Cú pháp của vòng lặp while trong ngôn ngữ lập trình Python là:

```python
while biểu_thức:
   các câu lệnh
```

Từ khóa while được theo sau bởi một biểu thức boolean, và sau đó là dấu hai chấm, để bắt đầu một khối câu lệnh đã được lùi vào bên trong. Ở đây, các câu lệnh có thể là một câu lệnh duy nhất hoặc một khối câu lệnh với định dạng thụt đồng nhất. Điều kiện có thể là bất kỳ biểu thức nào, và true là bất kỳ giá trị không-zero nào. Vòng lặp lặp lại trong khi biểu thức boolean là true.

Ngay khi biểu thức trở thành false, điều khiển chương trình chuyển đến dòng lệnh ngay sau vòng lặp.

Nếu nó không thể trở thành false, vòng lặp tiếp tục chạy và không dừng lại trừ khi bị dừng một cách buộc bằng cách sử dụng dừng buộc. Một vòng lặp như vậy được gọi là vòng lặp vô hạn, mà là không mong muốn trong một chương trình máy tính.





```python
count = 0
while count < 5:
    count += 1
    print("Lần lặp số {}".format(count))

print("Kết thúc vòng lặp while")
```

Kết quả khi chạy mã trên sẽ là:

```
Lần lặp số 1
Lần lặp số 2
Lần lặp số 3
Lần lặp số 4
Lần lặp số 5
Kết thúc vòng lặp while
```



```python
var = ''0''
while var.isnumeric() == True:
    var = input(''Nhập một số...'')
    if var.isnumeric() == True:
        print("Đầu vào của bạn", var)

print("Kết thúc vòng lặp while")
```

Kết quả khi chạy mã trên sẽ là:

```
Nhập một số...10
Đầu vào của bạn 10
Nhập một số...100
Đầu vào của bạn 100
Nhập một số...543
Đầu vào của bạn 543
Nhập một số...qwer
Kết thúc vòng lặp while
```



Một vòng lặp trở thành vòng lặp vô hạn nếu một điều kiện không bao giờ trở thành FALSE. Bạn phải cẩn thận khi sử dụng các vòng lặp while vì có khả năng rằng điều kiện này không bao giờ trở thành giá trị FALSE. Điều này dẫn đến một vòng lặp không bao giờ kết thúc. Một vòng lặp như vậy được gọi là một vòng lặp vô hạn.



Một vòng lặp vô hạn có thể hữu ích trong lập trình máy chủ/máy khách nơi máy chủ cần chạy liên tục để các chương trình máy khách có thể giao tiếp với nó khi cần thiết.



```python
var = 1
while var == 1: # Đây tạo ra một vòng lặp vô hạn
    num = int(input("Nhập một số:"))
    print("Bạn đã nhập: ", num)

print("Tạm biệt!")
```

Kết quả khi chạy mã trên sẽ là:

```
Đầu vào số: 20
Bạn đã nhập: 20
Đầu vào số: 29
Bạn đã nhập: 29
Đầu vào số: 3
Bạn đã nhập: 3
Đầu vào số: 11
Bạn đã nhập: 11
Đầu vào số: 22
Bạn đã nhập: 22
Đầu vào số: Nhập vào số nguyên...
```



Python hỗ trợ việc sử dụng câu lệnh "else" kết hợp với câu lệnh vòng lặp while.

Nếu câu lệnh "else" được sử dụng với một vòng lặp while, câu lệnh "else" được thực thi khi điều kiện trở thành false trước khi điều khiển chuyển sang dòng lệnh chính của chương trình.



```python
count = 0
while count < 5:
    count += 1
    print("Lần lặp số {}".format(count))
else:
    print("Vòng lặp while đã kết thúc. Bây giờ đang trong khối else")

print("Kết thúc vòng lặp while")
```

Kết quả khi chạy mã trên sẽ là:

```
Lần lặp số 1
Lần lặp số 2
Lần lặp số 3
Lần lặp số 4
Lần lặp số 5
Vòng lặp while đã kết thúc. Bây giờ đang trong khối else
Kết thúc vòng lặp while
```

Ở đây, khi điều kiện của vòng lặp trở thành false, câu lệnh trong khối else được thực thi trước khi điều khiển chuyển sang dòng lệnh chính của chương trình.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 10.1. Python break Statement',
    'Bài 10.1. Python break Statement',
    10,
    'Câu lệnh break trong Python được sử dụng để kết thúc vòng lặp hiện tại và tiếp tục thực thi tại câu lệnh tiếp theo, tương tự như câu lệnh break truyền thống trong C.

Cách sử dụng phổ biến nhất cho câu lệnh break trong Python là khi một điều kiện bên ngoài được kích hoạt yêu cầu một thoát nhanh chóng từ một vòng lặp. Câu lệnh break có thể được sử dụng trong cả các vòng lặp while và for trong Python.

Nếu bạn đang sử dụng các vòng lặp lồng nhau trong Python, câu lệnh break sẽ dừng việc thực thi của vòng lặp nằm bên trong nhất và bắt đầu thực thi dòng lệnh tiếp theo sau khối mã.



Cú pháp cho câu lệnh break trong Python là như sau:


```python
break
```





```python
for letter in ''Python'':     # Ví dụ 1
   if letter == ''h'':
      break
   print (''Chữ hiện tại :'', letter)
  
var = 10                    # Ví dụ 2
while var > 0:              
   print (''Giá trị biến hiện tại :'', var)
   var = var -1
   if var == 5:
      break

print ("Tạm biệt!")
```

Kết quả khi chạy mã trên sẽ là:

```
Chữ hiện tại : P
Chữ hiện tại : y
Chữ hiện tại : t
Chữ hiện tại : o
Chữ hiện tại : n
Giá trị biến hiện tại : 10
Giá trị biến hiện tại : 9
Giá trị biến hiện tại : 8
Giá trị biến hiện tại : 7
Giá trị biến hiện tại : 6
Tạm biệt!
```



```python
no = int(input(''Nhập một số: ''))
numbers = [11, 33, 55, 39, 55, 75, 37, 21, 23, 41, 13]
for num in numbers:
   if num == no:
      print(''Số được tìm thấy trong danh sách'')
      break
else:
   print(''Số không được tìm thấy trong danh sách'')
```

Kết quả khi chạy mã trên sẽ là:

```
Nhập một số: 33
Số được tìm thấy trong danh sách
Nhập một số: 5
Số không được tìm thấy trong danh sách
```



```python
num = 37
print("Số: ", num)
for x in range(2, num):
   if num % x == 0:
      print("{} không phải là số nguyên tố".format(num))
      break
else:
   print("{} là số nguyên tố".format(num))
```

Kết quả khi chạy mã trên sẽ là:

```
Số: 37
37 là số nguyên tố
```

Gán các giá trị khác cho num để kiểm tra xem nó có phải là số nguyên tố hay không.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 10.2. Python continue Statement',
    'Bài 10.2. Python continue Statement',
    10,
    'Câu lệnh `continue` trong Python được sử dụng để bỏ qua việc thực thi của khối mã và trả lại quyền điều khiển cho đầu vòng lặp hiện tại để bắt đầu vòng lặp tiếp theo. Khi gặp phải, vòng lặp bắt đầu vòng lặp tiếp theo mà không thực thi các câu lệnh còn lại trong vòng lặp hiện tại.

Câu lệnh `continue` có thể được sử dụng cả trong vòng lặp while và for.



```python
continue
```



Bây giờ chúng ta hãy xem một ví dụ để hiểu cách câu lệnh continue hoạt động trong Python −

```python
for letter in ''Python'': # Ví dụ 1
   if letter == ''h'':
      continue
   print (''Chữ hiện tại :'', letter)

var = 10 # Ví dụ 2
while var > 0:
   var = var -1
   if var == 5:
      continue
   print (''Giá trị biến hiện tại :'', var)
print ("Tạm biệt!")
```

Khi mã trên được thực thi, nó sẽ tạo ra kết quả như sau:

```
Chữ hiện tại : P
Chữ hiện tại : y
Chữ hiện tại : t
Chữ hiện tại : o
Chữ hiện tại : n
Giá trị biến hiện tại : 9
Giá trị biến hiện tại : 8
Giá trị biến hiện tại : 7
Giá trị biến hiện tại : 6
Giá trị biến hiện tại : 4
Giá trị biến hiện tại : 3
Giá trị biến hiện tại : 2
Giá trị biến hiện tại : 1
Giá trị biến hiện tại : 0
Tạm biệt!
```



Câu lệnh `continue` trong Python được sử dụng cả trong vòng lặp `for` cũng như vòng lặp `while` để bỏ qua việc thực thi của vòng lặp hiện tại và chuyển quyền điều khiển của chương trình sang vòng lặp tiếp theo.



Đoạn mã sau sử dụng `continue` để tìm các ước số nguyên tố của một số được cung cấp. Để tìm các ước số nguyên tố, chúng ta cần lặp lại việc chia số đã cho bắt đầu từ 2, tăng giá trị của ước số và tiếp tục quá trình tương tự cho đến khi đầu vào giảm xuống còn 1.

Thuật toán để tìm các ước số nguyên tố như sau:

- Chấp nhận đầu vào từ người dùng (n)
- Đặt ước số (d) thành 2
- Thực hiện các bước sau cho đến khi n>1:
  - Kiểm tra xem số đã cho (n) có chia hết cho ước số (d) hay không.
  - Nếu n%d==0:
    - In dưới dạng một ước số
    - Đặt giá trị mới của n là n/d
    - Tiếp tục từ bước 4
  - Nếu không:
    - Tăng giá trị của d lên 1
    - Tiếp tục từ bước 3

Dưới đây là đoạn mã Python cho mục đích đó:

```python
num = 60
print ("Các ước số nguyên tố cho: ", num)
d = 2
while num > 1:
   if num % d == 0:
      print (d)
      num = num / d
      continue
   d = d + 1
```

Khi thực thi, mã này sẽ tạo ra kết quả sau:

```
Các ước số nguyên tố cho: 60
2
2
3
5
```

Gán các giá trị khác (ví dụ: 75) cho num trong chương trình trên và kiểm tra kết quả cho các ước số nguyên tố của nó.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 11. Python pass Statement',
    'Bài 11. Python pass Statement',
    11,
    'Câu lệnh `pass` trong Python được sử dụng khi một câu lệnh được yêu cầu cú pháp nhưng bạn không muốn bất kỳ lệnh hoặc mã nào được thực thi.

Đây là một phép thực thi trống; không có gì xảy ra khi nó được thực thi. Câu lệnh `pass` trong Python cũng hữu ích ở những nơi mà mã của bạn sẽ cuối cùng đi, nhưng chưa được viết, tức là, trong các phần còn thiếu.



```python
pass
```



Đoạn mã dưới đây cho thấy cách bạn có thể sử dụng câu lệnh pass trong Python:

```python
for letter in ''Python'':
   if letter == ''h'':
      pass
      print (''Đây là khối pass'')
   print (''Chữ hiện tại :'', letter)
print ("Tạm biệt!")
```

Khi mã trên được thực thi, nó sẽ tạo ra kết quả sau:

```
Chữ hiện tại : P
Chữ hiện tại : y
Chữ hiện tại : t
Đây là khối pass
Chữ hiện tại : h
Chữ hiện tại : o
Chữ hiện tại : n
Tạm biệt!
```



Điều này đơn giản đủ để tạo ra một vòng lặp vô hạn bằng câu lệnh pass. Ví dụ, nếu bạn muốn viết một vòng lặp vô hạn mà không làm gì cả, hãy làm điều đó bằng một pass.



```python
while True: pass                  # Nhấn Ctrl-C để dừng
```

Vì thân của vòng lặp chỉ là một câu lệnh trống, Python bị kẹt trong vòng lặp này. Như đã giải thích trước đó, pass là gần như với các câu lệnh như None là với các đối tượng — một điều rõ ràng không làm gì cả.



Python 3.X cho phép sử dụng dấu ba chấm được mã hóa dưới dạng ba dấu chấm liên tiếp `...` để thay thế cho câu lệnh pass. Dấu ba chấm này có thể phục vụ như một lựa chọn cho câu lệnh pass.



Ví dụ, nếu chúng ta tạo một hàm không làm gì đặc biệt để mã sau này điền vào, thì chúng ta có thể sử dụng `...`:

```python
def func1():
    ...                   # Thay thế cho pass

def func2(): ...          # Hoạt động trên cùng một dòng

func1()                   # Không làm gì nếu được gọi
func2()                   # Không làm gì nếu được gọi
```

Câu lệnh trên khi được gọi không làm gì cả.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 2: Câu lệnh điều khiển' LIMIT 1),
    'Bài 12. Python Nested Loops',
    'Bài 12. Python Nested Loops',
    12,
    'Trong Python, khi bạn viết một hoặc nhiều vòng lặp trong một câu lệnh vòng lặp đó được gọi là vòng lặp lồng nhau. Vòng lặp chính được coi là vòng lặp bên ngoài và các vòng lặp bên trong vòng lặp bên ngoài được gọi là các vòng lặp bên trong.

Ngôn ngữ lập trình Python cho phép sử dụng một vòng lặp bên trong một vòng lặp khác. Phần sau sẽ mô tả một số ví dụ để minh họa khái niệm vòng lặp lồng nhau với vòng lặp for và vòng lặp while.



Vòng lặp for có một hoặc nhiều vòng lặp for bên trong được gọi là vòng lặp for lồng nhau.



Cú pháp cho câu lệnh vòng lặp for lồng nhau trong ngôn ngữ lập trình Python như sau:

```python
for biến_lặp_ngoài in chuỗi:
   for biến_lặp_trong in chuỗi:
      câu_lệnh(s)
   câu_lệnh(s)
```



Chương trình sau sử dụng một vòng lặp for lồng nhau để tìm các số nguyên tố từ 2 đến 100:

```python
months = ["jan", "feb", "mar"]
days = ["sun", "mon", "tue"]

for x in months:
  for y in days:
    print(x, y)

print("Good bye!")
```

Khi mã trên được thực thi, nó tạo ra kết quả như sau:

```
(''jan'', ''sun'')
(''jan'', ''mon'')
(''jan'', ''tue'')
(''feb'', ''sun'')
(''feb'', ''mon'')
(''feb'', ''tue'')
(''mar'', ''sun'')
(''mar'', ''mon'')
(''mar'', ''tue'')
Good bye!
```



Vòng lặp while có một hoặc nhiều vòng lặp while bên trong được gọi là vòng lặp while lồng nhau.



Cú pháp cho câu lệnh vòng lặp while lồng nhau trong ngôn ngữ lập trình Python như sau:

```python
while biểu_thức:
   while biểu_thức:
      câu_lệnh(s)
   câu_lệnh(s)
```

Một lưu ý cuối cùng về việc lồng nhau các vòng lặp là bạn có thể đặt bất kỳ loại vòng lặp nào bên trong bất kỳ loại vòng lặp nào khác. Ví dụ, một vòng lặp for có thể nằm trong một vòng lặp while hoặc ngược lại.



Chương trình sau sử dụng một vòng lặp while lồng nhau để tìm các số nguyên tố từ 2 đến 100:

```python
i = 2
while(i < 100):
   j = 2
   while(j <= (i/j)):
      if not(i%j): break
      j = j + 1
   if (j > i/j):
      print(i, " is prime")
   i = i + 1

print("Good bye!")
```

Khi mã trên được thực thi, nó tạo ra kết quả như sau:

```
2 is prime
3 is prime
5 is prime
7 is prime
11 is prime
13 is prime
17 is prime
19 is prime
23 is prime
29 is prime
31 is prime
37 is prime
41 is prime
43 is prime
47 is prime
53 is prime
59 is prime
61 is prime
67 is prime
71 is prime
73 is prime
79 is prime
83 is prime
89 is prime
97 is prime
Good bye!
```

Đó là một bài toán phổ biến khi học về vòng lặp lồng nhau trong Python. 

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 0. Hàm trong Python',
    'Bài 0. Hàm trong Python',
    0,
    'Trong Python, một hàm là một khối mã có tổ chức, có thể tái sử dụng được, được sử dụng để thực hiện một hành động duy nhất, liên quan. Các hàm cung cấp tính tách biệt tốt hơn cho ứng dụng của bạn và một mức độ cao của việc tái sử dụng mã.

Một phương pháp từ trên xuống để xây dựng logic xử lý liên quan đến việc định nghĩa các khối hàm tái sử dụng độc lập. Một hàm Python có thể được gọi từ bất kỳ hàm nào khác bằng cách chuyển dữ liệu cần thiết (gọi là tham số hoặc đối số). Hàm gọi trả về kết quả của nó lại cho môi trường gọi.




Python cung cấp các loại hàm sau:

1. Hàm được tích hợp sẵn.
2. Hàm được định nghĩa trong các mô-đun được tích hợp sẵn.
3. Hàm do người dùng tự định nghĩa.

Thư viện tiêu chuẩn của Python bao gồm một số hàm được tích hợp sẵn. Một số hàm được tích hợp sẵn trong Python là print(), int(), len(), sum(), v.v. Những hàm này luôn có sẵn, vì chúng được tải vào bộ nhớ máy tính ngay khi bạn bắt đầu trình thông dịch Python.

Thư viện tiêu chuẩn cũng đóng gói một số mô-đun. Mỗi mô-đun xác định một nhóm các hàm. Những hàm này không sẵn có ngay lập tức. Bạn cần phải nhập chúng vào bộ nhớ từ các mô-đun tương ứng của họ.

Ngoài các hàm được tích hợp sẵn và các hàm trong các mô-đun được tích hợp sẵn, bạn cũng có thể tạo ra các hàm của riêng bạn. Những hàm này được gọi là hàm do người dùng tự định nghĩa.



Bạn có thể định nghĩa các hàm tùy chỉnh để cung cấp chức năng cần thiết. Dưới đây là các quy tắc đơn giản để định nghĩa một hàm trong Python:

- Khối hàm bắt đầu với từ khóa def tiếp theo là tên hàm và dấu ngoặc đơn ().
- Bất kỳ tham số đầu vào hoặc đối số nào cũng phải được đặt trong các dấu ngoặc đơn này. Bạn cũng có thể định nghĩa các tham số bên trong các dấu ngoặc đơn này.
- Câu lệnh đầu tiên của một hàm có thể là một câu lệnh tùy chọn; chuỗi tài liệu của hàm hoặc docstring.
- Khối mã bên trong mỗi hàm bắt đầu bằng một dấu hai chấm (:) và được thụt lề.
- Câu lệnh return [biểu thức] kết thúc một hàm, tùy chọn truyền lại một biểu thức cho người gọi. Một câu lệnh return không có đối số tương đương với return None.



```python
def tên_hàm(tham_số):
   "chuỗi_tài_liệu_hàm"
   khối_mã_hàm
   return [biểu_thức]
```

Mặc định, các tham số có hành vi vị trí và bạn cần thông báo cho chúng theo cùng một thứ tự mà chúng đã được định nghĩa.

Sau khi hàm được định nghĩa, bạn có thể thực thi nó bằng cách gọi nó từ một hàm khác hoặc trực tiếp từ dấu nhắc Python.



Dưới đây là một ví dụ về cách định nghĩa một hàm greetings(). Dấu ngoặc đơn là trống nên không có tham số nào.

Dòng đầu tiên là chuỗi tài liệu. Khối hàm kết thúc bằng câu lệnh return. khi hàm này được gọi, thông báo Hello World sẽ được in ra.

```python
def greetings():
   "Đây là chuỗi tài liệu của hàm greetings"
   print("Hello World")
   return

greetings()
```



Định nghĩa một hàm chỉ đưa ra tên cho nó, xác định các tham số cần được bao gồm trong hàm và cấu trúc các khối mã.

Khi cấu trúc cơ bản của một hàm được hoàn thành, bạn có thể thực thi nó bằng cách gọi nó từ một hàm khác hoặc trực tiếp từ dấu nhắc Python.



m Python

Dưới đây là ví dụ về cách gọi hàm printme():

```python

def printme(str):
   "Hàm này in chuỗi đã được truyền vào"
   print(str)
   return;


printme("Đây là cuộc gọi đầu tiên đến hàm được xác định bởi người dùng!")
printme("Lần gọi thứ hai đến cùng một hàm")
```

Khi mã trên được thực thi, nó sẽ tạo ra đầu ra sau:

```
Đây là cuộc gọi đầu tiên đến hàm được xác định bởi người dùng!
Lần gọi thứ hai đến cùng một hàm
```

_Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!_',
    30,
    TRUE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 1. Python - Tham số Mặc định',
    'Bài 1. Python - Tham số Mặc định',
    1,
    'Trong Python, bạn có thể định nghĩa một hàm với giá trị mặc định được gán cho một hoặc nhiều đối số hình thức. Python sử dụng giá trị mặc định cho đối số đó nếu không có giá trị nào được truyền vào. Nếu có bất kỳ giá trị nào được truyền, giá trị mặc định sẽ bị ghi đè bằng giá trị thực tế được truyền vào.

Tham số mặc định trong Python là các đối số hàm sẽ được sử dụng nếu không có đối số nào được truyền vào cuộc gọi hàm.
Ví dụ về Tham số Mặc định
```python

def printinfo(name, age=35):
   "In ra thông tin đã được truyền vào hàm này"
   print("Name: ", name)
   print("Age ", age)
   return


printinfo(age=50, name="miki")
printinfo(name="miki")
```
Kết quả sẽ là:

```
Name: miki
Age 50
Name: miki
Age 35
```
Trong ví dụ trên, cuộc gọi thứ hai đến hàm không truyền giá trị cho đối số tuổi (age), do đó giá trị mặc định của nó là 35.

Hãy xem một ví dụ khác trong đó gán giá trị mặc định cho một đối số hàm. Hàm percent() được định nghĩa như sau:

```python
def percent(phy, maths, maxmarks=200):
   val = (phy+maths)*100/maxmarks
   return val
```
Giả sử điểm cho mỗi môn là trên 100, đối số maxmarks được thiết lập là 200. Do đó, chúng ta có thể bỏ qua giá trị của đối số thứ ba khi gọi hàm percent().

```python
phy = 60
maths = 70
result = percent(phy, maths)
```

Tuy nhiên, nếu số điểm tối đa cho mỗi môn không phải là 100, chúng ta cần đưa ra đối số thứ ba khi gọi hàm percent().

```python
phy = 40
maths = 46
result = percent(phy, maths, 100)
```



Dưới đây là ví dụ hoàn chỉnh:

```python
def percent(phy, maths, maxmarks=200):
   val = (phy+maths)*100/maxmarks
   return val

phy = 60
maths = 70
result = percent(phy, maths)
print("Phần trăm:", result)

phy = 40
maths = 46
result = percent(phy, maths, 100)
print("Phần trăm:", result)
```

Kết quả sẽ là:

```
Phần trăm: 65.0
Phần trăm: 86.0
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 2. Python - Tham số từ khóa',
    'Bài 2. Python - Tham số từ khóa',
    2,
    'Trong Python, bạn có thể truyền các đối số hàm dưới dạng từ khóa còn được gọi là đối số được đặt tên. Các biến trong định nghĩa hàm được sử dụng như từ khóa. Khi gọi hàm, bạn có thể rõ ràng đề cập đến tên và giá trị của nó.



```python

def printinfo(name, age):
   "In ra thông tin đã được truyền vào hàm này"
   print("Name: ", name)
   print("Age ", age)
   return



printinfo("Naveen", 29)


printinfo(name="miki", age=30)
```

Kết quả sẽ là:

```
Name: Naveen
Age 29
Name: miki
Age 30
```

Theo mặc định, hàm gán các giá trị cho các đối số theo thứ tự xuất hiện. Trong cuộc gọi hàm thứ hai, chúng ta đã gán giá trị cho một đối số cụ thể.



Thay vì truyền các giá trị với các đối số vị trí, hãy gọi hàm với các đối số từ khóa.



```python
division(num=10, den=5)
division(den=5, num=10)
```

Kết quả sẽ là:

```
num:10 den:5 quotient:2.0
num:10 den:5 quotient:2.0
```



Khi sử dụng các tham số từ khóa, không cần thiết phải tuân theo thứ tự của các đối số hình thức trong định nghĩa hàm.

Việc sử dụng các tham số từ khóa là tùy chọn. Bạn có thể sử dụng cách gọi kết hợp. Bạn có thể truyền giá trị cho một số đối số mà không cần từ khóa và cho những đối số khác với từ khóa.

Tuy nhiên, các đối số vị trí phải đứng trước các đối số từ khóa khi sử dụng cách gọi kết hợp.



```python
def division(num, den):
   quotient = num/den
   print("num:{} den:{} quotient:{}".format(num, den, quotient))

division(num=5, 10)
```

Vì đối số vị trí không thể xuất hiện sau các đối số từ khóa, Python sẽ tạo ra thông báo lỗi như sau:

```
    division(num=5, 10)
                      ^
SyntaxError: non-keyword arg after keyword arg
```
*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 3. Python - Tham số chỉ từ khóa',
    'Bài 3. Python - Tham số chỉ từ khóa',
    3,
    'Bạn có thể sử dụng các biến trong danh sách đối số hình thức như các từ khóa để truyền giá trị. Việc sử dụng các đối số từ khóa là tùy chọn. Nhưng, bạn có thể buộc hàm chỉ nhận các đối số dưới dạng từ khóa. Bạn nên đặt một dấu * trước danh sách các đối số chỉ từ khóa.

Giả sử chúng ta có một hàm với ba đối số, trong đó chúng ta muốn đối số thứ hai và thứ ba chỉ được chấp nhận dưới dạng từ khóa. Để làm điều đó, đặt * sau đối số đầu tiên.



Hàm print() được tích hợp sẵn là một ví dụ về các đối số chỉ từ khóa. Bạn có thể đưa ra danh sách các biểu thức cần in trong dấu ngoặc đơn. Các giá trị được in sẽ được phân tách bằng một khoảng trắng theo mặc định. Bạn cũng có thể chỉ định bất kỳ ký tự phân tách nào khác thay thế bằng đối số sep.

```python
print("Hello", "World", sep="-")
```

Nó sẽ in ra:

```
Hello-World
```



Đối số sep là đối số chỉ từ khóa. Hãy thử sử dụng nó như một đối số không phải từ khóa.

```python
print("Hello", "World", "-")
```

Bạn sẽ nhận được đầu ra khác - không như mong muốn.

```
Hello World -
```



Trong hàm người dùng đã xác định intr() với hai đối số, amt và rate. Để làm cho đối số rate chỉ dưới dạng từ khóa, đặt "*" trước nó.

```python
def intr(amt, *, rate):
   val = amt * rate / 100
   return val
```

Để gọi hàm này, giá trị cho rate phải được truyền theo từ khóa.

```python
interest = intr(1000, rate=10)
```

Tuy nhiên, nếu bạn cố gắng sử dụng cách gọi hàm mặc định theo vị trí, bạn sẽ nhận được một lỗi.

```python
interest = intr(1000, 10)

```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 4. Python - Đối số theo Vị trí',
    'Bài 4. Python - Đối số theo Vị trí',
    4,
    'Danh sách các biến được khai báo trong dấu ngoặc đơn tại thời điểm định nghĩa một hàm là các đối số hình thức. Một hàm có thể được định nghĩa với bất kỳ số lượng đối số hình thức nào.

Khi gọi một hàm:

- Tất cả các đối số là bắt buộc
- Số lượng đối số thực phải bằng số lượng đối số hình thức.
- Các đối số hình thức là vị trí. Chúng nhận các giá trị theo thứ tự được định nghĩa.
- Kiểu của các đối số phải khớp nhau.
- Tên của các đối số hình thức và thực tế không cần phải giống nhau.



```python
def add(x, y):
   z = x + y
   print("x={} y={} x+y={}".format(x, y, z))

a = 10
b = 20
add(a, b)
```

Kết quả sẽ là:

```
x=10 y=20 x+y=30
```

Ở đây, hàm add() có hai đối số hình thức, cả hai đều là số. Khi các số nguyên 10 và 20 được truyền vào. Biến a lấy giá trị 10 và b lấy giá trị 20, theo thứ tự được khai báo. Hàm add() hiển thị tổng.

Python cũng sẽ tạo ra lỗi khi số lượng đối số không khớp. Hãy chỉ đưa ra một đối số và kiểm tra kết quả.

```
add(b)
TypeError: add() missing 1 required positional argument: ''y''
```

Hãy truyền nhiều hơn số lượng đối số hình thức và kiểm tra kết quả −

```
add(10, 20, 30)
TypeError: add() takes 2 positional arguments but 3 were given
```

Kiểu dữ liệu của các đối số thực và hình thức tương ứng phải khớp nhau. Thay đổi a thành một giá trị chuỗi và kiểm tra kết quả.

```python
a = "Hello"
b = 20
add(a, b)
```

Nó sẽ tạo ra kết quả sau:

```
z = x + y
    ~^~
TypeError: can only concatenate str (not "int") to str
```
*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 5. Python - Đối số Tùy ý',
    'Bài 5. Python - Đối số Tùy ý',
    5,
    'Có thể bạn muốn định nghĩa một hàm có thể chấp nhận số lượng đối số tùy ý hoặc biến. Hơn nữa, số lượng đối số tùy ý có thể là đối số theo vị trí hoặc từ khóa.

Một đối số được tiền tố bằng một dấu sao (*) cho các đối số theo vị trí tùy ý.

Một đối số được tiền tố bằng hai dấu sao (**) cho các đối số từ khóa tùy ý.



Dưới đây là một ví dụ về đối số tùy ý hoặc biến chiều dài theo vị trí −

```python

def add(*args):
   s = 0
   for x in args:
      s += x
   return s

result = add(10, 20, 30, 40)
print(result)

result = add(1, 2, 3)
print(result)
```

Biến args được tiền tố bằng "*" lưu trữ tất cả các giá trị được truyền cho nó. Ở đây, args trở thành một tuple. Chúng ta có thể chạy một vòng lặp qua các mục của nó để cộng các số.

Kết quả sẽ là:

```
100
6
```



Cũng có thể có một hàm với một số đối số bắt buộc trước dãy số lượng biến giá trị.



```python

def avg(first, *rest):
   second = max(rest)
   return (first + second) / 2

result = avg(40, 30, 50, 25)
print(result)
```

Cuộc gọi sau đến hàm avg() truyền giá trị đầu tiên cho đối số bắt buộc đầu tiên, và các giá trị còn lại cho một tuple có tên là rest. Sau đó, chúng ta tìm giá trị tối đa và sử dụng nó để tính trung bình.

Kết quả sẽ là:

```
45.0
```



Nếu một biến trong danh sách đối số có hai dấu sao (*) được tiền tố cho nó, hàm có thể chấp nhận số lượng đối số từ khóa tùy ý. Biến trở thành một từ điển các cặp từ khóa: giá trị.



Dưới đây là một ví dụ về một hàm với các đối số từ khóa tùy ý. Hàm addr() có một đối số **kwargs có thể chấp nhận bất kỳ số lượng phần tử địa chỉ nào như tên, thành phố, số điện thoại, mã pin, v.v. Bên trong hàm, từ điển kwargs của các cặp khóa từ khóa: giá trị được duyệt qua sử dụng phương thức items().

```python
def addr(**kwargs):
   for k, v in kwargs.items():
      print("{}:{}".format(k, v))

print("pass two keyword args")
addr(Name="John", City="Mumbai")
print("pass four keyword args")


addr(Name="Raam", City="Mumbai", ph_no="9123134567", PIN="400001")
```

Kết quả sẽ là:

```
pass two keyword args
Name:John
City:Mumbai
pass four keyword args
Name:Raam
City:Mumbai
ph_no:9123134567
PIN:400001
```



Nếu hàm sử dụng các loại đối số kết hợp, các đối số từ khóa tùy ý phải đứng sau các đối số theo vị trí, theo từ khóa và các đối số theo vị trí tùy ý trong danh sách đối số.



Hãy tưởng tượng một trường hợp trong đó môn khoa học và toán học là bắt buộc, ngoài ra học sinh có thể chọn bất kỳ số lượng môn học tự chọn nào.

Dưới đây là định nghĩa của một hàm percent() trong đó điểm số trong khoa học và điểm số được lưu trữ trong các đối số tùy ý **optional.

```python
def percent(math, sci, **optional):
   print("maths:", math)
   print("sci:", sci)
   s = math + sci
   for k, v in optional.items():
      print("{}:{}".format(k, v))
      s += v
   return s / (len(optional) + 2)

result = percent(math=80, sci=75, Eng=70, Hist=65, Geo=72)
print("percentage:", result)
```

Kết quả sẽ là:

```
maths: 80
sci: 75
Eng:70
Hist:65
Geo:72
percentage: 72.4
```
*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 6. Python - Phạm vi Biến',
    'Bài 6. Python - Phạm vi Biến',
    6,
    'Một biến trong Python là tên biểu tượng cho đối tượng trong bộ nhớ máy tính. Python hoạt động dựa trên khái niệm về không gian tên để xác định ngữ cảnh cho các định danh khác nhau như các hàm, biến, v.v. Một không gian tên là một tập hợp các tên biểu tượng được xác định trong ngữ cảnh hiện tại.

Python cung cấp các loại không gian tên sau:

- **Không gian tên tích hợp** chứa các hàm tích hợp và các ngoại lệ tích hợp. Chúng được tải vào bộ nhớ ngay khi trình thông dịch Python được tải và tồn tại cho đến khi trình thông dịch đang chạy.
  
- **Không gian tên toàn cục** chứa bất kỳ tên nào được xác định trong chương trình chính. Những tên này tồn tại trong bộ nhớ cho đến khi chương trình đang chạy.
  
- **Không gian tên cục bộ** chứa các tên được xác định bên trong một hàm. Chúng có sẵn cho đến khi hàm đang chạy.

Các không gian tên này được lồng vào nhau. Đồ thị sau đây cho thấy mối quan hệ giữa các không gian tên:

```
Globals Namespace
   |
   |___ Local Namespace
          |
          |___ Inner Local Namespace
```



Tuổi thọ của một biến nhất định được hạn chế trong không gian tên mà nó được xác định. Do đó, không thể truy cập vào một biến có trong không gian tên bên trong từ bất kỳ không gian tên bên ngoài nào.



Thư viện chuẩn của Python bao gồm một hàm tích hợp là globals(). Nó trả về một từ điển các biểu tượng hiện có trong không gian tên toàn cục.

Chạy hàm globals() trực tiếp từ dấu nhắc Python.

```python
>>> globals()
{''__name__'': ''__main__'', ''__doc__'': None, ''__package__'': None, ''__loader__'': <class ''_frozen_importlib.BuiltinImporter''>, ''__spec__'': None, ''__annotations__'': {}, ''__builtins__'': <module ''builtins'' (built-in)>}
```

Có thể thấy rằng mô-đun builtins chứa các định nghĩa của tất cả các hàm tích hợp và ngoại lệ tích hợp được tải.

Lưu mã sau chứa một số biến và một hàm với một số biến nữa bên trong nó.

```python
name = ''8SyncDev''
marks = 50
result = True
def myfunction():
   a = 10
   b = 20
   return a + b

print(globals())
```

Gọi globals() từ bên trong tập lệnh này sẽ trả về đối tượng từ điển sau:

```python
{''__name__'': ''__main__'', ''__doc__'': None, ''__package__'': None, ''__loader__'': <_frozen_importlib_external.SourceFileLoader object at 0x00000169AE265250>, ''__spec__'': None, ''__annotations__'': {}, ''__builtins__'': <module ''builtins'' (built-in)>, ''__file__'': ''C:\\Users\\mlath\\examples\\main.py'', ''__cached__'': None, ''name'': ''8SyncDev'', ''marks'': 50, ''result'': True, ''myfunction'': <function myfunction at 0x00000169AE2104A0>}
```

Không gian tên toàn cục bây giờ chứa các biến trong chương trình và giá trị của chúng cũng như đối tượng hàm trong đó (và không phải là các biến trong hàm).

Bất kỳ biến nào được tạo bên ngoài một hàm có thể truy cập trong bất kỳ hàm nào và vì vậy chúng có phạm vi toàn cục. Dưới đây là một ví dụ để hiển thị việc sử dụng biến toàn cục trong Python:

```python
x = 5
y = 10

def sum():
   total = x + y
   return total

print(sum())
```

Điều này sẽ tạo ra kết quả sau:

```
15
```



Thư viện chuẩn của Python cũng bao gồm một hàm tích hợp là locals(). Nó trả về một từ điển các biểu tượng hiện có trong không gian tên cục bộ của hàm.

Sửa đổi mã trên để in ra từ điển của không gian tên toàn cục và cục bộ từ bên trong hàm.

```python
name = ''8SyncDev''
marks = 50
result = True

def myfunction():
   a = 10
   b = 20
   c = a + b
   print("globals():", globals())
   print("locals():", locals())
   return c

myfunction()
```

Kết quả sẽ cho thấy locals() trả về một từ điển các biến và giá trị của chúng hiện có trong hàm.

```
globals(): {''__name__'': ''__main__'', ''__doc__'': None, ''__package__'': None, ''__loader__'': <_frozen_importlib_external.SourceFileLoader object at 0x00000169AE265250>, ''__spec__'': None, ''__annotations__'': {}, ''__builtins__'': <module ''builtins'' (built-in)>, ''__file__'': ''C:\\Users\\mlath\\examples\\main.py'', ''__cached__'': None, ''

name'': ''8SyncDev'', ''marks'': 50, ''result'': True, ''myfunction'': <function myfunction at 0x00000169AE2104A0>}
locals(): {''a'': 10, ''b'': 20, ''c'': 30}
```

Vì cả hai hàm globals() và locals() đều trả về từ điển, bạn có thể truy cập vào giá trị của một biến từ không gian tên tương ứng với phương pháp get() của từ điển hoặc toán tử chỉ mục.

```python
print(globals()[''name'']) # hiển thị 8SyncDev
print(locals().get(''a'')) # hiển thị 10
```

Dưới đây là một ví dụ đơn giản để hiển thị việc sử dụng biến cục bộ trong Python:

```python
def sum(x, y):
   total = x + y
   return total

print(sum(5, 10))
```

```
15
```



Nếu một biến có cùng tên xuất hiện trong phạm vi toàn cục cũng như phạm vi cục bộ, trình thông dịch Python ưu tiên biến trong không gian tên cục bộ.

```python
marks = 50 # đây là biến toàn cục
def myfunction():
   marks = 70 # đây là biến cục bộ
   print(marks)
   
myfunction()
print(marks) # in giá trị toàn cục
```

Sẽ tạo ra kết quả sau:

```
70
50
```

Nếu bạn cố gắng thay đổi giá trị của một biến toàn cục từ bên trong một hàm, Python sẽ ném ra UnboundLocalError.

```python
marks = 50 # đây là biến toàn cục
def myfunction():
   marks = marks + 20
   print(marks)

myfunction()
print(marks) # in giá trị toàn cục
```

Sẽ tạo ra kết quả sau:

```
   marks = marks + 20
           ^^^^^
UnboundLocalError: cannot access local variable ''marks'' where it is not associated with a value
```

Để sửa đổi một biến toàn cục, bạn có thể cập nhật nó bằng cú pháp từ điển, hoặc sử dụng từ khóa global để tham chiếu đến nó trước khi sửa đổi.

```python
var1 = 50 # đây là biến toàn cục
var2 = 60 # đây là biến toàn cục
def myfunction():
   "Thay đổi giá trị của các biến toàn cục"
   globals()[''var1''] = globals()[''var1''] + 10
   global var2
   var2 = var2 + 20

myfunction()
print("var1:", var1, "var2:", var2) # hiển thị các biến toàn cục với giá trị đã thay đổi
```

Sẽ tạo ra kết quả sau:

```
var1: 60 var2: 80
```

Cuối cùng, nếu bạn cố gắng truy cập vào một biến cục bộ trong phạm vi toàn cục, Python sẽ ném ra NameError vì biến trong phạm vi cục bộ không thể truy cập ở bên ngoài phạm vi đó.

```python
var1 = 50 # đây là biến toàn cục
var2 = 60 # đây là biến toàn cục
def myfunction(x, y):
   total = x + y
   print("Total là biến cục bộ: ", total)

myfunction(var1, var2)
print(total) # Điều này sẽ tạo ra NameError
```

Sẽ tạo ra kết quả sau:

```
Total là biến cục bộ: 110
Traceback (most recent call last):
   File "C:\Users\user\examples\main.py", line 9, in <module>
   print(total) # Điều này sẽ tạo ra NameError
          ^^^^^
NameError: name ''total'' is not defined
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 7. Python - Chú thích Hàm',
    'Bài 7. Python - Chú thích Hàm',
    7,
    'Tính năng chú thích hàm của Python cho phép bạn thêm các siêu dữ liệu bổ sung về các đối số được khai báo trong định nghĩa hàm và cũng kiểu dữ liệu trả về.

Mặc dù bạn có thể sử dụng tính năng docstring của Python để tài liệu hóa một hàm, nhưng nó có thể trở nên lỗi thời nếu có các thay đổi trong nguyên mẫu của hàm. Do đó, tính năng chú thích đã được giới thiệu trong Python là kết quả của PEP 3107.

Các chú thích không được Python thông dịch viên xem xét khi thực thi hàm. Chúng chủ yếu dành cho các IDE Python để cung cấp tài liệu chi tiết cho người lập trình.

Chú thích là bất kỳ biểu thức Python hợp lệ nào được thêm vào các đối số hoặc kiểu dữ liệu trả về. Ví dụ đơn giản nhất của chú thích là quy định kiểu dữ liệu của các đối số. Chú thích được đề cập như là một biểu thức sau khi đặt dấu hai chấm trước đối số.

```python
def myfunction(a: int, b: int):
   c = a + b
   return c
```

Hãy nhớ rằng Python là một ngôn ngữ được gán động, và không thực hiện bất kỳ kiểm tra kiểu nào tại thời gian chạy. Do đó, việc chú thích các đối số với các kiểu dữ liệu không có bất kỳ hiệu ứng nào khi gọi hàm. Ngay cả khi có các đối số không phải là số nguyên được cung cấp, Python cũng không phát hiện ra lỗi nào.

```python
def myfunction(a: int, b: int):
   c = a + b
   return c

print(myfunction(10, 20))
print(myfunction("Hello ", "Python"))
```

Nó sẽ tạo ra đầu ra sau:

```
30
Hello Python
```



Chú thích được bỏ qua vào thời điểm chạy, nhưng hữu ích cho các IDE và các thư viện kiểm tra kiểu tĩnh như mypy.

Bạn cũng có thể đưa ra chú thích cho kiểu dữ liệu trả về. Sau dấu ngoặc đơn và trước dấu hai chấm, đặt một mũi tên (->) theo sau là chú thích. Ví dụ:

```python
def myfunction(a: int, b: int) -> int:
   c = a + b
   return c
```



Vì việc sử dụng kiểu dữ liệu làm chú thích bị bỏ qua vào thời điểm chạy, bạn có thể đặt bất kỳ biểu thức nào làm chú thích để làm siêu dữ liệu cho các đối số. Do đó, hàm có thể có bất kỳ biểu thức tùy ý nào làm chú thích như trong ví dụ sau:

```python
def total(x: ''marks in Physics'', y: ''marks in Chemistry''):
   return x + y
```



Nếu bạn muốn chỉ định một đối số mặc định cùng với chú thích, bạn cần đặt nó sau biểu thức chú thích. Đối số mặc định phải đặt sau các đối số bắt buộc trong danh sách đối số.

```python
def myfunction(a: "Physics", b: "Maths" = 20) -> int:
   c = a + b
   return c

print(myfunction(10))
```



Hàm trong Python cũng là một đối tượng, và một trong những thuộc tính của nó là __annotations__. Bạn có thể kiểm tra bằng hàm dir().

```python
print(dir(myfunction))
```

Điều này sẽ in ra danh sách đối tượng myfunction chứa __annotations__ như một trong những thuộc tính.

```python
[''__annotations__'', ''__call__'', ''__class__'', ''__closure__'', ''__code__'', ''__defaults__'', ''__delattr__'', ''__dict__'', ''__dir__'', ''__doc__'', ''__eq__'', ''__format__'', ''__ge__'', ''__get__'', ''__getattribute__'', ''__globals__'', ''__gt__'', ''__hash__'', ''__init__'', ''__init_subclass__'', ''__kwdefaults__'', ''__le__'', ''__lt__'', ''__module__'', ''__name__'', ''__ne__'', ''__new__'', ''__qualname__'', ''__reduce__'', ''__reduce_ex__'', ''__repr__'', ''__setattr__'', ''__sizeof__'', ''__str__'', ''__subclasshook__'']
```

Thuộc tính __annotations__ chính là một từ điển trong đó các đối số là các khóa và các chú thích là các giá trị của chúng.

```python
def myfunction(a: "Physics", b: "Maths" = 20) -> int:
   c = a + b
   return c

print(myfunction.__annotations__)
```

Nó sẽ tạo ra đầu ra sau:

```python
{''a'': ''Physics'', ''b'': ''Maths'', ''return'': <class ''int''>}
```

Bạn có thể có các đối số vị trí tùy ý và/hoặc các đối số từ khóa tùy ý cho một hàm. Chú thích cũng có thể được đưa ra cho chúng.

```python
def myfunction(*args: "arbitrary args", **kwargs: "arbitrary keyword args") -> int:
   pass

print(myfunction.__annotations__)
```

Nó sẽ tạo ra đầu ra sau:

```python
{''args'': ''arbitrary args'', ''kwargs'': ''arbitrary keyword args'', ''return'': <class ''int''>}
```

Trong trường hợp bạn cần cung cấp nhiều hơn một biểu thức chú thích cho một đối số hàm, đặt nó dưới dạng một đối tượng từ điển phía trước đối số đó.

```python
def division(num: dict(type=float, msg=''numerator''), den: dict(type=float, msg=''denominator'')) -> float:
   return num / den

print(division.__annotations__)
```

Nó sẽ tạo ra đầu ra sau:

```python
{''num'': {''type'': <class ''float''>, ''msg'': ''numerator''}, ''den'': {''type'': <class ''float''>, ''msg'': ''denominator''}, ''return'': <class ''float''>}
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 8. Python - Module (Module Python)',
    'Bài 8. Python - Module (Module Python)',
    8,
    'Trong Python, module là một tập tin chứa các định nghĩa của các hàm, lớp, biến, hằng số hoặc bất kỳ đối tượng Python nào khác. Nội dung của tập tin này có thể được sử dụng trong bất kỳ chương trình nào khác. Python cung cấp từ khóa `import` để thực hiện điều này.



```python
import math
print("Căn bậc hai của 100:", math.sqrt(100))
```

Kết quả:

```
Căn bậc hai của 100: 10.0
```



Thư viện chuẩn của Python đi kèm với một số lượng lớn các module, được gọi là các module sẵn có. Các module này cung cấp các chức năng hữu ích như quản lý hệ điều hành cụ thể, đọc ghi tệp, mạng lưới, v.v.

Dưới đây là một số module sẵn có quan trọng:

1. **os**: Cung cấp một giao diện thống nhất cho một số chức năng hệ điều hành.
2. **string**: Chứa một số hàm để xử lý chuỗi.
3. **re**: Cung cấp một tập hợp các tính năng biểu thức chính quy mạnh mẽ.
4. **math**: Thực hiện các phép toán số học cho các số dấu chấm động.
5. **cmath**: Chứa các phép toán số học cho các số phức.
6. **datetime**: Cung cấp các hàm để làm việc với ngày tháng và thời gian trong một ngày.
7. **gc**: Cung cấp một giao diện cho bộ thu gom rác tích hợp.
8. **asyncio**: Xác định các chức năng cần thiết cho xử lý bất đồng bộ.
9. **collections**: Cung cấp các loại dữ liệu Container tiên tiến.
10. **functools**: Có các chức năng bổ sung và các hoạt động trên các đối tượng có thể gọi. Hữu ích trong lập trình hàm.



Tạo một module không gì khác ngoài việc lưu một đoạn mã Python bằng bất kỳ trình soạn thảo nào. Hãy lưu đoạn mã sau dưới dạng `mymodule.py`:

```python
def SayHello(name):
   print ("Xin chào {}! Bạn có khỏe không?".format(name))
   return
```

Bạn có thể nhập `mymodule` trong phiên Python hiện tại:

```python
>>> import mymodule
>>> mymodule.SayHello("Harish")
Xin chào Harish! Bạn có khỏe không?
```

Bạn cũng có thể nhập một module trong một tập lệnh Python khác:

```python
import mymodule
mymodule.SayHello("Harish")
```

Chạy tập lệnh này từ dòng lệnh:

```
C:\Users\user\examples> python example.py
Xin chào Harish! Bạn có khỏe không?
```



Trong Python, câu lệnh `import` được cung cấp để tải một đối tượng Python từ một module. Đối tượng có thể là một hàm, lớp, một biến, v.v. Nếu một module chứa nhiều định nghĩa, tất cả đều sẽ được tải vào không gian tên hiện tại.

Hãy lưu đoạn mã sau có ba hàm trong `mymodule.py`:

```python
def sum(x,y):
   return x+y

def average(x,y):
   return (x+y)/2

def power(x,y):
   return x**y
```

Câu lệnh `import mymodule` tải tất cả các hàm trong module này vào không gian tên hiện tại. Mỗi hàm trong module được nhập là một thuộc tính của đối tượng module này.

```python
import mymodule
print ("Tổng:",mymodule.sum(10,20))
print ("Trung bình:",mymodule.average(10,20))
print

 ("Lũy thừa:",mymodule.power(10, 2))
```

Nó sẽ tạo ra đầu ra sau:

```
Tổng: 30
Trung bình: 15.0
Lũy thừa: 100
```



Câu lệnh `import` sẽ tải tất cả các tài nguyên của module vào không gian tên hiện tại. Bạn cũng có thể nhập các đối tượng cụ thể từ một module bằng cú pháp này.

Ví dụ, nếu có ba hàm trong `mymodule` và bạn chỉ muốn nhập hai trong số chúng vào `example.py`:

```python
from mymodule import sum, average
print ("Tổng:",sum(10,20))
print ("Trung bình:",average(10,20))
```

Nó sẽ tạo ra đầu ra sau:

```
Tổng: 30
Trung bình: 15.0
```

Lưu ý rằng hàm không cần phải được gọi bằng cách thêm tên của module vào trước.



Cũng có thể nhập tất cả các tên từ một module vào không gian tên hiện tại bằng cách sử dụng câu lệnh `from...import *`. Tuy nhiên, cụm từ này nên được sử dụng cẩn thận.



Bạn có thể gán một tên alias cho module được nhập.

```python
import mymodule as x
print ("Tổng:",x.sum(10,20))
print ("Trung bình:", x.average(10,20))
print ("Lũy thừa:", x.power(10, 2))
```



Trong Python, một module là một đối tượng của lớp module, và do đó nó được đặc trưng bởi các thuộc tính.

Dưới đây là các thuộc tính của module:

- `__file__`: Trả về tên vật lý của module.
- `__package__`: Trả về gói mà module thuộc về.
- `__doc__`: Trả về chuỗi tài liệu ở đầu module nếu có.
- `__dict__`: Trả về phạm vi toàn bộ của module.
- `__name__`: Trả về tên của module.



Giả sử đoạn mã sau được lưu dưới dạng `mymodule.py`:

```python
"""Chuỗi tài liệu của mymodule"""
def sum(x,y):
   return x+y

def average(x,y):
   return (x+y)/2
```

Hãy kiểm tra các thuộc tính của `mymodule` bằng cách nhập nó vào đoạn mã sau:

```python
import mymodule

print ("Thuộc tính __file__:", mymodule.__file__)
print ("Thuộc tính __doc__:", mymodule.__doc__)
print ("Thuộc tính __name__:", mymodule.__name__)
```

Nó sẽ tạo ra đầu ra sau:

```
Thuộc tính __file__: C:\Users\mlath\examples\mymodule.py
Thuộc tính __doc__: Chuỗi tài liệu của mymodule
Thuộc tính __name__: mymodule
```



Thuộc tính `__name__` của một module Python có ý nghĩa quan trọng. Hãy khám phá nó chi tiết hơn.

Trong một shell tương tác, thuộc tính `__name__` trả về `''__main__''`:

```python
>>> __name__
''__main__''
```

Nếu bạn nhập bất kỳ module nào trong phiên dịch viên, nó sẽ trả về tên của module là thuộc tính `__name__` của module đó.

```python
>>> import math
>>> math.__name__
''math''
```

Từ bên trong một script Python, thuộc tính `__name__` trả về `''__main__''`:

```python

print ("Thuộc tính __name__ bên trong một script:", __name__)
```

Chạy điều này trong dòng lệnh:

```
Thuộc tính __name__ bên trong một script: __main__
```

Thuộc tính này cho phép một script Python được sử dụng như là một chương trình thực thi hoặc như một module. Không giống như C++, Java, C# vv, trong Python, không có khái niệm về hàm `main()`. Đoạn mã Python với phần mở rộng `.py` có thể chứa cả định nghĩa hàm cũng như các câu lệnh có thể thực thi.

Lưu `mymodule.py` và với đoạn mã sau:

```python
"""Chuỗi tài liệu của mymodule"""
def sum(x,y):
   return x+y
   
print ("Tổng:",sum(10,20))
```

Bạn có thể thấy rằng hàm `sum()` được gọi bên trong cùng một script mà nó được định nghĩa.

```
C:\Users\user\examples> python mymodule.py
Tổng: 30
```

Bây giờ hãy nhập hàm này vào một script khác `example.py`.

```python
import mymodule
print ("Tổng:",mymodule.sum(10,20))
```

Nó sẽ tạo ra đầu ra sau:

```
C:\Users\user\examples> python example.py
Tổng: 30
```

Đầu ra "Tổng:30" xuất hiện hai lần. Một lần khi module `mymodule` được nhập. Các câu lệnh thực thi trong module nhập cũng được chạy. Đầu ra thứ hai là từ script gọ

i, tức là chương trình `example.py`.

Điều chúng ta muốn xảy ra là khi một module được nhập, chỉ các hàm nên được nhập, các câu lệnh thực thi của nó không được chạy. Điều này có thể được thực hiện bằng cách kiểm tra giá trị của `__name__`. Nếu nó là `__main__`, có nghĩa là nó đang chạy và không phải là import. Bao gồm các câu lệnh thực thi như cuộc gọi hàm một cách điều kiện.

Thêm câu lệnh if vào `mymodule.py` như dưới đây:

```python
"""Chuỗi tài liệu của mymodule"""
def sum(x,y):
   return x+y

if __name__ == "__main__":
   print ("Tổng:",sum(10,20))
```

Bây giờ nếu bạn chạy chương trình `example.py`, bạn sẽ thấy rằng đầu ra "Tổng:30" chỉ xuất hiện một lần.

```
C:\Users\user\examples> python example.py
Tổng: 30
```



Đôi khi bạn có thể cần tải lại một module, đặc biệt là khi làm việc với phiên dịch viên tương tác của Python.

Giả sử chúng ta có một module test (test.py) với hàm sau:

```python
def SayHello(name):
   print ("Xin chào {}! Bạn có khỏe không?".format(name))
   return
```

Chúng ta có thể nhập module và gọi hàm của nó từ dòng lệnh Python như sau:

```python
>>> import test
>>> test.SayHello("Deepak")
Xin chào Deepak! Bạn có khỏe không?
```

Tuy nhiên, giả sử bạn cần sửa đổi hàm SayHello() như sau:

```python
def SayHello(name, course):
   print ("Xin chào {}! Bạn có khỏe không?".format(name))
   print ("Chào mừng bạn đến với {} Tutorial by 8SyncDev".format(course))
   return
```

Ngay cả khi bạn chỉnh sửa tệp test.py và lưu nó, hàm được tải vào bộ nhớ sẽ không cập nhật. Bạn cần phải tải lại nó, sử dụng hàm `reload()` trong module `imp`.

```python
>>> import imp
>>> imp.reload(test)
>>> test.SayHello("Deepak", "Python")
Xin chào Deepak! Bạn có khỏe không?
Chào mừng bạn đến với Python Tutorial by 8SyncDev
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 3: Hàm trong Python' LIMIT 1),
    'Bài 9. Hàm Built-in Python',
    'Bài 9. Hàm Built-in Python',
    9,
    'Trong phiên bản Python 3.12.2, có tổng cộng 71 hàm Built-in. Dưới đây là danh sách các hàm Built-in cùng với mô tả:



1. `abs()`: Trả về giá trị tuyệt đối của một số.
2. `all()`: Trả về True khi tất cả các phần tử trong iterable là True.
3. `any()`: Kiểm tra xem có bất kỳ phần tử nào trong iterable nào đó là True không.
4. `bin()`: Chuyển đổi số nguyên thành chuỗi nhị phân.
5. `bool()`: Chuyển đổi một giá trị thành Boolean.
6. `bytes()`: Trả về đối tượng bytes không thay đổi.
7. `callable()`: Kiểm tra xem đối tượng có thể gọi được không.
8. `chr()`: Trả về ký tự từ một số nguyên.
9. `classmethod()`: Trả về phương thức lớp cho hàm đã cho.
10. `compile()`: Trả về một đối tượng mã.
11. `complex()`: Tạo một số phức.
12. `delattr()`: Xóa thuộc tính khỏi đối tượng.
13. `dict()`: Tạo một từ điển.
14. `dir()`: Cố gắng trả về các thuộc tính của đối tượng.
15. `divmod()`: Trả về một bộ chia lấy dư.
16. `enumerate()`: Trả về một đối tượng liệt kê.
17. `eval()`: Chạy mã trong chương trình.
18. `exec()`: Thực thi chương trình được tạo ra động.
19. `filter()`: Xây dựng bộ lặp từ các phần tử đúng.
20. `float()`: Trả về số dấu phẩy động từ số hoặc chuỗi.
21. `format()`: Trả về biểu diễn đã định dạng của một giá trị.
22. `frozenset()`: Trả về đối tượng frozenset không thay đổi.
23. `getattr()`: Trả về giá trị của thuộc tính được đặt tên của một đối tượng.
24. `globals()`: Trả về từ điển của bảng ký hiệu toàn cục hiện tại.
25. `hasattr()`: Trả về xem đối tượng có thuộc tính được đặt tên hay không.
26. `hash()`: Trả về giá trị hash của một đối tượng.
27. `help()`: Kích hoạt Hệ thống Trợ giúp tích hợp.
28. `hex()`: Chuyển đổi số nguyên thành chuỗi thập lục phân.
29. `id()`: Trả về định danh của một đối tượng.
30. `input()`: Đọc và trả về một dòng chuỗi.
31. `int()`: Trả về số nguyên từ một số hoặc chuỗi.
32. `isinstance()`: Kiểm tra xem một đối tượng có phải là một thể hiện của lớp không.
33. `issubclass()`: Kiểm tra xem một lớp có phải là một lớp con của một lớp khác không.
34. `iter()`: Trả về một bộ lặp.
35. `len()`: Trả về độ dài của một đối tượng.
36. `list()`: Tạo một danh sách trong Python.
37. `locals()`: Trả về từ điển của bảng ký hiệu cục bộ hiện tại.
38. `map()`: Áp dụng hàm và trả về một danh sách.
39. `max()`: Trả về phần tử lớn nhất.
40. `memoryview()`: Trả về chế độ xem bộ nhớ của một đối số.
41. `min()`: Trả về giá trị nhỏ nhất.
42. `next()`: Lấy phần tử tiếp theo từ bộ lặp.
43. `object()`: Tạo một đối tượng không đặc điểm.
44. `oct()`: Trả về biểu diễn bát phân của một số nguyên.
45. `open()`: Trả về một đối tượng tệp.
46. `ord()`: Trả về một số nguyên của ký tự Unicode.
47. `pow()`: Trả về lũy thừa của một số.
48. `print()`: In đối tượng đã cho.
49. `property()`: Trả về thuộc tính tài sản.
50. `range()`: Trả về một chuỗi số nguyên.
51. `repr()`: Trả về một biểu diễn in được của đối tượng.
52. `reversed()`: Trả về bộ lặp đảo ngược của một chuỗi.
53. `round()`: Làm tròn một số đến số chữ số thập phân đã chỉ định.
54. `set()`: Xây dựng và trả về một tập hợp.
55. `setattr()`: Đặt giá trị của một thuộc tính của một đối tượng.
56. `slice()`: Trả về một đối tượng lát cắt.
57. `sorted()`: Trả về một danh sách được s

ắp xếp từ iterable đã cho.
58. `staticmethod()`: Biến đổi một phương thức thành một phương thức tĩnh.
59. `str()`: Trả về phiên bản chuỗi của đối tượng.
60. `sum()`: Cộng các mục của một iterable.
61. `super()`: Trả về một đối tượng proxy của lớp cơ sở.
62. `tuple()`: Trả về một tuple.
63. `type()`: Trả về loại của đối tượng.
64. `vars()`: Trả về thuộc tính `__dict__`.
65. `zip()`: Trả về một bộ lặp các tuple.
66. `__import__()`: Hàm được gọi bởi câu lệnh import.



Các hàm toán học sau được tích hợp vào trình thông dịch Python, do đó bạn không cần phải nhập chúng từ bất kỳ module nào.

1. `abs()`: Trả về giá trị tuyệt đối của x.
2. `max()`: Trả về phần tử lớn nhất.
3. `min()`: Trả về phần tử nhỏ nhất.
4. `pow()`: Trả về x mũ y, tương đương với x**y, với đối số thứ ba là mod tùy chọn. Nếu được cung cấp, nó trả về giá trị (x**y) % mod.
5. `round()`: Làm tròn x đến n chữ số sau dấu thập phân.
6. `sum()`: Trả về tổng của tất cả các mục số trong bất kỳ iterable nào (list hoặc tuple). Đối số khởi đầu tùy chọn mặc định là 0. Nếu được cung cấp, các số trong danh sách được cộng vào giá trị khởi đầu.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 0. Python - Danh Sách (Lists)',
    'Bài 0. Python - Danh Sách (Lists)',
    0,
    'Danh sách là một trong những kiểu dữ liệu được tích hợp sẵn trong Python. Một danh sách Python là một chuỗi các mục được phân tách bằng dấu phẩy, được bao bọc bởi dấu ngoặc vuông [ ]. Các mục trong một danh sách Python không cần phải cùng loại dữ liệu.

Dưới đây là một số ví dụ về danh sách Python:

```python
list1 = ["Rohan", "Physics", 21, 69.75]
list2 = [1, 2, 3, 4, 5]
list3 = ["a", "b", "c", "d"]
list4 = [25.50, True, -55, 1+2j]
```

Trong Python, một danh sách là một kiểu dữ liệu chuỗi. Nó là một bộ sưu tập được sắp xếp các mục. Mỗi mục trong một danh sách có một chỉ mục vị trí duy nhất, bắt đầu từ 0.

Một danh sách trong Python tương tự như một mảng trong C, C++ hoặc Java. Tuy nhiên, sự khác biệt chính là trong C/C++/Java, các phần tử của mảng phải cùng kiểu dữ liệu. Trong khi đó, các danh sách Python có thể chứa các đối tượng của các loại dữ liệu khác nhau.

Một danh sách Python là có thể thay đổi được. Bất kỳ mục nào từ danh sách cũng có thể được truy cập bằng chỉ mục của nó và có thể được sửa đổi. Một hoặc nhiều đối tượng từ danh sách có thể được loại bỏ hoặc thêm vào. Một danh sách có thể có cùng một mục tại nhiều vị trí chỉ mục.



Trong Python, Danh sách là một chuỗi. Do đó, chúng ta có thể nối hai danh sách với toán tử "+" và nối nhiều bản sao của một danh sách với toán tử "*". Các toán tử thành viên "in" và "not in" hoạt động với đối tượng danh sách.

| Biểu thức Python      | Kết quả                      | Mô tả       |
| --------------------- | ---------------------------- | ----------- |
| [1, 2, 3] + [4, 5, 6] | [1, 2, 3, 4, 5, 6]           | Nối         |
| [''Hi!''] * 4           | [''Hi!'', ''Hi!'', ''Hi!'', ''Hi!''] | Lặp lại     |
| 3 in [1, 2, 3]        | True                         | Sự thuộc về |

Các phép toán này giúp thao tác và xử lý danh sách một cách linh hoạt trong Python.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    TRUE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 1. Python - Truy Cập Các Phần Tử trong Danh Sách',
    'Bài 1. Python - Truy Cập Các Phần Tử trong Danh Sách',
    1,
    'Trong Python, một danh sách là một chuỗi. Mỗi đối tượng trong danh sách có thể truy cập bằng chỉ mục của nó. Chỉ mục bắt đầu từ 0. Chỉ mục cuối cùng trong danh sách là "length-1". Để truy cập các giá trị trong một danh sách, sử dụng dấu ngoặc vuông để cắt cùng với chỉ mục hoặc các chỉ mục để nhận giá trị có sẵn tại chỉ mục đó.



Toán tử cắt lấy một hoặc nhiều phần tử từ danh sách. Đặt chỉ mục vào dấu ngoặc vuông để lấy mục tại vị trí của nó.

```python
obj = list1[i]
```



Xem ví dụ sau:

```python
list1 = ["Rohan", "Physics", 21, 69.75]
list2 = [1, 2, 3, 4, 5]

print ("Phần tử ở chỉ mục 0 trong list1: ", list1[0])
print ("Phần tử ở chỉ mục 2 trong list2: ", list2[2])
```

Kết quả sẽ là:

```
Phần tử ở chỉ mục 0 trong list1: Rohan
Phần tử ở chỉ mục 2 trong list2: 3
```



Python cho phép sử dụng chỉ mục âm với bất kỳ kiểu chuỗi nào. Chỉ mục "-1" tham chiếu đến phần tử cuối cùng trong danh sách.



Hãy xem ví dụ khác:

```python
list1 = ["a", "b", "c", "d"]
list2 = [25.50, True, -55, 1+2j]

print ("Phần tử ở chỉ mục 0 trong list1: ", list1[-1])
print ("Phần tử ở chỉ mục 2 trong list2: ", list2[-3])
```

Kết quả sẽ là:

```
Phần tử ở chỉ mục 0 trong list1: d
Phần tử ở chỉ mục 2 trong list2: True
```



Toán tử cắt trích xuất một danh sách con từ danh sách ban đầu.

```
Sublist = list1[i:j]
```



- i: chỉ mục của phần tử đầu tiên trong danh sách con.
- j: chỉ mục của phần tử tiếp theo sau phần tử cuối cùng trong danh sách con.

Điều này sẽ trả về một phần từ i đến (j-1) trong danh sách.



Khi cắt, cả hai toán hạng "i" và "j" đều là tùy chọn. Nếu không sử dụng, "i" là 0 và "j" là phần tử cuối cùng trong danh sách. Chỉ mục âm có thể được sử dụng trong cắt. Hãy xem ví dụ sau:

```python
list1 = ["a", "b", "c", "d"]
list2 = [25.50, True, -55, 1+2j]

print ("Các phần tử từ chỉ mục 1 đến 2 trong list1: ", list1[1:3])
print ("Các phần tử từ chỉ mục 0 đến 1 trong list2: ", list2[0:2])
```

Kết quả sẽ là:

```
Các phần tử từ chỉ mục 1 đến 2 trong list1: [''b'', ''c'']
Các phần tử từ chỉ mục 0 đến 1 trong list2: [25.5, True]
```



```python
list1 = ["a", "b", "c", "d"]
list2 = [25.50, True, -55, 1+2j]
list4 = ["Rohan", "Physics", 21, 69.75]
list3 = [1, 2, 3, 4, 5]

print ("Các phần tử từ chỉ mục 1 đến cuối trong list1: ", list1[1:])
print ("Các phần tử từ chỉ mục 0 đến 1 trong list2: ", list2[:2])
print ("Các phần tử từ chỉ mục 2 đến cuối trong list3", list3[2:-1])
print ("Các phần tử từ chỉ mục 0 đến chỉ mục cuối cùng trong list4", list4[:])
```

Kết quả sẽ là:

```
Các phần tử từ chỉ mục 1 đến cuối trong list1: [''b'', ''c'', ''d'']
Các phần tử từ chỉ mục 0 đến 1 trong list2: [25.5, True]
Các phần tử từ chỉ mục 2 đến cuối trong list3 [3, 4]
Các phần tử từ chỉ mục 0 đến chỉ mục cuối cùng trong list4 [''Rohan'', ''Physics'', 21, 69.75]
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 2. Python - Thay Đổi Các Phần Tử trong Danh Sách',
    'Bài 2. Python - Thay Đổi Các Phần Tử trong Danh Sách',
    2,
    'Danh sách là một loại dữ liệu có thể thay đổi được (mutable) trong Python. Điều này có nghĩa là, nội dung của danh sách có thể được thay đổi tại chỗ, sau khi đối tượng được lưu trong bộ nhớ. Bạn có thể gán một giá trị mới tại một chỉ mục nhất định trong danh sách.



```python
list1[i] = giá_trị_mới
```



Trong đoạn mã sau, chúng ta thay đổi giá trị tại chỉ mục 2 của danh sách đã cho.

```python
list3 = [1, 2, 3, 4, 5]
print ("Danh sách gốc ", list3)
list3[2] = 10
print ("Danh sách sau khi thay đổi giá trị tại chỉ mục 2: ", list3)
```

Kết quả sẽ là:

```
Danh sách gốc [1, 2, 3, 4, 5]
Danh sách sau khi thay đổi giá trị tại chỉ mục 2: [1, 2, 10, 4, 5]
```



Bạn có thể thay thế nhiều phần tử liên tiếp trong một danh sách bằng một danh sách con khác.



Trong đoạn mã sau, các phần tử tại chỉ mục 1 và 2 được thay thế bằng các phần tử trong một danh sách con khác.

```python
list1 = ["a", "b", "c", "d"]

print ("Danh sách gốc: ", list1)

list2 = [''Y'', ''Z'']
list1[1:3] = list2

print ("Danh sách sau khi thay đổi bằng danh sách con: ", list1)
```

Kết quả sẽ là:

```
Danh sách gốc: [''a'', ''b'', ''c'', ''d'']
Danh sách sau khi thay đổi bằng danh sách con: [''a'', ''Y'', ''Z'', ''d'']
```



Nếu danh sách con nguồn có nhiều hơn các phần tử trong phần cắt cần thay thế, các phần tử thêm vào trong nguồn sẽ được chèn vào. Xem đoạn mã dưới đây −



```python
list1 = ["a", "b", "c", "d"]
print ("Danh sách gốc: ", list1)
list2 = [''X'',''Y'', ''Z'']
list1[1:3] = list2
print ("Danh sách sau khi thay đổi bằng danh sách con: ", list1)
```

Kết quả sẽ là:

```
Danh sách gốc: [''a'', ''b'', ''c'', ''d'']
Danh sách sau khi thay đổi bằng danh sách con: [''a'', ''X'', ''Y'', ''Z'', ''d'']
```



Nếu danh sách con mà một phần của danh sách gốc sẽ được thay thế, có ít hơn các phần tử, các phần tử phù hợp sẽ được thay thế và phần còn lại của danh sách gốc sẽ bị loại bỏ.

Trong đoạn mã sau, chúng ta cố gắng thay thế "b" và "c" bằng "Z" (ít hơn một phần tử so với các phần tử cần thay thế). Điều này dẫn đến Z thay thế b và c bị loại bỏ.

```python
list1 = ["a", "b", "c", "d"]
print ("Danh sách gốc: ", list1)
list2 = [''Z'']
list1[1:3] = list2
print ("Danh sách sau khi thay đổi bằng danh sách con: ", list1)
```

Kết quả sẽ là:

```
Danh sách gốc: [''a'', ''b'', ''c'', ''d'']
Danh sách sau khi thay đổi bằng danh sách con: [''a'', ''Z'', ''d'']
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 3. Python - Thêm Phần Tử vào Danh Sách',
    'Bài 3. Python - Thêm Phần Tử vào Danh Sách',
    3,
    'Trong Python, có hai phương thức cơ bản để thêm phần tử vào danh sách hiện có: `append()` và `insert()`.



Phương thức `append()` được sử dụng để thêm một phần tử vào cuối của danh sách.



```python
list1 = ["a", "b", "c", "d"]
print("Danh sách gốc: ", list1)
list1.append(''e'')
print("Danh sách sau khi thêm: ", list1)
```



```
Danh sách gốc: [''a'', ''b'', ''c'', ''d'']
Danh sách sau khi thêm: [''a'', ''b'', ''c'', ''d'', ''e'']
```



Phương thức `insert()` chèn một phần tử vào danh sách tại một vị trí cụ thể được chỉ định.



```python
list1 = ["a", "b", "c", "d"]
print("Danh sách gốc: ", list1)
list1.insert(2, ''e'')
print("Danh sách sau khi chèn: ", list1)
```



```
Danh sách gốc: [''a'', ''b'', ''c'', ''d'']
Danh sách sau khi chèn: [''a'', ''b'', ''e'', ''c'', ''d'']
```

Trong ví dụ này, chúng ta chèn phần tử ''e'' vào danh sách `list1` tại vị trí có chỉ số là 2, và phần tử ''c'' được dịch sang phải.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 4. Python - Xóa Phần Tử trong Danh Sách',
    'Bài 4. Python - Xóa Phần Tử trong Danh Sách',
    4,
    'Trong Python, các phương thức của lớp list như remove() và pop() đều có thể xóa một phần tử từ danh sách. Sự khác biệt giữa chúng là remove() loại bỏ đối tượng được chỉ định, trong khi pop() loại bỏ một phần tử tại chỉ số đã cho.



Phương thức remove() loại bỏ phần tử được chỉ định khỏi danh sách.



```python
list1 = ["Rohan", "Physics", 21, 69.75]
print("Danh sách gốc: ", list1)

list1.remove("Physics")
print("Danh sách sau khi xóa: ", list1)
```



```
Danh sách gốc: [''Rohan'', ''Physics'', 21, 69.75]
Danh sách sau khi xóa: [''Rohan'', 21, 69.75]
```



Phương thức pop() loại bỏ phần tử được chỉ định khỏi danh sách dựa trên chỉ số đã cho.



```python
list2 = [25.50, True, -55, 1+2j]
print("Danh sách gốc: ", list2)
list2.pop(2)
print("Danh sách sau khi loại bỏ: ", list2)
```



```
Danh sách gốc: [25.5, True, -55, (1+2j)]
Danh sách sau khi loại bỏ: [25.5, True, (1+2j)]
```



Python có từ khóa "del" loại bỏ bất kỳ đối tượng Python nào khỏi bộ nhớ.



Chúng ta có thể sử dụng "del" để xóa một phần tử từ danh sách. Hãy xem ví dụ sau:

```python
list1 = ["a", "b", "c", "d"]
print("Danh sách gốc: ", list1)
del list1[2]
print("Danh sách sau khi xóa: ", list1)
```



```
Danh sách gốc: [''a'', ''b'', ''c'', ''d'']
Danh sách sau khi xóa: [''a'', ''b'', ''d'']
```



Bạn có thể xóa một loạt các phần tử liên tiếp từ một danh sách bằng toán tử slice. Hãy xem ví dụ sau:



```python
list2 = [25.50, True, -55, 1+2j]
print("Danh sách trước khi xóa: ", list2)
del list2[0:2]
print("Danh sách sau khi xóa: ", list2)
```



```
Danh sách trước khi xóa: [25.5, True, -55, (1+2j)]
Danh sách sau khi xóa: [-55, (1+2j)]
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 5. Python - Lặp Qua Danh Sách',
    'Bài 5. Python - Lặp Qua Danh Sách',
    5,
    'Bạn có thể duyệt qua các phần tử trong một danh sách bằng cấu trúc vòng lặp for của Python. Việc duyệt qua có thể được thực hiện, sử dụng danh sách như một bộ lặp hoặc với sự giúp đỡ của chỉ số.



Danh sách Python cung cấp một đối tượng bộ lặp. Để lặp qua một danh sách, sử dụng câu lệnh for như sau:

```python
for obj in list:
   . . .
   . . .
```



Hãy xem ví dụ sau −

```python
lst = [25, 12, 10, -21, 10, 100]
for num in lst:
   print(num, end='' '')
```



```
25 12 10 -21 10 100
```



Để lặp qua các phần tử trong một danh sách, hãy lấy đối tượng phạm vi các số nguyên từ "0" đến "len-1". Xem ví dụ sau:



```python
lst = [25, 12, 10, -21, 10, 100]
indices = range(len(lst))
for i in indices:
   print("lst[{}]: ".format(i), lst[i])
```



```
lst[0]: 25
lst[1]: 12
lst[2]: 10
lst[3]: -21
lst[4]: 10
lst[5]: 100
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 6. Python - List Comprehension',
    'Bài 6. Python - List Comprehension',
    6,
    'List comprehension là một công cụ lập trình rất mạnh mẽ. Nó tương tự như cách xây dựng tập hợp trong toán học. Đây là cách ngắn gọn để tạo ra một danh sách mới bằng cách thực hiện một loại quy trình nào đó trên từng mục trong danh sách hiện tại. List comprehension nhanh hơn đáng kể so với việc xử lý một danh sách bằng vòng lặp for.



Giả sử chúng ta muốn tách mỗi chữ cái trong một chuỗi và đưa tất cả các chữ cái không phải là nguyên âm vào một đối tượng danh sách. Chúng ta có thể làm điều này bằng một vòng lặp for như sau:

```python
chars=[]
for ch in ''8SyncDev'':
   if ch not in ''aeiou'':
      chars.append(ch)
print(chars)
```

Đối tượng danh sách chars sẽ được hiển thị như sau:

```
[''8'', ''S'', ''y'', ''n'', ''c'', ''D'', ''e'', ''v'']
```



Chúng ta có thể dễ dàng có được kết quả tương tự bằng một kỹ thuật list comprehension. Một cách sử dụng chung của list comprehension là như sau:

```
listObj = [x for x in iterable]
```

Áp dụng điều này, đối tượng danh sách chars có thể được xây dựng bằng câu lệnh sau:

```python
chars = [char for char in ''8SyncDev'' if char not in ''kkkk'']
print(chars)
```

Danh sách chars sẽ được hiển thị như trước:

```
[''8'', ''S'', ''y'', ''n'', ''c'', ''D'', ''e'', ''v'']
```



Ví dụ sau sử dụng list comprehension để xây dựng một danh sách các bình phương của các số từ 1 đến 10

```python
squares = [x*x for x in range(1,11)]
print(squares)
```

Đối tượng danh sách squares là:

```
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```



Trong ví dụ sau, tất cả các kết hợp của các mục từ hai danh sách dưới dạng một tuple được thêm vào danh sách thứ ba.

```python
list1=[1,2,3]
list2=[4,5,6]
CombLst=[(x,y) for x in list1 for y in list2]
print(CombLst)
```

Nó sẽ tạo ra đầu ra sau:

```
[(1, 4), (1, 5), (1, 6), (2, 4), (2, 5), (2, 6), (3, 4), (3, 5), (3, 6)]
```



Câu lệnh sau sẽ tạo ra một danh sách các số chẵn từ 1 đến 20.

```python
list1=[x for x in range(1,21) if x%2==0]
print(list1)
```

Nó sẽ tạo ra đầu ra sau:

```
[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 7. Python - Sắp xếp Danh sách',
    'Bài 7. Python - Sắp xếp Danh sách',
    7,
    'Phương thức sort() của lớp list sắp xếp lại các mục theo thứ tự tăng dần hoặc giảm dần bằng cách sử dụng cơ chế sắp xếp theo thứ tự từ điển. Việc sắp xếp được thực hiện trên chính chúng trong cùng một đối tượng danh sách và nó không trả về một đối tượng mới.



```python
list1.sort(key, reverse)
```



- **Key**: Hàm được áp dụng cho từng mục trong danh sách. Giá trị trả về được sử dụng để thực hiện sắp xếp. Tùy chọn.
  
- **Reverse**: Giá trị boolean. Nếu được đặt thành True, sắp xếp sẽ được thực hiện theo thứ tự giảm dần. Tùy chọn.



Phương thức này trả về None.



Phương thức sort() sắp xếp các mục của danh sách theo thứ tự chữ cái.



```python
list1 = [''physics'', ''Biology'', ''chemistry'', ''maths'']
print("Danh sách trước khi sắp xếp:", list1)
list1.sort()
print("Danh sách sau khi sắp xếp:", list1)

print("Sắp xếp giảm dần")

list2 = [10, 16, 9, 24, 5]
print("Danh sách trước khi sắp xếp:", list2)
list2.sort()
print("Danh sách sau khi sắp xếp:", list2)
```

Đầu ra sẽ là:

```
Danh sách trước khi sắp xếp: [''physics'', ''Biology'', ''chemistry'', ''maths'']
Danh sách sau khi sắp xếp: [''Biology'', ''chemistry'', ''maths'', ''physics'']
Sắp xếp giảm dần
Danh sách trước khi sắp xếp: [10, 16, 9, 24, 5]
Danh sách sau khi sắp xếp: [5, 9, 10, 16, 24]
```



Trong ví dụ này, phương thức str.lower() được sử dụng làm tham số key trong phương thức sort().



```python
list1 = [''Physics'', ''biology'', ''Biomechanics'', ''psychology'']
print("Danh sách trước khi sắp xếp:", list1)
list1.sort(key=str.lower)
print("Danh sách sau khi sắp xếp:", list1)
```

Đầu ra sẽ là:

```
Danh sách trước khi sắp xếp: [''Physics'', ''biology'', ''Biomechanics'', ''psychology'']
Danh sách sau khi sắp xếp: [''biology'', ''Biomechanics'', ''Physics'', ''psychology'']
```



Hàm do người dùng xác định cũng có thể được sử dụng làm tham số key trong phương thức sort().



```python
def myfunction(x):
   return x % 10

list1 = [17, 23, 46, 51, 90]
print("Danh sách trước khi sắp xếp:", list1)
list1.sort(key=myfunction)
print("Danh sách sau khi sắp xếp:", list1)
```

Đầu ra sẽ là:

```
Danh sách trước khi sắp xếp: [17, 23, 46, 51, 90]
Danh sách sau khi sắp xếp: [90, 51, 23, 46, 17]
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 8. Python - Sao chép Danh sách',
    'Bài 8. Python - Sao chép Danh sách',
    8,
    'Trong Python, một biến chỉ là một nhãn hoặc tham chiếu đến đối tượng trong bộ nhớ. Do đó, phép gán "lst1 = lst" đề cập đến cùng một đối tượng danh sách trong bộ nhớ. Hãy xem ví dụ sau:

```python
lst = [10, 20]
print("lst:", lst, "id(lst):", id(lst))
lst1 = lst
print("lst1:", lst1, "id(lst1):", id(lst1))
```

Kết quả sẽ là:

```
lst: [10, 20] id(lst): 1677677188288
lst1: [10, 20] id(lst1): 1677677188288
```

Do đó, nếu chúng ta cập nhật "lst", nó sẽ tự động phản ánh trong "lst1". Thay đổi lst[0] thành 100

```python
lst[0] = 100
print("lst:", lst, "id(lst):", id(lst))
print("lst1:", lst1, "id(lst1):", id(lst1))
```

Kết quả sẽ là:

```
lst: [100, 20] id(lst): 1677677188288
lst1: [100, 20] id(lst1): 1677677188288
```

Do đó, chúng ta có thể nói rằng "lst1" không phải là bản sao vật lý của "lst".



Lớp list của Python có một phương thức copy() để tạo một bản sao vật lý mới của một đối tượng danh sách.



```python
lst1 = lst.copy()
```

Đối tượng danh sách mới sẽ có một giá trị id() khác nhau.





```python
lst = [10, 20]
lst1 = lst.copy()
print("lst:", lst, "id(lst):", id(lst))
print("lst1:", lst1, "id(lst1):", id(lst1))
```

Kết quả sẽ là:

```
lst: [10, 20] id(lst): 1677678705472
lst1: [10, 20] id(lst1): 1677678706304
```

Mặc dù hai danh sách có cùng dữ liệu, chúng có các giá trị id() khác nhau, do đó chúng là hai đối tượng khác nhau và "lst1" là một bản sao của "lst".

Nếu chúng ta cố gắng sửa đổi "lst", nó sẽ không phản ánh trong "lst1". Hãy xem ví dụ sau:



```python
lst[0] = 100
print("lst:", lst, "id(lst):", id(lst))
print("lst1:", lst1, "id(lst1):", id(lst1))
```

Kết quả sẽ là:

```
lst: [100, 20] id(lst): 1677678705472
lst1: [10, 20] id(lst1): 1677678706304
```
*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 9. Python - Kết hợp Danh sách',
    'Bài 9. Python - Kết hợp Danh sách',
    9,
    'Trong Python, List được phân loại là một đối tượng loại chuỗi. Đó là một tập hợp các mục, có thể thuộc các loại dữ liệu khác nhau, với mỗi mục có một chỉ số vị trí bắt đầu từ 0. Bạn có thể sử dụng các cách khác nhau để kết hợp hai danh sách Python.

Tất cả các đối tượng loại chuỗi đều hỗ trợ toán tử nối (+), với đó hai danh sách có thể được kết hợp.



```python
L1 = [10,20,30,40]
L2 = [''one'', ''two'', ''three'', ''four'']
L3 = L1 + L2
print("Danh sách kết hợp:", L3)
```

Kết quả sẽ là:

```
Danh sách kết hợp: [10, 20, 30, 40, ''one'', ''two'', ''three'', ''four'']
```

Kết hợp Danh sách Python Bằng Cách Sử Dụng Toán Tử Nối Tăng Cường

Bạn cũng có thể sử dụng toán tử nối tăng cường với ký hiệu "+=" để thêm L2 vào L1



```python
L1 = [10,20,30,40]
L2 = [''one'', ''two'', ''three'', ''four'']
L1 += L2
print("Danh sách kết hợp:", L1)
```

Kết quả sẽ là:

```
Danh sách kết hợp: [10, 20, 30, 40, ''one'', ''two'', ''three'', ''four'']
```

Kết quả tương tự có thể được thu được bằng cách sử dụng phương thức extend(). Ở đây, chúng ta cần mở rộng L1 để thêm các phần tử từ L2 vào đó.

```python
L1 = [10,20,30,40]
L2 = [''one'', ''two'', ''three'', ''four'']
L1.extend(L2)
print("Danh sách kết hợp:", L1)
```

Kết quả sẽ là:

```
Danh sách kết hợp: [10, 20, 30, 40, ''one'', ''two'', ''three'', ''four'']
```

Kết hợp Danh sách Python bằng cách Thêm Mục

Để thêm các mục từ một danh sách vào một danh sách khác, một giải pháp lặp cổ điển cũng hoạt động. Duyệt qua các mục của danh sách thứ hai với một vòng lặp for, và thêm từng mục vào đầu tiên.



```python
L1 = [10,20,30,40]
L2 = [''one'', ''two'', ''three'', ''four'']

for x in L2:
   L1.append(x)
   
print("Danh sách kết hợp:", L1)
```

Kết quả sẽ là:

```
Danh sách kết hợp: [10, 20, 30, 40, ''one'', ''two'', ''three'', ''four'']
```

Kết hợp Danh sách Python bằng Cách Sử Dụng Comprehension Danh sách

Một phương pháp phức tạp hơn để kết hợp hai danh sách là sử dụng comprehension danh sách, như đoạn mã sau:



```python
L1 = [10,20,30,40]
L2 = [''one'', ''two'', ''three'', ''four'']
L3 = [y for x in [L1, L2] for y in x]
print("Danh sách kết hợp:", L3)
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 4: Danh sách (List)' LIMIT 1),
    'Bài 10. Python - Phương thức của Danh sách',
    'Bài 10. Python - Phương thức của Danh sách',
    10,
    'Trong Python, lớp danh sách bao gồm các phương thức sau mà bạn có thể sử dụng để thêm, cập nhật và xóa các mục trong danh sách:

1. **append(obj)**:
   - Phương thức `append()` thêm một đối tượng `obj` vào cuối danh sách.
   - Cú pháp: `list.append(obj)`
   - Ví dụ:

   ```python
   my_list = [1, 2, 3]
   my_list.append(4)
   print(my_list)  # Output: [1, 2, 3, 4]
   ```

2. **clear()**:
   - Phương thức `clear()` xóa tất cả các phần tử trong danh sách, làm cho danh sách trở thành rỗng.
   - Cú pháp: `list.clear()`
   - Ví dụ:

   ```python
   my_list = [1, 2, 3]
   my_list.clear()
   print(my_list)  # Output: []
   ```

3. **copy()**:
   - Phương thức `copy()` tạo và trả về một bản sao của danh sách gốc.
   - Cú pháp: `new_list = list.copy()`
   - Ví dụ:

   ```python
   my_list = [1, 2, 3]
   new_list = my_list.copy()
   print(new_list)  # Output: [1, 2, 3]
   ```

4. **count(obj)**:
   - Phương thức `count()` trả về số lần xuất hiện của đối tượng `obj` trong danh sách.
   - Cú pháp: `count = list.count(obj)`
   - Ví dụ:

   ```python
   my_list = [1, 2, 2, 3, 3, 3]
   count = my_list.count(3)
   print(count)  # Output: 3
   ```

5. **extend(seq)**:
   - Phương thức `extend()` mở rộng danh sách bằng cách thêm các phần tử từ chuỗi hoặc danh sách `seq`.
   - Cú pháp: `list.extend(seq)`
   - Ví dụ:

   ```python
   my_list = [1, 2, 3]
   my_list.extend([4, 5])
   print(my_list)  # Output: [1, 2, 3, 4, 5]
   ```

6. **index(obj)**:
   - Phương thức `index()` trả về chỉ mục của lần xuất hiện đầu tiên của đối tượng `obj` trong danh sách.
   - Cú pháp: `index = list.index(obj)`
   - Ví dụ:

   ```python
   my_list = [1, 2, 3, 4, 3]
   index = my_list.index(3)
   print(index)  # Output: 2
   ```

7. **insert(index, obj)**:
   - Phương thức `insert()` chèn đối tượng `obj` vào danh sách tại vị trí `index`.
   - Cú pháp: `list.insert(index, obj)`
   - Ví dụ:

   ```python
   my_list = [1, 2, 3]
   my_list.insert(1, 4)
   print(my_list)  # Output: [1, 4, 2, 3]
   ```

8. **pop(obj=list[-1])**:
   - Phương thức `pop()` xóa và trả về phần tử cuối cùng trong danh sách hoặc phần tử tại chỉ mục `obj`.
   - Cú pháp: `element = list.pop([obj])`
   - Ví dụ:

   ```python
   my_list = [1, 2, 3]
   last_element = my_list.pop()
   print(last_element)  # Output: 3
   ```

9. **remove(obj)**:
   - Phương thức `remove()` xóa lần xuất hiện đầu tiên của đối tượng `obj` khỏi danh sách.
   - Cú pháp: `list.remove(obj)`
   - Ví dụ:

   ```python
   my_list = [1, 2, 3, 2]
   my_list.remove(2)
   print(my_list)  # Output: [1, 3, 2]
   ```

10. **reverse()**:
    - Phương thức `reverse()` đảo ngược các phần tử trong danh sách.
    - Cú pháp: `list.reverse()`
    - Ví dụ:

    ```python
    my_list = [1, 2, 3]
    my_list.reverse()
    print(my_list)  # Output: [3, 2, 1]
    ```

11. **sort([func])**:
    - Phương thức `sort()` sắp xếp các phần tử trong danh sách, sử dụng hàm so sánh `func` nếu được chỉ định.
    - Cú pháp: `list.sort([func])`
    - Ví dụ:

    ```python
    my_list = [3, 1, 2]
    my_list.sort()
    print(my_list)  # Output: [1, 2, 3]
    ```
 Các phương thức này rất hữu ích để thao tác và xử lý dữ liệu trong danh sách của bạn.

 ## Kết luận

 Việc hiểu và sử dụng các phương thức của lớp danh sách trong Python mang lại nhiều lợi ích quan trọng:

1. **Thêm, xóa và cập nhật dễ dàng**: Các phương thức như `append()`, `insert()`, `pop()`, `remove()` cho phép bạn thêm, xóa và cập nhật các phần tử trong danh sách một cách dễ dàng và linh hoạt.

2. **Sắp xếp và đảo ngược dữ liệu**: Các phương thức `sort()` và `reverse()` cho phép bạn sắp xếp các phần tử trong danh sách theo thứ tự mong muốn hoặc đảo ngược thứ tự của chúng một cách đơn giản.

3. **Tìm kiếm và đếm các phần tử**: Phương thức `index()` cho phép bạn tìm kiếm vị trí của một phần tử trong danh sách, trong khi `count()` cho phép bạn đếm số lần xuất hiện của một phần tử cụ thể.

4. **Tạo bản sao và xóa toàn bộ danh sách**: Các phương thức `copy()` và `clear()` cho phép bạn tạo bản sao của danh sách hoặc xóa toàn bộ nội dung của danh sách một cách dễ dàng.

5. **Kết hợp danh sách**: Phương thức `extend()` cho phép bạn kết hợp hai danh sách lại với nhau một cách thuận tiện và hiệu quả.

6. **Kiểm tra sự tồn tại của phần tử**: Phương thức `in` và `not in` cho phép bạn kiểm tra xem một phần tử có tồn tại trong danh sách hay không.

Tóm lại, việc sử dụng các phương thức của lớp danh sách trong Python giúp bạn thực hiện nhiều thao tác với dữ liệu trong danh sách một cách hiệu quả và linh hoạt, từ thêm, xóa và cập nhật đến sắp xếp, đảo ngược và tìm kiếm.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 5: Chuỗi (String)' LIMIT 1),
    'Bài 0. Python - Chuỗi trong Python',
    'Bài 0. Python - Chuỗi trong Python',
    0,
    'Trong Python, một chuỗi là một chuỗi không thể thay đổi của các ký tự Unicode. Mỗi ký tự có một giá trị số duy nhất theo tiêu chuẩn UNICODE. Nhưng, chuỗi như một nguyên tắc, không có bất kỳ giá trị số nào ngay cả khi tất cả các ký tự đều là chữ số. Để phân biệt chuỗi khỏi số và các bộ nhận dạng khác, chuỗi các ký tự được bao quanh bằng dấu ngoặc đơn, kép hoặc ba dấu ngoặc kép trong biểu diễn chữ mạch của nó. Do đó, 1234 là một số (số nguyên) nhưng ''1234'' là một chuỗi.



Miễn là cùng một chuỗi ký tự được bao quanh, dấu ngoặc đơn, kép hoặc ba dấu ngoặc đơn không quan trọng. Do đó, các biểu diễn chuỗi sau là tương đương.

```python
>>> ''Welcome To 8SyncDev''
''Welcome To 8SyncDev''
>>> "Welcome To 8SyncDev"
''Welcome To 8SyncDev''
>>> ''''''Welcome To 8SyncDev''''''
''Welcome To 8SyncDev''
>>> """Welcome To 8SyncDev"""
''Welcome To 8SyncDev''
```

Nhìn vào các câu lệnh trên, rõ ràng rằng Python lưu trữ chuỗi nội bộ như được bao quanh bằng dấu ngoặc đơn.



Một chuỗi trong Python là một đối tượng của lớp str. Điều này có thể được xác minh với hàm type().

```python
var = "Welcome To 8SyncDev"
print(type(var))
```

Nó sẽ tạo ra đầu ra sau:

```
<class ''str''>
```



Nếu bạn muốn nhúng một số văn bản trong dấu ngoặc kép như một phần của chuỗi, thì chính chuỗi đó nên được đặt trong dấu ngoặc đơn. Để nhúng một văn bản được trích dẫn bằng dấu ngoặc đơn, chuỗi nên được viết trong dấu ngoặc kép.

```python
var = ''Welcome to "Python Tutorial" from 8SyncDev''
print("var:", var)

var = "Welcome to ''Python Tutorial'' from 8SyncDev"
print("var:", var)
```



Để tạo một chuỗi bằng dấu ngoặc ba, bạn có thể sử dụng ba dấu ngoặc đơn hoặc ba dấu ngoặc kép - cả hai phiên bản đều tương tự.

```python
var = ''''''Welcome to 8SyncDev''''''
print("var:", var)

var = """Welcome to 8SyncDev"""
print("var:", var)
```



Chuỗi được bao quanh bằng ba dấu ngoặc kép hữu ích để tạo ra một chuỗi đa dòng.

```python
var = ''''''
Welcome To
Python Tutorial
from 8SyncDev
''''''
print("var:", var)
```

Nó sẽ tạo ra đầu ra sau:

```
var:
Welcome To
Python Tutorial
from 8SyncDev
```

Một chuỗi là một loại dữ liệu không phải là số. Rõ ràng, chúng ta không thể sử dụng toán tử số học với các toán hạng chuỗi. Python sẽ ném ra TypeError trong trường hợp như vậy.

```python
>>> "Hello" - "World"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for -: ''str'' and ''str''
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    TRUE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 5: Chuỗi (String)' LIMIT 1),
    'Bài 1. Python - Slicing Chuỗi trong Python',
    'Bài 1. Python - Slicing Chuỗi trong Python',
    1,
    'Trong Python, một chuỗi là một chuỗi các ký tự Unicode được sắp xếp. Mỗi ký tự trong chuỗi có một chỉ mục duy nhất trong chuỗi. Chỉ mục bắt đầu từ 0. Ký tự đầu tiên trong chuỗi có chỉ mục vị trí của nó là 0. Chỉ mục tiếp tục tăng dần về phía cuối chuỗi.

Nếu một biến chuỗi được khai báo như sau: `var = "HELLO PYTHON"`, chỉ mục của mỗi ký tự trong chuỗi sẽ như sau:

```
H   E   L   L   O       P   Y   T   H   O   N
0   1   2   3   4   5   6   7   8   9   10  11
```



Python cho phép bạn truy cập bất kỳ ký tự nào từ chuỗi bằng cách sử dụng chỉ mục của nó. Trong trường hợp này, 0 là giới hạn dưới và 11 là giới hạn trên của chuỗi. Vì vậy, `var[0]` trả về ''H'', `var[6]` trả về ''P''. Nếu chỉ mục trong dấu ngoặc vuông vượt quá giới hạn trên, Python sẽ ném ra IndexError.

**Ví dụ**

```python
var = "HELLO PYTHON"
print(var[0])   # ''H''
print(var[7])   # ''Y''
print(var[11])  # ''N''
print(var[12])  # IndexError: string index out of range
```



Một trong những tính năng đặc biệt của các loại chuỗi Python (và do đó là một đối tượng chuỗi) là nó có một hệ thống chỉ mục âm. Trong ví dụ trên, một hệ thống chỉ mục dương được sử dụng, trong đó chỉ mục tăng dần từ trái sang phải. Trong trường hợp của chỉ mục âm, ký tự ở cuối có chỉ mục -1 và chỉ mục giảm dần từ phải sang trái, kết quả là ký tự đầu tiên H có chỉ mục -12.

**Ví dụ**

```python
print(var[-1])   # ''N''
print(var[-5])   # ''Y''
print(var[-12])  # ''H''
print(var[-13])  # IndexError: string index out of range
```

Một lần nữa, nếu chỉ mục vượt ra khỏi phạm vi, IndexError sẽ được gặp phải.



Chúng ta có thể sử dụng chỉ mục dương hoặc âm để truy xuất một ký tự từ chuỗi.

**Ví dụ**

```python
print(var[0], var[-12])  # (''H'', ''H'')
print(var[7], var[-5])   # (''Y'', ''Y'')
print(var[11], var[-1])  # (''N'', ''N'')
```

Trong Python, chuỗi là một đối tượng không thay đổi. Đối tượng là không thay đổi nếu nó không thể được sửa đổi tại chỗ, sau khi được lưu trữ trong một vị trí bộ nhớ cụ thể. Bạn có thể lấy bất kỳ ký tự nào từ chuỗi bằng cách sử dụng chỉ mục của nó, nhưng bạn không thể thay thế nó bằng một ký tự khác.

**Ví dụ**

```python
var = "HELLO PYTHON"
var[7] = "y"  # TypeError: ''str'' object does not support item assignment
```

Lỗi TypeError là do chuỗi là không thay đổi.



Python định nghĩa ":" như là toán tử cắt chuỗi. Nó trả về một chuỗi con từ chuỗi gốc. Sử dụng như sau:

```
substr = var[x:y]
```

**Ví dụ**

```python
var = "HELLO PYTHON"

print("var:", var)
print("var[3:8]:", var[3:8])
```

Kết quả sẽ là:

```
var: HELLO PYTHON
var[3:8]: LO PY
```



Chỉ mục âm cũng có thể được sử dụng cho việc cắt.

**Ví dụ**

```python
var = "HELLO PYTHON"
print("var:", var)
print("var[3:8]:", var[3:8])
print("var[-9:-4]:", var[-9:-4])
```

Kết quả sẽ là:

```
var: HELLO PYTHON
var[3:8]: LO PY
var[-9:-4]: LO PY
```



Cả hai toán hạng cho toán tử Cắt của Python là tùy chọn. Toán hạng đầu tiên mặc định là không, điều này có nghĩa là nếu chúng ta không cung cấp toán hạng đầu tiên, cắt bắt đầu từ ký tự ở chỉ mục 0, tức là ký tự đầu tiên. Nó cắt chuỗi con trái nhất lên đến "y-1" ký tự.

**Ví dụ**

```python
var = "HELLO PYTHON"
print("var:", var)
print("var[0:5]:", var[0:5])
print("var[:5]:", var[:5])
```

Kết quả sẽ là:



```
var: HELLO PYTHON
var[0:5]: HELLO
var[:5]: HELLO
```

Tương tự, toán hạng y cũng là tùy chọn. Mặc định là "-1", có nghĩa là chuỗi sẽ được cắt từ vị trí x đến cuối chuỗi.

**Ví dụ**

```python
var = "HELLO PYTHON"
print("var:", var)
print("var[6:12]:", var[6:12])
print("var[6:]:", var[6:])
```

Kết quả sẽ là:

```
var: HELLO PYTHON
var[6:12]: PYTHON
var[6:]: PYTHON
```

Tự nhiên, nếu cả hai toán hạng đều không được sử dụng, phép cắt sẽ bằng với chuỗi gốc. Điều này bởi vì "x" là 0, và "y" mặc định là chỉ mục cuối cùng+1 (hoặc -1).

**Ví dụ**

```python
var = "HELLO PYTHON"
print("var:", var)
print("var[0:12]:", var[0:12])
print("var[:]:", var[:])
```

Kết quả sẽ là:

```
var: HELLO PYTHON
var[0:12]: HELLO PYTHON
var[:]: HELLO PYTHON
```

Toán hạng bên trái phải nhỏ hơn toán hạng bên phải, để lấy một chuỗi con của chuỗi gốc. Python không ném ra bất kỳ lỗi nào, nếu toán hạng bên trái lớn hơn, nhưng trả về một chuỗi rỗng.

**Ví dụ**

```python
var = "HELLO PYTHON"
print("var:", var)
print("var[-1:7]:", var[-1:7])
print("var[7:0]:", var[7:0])
```

Kết quả sẽ là:

```
var: HELLO PYTHON
var[-1:7]:
var[7:0]:
```



Cắt trả về một chuỗi mới. Bạn hoàn toàn có thể thực hiện các thao tác chuỗi như ghép chuỗi, hoặc cắt trên chuỗi đã được cắt.

**Ví dụ**

```python
var = "HELLO PYTHON"

print("var:", var)
print("var[:6][:2]:", var[:6][:2])

var1 = var[:6]
print("slice:", var1)
print("var1[:2]:", var1[:2])
```

Kết quả sẽ là:

```
var: HELLO PYTHON
var[:6][:2]: HE
slice: HELLO
var1[:2]: HE
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 5: Chuỗi (String)' LIMIT 1),
    'Bài 2. Sửa Đổi Chuỗi trong Python',
    'Bài 2. Sửa Đổi Chuỗi trong Python',
    2,
    'Trong Python, một chuỗi (đối tượng của lớp str) thuộc loại không thay đổi. Một đối tượng không thay đổi là đối tượng không thể được sửa đổi tại chỗ, sau khi được tạo trong bộ nhớ. Do đó, khác với một danh sách, bất kỳ ký tự nào trong chuỗi cũng không thể được ghi đè, cũng không thể chèn hoặc thêm các ký tự vào nó trừ khi chúng ta sử dụng một số phương thức chuỗi nhất định trả về một đối tượng chuỗi mới.

Tuy nhiên, chúng ta có thể sử dụng một trong các kỹ thuật sau đây như một phương pháp vượt qua để sửa đổi một chuỗi.



Vì cả chuỗi và danh sách đều là các chuỗi, chúng có thể được chuyển đổi lẫn nhau. Do đó, nếu chúng ta chuyển đổi một đối tượng chuỗi thành một danh sách, sửa đổi danh sách bằng cách sử dụng các phương thức insert(), append() hoặc remove(), và sau đó chuyển đổi danh sách trở lại thành một chuỗi, chúng ta sẽ nhận được phiên bản đã được sửa đổi.

**Ví dụ**

```python
s1 = "WORD"
print("Chuỗi gốc:", s1)
l1 = list(s1)

l1.insert(3, "L")

print(l1)

s1 = ''''.join(l1)
print("Chuỗi đã sửa đổi:", s1)
```

Kết quả sẽ là:

```
Chuỗi gốc: WORD
[''W'', ''O'', ''R'', ''L'', ''D'']
Chuỗi đã sửa đổi: WORLD
```



Để sửa đổi một chuỗi, ta có thể xây dựng một đối tượng mảng. Thư viện chuẩn của Python bao gồm mô-đun array. Chúng ta có thể có một mảng kiểu Unicode từ một biến chuỗi.

**Ví dụ**

```python
import array as ar

s1 = "WORD"
sar = ar.array(''u'', s1)

sar.insert(3, "L")

s1 = sar.tounicode()

print("Chuỗi đã sửa đổi:", s1)
```

Kết quả sẽ là:

```
Chuỗi đã sửa đổi: WORLD
```



Mô-đun io của Python định nghĩa các lớp để xử lý luồng. Lớp StringIO đại diện cho một luồng văn bản sử dụng một bộ đệm văn bản trong bộ nhớ. Một đối tượng StringIO được lấy từ một chuỗi hoạt động giống như một đối tượng File. Do đó, chúng ta có thể thực hiện các thao tác đọc/ghi trên nó. Phương thức getvalue() của lớp StringIO trả về một chuỗi.

Hãy sử dụng nguyên tắc này trong chương trình sau để sửa đổi một chuỗi.

**Ví dụ**

```python
import io

s1 = "WORD"
print("Chuỗi gốc:", s1)

sio = io.StringIO(s1)
sio.seek(3)
sio.write("LD")
s1 = sio.getvalue()

print("Chuỗi đã sửa đổi:", s1)
```

Kết quả sẽ là:

```
Chuỗi gốc: WORD
Chuỗi đã sửa đổi: WORLD
```

Như vậy, ta đã tìm hiểu cách sửa đổi chuỗi trong Python bằng các kỹ thuật khác nhau.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 5: Chuỗi (String)' LIMIT 1),
    'Bài 3. Python - Ghép Chuỗi trong Python',
    'Bài 3. Python - Ghép Chuỗi trong Python',
    3,
    'Toán tử "+" được biết đến như một toán tử cộng, trả về tổng của hai số. Tuy nhiên, ký hiệu "+" hoạt động như một toán tử ghép chuỗi trong Python. Nó hoạt động với hai toán hạng chuỗi và kết quả là sự ghép nối của hai chuỗi.

Các ký tự của chuỗi bên phải của ký hiệu cộng được nối vào chuỗi bên trái của nó. Kết quả của việc ghép nối là một chuỗi mới.

**Ví dụ**

```python
str1 = "Hello"
str2 = "World"
print("Chuỗi 1:", str1)
print("Chuỗi 2:", str2)
str3 = str1 + str2
print("Chuỗi 3:", str3)
```

Kết quả sẽ là:

```
Chuỗi 1: Hello
Chuỗi 2: World
Chuỗi 3: HelloWorld
```



Để chèn một khoảng trắng giữa hai chuỗi, sử dụng một chuỗi trống thứ ba.

**Ví dụ**

```python
str1 = "Hello"
str2 = "World"
khoang_trang = " "
print("Chuỗi 1:", str1)
print("Chuỗi 2:", str2)
str3 = str1 + khoang_trang + str2
print("Chuỗi 3:", str3)
```

Kết quả sẽ là:

```
Chuỗi 1: Hello
Chuỗi 2: World
Chuỗi 3: Hello World
```



Ký hiệu "*", mà chúng ta thường sử dụng để nhân hai số, cũng có thể được sử dụng với các toán hạng chuỗi. Ở đây, "*" hoạt động như một toán tử lặp lại trong Python. Một trong các toán hạng phải là một số nguyên và thứ hai là một chuỗi. Toán tử nối nhiều bản sao của chuỗi lại với nhau. Ví dụ −

**Ví dụ**

```python
>>> "Hello" * 3
''HelloHelloHello''
```

Toán hạng số nguyên là số bản sao của toán hạng chuỗi để được nối.



Cả hai toán tử chuỗi, (*) toán tử lặp lại và (+) toán tử ghép chuỗi, có thể được sử dụng trong một biểu thức duy nhất. Toán tử "*" có độ ưu tiên cao hơn toán tử "+".

**Ví dụ**

```python
str1 = "Hello"
str2 = "World"
print("Chuỗi 1:", str1)
print("Chuỗi 2:", str2)
str3 = str1 + str2 * 3
print("Chuỗi 3:", str3)
str4 = (str1 + str2) * 3
print("Chuỗi 4:", str4)
```

Để tạo chuỗi str3, Python ghép 3 bản sao của World trước, và sau đó nối kết quả vào Hello

```
Chuỗi 3: HelloWorldWorldWorld
```

Trong trường hợp thứ hai, các chuỗi str1 và str2 được đặt trong dấu ngoặc đơn, do đó việc ghép của chúng diễn ra trước. Kết quả của nó sau đó được lặp lại ba lần.

```
Chuỗi 4: HelloWorldHelloWorldHelloWorld
```

Ngoài "+" và "*", không có ký hiệu toán hạng số học nào khác có thể được sử dụng với các toán hạng chuỗi.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 5: Chuỗi (String)' LIMIT 1),
    'Bài 4. Python - Định Dạng Chuỗi trong Python',
    'Bài 4. Python - Định Dạng Chuỗi trong Python',
    4,
    'Định dạng chuỗi là quá trình xây dựng một biểu diễn chuỗi một cách linh hoạt bằng cách chèn giá trị của các biểu thức số học vào một chuỗi đã tồn tại. Toán tử ghép chuỗi của Python không chấp nhận một toán hạng không phải là chuỗi. Do đó, Python cung cấp các kỹ thuật định dạng chuỗi sau:

1. Sử dụng toán tử % cho sự thay thế
2. Sử dụng phương thức format() của lớp str
3. Sử dụng cú pháp f-string
4. Sử dụng lớp String Template



Toán tử % cho phép thay thế các giá trị trong một chuỗi bằng các giá trị đã cho. Đây là cách cũ nhưng vẫn được sử dụng phổ biến.

**Ví dụ**

```python
name = "John"
age = 30
print("Tên của tôi là %s và tôi %d tuổi." % (name, age))
```

Kết quả sẽ là:

```
Tên của tôi là John và tôi 30 tuổi.
```



Phương thức format() cho phép định dạng một chuỗi bằng cách chèn các giá trị được chỉ định trong chuỗi.

**Ví dụ**

```python
name = "Alice"
age = 25
print("Tên của tôi là {} và tôi {} tuổi.".format(name, age))
```

Kết quả sẽ là:

```
Tên của tôi là Alice và tôi 25 tuổi.
```



f-string là một cú pháp mới trong Python (bắt đầu từ Python 3.6) cho phép thực hiện định dạng chuỗi một cách nhanh chóng và dễ dàng.

**Ví dụ**

```python
name = "Emma"
age = 35
print(f"Tên của tôi là {name} và tôi {age} tuổi.")
```

Kết quả sẽ là:

```
Tên của tôi là Emma và tôi 35 tuổi.
```



Lớp String Template cung cấp một cách khác để thực hiện định dạng chuỗi bằng cách chèn các giá trị được chỉ định trong chuỗi.

**Ví dụ**

```python
from string import Template

name = "Sophia"
age = 40
template = Template("Tên của tôi là $name và tôi $age tuổi.")
print(template.substitute(name=name, age=age))
```

Kết quả sẽ là:

```
Tên của tôi là Sophia và tôi 40 tuổi.
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 5: Chuỗi (String)' LIMIT 1),
    'Bài 5. Python - Ký Tự Escape Trong Python',
    'Bài 5. Python - Ký Tự Escape Trong Python',
    5,
    'Trong Python, một chuỗi trở thành một chuỗi thô nếu nó được tiền tố bằng "r" hoặc "R" trước các ký hiệu trích dẫn. Do đó, ''Hello'' là một chuỗi bình thường trong khi r''Hello'' là một chuỗi thô.

```python
>>> normal = "Hello"
>>> print(normal)
Hello
>>> raw = r"Hello"
>>> print(raw)
Hello
```

Trong các hoàn cảnh bình thường, không có sự khác biệt giữa hai loại chuỗi này. Tuy nhiên, khi ký tự thoát được nhúng trong chuỗi, chuỗi bình thường thực sự diễn giải chuỗi thoát, trong khi chuỗi thô không xử lý ký tự thoát.

```python
>>> normal = "Hello\nWorld"
>>> print(normal)
Hello
World
>>> raw = r"Hello\nWorld"
>>> print(raw)
Hello\nWorld
```

Trong ví dụ trên, khi một chuỗi bình thường được in ra, ký tự thoát ''\n'' được xử lý để tạo ra một dòng mới. Tuy nhiên, do toán tử chuỗi thô ''r'', hiệu ứng của ký tự thoát không được dịch theo ý nghĩa của nó.



Một ký tự thoát là một ký tự được theo sau bởi một dấu gạch chéo (\) cho biết cho Trình thông dịch rằng ký tự thoát này (chuỗi) có ý nghĩa đặc biệt.

**Ví dụ**

Ký tự xuống dòng \n là một trong các chuỗi thoát được xác định bởi Python. Chuỗi thoát kích hoạt một chuỗi con thay thế cách triển khai khác cho "\". Trong Python, "\" được sử dụng làm ký tự thoát. Bảng sau đây hiển thị danh sách các chuỗi thoát.

Trừ khi có tiền tố ''r'' hoặc ''R'', các chuỗi thoát trong chuỗi và byte literals được diễn giải theo các quy tắc tương tự như các quy tắc được sử dụng bởi C tiêu chuẩn. Các chuỗi thoát được nhận dạng là −



Bảng sau đây hiển thị các ký tự thoát khác nhau được sử dụng trong Python -

| STT | Chuỗi Thoát & Ý Nghĩa |
| --- | --------------------- |
| 1   | \\<dòng mới>          |
| 2   | \\\\                  |
| 3   | \\''                   |
| 4   | \\"                   |
| 5   | \\a                   |
| 6   | \\b                   |
| 7   | \\f                   |
| 8   | \\n                   |
| 9   | \\r                   |
| 10  | \\t                   |
| 11  | \\v                   |
| 12  | \\ooo                 |
| 13  | \\xhh                 |



Đoạn mã sau đây hiển thị cách sử dụng các chuỗi thoát được liệt kê trong bảng trên -

```python

s = ''Chuỗi này sẽ không bao gồm \
dấu gạch chéo hoặc ký tự xuống dòng mới.''
print(s)


s = ''Ký tự \\ được gọi là ký tự gạch chéo''
print(s)


s = ''Xin chào \''Python\''''
print(s)


s = "Xin chào \"Python\""
print(s)


s = ''Hel\blo''
print(s)


s = ''Xin chào\a''
print(s)


s = ''Xin chào\nPython''
print(s)


s = ''Xin chào\tPython''
print(s)


s = "xin chào\fworld"
print(s)


s = "\101"
print(s)


s = "\x41"
print(s)
```

Kết quả sẽ là:

```
Chuỗi này sẽ không bao gồm dấu gạch chéo hoặc ký tự xuống dòng mới.
Ký tự \ được gọi là ký tự gạch chéo
Xin chào ''Python''
Xin chào "Python"
Helo
Xin chào
Xin chào
Python
Xin chào	Python
xin chàoworld
A
A
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 5: Chuỗi (String)' LIMIT 1),
    'Bài 6. Python - Phương Thức Chuỗi trong Python',
    'Bài 6. Python - Phương Thức Chuỗi trong Python',
    6,
    'Lớp str tích hợp sẵn trong Python định nghĩa các phương thức khác nhau. Chúng hỗ trợ trong việc xử lý chuỗi. Do chuỗi là một đối tượng không thể thay đổi, các phương thức này trả về một bản sao của chuỗi gốc, thực hiện các xử lý tương ứng trên nó.

Các phương thức chuỗi có thể được phân loại trong các nhóm sau:

1. Chuyển đổi chữ hoa và chữ thường
2. Căn chỉnh
3. Tách và kết hợp
4. Kiểm tra logic
5. Tìm kiếm và thay thế
6. Định dạng
7. Dịch



Các phương thức trong nhóm này hỗ trợ chuyển đổi các ký tự của chuỗi thành chữ hoa hoặc chữ thường.

**Ví dụ:**

```python
s = "hello world"
print(s.upper())  # Chuyển thành chữ hoa
print(s.capitalize())  # Chuyển ký tự đầu tiên thành chữ hoa
print(s.title())  # Chuyển thành chữ in hoa theo tiêu đề
```



Các phương thức trong nhóm này hỗ trợ căn chỉnh các chuỗi.

**Ví dụ:**

```python
s = "hello"
print(s.center(20))  # Căn chỉnh giữa
print(s.ljust(20))  # Căn chỉnh trái
print(s.rjust(20))  # Căn chỉnh phải
```



Các phương thức trong nhóm này hỗ trợ tách chuỗi thành các phần và kết hợp các phần thành một chuỗi mới.

**Ví dụ:**

```python
s = "apple,banana,orange"
print(s.split('',''))  # Tách chuỗi thành danh sách các phần tử
print(''-''.join([''apple'', ''banana'', ''orange'']))  # Kết hợp các phần tử thành chuỗi mới
```



Các phương thức trong nhóm này hỗ trợ kiểm tra các điều kiện logic trên chuỗi.

**Ví dụ:**

```python
s = "hello world"
print(s.startswith("hello"))  # Kiểm tra xem chuỗi có bắt đầu bằng "hello" không
print(s.endswith("world"))  # Kiểm tra xem chuỗi có kết thúc bằng "world" không
print(s.isalnum())  # Kiểm tra xem chuỗi có chứa toàn bộ các ký tự hoặc số không
print(s.isdigit())  # Kiểm tra xem chuỗi có phải là một số không
print(s.islower())  # Kiểm tra xem tất cả các ký tự trong chuỗi có phải là chữ thường không
print(s.isupper())  # Kiểm tra xem tất cả các ký tự trong chuỗi có phải là chữ hoa không
```



Các phương thức trong nhóm này hỗ trợ tìm kiếm và thay thế các phần của chuỗi.

**Ví dụ:**

```python
s = "hello world"
print(s.find("world"))  # Tìm vị trí đầu tiên của "world" trong chuỗi
print(s.replace("world", "universe"))  # Thay thế "world" bằng "universe" trong chuỗi
```



Các phương thức trong nhóm này hỗ trợ định dạng chuỗi.

**Ví dụ:**

```python
s = "My name is {name} and I am {age} years old."
print(s.format(name="John", age=30))  # Sử dụng phương thức format()
print(f"My name is {''John''} and I am {30} years old.")  # Sử dụng f-string
```



Các phương thức trong nhóm này hỗ trợ dịch các ký tự trong chuỗi.

**Ví dụ:**

```python
table = str.maketrans("aeiou", "12345")
s = "apple"
print(s.translate(table))  # Dịch các ký tự trong chuỗi theo bảng dịch đã cho
```
*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 5: Chuỗi (String)' LIMIT 1),
    'Bài 7. Python - Bài Tập Chuỗi',
    'Bài 7. Python - Bài Tập Chuỗi',
    7,
    '```python
mystr = "All animals are equal. Some are more equal"
vowels = "aeiou"
count = 0
for x in mystr:
   if x.lower() in vowels:
       count += 1
print("Số lượng nguyên âm:", count)
```

Kết quả:

```
Số lượng nguyên âm: 18
```



```python
mystr = ''10101''

def strtoint(mystr):
   for x in mystr:
      if x not in ''01'':
          return "Lỗi. Chuỗi chứa ký tự không phải nhị phân"
   num = int(mystr, 2)
   return num

print("Nhị phân: {}, Số nguyên: {}".format(mystr, strtoint(mystr)))
```

Kết quả:

```
Nhị phân: 10101, Số nguyên: 21
```

Nếu thay `mystr` thành `''10, 101''`:

```
Nhị phân: 10, 101, Số nguyên: Lỗi. Chuỗi chứa ký tự không phải nhị phân
```



```python
digits = [str(x) for x in range(10)]
mystr = ''He12llo, Py00th55on!''
chars = []
for x in mystr:
   if x not in digits:
      chars.append(x)
newstr = ''''.join(chars)
print(newstr)
```

Kết quả:

```
Hello, Python!
```











Đây là một số bài tập phổ biến về xử lý chuỗi trong Python. Bạn có thể thực hiện các bài tập này để củng cố kiến thức về xử lý chuỗi và các phương thức chuỗi trong Python.





- Sử dụng một vòng lặp để duyệt qua từng ký tự trong chuỗi.
- Kiểm tra xem ký tự đó có phải là nguyên âm không bằng cách so sánh với danh sách các nguyên âm.
- Tăng biến đếm nếu ký tự là nguyên âm.




- Kiểm tra từng ký tự trong chuỗi xem có phải là ''0'' hoặc ''1'' không.
- Nếu có ký tự nào không phải nhị phân, trả về thông báo lỗi.
- Sử dụng hàm `int(mystr, 2)` để chuyển đổi chuỗi nhị phân thành số nguyên.




- Duyệt qua từng ký tự trong chuỗi.
- Nếu ký tự không phải là số, thêm vào danh sách các ký tự mới.
- Cuối cùng, kết hợp danh sách các ký tự mới thành một chuỗi mới.




- Sử dụng hàm `sorted()` để sắp xếp các ký tự trong chuỗi.
- Hàm này sẽ trả về một danh sách các ký tự đã được sắp xếp.
- Sử dụng `''''.join()` để kết hợp các ký tự trong danh sách thành một chuỗi mới.




- Sử dụng một vòng lặp để duyệt qua từng ký tự trong chuỗi.
- Thêm mỗi ký tự vào một danh sách nếu nó chưa xuất hiện trong danh sách.
- Kết hợp các ký tự trong danh sách thành một chuỗi mới.




- Sử dụng một từ điển để đếm số lần xuất hiện của mỗi ký tự trong chuỗi.
- Duyệt qua từng ký tự trong chuỗi và cập nhật số lần xuất hiện trong từ điển.
- Cuối cùng, in ra các ký tự duy nhất và số lần xuất hiện của chúng.




- Sử dụng phương thức `split()` để tách chuỗi thành danh sách các từ.
- Đếm số phần tử trong danh sách, đó chính là số từ trong chuỗi.




- Duyệt qua từng ký tự trong chuỗi.
- Nếu ký tự là chữ cái, thêm vào danh sách các ký tự mới.
- Cuối cùng, kết hợp danh sách các ký tự mới thành một chuỗi mới.

Đây là các giải pháp cho mỗi bài tập, mỗi giải pháp cung cấp một cách tiếp cận cụ thể để giải quyết vấn đề.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 0. Python - Tập hợp (Sets)',
    'Bài 0. Python - Tập hợp (Sets)',
    0,
    'Trong Python, một tập hợp là một trong các loại dữ liệu có sẵn. Trong toán học, tập hợp là một bộ sưu tập các đối tượng riêng biệt. Loại dữ liệu tập hợp là cách thức Python thực hiện một tập hợp. Các đối tượng trong một tập hợp có thể là bất kỳ loại dữ liệu nào.

Tập hợp trong Python cũng là một loại dữ liệu tập hợp như danh sách hoặc bộ. Tuy nhiên, nó không phải là một bộ sưu tập có thứ tự, tức là các mục trong một tập hợp không thể truy cập bằng chỉ số vị trí của chúng. Một đối tượng tập hợp là một bộ sưu tập của một hoặc nhiều đối tượng không thay đổi được bao gồm trong dấu ngoặc nhọn {}.





Dưới đây là một số ví dụ về các đối tượng tập hợp:

```python
s1 = {"Rohan", "Physics", 21, 69.75}
s2 = {1, 2, 3, 4, 5}
s3 = {"a", "b", "c", "d"}
s4 = {25.50, True, -55, 1+2j}
print (s1)
print (s2)
print (s3)
print (s4)
```

Kết quả sẽ là:

```
{''Physics'', 21, ''Rohan'', 69.75}
{1, 2, 3, 4, 5}
{''a'', ''d'', ''c'', ''b''}
{25.5, -55, True, (1+2j)}
```



Hàm set() cũng xây dựng một đối tượng tập hợp từ một đối tượng chuỗi (danh sách, bộ hoặc chuỗi).

```python
L1 = ["Rohan", "Physics", 21, 69.75]
s1 = set(L1)
T1 = (1, 2, 3, 4, 5)
s2 = set(T1)
string = "8SyncDev"
s3 = set(string)

print (s1)
print (s2)
print (s3)
```

Kết quả sẽ là:

```
{''Rohan'', 69.75, 21, ''Physics''}
{1, 2, 3, 4, 5}
{''u'', ''a'', ''o'', ''n'', ''r'', ''s'', ''T'', ''P'', ''i'', ''t'', ''l''}
```



Tập hợp là một bộ sưu tập các đối tượng riêng biệt. Ngay cả khi bạn lặp lại một đối tượng trong tập hợp, chỉ có một bản sao được giữ lại trong đó.

```python
s2 = {1, 2, 3, 4, 5, 3,0, 1, 9}
s3 = {"a", "b", "c", "d", "b", "e", "a"}
print (s2)
print (s3)
```

Kết quả sẽ là:

```
{0, 1, 2, 3, 4, 5, 9}
{''a'', ''b'', ''d'', ''c'', ''e''}
```



Chỉ các đối tượng không thể thay đổi được có thể được sử dụng để tạo ra một đối tượng tập hợp. Bất kỳ kiểu số nào, chuỗi và bộ đều được phép, nhưng bạn không thể đặt một danh sách hoặc một từ điển trong một tập hợp.

```python
s1 = {1, 2, [3, 4, 5], 3,0, 1, 9}
print (s1)
s2 = {"Rohan", {"phy":50}}
print (s2)
```

Kết quả sẽ là:

```
   s1 = {1, 2, [3, 4, 5], 3,0, 1, 9}
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
TypeError: unhashable type: ''list''
   s2 = {"Rohan", {"phy":50}}
        ^^^^^^^^^^^^^^^^^^^^^
TypeError: unhashable type: ''dict''
```

Python sẽ nâng TypeError với thông báo unhashable types ''list'' hoặc ''dict''. Việc băm tạo ra một số duy nhất cho một mục không thay đổi mà cho phép tìm kiếm nhanh trong bộ nhớ của máy tính. Python có hàm hash() tích hợp. Hàm này không được hỗ trợ bởi danh sách hoặc từ điển.

Mặc dù các đối tượng không thể thay đổi không được lưu trữ trong một tập hợp, nhưng tập hợp chính nó là một đối tượng có thể thay đổi. Python có các toán tử đặc biệt để làm việc với các tập hợp, và có các phương thức khác nhau trong lớp tập hợp để thực hiện các thao tác thêm, loại bỏ, cập nhật trên các phần tử của một đối tượng tập hợp.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    TRUE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 1. Python - Truy cập Các Phần Tử trong Tập Hợp',
    'Bài 1. Python - Truy cập Các Phần Tử trong Tập Hợp',
    1,
    'Vì tập hợp không phải là một loại dữ liệu chuỗi, nên các mục của nó không thể được truy cập một cách cá nhân vì chúng không có chỉ số vị trí (như trong danh sách hoặc bộ). Các mục của tập hợp cũng không có một khóa (như trong từ điển) để truy cập. Bạn chỉ có thể duyệt qua các mục của tập hợp bằng cách sử dụng vòng lặp for.





```python
langs = {"C", "C++", "Java", "Python"}
for lang in langs:
   print(lang)
```

Kết quả sẽ là:

```
Python
C
C++
Java
```



Toán tử thành viên của Python cho phép bạn kiểm tra xem một mục cụ thể có sẵn trong tập hợp hay không. Hãy xem ví dụ sau:



```python
langs = {"C", "C++", "Java", "Python"}
print("PHP" in langs)
print("Java" in langs)
```

Kết quả sẽ là:

```
False
True
```

Như vậy, bạn không thể truy cập các phần tử của tập hợp một cách trực tiếp nhưng có thể sử dụng vòng lặp for để duyệt qua chúng và sử dụng các toán tử thành viên để kiểm tra sự tồn tại của một phần tử trong tập hợp.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 2. Python - Thêm Các Phần Tử vào Tập Hợp',
    'Bài 2. Python - Thêm Các Phần Tử vào Tập Hợp',
    2,
    'Mặc dù một tập hợp chỉ chứa các đối tượng không thể thay đổi, nhưng tập hợp chính nó là có thể thay đổi. Chúng ta có thể thêm các phần tử mới vào tập hợp bằng cách sử dụng một trong các cách sau đây:



Phương thức `add()` trong lớp set thêm một phần tử mới vào tập hợp. Nếu phần tử đã có trong tập hợp, thì không có thay đổi nào trong tập hợp.

**Cú Pháp:**
```python
set.add(obj)
```

**Tham Số:**
- `obj` − một đối tượng của bất kỳ loại không thể thay đổi nào.



```python
lang1 = {"C", "C++", "Java", "Python"}
lang1.add("Golang")
print(lang1)
```

Kết quả sẽ là:

```
{''Python'', ''C'', ''Golang'', ''C++'', ''Java''}
```



Phương thức `update()` của lớp set bao gồm các mục của tập hợp được chỉ định dưới dạng đối số. Nếu các phần tử trong tập hợp khác có một hoặc nhiều phần tử đã tồn tại, chúng sẽ không được bao gồm.

**Cú Pháp:**
```python
set.update(obj)
```

**Tham Số:**
- `obj` − một tập hợp hoặc một đối tượng chuỗi (list, tuple, string).



```python
lang1 = {"C", "C++", "Java", "Python"}
lang2 = {"PHP", "C#", "Perl"}
lang1.update(lang2)
print(lang1)
```

Kết quả sẽ là:

```
{''Python'', ''Java'', ''C'', ''C#'', ''PHP'', ''Perl'', ''C++''}
```



Phương thức `update()` cũng chấp nhận bất kỳ đối tượng chuỗi nào là đối số. Ở đây, một tuple là đối số cho phương thức `update()`.



```python
lang1 = {"C", "C++", "Java", "Python"}
lang2 = ("PHP", "C#", "Perl")
lang1.update(lang2)
print(lang1)
```

Kết quả sẽ là:

```
{''Java'', ''Perl'', ''Python'', ''C++'', ''C#'', ''C'', ''PHP''}
```

**Lưu Ý:** Bạn cũng có thể sử dụng phương thức `union()` hoặc phương thức `|` để thực hiện phép hợp các tập hợp.

Trong Python, tập hợp là một loại dữ liệu mạnh mẽ cho việc làm việc với các tập hợp các mục duy nhất, và có nhiều cách để thêm các mục vào một tập hợp một cách linh hoạt.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 3. Python - Xóa Các Phần Tử của Tập Hợp',
    'Bài 3. Python - Xóa Các Phần Tử của Tập Hợp',
    3,
    'Trong Python, lớp `set` cung cấp các phương thức khác nhau để loại bỏ một hoặc nhiều phần tử từ một đối tượng tập hợp.





Phương thức `remove()` loại bỏ phần tử được chỉ định khỏi tập hợp, nếu nó tồn tại trong đó. Tuy nhiên, nếu không tồn tại, nó sẽ gây ra lỗi KeyError.

**Cú Pháp:**
```python
set.remove(obj)
```

**Tham Số:**
- `obj` − một đối tượng bất biến.

**Ví dụ:**
```python
lang1 = {"C", "C++", "Java", "Python"}
print("Tập hợp trước khi xóa: ", lang1)
lang1.remove("Java")
print("Tập hợp sau khi xóa: ", lang1)
lang1.remove("PHP")  # KeyError: ''PHP''
```



Phương thức `discard()` trong lớp set tương tự như phương thức `remove()`. Sự khác biệt duy nhất là nó không gây ra lỗi nếu đối tượng cần loại bỏ không tồn tại trong tập hợp.

**Cú Pháp:**
```python
set.discard(obj)
```

**Tham Số:**
- `obj` − Một đối tượng bất biến.

**Ví dụ:**
```python
lang1 = {"C", "C++", "Java", "Python"}
print("Tập hợp trước khi loại bỏ C++: ", lang1)
lang1.discard("C++")
print("Tập hợp sau khi loại bỏ C++: ", lang1)
print("Tập hợp trước khi loại bỏ PHP: ", lang1)
lang1.discard("PHP")
print("Tập hợp sau khi loại bỏ PHP: ", lang1)
```



Phương thức `pop()` trong lớp set loại bỏ một phần tử tùy ý khỏi tập hợp. Phần tử bị loại bỏ sẽ được trả về bởi phương thức. Loại bỏ từ một tập hợp rỗng sẽ gây ra lỗi KeyError.

**Cú Pháp:**
```python
obj = set.pop()
```

**Giá trị Trả về:**
Phương thức `pop()` trả về đối tượng được loại bỏ từ tập hợp.

**Ví dụ:**
```python
lang1 = {"C", "C++"}
print("Tập hợp trước khi loại bỏ: ", lang1)
obj = lang1.pop()
print("Đối tượng đã bị loại bỏ: ", obj)
print("Tập hợp sau khi loại bỏ: ", lang1)
obj = lang1.pop()
obj = lang1.pop()
```



Phương thức `clear()` trong lớp set loại bỏ tất cả các phần tử trong tập hợp, tạo ra một tập hợp trống.

**Cú Pháp:**
```python
set.clear()
```

**Ví dụ:**
```python
lang1 = {"C", "C++", "Java", "Python"}
print(lang1)
print("Sau khi sử dụng clear():")
lang1.clear()
print(lang1)
```



Trên đây là một số phương thức trong Python để loại bỏ các phần tử từ một tập hợp. Các phương thức này rất hữu ích trong quá trình làm việc với dữ liệu trong Python.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 4. Python - Lặp Qua Tập Hợp',
    'Bài 4. Python - Lặp Qua Tập Hợp',
    4,
    'Tập hợp trong Python không phải là một chuỗi, cũng không phải là một lớp kiểu ánh xạ. Do đó, các đối tượng trong một tập hợp không thể được duyệt bằng chỉ số hoặc khóa. Tuy nhiên, bạn có thể duyệt qua từng phần tử trong một tập hợp bằng cách sử dụng một vòng lặp for.

**Ví dụ:**
```python
langs = {"C", "C++", "Java", "Python"}
for lang in langs:
   print (lang)
```

Kết quả sẽ là:

```
C
Python
C++
Java
```



Dưới đây là ví dụ về cách chạy một vòng lặp for qua các phần tử của một tập hợp và sử dụng phương thức `add()` của lớp set để thêm vào một tập hợp khác.

**Ví dụ:**
```python
s1={1,2,3,4,5}
s2={4,5,6,7,8}
for x in s2:
   s1.add(x)
print (s1)
```

Kết quả sẽ là:

```
{1, 2, 3, 4, 5, 6, 7, 8}
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 5. Python - Kết Hợp Các Tập Hợp',
    'Bài 5. Python - Kết Hợp Các Tập Hợp',
    5,
    'Ký hiệu "|" (dấu đường ống) được định nghĩa như là toán tử hợp nhất. Nó thực hiện phép toán A∪B và trả về một tập hợp các phần tử trong A, B hoặc cả hai. Tập hợp không cho phép các phần tử trùng lặp.

**Ví dụ:**
```python
s1={1,2,3,4,5}
s2={4,5,6,7,8}
s3 = s1|s2
print (s3)
```

Kết quả sẽ là:

```
{1, 2, 3, 4, 5, 6, 7, 8}
```



Lớp set có phương thức union() thực hiện cùng một phép toán như toán tử |. Nó trả về một đối tượng tập hợp chứa tất cả các phần tử trong cả hai tập hợp, loại bỏ các phần tử trùng lặp.

**Ví dụ:**
```python
s1={1,2,3,4,5}
s2={4,5,6,7,8}
s3 = s1.union(s2)
print (s3)
```



Phương thức update() cũng kết hợp hai tập hợp, nhưng khác với phương thức union(), nó không trả về một đối tượng tập hợp mới. Thay vào đó, các phần tử của tập hợp thứ hai được thêm vào tập hợp đầu tiên, và các phần tử trùng lặp không được phép.

**Ví dụ:**
```python
s1={1,2,3,4,5}
s2={4,5,6,7,8}
s1.update(s2)
print (s1)
```



Trong Python, ký hiệu "*" được sử dụng như là toán tử unpacking. Toán tử unpacking gán mỗi phần tử trong một bộ sưu tập cho một biến riêng biệt.

**Ví dụ:**
```python
s1={1,2,3,4,5}
s2={4,5,6,7,8}
s3 = {*s1, *s2}
print (s3)
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 6. Python - Sao Chép Tập Hợp',
    'Bài 6. Python - Sao Chép Tập Hợp',
    6,
    'Phương thức `copy()` trong lớp set tạo một bản sao sâu của một đối tượng tập hợp.

**Cú Pháp**
```python
set.copy()
```

**Giá Trị Trả Về**
Phương thức `copy()` trả về một tập hợp mới là một bản sao sâu của tập hợp hiện tại.

**Ví dụ**
```python
lang1 = {"C", "C++", "Java", "Python"}
print ("lang1: ", lang1, "id(lang1): ", id(lang1))
lang2 = lang1.copy()
print ("lang2: ", lang2, "id(lang2): ", id(lang2))
lang1.add("PHP")
print ("After updating lang1")
print ("lang1: ", lang1, "id(lang1): ", id(lang1))
print ("lang2: ", lang2, "id(lang2): ", id(lang2))
```

**Kết Quả**
```
lang1: {''Python'', ''Java'', ''C'', ''C++''} id(lang1): 2451578196864
lang2: {''Python'', ''Java'', ''C'', ''C++''} id(lang2): 2451578197312
After updating lang1
lang1: {''Python'', ''C'', ''C++'', ''PHP'', ''Java''} id(lang1): 2451578196864
lang2: {''Python'', ''Java'', ''C'', ''C++''} id(lang2): 2451578197312
```

Trong ví dụ này, chúng ta sao chép `lang1` thành `lang2` bằng cách sử dụng phương thức `copy()`. Sau đó, khi thêm phần tử "PHP" vào `lang1`, `lang2` không bị ảnh hưởng vì chúng là hai tập hợp khác biệt.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 7. Python - Toán Tử Tập Hợp',
    'Bài 7. Python - Toán Tử Tập Hợp',
    7,
    'Hợp của hai tập hợp là một tập hợp chứa tất cả các phần tử nằm trong A hoặc trong B hoặc cả hai. Ví dụ:

{1,2}∪{2,3}={1,2,3}

Python sử dụng ký hiệu "|" như là toán tử hợp. Ví dụ sau sử dụng toán tử "|" và trả về hợp của hai tập hợp.

**Ví dụ**
```python
s1 = {1,2,3,4,5}
s2 = {4,5,6,7,8}
s3 = s1 | s2
print ("Hợp của s1 và s2: ", s3)
```

**Kết Quả**
```
Hợp của s1 và s2: {1, 2, 3, 4, 5, 6, 7, 8}
```



Giao của hai tập hợp AA và BB, được ký hiệu bởi A∩B, bao gồm tất cả các phần tử đồng thời thuộc A và B. Ví dụ:

{1,2}∩{2,3}={2}

Python sử dụng ký hiệu "&" như là toán tử giao. Ví dụ sau sử dụng toán tử "&" và trả về giao của hai tập hợp.

**Ví dụ**
```python
s1 = {1,2,3,4,5}
s2 = {4,5,6,7,8}
s3 = s1 & s2
print ("Giao của s1 và s2: ", s3)
```

**Kết Quả**
```
Giao của s1 và s2: {4, 5}
```



Hiệu (hoặc sự trừ) được định nghĩa như sau. Tập A−B bao gồm các phần tử thuộc A nhưng không thuộc B. Ví dụ:

Nếu A={1,2,3} và B={3,5}, thì A−B={1,2}

Python sử dụng ký hiệu "-" như là toán tử hiệu.

**Ví dụ**
```python
s1 = {1,2,3,4,5}
s2 = {4,5,6,7,8}
s3 = s1 - s2
print ("Hiệu của s1 - s2: ", s3)
s3 = s2 - s1
print ("Hiệu của s2 - s1: ", s3)
```

**Kết Quả**
```
Hiệu của s1 - s2: {1, 2, 3}
Hiệu của s2 - s1: {8, 6, 7}
```



Hiệu đối xứng của A và B được ký hiệu là "A Δ B" và được định nghĩa bởi

A Δ B = (A − B) ⋃ (B − A)

Python sử dụng ký hiệu "^" như là toán tử hiệu đối xứng.

**Ví dụ**
```python
s1 = {1,2,3,4,5}
s2 = {4,5,6,7,8}
s3 = s1 - s2
print ("Hiệu của s1 - s2: ", s3)
s3 = s2 - s1
print ("Hiệu của s2 - s1: ", s3)
s3 = s1 ^ s2
print ("Hiệu Đối Xứng trong s1 và s2: ", s3)
```

**Kết Quả**
```
Hiệu của s1 - s2: {1, 2, 3}
Hiệu của s2 - s1: {8, 6, 7}
Hiệu Đối Xứng trong s1 và s2: {1, 2, 3, 6, 7, 8}
```
*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 6: Tập hợp (Set)' LIMIT 1),
    'Bài 8. Python - Các Phương Thức của Tập Hợp',
    'Bài 8. Python - Các Phương Thức của Tập Hợp',
    8,
    'Trong lớp tập hợp của Python, các phương thức sau được định nghĩa:

1. **add()**: Thêm một phần tử vào tập hợp.
   
2. **clear()**: Xóa tất cả các phần tử khỏi tập hợp.

3. **copy()**: Trả về một bản sao nông (shallow copy) của tập hợp.

4. **difference()**: Trả về hiệu của hai hoặc nhiều tập hợp khác nhau dưới dạng một tập hợp mới.

5. **difference_update()**: Xóa tất cả các phần tử của một tập hợp khác ra khỏi tập hợp này.

6. **discard()**: Xóa một phần tử khỏi tập hợp nếu nó là thành viên của tập hợp.

7. **intersection()**: Trả về giao của hai tập hợp dưới dạng một tập hợp mới.

8. **intersection_update()**: Cập nhật một tập hợp với giao của chính nó và một tập hợp khác.

9. **isdisjoint()**: Trả về True nếu hai tập hợp có giao nhau rỗng.

10. **issubset()**: Trả về True nếu một tập hợp khác chứa tập hợp này.

11. **issuperset()**: Trả về True nếu tập hợp này chứa một tập hợp khác.

12. **pop()**: Xóa và trả về một phần tử tùy ý từ tập hợp.

13. **remove()**: Xóa một phần tử khỏi tập hợp; phần tử đó phải là thành viên của tập hợp.

14. **symmetric_difference()**: Trả về hiệu đối xứng của hai tập hợp dưới dạng một tập hợp mới.

15. **symmetric_difference_update()**: Cập nhật một tập hợp với hiệu đối xứng của chính nó và một tập hợp khác.

16. **union()**: Trả về hợp của các tập hợp dưới dạng một tập hợp mới.

17. **update()**: Cập nhật một tập hợp với hợp của chính nó và các tập hợp khác.',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 0. Python - Từ Điển (Dictionaries)',
    'Bài 0. Python - Từ Điển (Dictionaries)',
    0,
    'Từ điển (dictionary) là một trong những kiểu dữ liệu tích hợp sẵn trong Python. Từ điển trong Python là một ví dụ về kiểu ánh xạ (mapping type). Một đối tượng ánh xạ "ánh xạ" giá trị của một đối tượng khác.

Trong một từ điển ngôn ngữ, chúng ta có các cặp từ và nghĩa tương ứng. Hai phần của cặp là key (từ) và value (nghĩa). Tương tự, từ điển Python cũng là một tập hợp các cặp key:value. Các cặp được phân tách bằng dấu phẩy và đặt trong dấu ngoặc nhọn {}.

Dưới đây là một số ví dụ về các đối tượng từ điển Python:

```python
capitals = {"Maharashtra":"Mumbai", "Gujarat":"Gandhinagar", "Telangana":"Hyderabad", "Karnataka":"Bengaluru"}
numbers = {10:"Ten", 20:"Twenty", 30:"Thirty",40:"Forty"}
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
```

**Ví dụ 1**:
Chỉ số, chuỗi hoặc tuple có thể được sử dụng làm key. Tất cả chúng đều là bất biến. Bạn có thể sử dụng một đối tượng của bất kỳ kiểu nào làm value. Vì vậy, các định nghĩa từ điển sau cũng hợp lệ:

```python
d1 = {"Fruit":["Mango","Banana"], "Flower":["Rose", "Lotus"]}
d2 = {(''India, USA''):''Countries'', (''New Delhi'', ''New York''):''Capitals''}
print (d1)
print (d2)
```

Kết quả sẽ là:

```
{''Fruit'': [''Mango'', ''Banana''], ''Flower'': [''Rose'', ''Lotus'']}
{''India, USA'': ''Countries'', (''New Delhi'', ''New York''): ''Capitals''}
```

**Ví dụ 2**:
Python không chấp nhận các đối tượng có thể thay đổi như danh sách (list) làm key, và sẽ gây ra TypeError.

```python
d1 = {["Mango","Banana"]:"Fruit", "Flower":["Rose", "Lotus"]}
print (d1)
```

Nó sẽ gây ra một TypeError.

**Ví dụ 3**:
Bạn có thể gán một giá trị cho nhiều key trong một từ điển, nhưng một key không thể xuất hiện nhiều hơn một lần trong một từ điển.

```python
d1 = {"Banana":"Fruit", "Rose":"Flower", "Lotus":"Flower", "Mango":"Fruit"}
d2 = {"Fruit":"Banana","Flower":"Rose", "Fruit":"Mango", "Flower":"Lotus"}
print (d1)
print (d2)
```

Kết quả sẽ là:

```
{''Banana'': ''Fruit'', ''Rose'': ''Flower'', ''Lotus'': ''Flower'', ''Mango'': ''Fruit''}
{''Fruit'': ''Mango'', ''Flower'': ''Lotus''}
**Toán tử của Từ Điển trong Python**

Trong Python, các toán tử sau được định nghĩa để sử dụng với các toán hạng từ điển. Trong ví dụ, các đối tượng từ điển sau được sử dụng:

```python
d1 = {''a'': 2, ''b'': 4, ''c'': 30}
d2 = {''a1'': 20, ''b1'': 40, ''c1'': 60}
```

| Toán tử   | Mô tả                              | Ví dụ                                                                               |
| --------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| dict[key] | Trích xuất/gán giá trị được ánh xạ | `print (d1[''b''])` trích xuất giá trị 4, `d1[''b''] = ''Z''` gán giá trị mới cho key ''b'' |
| dict1     | dict2                              | Hợp của hai đối tượng từ điển, trả về đối tượng mới                                 | `d3=d1 | d2 ; print (d3)` trả về `{''a'': 2, ''b'': 4, ''c'': 30, ''a1'': 20, ''b1'': 40, ''c1'': 60}` |
| dict1     | =dict2                             | Toán tử hợp của từ điển được bổ sung                                                | `d1    | =d2; print (d1)` trả về `{''a'': 2, ''b'': 4, ''c'': 30, ''a1'': 20, ''b1'': 40, ''c1'': 60}` |

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    TRUE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 1. Python - Truy Cập Các Mục của Từ Điển',
    'Bài 1. Python - Truy Cập Các Mục của Từ Điển',
    1,
    'Trong Python, bạn có thể sử dụng toán tử "[ ]" để truy xuất giá trị được liên kết với một key cụ thể trong đối tượng từ điển, mặc dù từ điển không phải là một chuỗi vì các phần tử trong từ điển không được đánh chỉ mục.

**Ví dụ 1**:

```python
capitals = {"Maharashtra":"Mumbai", "Gujarat":"Gandhinagar", "Telangana":"Hyderabad", "Karnataka":"Bengaluru"}
print ("Thủ đô của Gujarat là: ", capitals[''Gujarat''])
print ("Thủ đô của Karnataka là: ", capitals[''Karnataka''])
```

Kết quả sẽ là:

```
Thủ đô của Gujarat là: Gandhinagar
Thủ đô của Karnataka là: Bengaluru
```

**Ví dụ 2**:
Python sẽ gây ra một KeyError nếu key được đưa vào trong dấu ngoặc vuông không có trong đối tượng từ điển.

```python
capitals = {"Maharashtra":"Mumbai", "Gujarat":"Gandhinagar", "Telangana":"Hyderabad", "Karnataka":"Bengaluru"}
print ("Thủ đô của Haryana là: ", capitals[''Haryana''])
```

Nó sẽ gây ra một lỗi KeyError.

**Sử dụng Phương thức get()**:

Phương thức get() trong lớp dict của Python trả về giá trị được ánh xạ với key đã cho.

**Cú pháp**:

```python
val = dict.get("key")
```

**Tham số**:

- `key`: Một đối tượng không thay đổi được sử dụng làm key trong đối tượng từ điển.

**Giá trị Trả về**:

Phương thức get() trả về đối tượng được ánh xạ với key đã cho.

**Ví dụ 3**:

```python
capitals = {"Maharashtra":"Mumbai", "Gujarat":"Gandhinagar", "Telangana":"Hyderabad", "Karnataka":"Bengaluru"}
print ("Thủ đô của Gujarat là: ", capitals.get(''Gujarat''))
print ("Thủ đô của Karnataka là: ", capitals.get(''Karnataka''))
```

Kết quả sẽ là:

```
Thủ đô của Gujarat là: Gandhinagar
Thủ đô của Karnataka là: Bengaluru
```

**Ví dụ 4**:

Khác với toán tử "[]", phương thức get() không gây ra lỗi nếu key không được tìm thấy; nó trả về None.

```python
capitals = {"Maharashtra":"Mumbai", "Gujarat":"Gandhinagar", "Telangana":"Hyderabad", "Karnataka":"Bengaluru"}
print ("Thủ đô của Haryana là: ", capitals.get(''Haryana''))
```

Kết quả sẽ là:

```
Thủ đô của Haryana là: None
```

**Ví dụ 5**:

Phương thức get() chấp nhận một đối số chuỗi tùy chọn. Nếu nó được cung cấp và nếu key không được tìm thấy, chuỗi này sẽ trở thành giá trị trả về.

```python
capitals = {"Maharashtra":"Mumbai", "Gujarat":"Gandhinagar", "Telangana":"Hyderabad", "Karnataka":"Bengaluru"}
print ("Thủ đô của Haryana là: ", capitals.get(''Haryana'', ''Không tìm thấy''))
```

Kết quả sẽ là:

```
Thủ đô của Haryana là: Không tìm thấy
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 2. Python - Thay Đổi Các Mục của Từ Điển',
    'Bài 2. Python - Thay Đổi Các Mục của Từ Điển',
    2,
    'Ngoài cách biểu diễn từ điển bằng cách đặt các cặp key:value phân tách bằng dấu phẩy trong dấu ngoặc nhọn, chúng ta có thể tạo đối tượng từ điển bằng hàm tích hợp sẵn `dict()`.

**Tạo Đối Tượng Từ Điển Rỗng**

Sử dụng hàm `dict()` mà không có đối số nào tạo ra một đối tượng từ điển rỗng. Nó tương đương với việc không đặt gì giữa các dấu ngoặc nhọn.

**Ví dụ**:

```python
d1 = dict()
d2 = {}
print (''d1: '', d1)
print (''d2: '', d2)
```

Kết quả sẽ là:

```
d1: {}
d2: {}
```

**Tạo Đối Tượng Từ Điển từ Danh Sách hoặc Bộ Các Tuple**

Hàm `dict()` xây dựng một từ điển từ một danh sách hoặc bộ các tuple có hai phần tử. Phần tử đầu tiên trong một tuple được xem xét là key và phần thứ hai là giá trị tương ứng.

**Ví dụ**:

```python
d1=dict([(''a'', 100), (''b'', 200)])
d2 = dict(((''a'', ''one''), (''b'', ''two'')))
print (''d1: '', d1)
print (''d2: '', d2)
```

Kết quả sẽ là:

```
d1: {''a'': 100, ''b'': 200}
d2: {''a'': ''one'', ''b'': ''two''}
```

**Tạo Đối Tượng Từ Điển từ Các Đối Số Từ Khóa**

Hàm `dict()` có thể nhận bất kỳ số lượng đối số từ khóa nào với các cặp tên=giá trị. Nó trả về một đối tượng từ điển với tên là key và liên kết nó với giá trị tương ứng.

**Ví dụ**:

```python
d1=dict(a= 100, b=200)
d2 = dict(a=''one'', b=''two'')
print (''d1: '', d1)
print (''d2: '', d2)
```

Kết quả sẽ là:

```
d1: {''a'': 100, ''b'': 200}
d2: {''a'': ''one'', ''b'': ''two''}
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 3. Python - Thêm Mục vào Từ Điển',
    'Bài 3. Python - Thêm Mục vào Từ Điển',
    3,
    'Toán tử "[]" (được sử dụng để truy cập giá trị được ánh xạ với một key trong từ điển) được sử dụng để cập nhật một cặp key-value hiện có cũng như thêm một cặp mới.

**Cú Pháp**:
```python
dict["key"] = val
```

Nếu key đã tồn tại trong đối tượng từ điển, giá trị của nó sẽ được cập nhật thành val. Nếu key không tồn tại trong từ điển, một cặp key-value mới sẽ được thêm vào.

**Ví dụ**:

```python
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
print ("Từ điển marks trước khi cập nhật: ", marks)
marks[''Laxman''] = 95
print ("Từ điển marks sau khi cập nhật: ", marks)
```

Kết quả sẽ là:

```
Từ điển marks trước khi cập nhật: {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49}
Từ điển marks sau khi cập nhật: {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 95, ''David'': 49}
```

**Ví dụ**:

Tuy nhiên, một mục với key ''Krishnan'' không có trong từ điển, do đó một cặp key-value mới được thêm vào.

```python
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
print ("Từ điển marks trước khi cập nhật: ", marks)
marks[''Krishan''] = 74
print ("Từ điển marks sau khi cập nhật: ", marks)
```

Kết quả sẽ là:

```
Từ điển marks trước khi cập nhật: {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49}
Từ điển marks sau khi cập nhật: {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49, ''Krishan'': 74}
```


Bạn có thể sử dụng phương thức `update()` trong lớp dict theo ba cách khác nhau:


Trong trường hợp này, đối số của phương thức `update()` là một từ điển khác. Giá trị của các key phổ biến trong cả hai từ điển được cập nhật. Đối với các key mới, cặp key-value được thêm vào từ điển hiện tại.

**Cú Pháp**:
```python
d1.update(d2)
```

**Ví dụ**:

```python
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
print ("Từ điển marks trước khi cập nhật: \n", marks)
marks1 = {"Sharad": 51, "Mushtaq": 61, "Laxman": 89}
marks.update(marks1)
print ("Từ điển marks sau khi cập nhật: \n", marks)
```

Kết quả sẽ là:

```
Từ điển marks trước khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49}
Từ điển marks sau khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 89, ''David'': 49, ''Sharad'': 51, ''Mushtaq'': 61}
```


Nếu đối số của phương thức `update()` là một danh sách hoặc bộ các tuple có hai phần tử, một mục cho mỗi phần tử sẽ được thêm vào từ điển hiện tại, hoặc được cập nhật nếu key đã tồn tại.

**Cú Pháp**:
```python
d1.update([(k1, v1), (k2, v2)])
```

**Ví dụ**:

```python
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
print ("Từ điển marks trước khi cập nhật: \n", marks)
marks1 = [("Sharad",

 51), ("Mushtaq", 61), ("Laxman", 89)]
marks.update(marks1)
print ("Từ điển marks sau khi cập nhật: \n", marks)
```

Kết quả sẽ là:

```
Từ điển marks trước khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49}
Từ điển marks sau khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 89, ''David'': 49, ''Sharad'': 51, ''Mushtaq'': 61}
```


Phiên bản thứ ba của phương thức `update()` chấp nhận một danh sách các đối số từ khóa trong định dạng tên=giá trị. Các cặp key-value mới được thêm vào, hoặc giá trị của key hiện có được cập nhật.

**Cú Pháp**:
```python
d1.update(k1=v1, k2=v2)
```

**Ví dụ**:

```python
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
print ("Từ điển marks trước khi cập nhật: \n", marks)
marks.update(Sharad = 51, Mushtaq = 61, Laxman = 89)
print ("Từ điển marks sau khi cập nhật: \n", marks)
```

Kết quả sẽ là:

```
Từ điển marks trước khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49}
Từ điển marks sau khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 89, ''David'': 49, ''Sharad'': 51, ''Mushtaq'': 61}
```


Ký hiệu "**" được đặt trước một đối tượng từ điển giải nén nó thành một danh sách các tuple, mỗi tuple với key và value. Hai đối tượng dict được giải nén và kết hợp lại với nhau để thu được một từ điển mới.

**Cú Pháp**:
```python
d3 = {**d1, **d2}
```

**Ví dụ**:

```python
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
print ("Từ điển marks trước khi cập nhật: \n", marks)
marks1 = {"Sharad": 51, "Mushtaq": 61, "Laxman": 89}
newmarks = {**marks, **marks1}
print ("Từ điển marks sau khi cập nhật: \n", newmarks)
```

Kết quả sẽ là:

```
Từ điển marks trước khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49}
Từ điển marks sau khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 89, ''David'': 49, ''Sharad'': 51, ''Mushtaq'': 61}
```


Python giới thiệu "|" (ký hiệu đường ống) làm toán tử union cho các toán hạng từ điển. Nó cập nhật các key đã tồn tại trong đối tượng dict bên trái và thêm các cặp key-value mới để trả về một đối tượng dict mới.

**Cú Pháp**:
```python
d3 = d1 | d2
```

**Ví dụ**:

```python
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
print ("Từ điển marks trước khi cập nhật: \n", marks)
marks1 = {"Sharad": 51, "Mushtaq": 61, "Laxman": 89}
newmarks = marks | marks1
print ("Từ điển marks sau khi cập nhật: \n", newmarks)
```

Kết quả sẽ là:

```
Từ điển marks trước khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49}
Từ điển marks sau khi cập nhật:
 {''Sav

ita'': 67, ''Imtiaz'': 88, ''Laxman'': 89, ''David'': 49, ''Sharad'': 51, ''Mushtaq'': 61}
```


Toán tử "|=" là một toán tử Union được bổ sung. Nó thực hiện cập nhật trong chỗ trên toán tử từ điển ở bên trái bằng cách thêm các key mới trong toán tử từ điển ở bên phải, và cập nhật các key đã tồn tại.

**Cú Pháp**:
```python
d1 |= d2
```

**Ví dụ**:

```python
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
print ("Từ điển marks trước khi cập nhật: \n", marks)
marks1 = {"Sharad": 51, "Mushtaq": 61, "Laxman": 89}
marks |= marks1
print ("Từ điển marks sau khi cập nhật: \n", marks)
```

Kết quả sẽ là:

```
Từ điển marks trước khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 91, ''David'': 49}
Từ điển marks sau khi cập nhật:
 {''Savita'': 67, ''Imtiaz'': 88, ''Laxman'': 89, ''David'': 49, ''Sharad'': 51, ''Mushtaq'': 61}
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 4. Python - Xóa các Phần Tử trong Từ Điển Python',
    'Bài 4. Python - Xóa các Phần Tử trong Từ Điển Python',
    4,
    'Trong Python, có một số cách để xóa các phần tử khỏi một từ điển (dictionary). Dưới đây là các phương pháp thường được sử dụng:



Từ khóa `del` của Python được sử dụng để xóa một phần tử từ một từ điển.

**Cú pháp:**
```python
del dict[''key'']
```

**Ví dụ:**
```python
numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
print("Từ điển numbers trước khi xóa: \n", numbers)
del numbers[20]
print("Từ điển numbers sau khi xóa: \n", numbers)
```

Kết quả:
```
Từ điển numbers trước khi xóa:
 {10: ''Ten'', 20: ''Twenty'', 30: ''Thirty'', 40: ''Forty''}
Từ điển numbers sau khi xóa:
 {10: ''Ten'', 30: ''Thirty'', 40: ''Forty''}
```



Phương thức `pop()` của lớp `dict` gây ra việc loại bỏ một phần tử với key đã chỉ định khỏi từ điển.

**Cú Pháp:**
```python
val = dict.pop(key)
```

**Ví dụ:**
```python
numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
print("Từ điển numbers trước khi pop: \n", numbers)
val = numbers.pop(20)
print("Từ điển numbers sau khi pop: \n", numbers)
print("Giá trị pop: ", val)
```

Kết quả:
```
Từ điển numbers trước khi pop: 
 {10: ''Ten'', 20: ''Twenty'', 30: ''Thirty'', 40: ''Forty''}
Từ điển numbers sau khi pop: 
 {10: ''Ten'', 30: ''Thirty'', 40: ''Forty''}
Giá trị pop:  Twenty
```



Phương thức `popitem()` trong lớp `dict` không nhận bất kỳ đối số nào. Nó loại bỏ cặp key-value được chèn cuối cùng và trả về nó dưới dạng một bộ giá trị.

**Cú Pháp:**
```python
val = dict.popitem()
```

**Ví dụ:**
```python
numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
print("Từ điển numbers trước khi pop: \n", numbers)
val = numbers.popitem()
print("Từ điển numbers sau khi pop: \n", numbers)
print("Giá trị pop: ", val)
```

Kết quả:
```
Từ điển numbers trước khi pop: 
 {10: ''Ten'', 20: ''Twenty'', 30: ''Thirty'', 40: ''Forty''}
Từ điển numbers sau khi pop: 
 {10: ''Ten'', 20: ''Twenty'', 30: ''Thirty''}
Giá trị pop:  (40, ''Forty'')
```



Phương thức `clear()` trong lớp `dict` loại bỏ tất cả các phần tử từ đối tượng từ điển và trả về một đối tượng trống.

**Cú Pháp:**
```python
dict.clear()
```

**Ví dụ:**
```python
numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
print("Từ điển numbers trước khi clear: \n", numbers)
numbers.clear()
print("Từ điển numbers sau khi clear: \n", numbers)
```

Kết quả:
```
Từ điển numbers trước khi clear: 
 {10: ''Ten'', 20: ''Twenty'', 30: ''Thirty'', 40: ''Forty''}
Từ điển numbers sau khi clear: 
 {}
```

Các phương thức và từ khóa này cho phép bạn linh hoạt trong việc xóa và quản lý các phần tử trong từ điển Python.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 5. Python - Đối Tượng Xem Từ Điển trong Python',
    'Bài 5. Python - Đối Tượng Xem Từ Điển trong Python',
    5,
    'Trong Python, các phương thức items(), keys() và values() của lớp dict trả về các đối tượng xem (view objects). Các xem này được cập nhật động mỗi khi có bất kỳ thay đổi nào trong nội dung của đối tượng từ điển gốc của chúng.



Phương thức items() trả về một đối tượng dict_items xem. Nó chứa một danh sách các bộ, mỗi bộ được tạo thành từ các cặp key, value tương ứng.

**Cú Pháp:**
```python
obj = dict.items()
```

**Giá Trị Trả Về:**
Phương thức items() trả về đối tượng dict_items, đó là một xem động của các bộ (key, value).

**Ví dụ:**
```python
numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
obj = numbers.items()
print(''Kiểu của obj: '', type(obj))
print(obj)
print("Cập nhật từ điển numbers")
numbers.update({50: "Fifty"})
print("Xem được cập nhật tự động")
print(obj)
```

Kết quả:
```
Kiểu của obj:  <class ''dict_items''>
dict_items([(10, ''Ten''), (20, ''Twenty''), (30, ''Thirty''), (40, ''Forty'')])
Cập nhật từ điển numbers
Xem được cập nhật tự động
dict_items([(10, ''Ten''), (20, ''Twenty''), (30, ''Thirty''), (40, ''Forty''), (50, ''Fifty'')])
```



Phương thức keys() của lớp dict trả về đối tượng dict_keys, đó là một danh sách của tất cả các key được xác định trong từ điển. Đây là một đối tượng xem, vì nó được cập nhật tự động mỗi khi có bất kỳ hành động cập nhật nào được thực hiện trên đối tượng từ điển.

**Cú Pháp:**
```python
obj = dict.keys()
```

**Giá Trị Trả Về:**
Phương thức keys() trả về đối tượng dict_keys, đó là một xem của các keys trong từ điển.

**Ví dụ:**
```python
numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
obj = numbers.keys()
print(''Kiểu của obj: '', type(obj))
print(obj)
print("Cập nhật từ điển numbers")
numbers.update({50: "Fifty"})
print("Xem được cập nhật tự động")
print(obj)
```

Kết quả:
```
Kiểu của obj:  <class ''dict_keys''>
dict_keys([10, 20, 30, 40])
Cập nhật từ điển numbers
Xem được cập nhật tự động
dict_keys([10, 20, 30, 40, 50])
```



Phương thức values() trả về một xem của tất cả các giá trị có trong từ điển. Đối tượng là kiểu dict_values, được cập nhật tự động.

**Cú Pháp:**
```python
obj = dict.values()
```

**Giá Trị Trả Về:**
Phương thức values() trả về một xem dict_values của tất cả các giá trị có trong từ điển.

**Ví dụ:**
```python
numbers = {10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty"}
obj = numbers.values()
print(''Kiểu của obj: '', type(obj))
print(obj)
print("Cập nhật từ điển numbers")
numbers.update({50: "Fifty"})
print("Xem được cập nhật tự động")
print(obj)
```

Kết quả:
```
Kiểu của obj:  <class ''dict_values''>
dict_values([''Ten'', ''Twenty'', ''Thirty'', ''Forty''])
Cập nhật từ điển numbers
Xem được cập nhật tự động
dict_values([''Ten'', ''Twenty'', ''Thirty'', ''Forty'', ''Fifty''])
```

Các phương thức items(), keys() và values() cho phép bạn truy cập vào dữ liệu trong từ điển một cách linh hoạt và tiện lợi, đồng thời tự động cập nhật các xem của chúng khi có sự thay đổi trong từ điển gốc.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 6. Python - Sao Chép Từ Điển trong Python',
    'Bài 6. Python - Sao Chép Từ Điển trong Python',
    6,
    'Trong Python, vì một biến chỉ là một nhãn hoặc tham chiếu đến một đối tượng trong bộ nhớ, toán tử gán đơn giản không tạo ra bản sao của đối tượng.

**Ví dụ 1:**

Trong ví dụ này, chúng ta có một từ điển "d1" và chúng ta gán nó cho một biến khác "d2". Nếu "d1" được cập nhật, các thay đổi cũng phản ánh trong "d2".

```python
d1 = {"a":11, "b":22, "c":33}
d2 = d1
print ("id:", id(d1), "dict: ",d1)
print ("id:", id(d2), "dict: ",d2)

d1["b"] = 100
print ("id:", id(d1), "dict: ",d1)
print ("id:", id(d2), "dict: ",d2)
```

Kết quả:
```
id: 2215278891200 dict: {''a'': 11, ''b'': 22, ''c'': 33}
id: 2215278891200 dict: {''a'': 11, ''b'': 22, ''c'': 33}
id: 2215278891200 dict: {''a'': 11, ''b'': 100, ''c'': 33}
id: 2215278891200 dict: {''a'': 11, ''b'': 100, ''c'': 33}
```

Để tránh điều này và tạo một bản sao nông (shallow copy) của một từ điển, sử dụng phương thức copy() thay vì toán tử gán.

**Ví dụ 2:**

```python
d1 = {"a":11, "b":22, "c":33}
d2 = d1.copy()
print ("id:", id(d1), "dict: ",d1)
print ("id:", id(d2), "dict: ",d2)
d1["b"] = 100
print ("id:", id(d1), "dict: ",d1)
print ("id:", id(d2), "dict: ",d2)
```

Kết quả:
```
Khi "d1" được cập nhật, "d2" sẽ không thay đổi bây giờ vì "d2" là bản sao của đối tượng từ điển, không chỉ là một tham chiếu.

id: 1586671734976 dict: {''a'': 11, ''b'': 22, ''c'': 33}
id: 1586673973632 dict: {''a'': 11, ''b'': 22, ''c'': 33}
id: 1586671734976 dict: {''a'': 11, ''b'': 100, ''c'': 33}
id: 1586673973632 dict: {''a'': 11, ''b'': 22, ''c'': 33}
```

Trong ví dụ thứ hai, khi "d1" được cập nhật, "d2" không thay đổi, vì "d2" là một bản sao của đối tượng từ điển, không chỉ là một tham chiếu.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 7. Python - Từ Điển Lồng Nhau trong Python',
    'Bài 7. Python - Từ Điển Lồng Nhau trong Python',
    7,
    'Trong Python, một từ điển được gọi là có cấu trúc lồng nhau nếu giá trị của một hoặc nhiều key là một từ điển khác. Một từ điển lồng nhau thường được sử dụng để lưu trữ một cấu trúc dữ liệu phức tạp.

Đoạn mã sau đại diện cho một từ điển lồng nhau:

```python
marklist = {
   "Mahesh" : {"Phy" : 60, "maths" : 70},
   "Madhavi" : {"phy" : 75, "maths" : 68},
   "Mitchell" : {"phy" : 67, "maths" : 71}
}
```

**Ví dụ 1:**
Bạn cũng có thể sử dụng một vòng lặp for để duyệt qua từ điển lồng nhau, như trong phần trước.

```python
marklist = {
   "Mahesh" : {"Phy" : 60, "maths" : 70},
   "Madhavi" : {"phy" : 75, "maths" : 68},
   "Mitchell" : {"phy" : 67, "maths" : 71}
}
for k,v in marklist.items():
   print (k, ":", v)
```

Kết quả:
```
Mahesh : {''Phy'': 60, ''maths'': 70}
Madhavi : {''phy'': 75, ''maths'': 68}
Mitchell : {''phy'': 67, ''maths'': 71}
```

**Ví dụ 2:**
Có thể truy cập giá trị từ một từ điển lồng nhau bằng cách sử dụng [] hoặc phương thức get().

```python
print(marklist.get("Madhavi")[''maths''])
obj = marklist[''Mahesh'']
print(obj.get(''Phy''))
print(marklist[''Mitchell''].get(''maths''))
```

Kết quả:
```
68
60
71
```

Trong ví dụ này, chúng ta truy cập các giá trị từ từ điển lồng nhau bằng cách sử dụng các key và phương thức get().

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 7: Từ điển (Dictionary)' LIMIT 1),
    'Bài 8. Python - Các Phương Thức của Từ Điển trong Python',
    'Bài 8. Python - Các Phương Thức của Từ Điển trong Python',
    8,
    'Trong Python, một từ điển là một đối tượng của lớp dict tích hợp, được định nghĩa các phương thức sau:

1. **`dict.clear()`**: Xóa tất cả các phần tử của từ điển `dict`.
2. **`dict.copy()`**: Trả về một bản sao nông của từ điển `dict`.
3. **`dict.fromkeys(seq, value)`**: Tạo một từ điển mới với các khóa từ `seq` và các giá trị được đặt thành `value`.
4. **`dict.get(key, default=None)`**: Đối với khóa `key`, trả về giá trị hoặc `default` nếu `key` không có trong từ điển.
5. **`dict.has_key(key)`**: Trả về `True` nếu một khóa cụ thể có sẵn trong từ điển, nếu không, trả về `False`.
6. **`dict.items()`**: Trả về một danh sách các cặp tuple (khóa, giá trị) của từ điển.
7. **`dict.keys()`**: Trả về danh sách các khóa của từ điển `dict`.
8. **`dict.pop(key)`**: Xóa phần tử với khóa được chỉ định khỏi từ điển.
9. **`dict.popitem()`**: Xóa cặp key-value được chèn cuối cùng.
10. **`dict.setdefault(key, default=None)`**: Tương tự như `get()`, nhưng sẽ đặt `dict[key]=default` nếu `key` chưa tồn tại trong `dict`.
11. **`dict.update(dict2)`**: Thêm các cặp key-value của từ điển `dict2` vào `dict`.
12. **`dict.values()`**: Trả về danh sách các giá trị của từ điển `dict`.',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 8: Tuple' LIMIT 1),
    'Bài 0. Python - Tuple (Bộ)',
    'Bài 0. Python - Tuple (Bộ)',
    0,
    'Trong Python, Tuple là một trong những kiểu dữ liệu có sẵn. Một Tuple Python là một chuỗi các mục được phân tách bằng dấu phẩy, được đặt trong dấu ngoặc đơn (). Các mục trong Tuple Python không nhất thiết phải cùng loại dữ liệu.

Dưới đây là một số ví dụ về Tuple Python:

```python
tup1 = ("Rohan", "Physics", 21, 69.75)
tup2 = (1, 2, 3, 4, 5)
tup3 = ("a", "b", "c", "d")
tup4 = (25.50, True, -55, 1+2j)
```

Trong Python, Tuple là một kiểu dữ liệu chuỗi. Đó là một bộ sưu tập các mục được sắp xếp. Mỗi mục trong Tuple có một chỉ mục vị trí duy nhất, bắt đầu từ 0.

Trong C/C++/Java, các phần tử mảng phải cùng loại. Tuy nhiên, Tuple Python có thể chứa các đối tượng khác nhau về kiểu dữ liệu.

Tuple Python và danh sách đều là các chuỗi. Một khác biệt chính giữa hai loại này là, danh sách Python có thể thay đổi, trong khi Tuple không thể thay đổi. Mặc dù bạn có thể truy cập vào bất kỳ mục nào trong Tuple bằng cách sử dụng chỉ mục của nó và không thể sửa đổi, xóa hoặc thêm.



Trong Python, Tuple là một chuỗi. Do đó, chúng ta có thể nối hai tuple với toán tử + và nối nhiều bản sao của một tuple với toán tử "*". Các toán tử thành viên "in" và "not in" hoạt động với đối tượng tuple.

| Biểu thức Python      | Kết quả                      | Mô tả           |
| --------------------- | ---------------------------- | --------------- |
| (1, 2, 3) + (4, 5, 6) | (1, 2, 3, 4, 5, 6)           | Nối             |
| (''Hi!'',) * 4          | (''Hi!'', ''Hi!'', ''Hi!'', ''Hi!'') | Lặp lại         |
| 3 in (1, 2, 3)        | True                         | Tính thành viên |

Lưu ý rằng ngay cả khi chỉ có một đối tượng trong một Tuple, bạn phải đặt một dấu phẩy sau nó. Nếu không, nó sẽ được xem xét là một chuỗi.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    TRUE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 8: Tuple' LIMIT 1),
    'Bài 1. Python - Truy cập các mục Tuple',
    'Bài 1. Python - Truy cập các mục Tuple',
    1,
    'Trong Python, Tuple là một chuỗi. Mỗi đối tượng trong tuple có thể được truy cập bằng chỉ mục của nó. Chỉ mục bắt đầu từ "0". Chỉ mục của phần tử cuối cùng trong tuple là "length-1". Để truy cập giá trị trong các tuple, sử dụng dấu ngoặc vuông để cắt cùng với chỉ mục hoặc các chỉ mục để nhận giá trị có sẵn tại chỉ mục đó.

Toán tử lát cắt rút ra một hoặc nhiều mục từ tuple.

```python
obj = tup1[i]
```

Ví dụ:

```python
tup1 = ("Rohan", "Physics", 21, 69.75)
tup2 = (1, 2, 3, 4, 5)

print ("Item tại chỉ mục 0 trong tup1: ", tup1[0])
print ("Item tại chỉ mục 2 trong tup2: ", tup2[2])
```

Sẽ cho ra kết quả sau:

```
Item tại chỉ mục 0 trong tup1: Rohan
Item tại chỉ mục 2 trong tup2: 3
```

Truy cập các mục Tuple với Chỉ mục Âm
Python cho phép sử dụng chỉ mục âm với bất kỳ kiểu dữ liệu chuỗi nào. Chỉ mục "-1" đề cập đến mục cuối cùng trong tuple.

Ví dụ:

```python
tup1 = ("a", "b", "c", "d")
tup2 = (25.50, True, -55, 1+2j)
print ("Item tại chỉ mục 0 trong tup1: ", tup1[-1])
print ("Item tại chỉ mục 2 trong tup2: ", tup2[-3])
```

Sẽ cho ra kết quả sau:

```
Item tại chỉ mục 0 trong tup1: d
Item tại chỉ mục 2 trong tup2: True
```

Trích xuất một Tuple con từ một Tuple
Toán tử lát cắt rút ra một tuple con từ tuple gốc.

```python
Subtup = tup1[i:j]
```

Tham số:

- i − chỉ mục của mục đầu tiên trong subtup.
- j − chỉ mục của mục tiếp theo sau mục cuối cùng trong subtup.

Điều này sẽ trả về một lát cắt từ mục thứ i đến (j-1) từ tup1.

Ví dụ:

```python
tup1 = ("a", "b", "c", "d")
tup2 = (25.50, True, -55, 1+2j)

print ("Các mục từ chỉ mục 1 đến 2 trong tup1: ", tup1[1:3])
print ("Các mục từ chỉ mục 0 đến 1 trong tup2: ", tup2[0:2])
```

Sẽ cho ra kết quả sau:

```
Các mục từ chỉ mục 1 đến 2 trong tup1: (''b'', ''c'')
Các mục từ chỉ mục 0 đến 1 trong tup2: (25.5, True)
```

Truy cập phạm vi các mục Tuple với Chỉ mục Âm
Khi lát cắt, cả hai toán hạng "i" và "j" đều là tùy chọn. Nếu không được sử dụng, "i" là 0 và "j" là mục cuối cùng trong tuple. Chỉ mục âm có thể được sử dụng trong lát cắt. Xem ví dụ sau:

```python
tup1 = ("a", "b", "c", "d")
tup2 = (25.50, True, -55, 1+2j)
tup4 = ("Rohan", "Physics", 21, 69.75)
tup3 = (1, 2, 3, 4, 5)

print ("Các mục từ chỉ mục 1 đến cuối cùng trong tup1: ", tup1[1:])
print ("Các mục từ chỉ mục 0 đến 1 trong tup2: ", tup2[:2])
print ("Các mục từ chỉ mục 2 đến cuối cùng trong tup3", tup3[2:-1])
print ("Các mục từ chỉ mục 0 đến chỉ mục cuối cùng trong tup4", tup4[:])
```

Sẽ cho ra kết quả sau:

```
Các mục từ chỉ mục 1 đến cuối cùng trong tup1: (''b'', ''c'', ''d'')
Các mục từ chỉ mục 0 đến 1 trong tup2: (25.5, True)
Các mục từ chỉ mục 2 đến cuối cùng trong tup3: (3, 4)
Các mục từ chỉ mục 0 đến chỉ mục cuối cùng trong tup4: (''Rohan'', ''Physics'', 21, 69.75)
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 8: Tuple' LIMIT 1),
    'Bài 2. Python - Cập nhật Tuple',
    'Bài 2. Python - Cập nhật Tuple',
    2,
    'Trong Python, tuple là một kiểu dữ liệu không thay đổi. Một đối tượng không thay đổi không thể được sửa đổi sau khi nó được tạo trong bộ nhớ.

Ví dụ:

Nếu chúng ta cố gắng gán một giá trị mới cho một mục tuple bằng toán tử lát cắt, Python sẽ ném ra TypeError. Xem ví dụ sau:

```python
tup1 = ("a", "b", "c", "d")
tup1[2] = ''Z''
print ("tup1: ", tup1)
```

Sẽ cho ra kết quả sau:

```
Traceback (most recent call last):
 File "C:\Users\mlath\examples\main.py", line 2, in <module>
  tup1[2] = ''Z''
  ~~~~^^^
TypeError: ''tuple'' object does not support item assignment
```

Do đó, không thể cập nhật một tuple. Do đó, lớp tuple không cung cấp các phương thức để thêm, chèn, xóa, sắp xếp các mục từ một đối tượng tuple, giống như lớp list.

Thay đổi Giá trị của Tuple trong Python
Bạn có thể sử dụng một cách làm phụ để cập nhật một tuple. Sử dụng hàm list(), chuyển đổi tuple thành một danh sách, thực hiện các hoạt động thêm/ chèn/xóa mong muốn và sau đó phân tích cú pháp danh sách trở lại thành đối tượng tuple.

Ví dụ:

Ở đây, chúng tôi chuyển đổi tuple thành một danh sách, cập nhật một mục hiện có, thêm một mục mới và sắp xếp danh sách. Danh sách được chuyển đổi trở lại thành đối tượng tuple.

```python
tup1 = ("a", "b", "c", "d")
print ("Tuple trước khi cập nhật", tup1, "id(): ", id(tup1))

list1 = list(tup1)
list1[2]=''F''
list1.append(''Z'')
list1.sort()
print ("danh sách đã cập nhật", list1)

tup1 = tuple(list1)
print ("Tuple sau khi cập nhật", tup1, "id(): ", id(tup1))
```

Sẽ cho ra kết quả sau:

```
Tuple trước khi cập nhật (''a'', ''b'', ''c'', ''d'') id(): 2295023084192
danh sách đã cập nhật [''F'', ''Z'', ''a'', ''b'', ''d'']
Tuple sau khi cập nhật (''F'', ''Z'', ''a'', ''b'', ''d'') id(): 2295021518128
```

Tuy nhiên, lưu ý rằng id() của tup1 trước và sau khi cập nhật là khác nhau. Điều này có nghĩa là một đối tượng tuple mới được tạo ra và đối tượng tuple ban đầu không được sửa đổi tại chỗ.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 8: Tuple' LIMIT 1),
    'Bài 3. Python - Giải nén các phần tử của Tuple',
    'Bài 3. Python - Giải nén các phần tử của Tuple',
    3,
    'Thuật ngữ "giải nén" đề cập đến quá trình phân tích các phần tử tuple thành các biến riêng lẻ. Trong Python, dấu ngoặc đơn là các dấu phân cách mặc định cho một biểu diễn chữ của đối tượng chuỗi.

Các câu lệnh sau để khai báo một tuple là giống nhau.

```python
t1 = (x,y)
t1 = x,y
type (t1)
<class ''tuple''>
```

Ví dụ:

Để lưu trữ các phần tử tuple trong các biến riêng lẻ, hãy sử dụng nhiều biến trên bên trái của toán tử gán, như được thể hiện trong ví dụ sau:

```python
tup1 = (10,20,30)
x, y, z = tup1
print ("x: ", x, "y: ", y, "z: ", z)
```

Sẽ cho ra kết quả sau:

```
x: 10 y: 20 z: 30
```

Đó là cách mà tuple được giải nén thành các biến riêng lẻ.

Trong ví dụ trên, số lượng biến bên trái của toán tử gán bằng số phần tử trong tuple. Điều gì sẽ xảy ra nếu số lượng không bằng số phần tử?



Nếu số lượng biến nhiều hơn hoặc ít hơn so với độ dài của tuple, Python sẽ ném ra một ValueError.

Ví dụ:

```python
tup1 = (10,20,30)
x, y = tup1
x, y, p, q = tup1
```

Sẽ cho ra kết quả sau:

```
  x, y = tup1
  ^^^^
ValueError: too many values to unpack (expected 2)
  x, y, p, q = tup1
  ^^^^^^^^^^
ValueError: not enough values to unpack (expected 4, got 3)
```



Trong trường hợp như vậy, ký hiệu "*" được sử dụng để giải nén. Tiền tố "*" cho "y", như được thể hiện dưới đây −



```python
tup1 = (10,20,30)
x, *y = tup1
print ("x: ", x, "y: ", y)
```

Sẽ cho ra kết quả sau:

```
x: 10 y: [20, 30]
```

Giá trị đầu tiên trong tuple được gán cho "x", và phần còn lại được gán cho "y" và trở thành một danh sách.



Trong ví dụ này, tuple chứa 6 giá trị và các biến để giải nén là 3. Chúng ta thêm "*" vào biến thứ hai.

```python
tup1 = (10,20,30, 40, 50, 60)
x, *y, z = tup1
print ("x: ", x, "y: ", y, "z: ", z)
```

Sẽ cho ra kết quả sau:

```
x: 10 y: [20, 30, 40, 50] z: 60
```

Ở đây, giá trị được giải nén trong "x" và "z" trước, và sau đó các giá trị còn lại được gán cho "y" dưới dạng một danh sách.



Điều gì sẽ xảy ra nếu chúng ta thêm "*" vào biến đầu tiên?

```python
tup1 = (10,20,30, 40, 50, 60)
*x, y, z = tup1
print ("x: ", x, "y: ", y, "z: ", z)
```

Sẽ cho ra kết quả sau:

```
x: [10, 20, 30, 40] y: 50 z: 60
```

Ở đây, một lần nữa, tuple được giải nén sao cho các biến riêng lẻ lấy giá trị trước, để lại các giá trị còn lại cho danh sách "x".

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 8: Tuple' LIMIT 1),
    'Bài 4. Python - Lặp Qua Các Phần Tử của Tuple trong Python',
    'Bài 4. Python - Lặp Qua Các Phần Tử của Tuple trong Python',
    4,
    'Trong Python, bạn có thể duyệt qua các phần tử của một tuple bằng cách sử dụng vòng lặp `for`. Việc duyệt này có thể thực hiện bằng cách sử dụng tuple chính nó như một trình lặp hoặc với sự trợ giúp của một chỉ mục.



Dưới đây là một ví dụ đơn giản về cách sử dụng vòng lặp `for` trong Python:

```python
tup1 = (25, 12, 10, -21, 10, 100)
for num in tup1:
    print(num, end='' '')

```

Trong ví dụ trên, chúng ta duyệt qua mỗi phần tử trong tuple `tup1` và in ra giá trị của từng phần tử.



Ngoài việc sử dụng vòng lặp trực tiếp, bạn cũng có thể duyệt qua các phần tử của một tuple bằng cách sử dụng chỉ mục của chúng.



```python
tup1 = (25, 12, 10, -21, 10, 100)
indices = range(len(tup1))
for i in indices:
    print("tup1[{}]: ".format(i), tup1[i])







```

Trong ví dụ này, chúng ta duyệt qua các phần tử của tuple `tup1` bằng cách sử dụng chỉ mục và in ra mỗi phần tử cùng với chỉ mục tương ứng của nó.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 8: Tuple' LIMIT 1),
    'Bài 5. Python - Gộp Tuple',
    'Bài 5. Python - Gộp Tuple',
    5,
    'Trong Python, Tuple được phân loại là một đối tượng loại chuỗi (sequence type). Đó là một tập hợp các mục, có thể thuộc các kiểu dữ liệu khác nhau, với mỗi mục có chỉ số vị trí bắt đầu từ 0. Mặc dù định nghĩa này cũng áp dụng cho danh sách (list), có hai sự khác biệt chính giữa danh sách (list) và tuple. Đầu tiên, trong khi các mục được đặt trong dấu ngoặc vuông trong trường hợp của danh sách (ví dụ: [10,20,30,40]), thì tuple được tạo thành bằng cách đặt các mục trong dấu ngoặc đơn (ví dụ: (10,20,30,40)).

Trong Python, Tuple là một đối tượng không thể thay đổi (immutable). Do đó, không thể thay đổi nội dung của một tuple sau khi nó được tạo ra trong bộ nhớ.

Tuy nhiên, bạn có thể sử dụng các cách khác nhau để gộp hai tuple Python.



Tất cả các đối tượng loại chuỗi (sequence type) đều hỗ trợ toán tử nối (+), với đó hai tuple có thể được gộp.

**Ví dụ**:

```python
T1 = (10,20,30,40)
T2 = (''one'', ''two'', ''three'', ''four'')
T3 = T1 + T2
print ("Tuple đã gộp:", T3)
```

Kết quả:

```
Tuple đã gộp: (10, 20, 30, 40, ''one'', ''two'', ''three'', ''four'')
```



Bạn cũng có thể sử dụng toán tử nối tăng cường với ký hiệu "+=" để thêm T2 vào T1.

**Ví dụ**:

```python
T1 = (10,20,30,40)
T2 = (''one'', ''two'', ''three'', ''four'')
T1 += T2
print ("Tuple đã gộp:", T1)
```



Kết quả tương tự có thể được đạt được bằng cách sử dụng phương thức extend(). Ở đây, chúng ta cần chuyển đổi hai đối tượng tuple thành danh sách (list), mở rộng để thêm các phần tử từ một danh sách vào danh sách khác, và sau đó chuyển đổi danh sách đã gộp thành một tuple.

**Ví dụ**:

```python
T1 = (10,20,30,40)
T2 = (''one'', ''two'', ''three'', ''four'')
L1 = list(T1)
L2 = list(T2)
L1.extend(L2)
T1 = tuple(L1)
print ("Tuple đã gộp:", T1)
```



Hàm sum() có sẵn trong Python cũng giúp trong việc nối các tuple. Chúng ta sử dụng một biểu thức

sum((t1, t2), ())

**Ví dụ**:

```python
T1 = (10,20,30,40)
T2 = (''one'', ''two'', ''three'', ''four'')
T3 = sum((T1, T2), ())
print ("Tuple đã gộp:", T3)
```



Một cách tiếp cận phức tạp hơn để gộp hai tuple là sử dụng list comprehension.

**Ví dụ**:

```python
T1 = (10,20,30,40)
T2 = (''one'', ''two'', ''three'', ''four'')
L1, L2 = list

(T1), list(T2)
L3 = [y for x in [L1, L2] for y in x]
T3 = tuple(L3)
print ("Tuple đã gộp:", T3)
```



Bạn có thể chạy một vòng lặp for trên các phần tử trong tuple thứ hai, chuyển đổi mỗi phần tử thành một tuple chỉ chứa một phần tử và nối nó vào tuple đầu tiên với toán tử "+="

**Ví dụ**:

```python
T1 = (10,20,30,40)
T2 = (''one'', ''two'', ''three'', ''four'')
for t in T2:
    T1 += (t,)
print (T1)
```

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE),
((SELECT "id" FROM "chapters" WHERE "name" = 'Chương 8: Tuple' LIMIT 1),
    'Bài 6. Python - Phương thức Tuple',
    'Bài 6. Python - Phương thức Tuple',
    6,
    'Trong Python, vì một tuple là không thể thay đổi, nên lớp tuple không định nghĩa các phương thức để thêm hoặc loại bỏ các mục. Lớp tuple chỉ định nghĩa hai phương thức.



Trả về số lần xuất hiện của obj trong tuple.



Trả về chỉ số thấp nhất trong tuple mà obj xuất hiện.



Phương thức index() của lớp tuple trả về chỉ số của sự xuất hiện đầu tiên của mục được cung cấp.

**Cú pháp**:

```python
tuple.index(obj)
```

**Giá trị trả về**:

Phương thức index() trả về một số nguyên, đại diện cho chỉ số của sự xuất hiện đầu tiên của "obj".

**Ví dụ**:

```python
tup1 = (25, 12, 10, -21, 10, 100)
print ("Tup1:", tup1)
x = tup1.index(10)
print ("Chỉ số đầu tiên của 10:", x)
```



Phương thức count() trong lớp tuple trả về số lần một đối tượng cụ thể xuất hiện trong tuple.

**Cú pháp**:

```python
tuple.count(obj)
```

**Giá trị trả về**:

Số lần xuất hiện của đối tượng. Phương thức count() trả về một số nguyên.

**Ví dụ**:

```python
tup1 = (10, 20, 45, 10, 30, 10, 55)
print ("Tup1:", tup1)
c = tup1.count(10)
print ("Số lần xuất hiện của 10:", c)
```



Kể cả nếu các mục trong tuple chứa biểu thức, chúng sẽ được đánh giá để lấy số lần đếm.

```python
Tup1 = (10, 20/80, 0.25, 10/40, 30, 10, 55)
print ("Tup1:", tup1)
c = tup1.count(0.25)
print ("Số lần xuất hiện của 10:", c)
```



Các phương thức `count()` và `index()` của tuple giúp bạn thao tác và truy vấn dữ liệu trong các tuple một cách thuận tiện và hiệu quả.

*Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Chúc bạn thành công trong quá trình chinh phục Python!*',
    30,
    FALSE);