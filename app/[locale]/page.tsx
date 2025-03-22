import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/routing';


const courses = [
  {
    id: 1,
    title: "Lập trình JavaScript từ cơ bản đến nâng cao",
    instructor: "Nguyễn Văn A",
    price: "$49.99",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  },
  {
    id: 2,
    title: "Khóa học ReactJS chuyên sâu",
    instructor: "Trần Thị B",
    price: "$59.99",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
  },
  {
    id: 3,
    title: "Thiết kế giao diện với Tailwind CSS",
    instructor: "Phạm Văn C",
    price: "Miễn phí",
    image: "https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg",
  },
  {
    id: 4,
    title: "Node.js và Express từ A-Z",
    instructor: "Lê Hoàng D",
    price: "$39.99",
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
  },
  {
    id: 5,
    title: "Lập trình Fullstack với MERN Stack",
    instructor: "Nguyễn Hữu E",
    price: "$79.99",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
  },
  {
    id: 6,
    title: "Phát triển ứng dụng di động với React Native",
    instructor: "Trương Minh F",
    price: "$69.99",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
  {
    id: 7,
    title: "Python cho người mới bắt đầu",
    instructor: "Hoàng Văn G",
    price: "$29.99",
    image: "https://images.pexels.com/photos/207569/pexels-photo-207569.jpeg",
  },
  {
    id: 8,
    title: "Khoa học dữ liệu với Python",
    instructor: "Ngô Thị H",
    price: "$89.99",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
  },
];


const topics = [
  {
    id: 1,
    name: "Lập trình Web",
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
  },
  {
    id: 2,
    name: "Thiết kế UI/UX",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
  {
    id: 3,
    name: "Trí tuệ nhân tạo",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
  },
  {
    id: 4,
    name: "Kinh doanh & Marketing",
    image: "https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Hữu Dũng",
    feedback:
      "Khóa học này thực sự rất tuyệt vời! Tôi đã học được cách xây dựng ứng dụng React từ cơ bản đến nâng cao, với những ví dụ thực tế giúp tôi dễ dàng áp dụng kiến thức vào công việc. Giảng viên giảng dạy rất chi tiết và có tâm, luôn giải đáp thắc mắc của học viên một cách rõ ràng.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    id: 2,
    name: "Trần Thị Minh Anh",
    feedback:
      "Tôi đã từng tự học React nhưng gặp nhiều khó khăn trong việc hiểu các khái niệm nâng cao. Nhờ khóa học này, tôi không chỉ nắm vững kiến thức mà còn biết cách tổ chức code sao cho sạch sẽ và dễ bảo trì hơn. Các bài giảng rất logic, dễ hiểu, kết hợp với các bài tập thực hành rất hữu ích.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    id: 3,
    name: "Phạm Văn Hưng",
    feedback:
      "Một trong những khóa học chất lượng nhất mà tôi từng tham gia! Kiến thức được truyền tải rất có hệ thống, từ cơ bản đến chuyên sâu. Tôi thích nhất phần hướng dẫn về hooks và cách tối ưu hiệu suất trong React. Sau khi hoàn thành khóa học, tôi đã tự tin hơn khi làm việc với các dự án thực tế.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
];


const CourseCard: React.FC<{ course: (typeof courses)[0] }> = ({ course }) => (
  <div className="border rounded-xl shadow-lg p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white">
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-44 object-cover rounded-xl"
    />
    <h3 className="font-bold mt-3 text-lg text-gray-900">{course.title}</h3>
    <p className="text-sm text-gray-500">{course.instructor}</p>
    <p className="text-lg font-semibold mt-2 text-indigo-600">{course.price}</p>
    <Button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all">
      Đăng ký ngay
    </Button>
  </div>
);


const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full bg-white shadow-md  fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-primary">Learnify</h1>
          <nav className="flex-1">
            <ul className="flex justify-center space-x-6">
              <li><Link href="/" className="text-[15px] font-semibold hover:text-primary">Trang chủ</Link></li>
              <li><Link href="/courses" className="text-[15px] font-semibold hover:text-primary">Khóa học</Link></li>
              <li><Link href="/about" className="text-[15px] font-semibold hover:text-primary">Về chúng tôi</Link></li>
              <li><Link href="/contact" className="text-[15px] font-semibold hover:text-primary">Liên hệ</Link></li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <Button variant="outline">
              <Link href="/sign-in">Đăng ký</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in">Đăng nhập</Link>
            </Button>
            <Button asChild>
              <Link href="/manage">Trang quản trị</Link>
            </Button>
          </div>
        </div>
      </header>


      <section
        className="relative w-full h-[500px] flex flex-col justify-center items-center mt-16 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg')",
        }}
      >
        {/* Lớp phủ */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Nội dung */}
        <div className="relative text-center max-w-2xl px-4">
          <h1 className="text-5xl font-bold">Học tập mọi lúc, mọi nơi</h1>
          <p className="mt-4 text-md">
            Cùng Learnify mở ra cánh cửa tri thức với hàng ngàn khóa học chất lượng cao,
            giúp bạn phát triển kỹ năng, nâng cao sự nghiệp và chinh phục ước mơ.
            Học online mọi lúc, mọi nơi, theo lịch trình của bạn.
          </p>
          <Button className="mt-6" size={"lg"}>
            Bắt đầu học ngay
          </Button>
        </div>
      </section>


      <section className="w-full max-w-6xl py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Khóa học nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {courses.map((course) => (<CourseCard key={course.id} course={course} />))}
        </div>
      </section>

      <section className="w-full py-14 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">Chủ đề khóa học</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topics.map((topic) => (
              <div key={topic.id} className="text-center">
                <img src={topic.image} alt={topic.name} className="w-28 h-28 object-cover rounded-full mx-auto" />
                <p className="mt-6 font-semibold">{topic.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl py-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Cảm nhận học viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border p-4 rounded-lg text-center">
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto" />
              <p className="mt-2 italic">{testimonial.feedback}</p>
              <h4 className="mt-2 font-semibold">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          {/* Cột 1: Thông tin công ty */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Về Learnify</h3>
            <p className="text-gray-400">
              Learnify là nền tảng học trực tuyến hàng đầu, cung cấp các khóa học chất lượng từ chuyên gia.
            </p>
            <p className="mt-4 text-gray-400">© 2024 Learnify. All rights reserved.</p>
          </div>

          {/* Cột 2: Hỗ trợ */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Liên hệ hỗ trợ</a></li>
            </ul>
          </div>

          {/* Cột 3: Tài nguyên */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tài nguyên</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Chương trình ưu đãi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cộng đồng</a></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ & mạng xã hội */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liên hệ</h3>
            <p className="text-gray-400">Email: support@learnify.com</p>
            <p className="text-gray-400 mt-2">Hotline: 0123 456 789</p>
            <p className="text-gray-400 mt-2">Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
