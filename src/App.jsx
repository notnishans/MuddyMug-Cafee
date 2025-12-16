import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RequireAdminAuth from "./components/admin/RequireAdminAuth";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CafePage from "./pages/CafePage";
import MenuPage from "./pages/MenuPage";
import AcademyPage from "./pages/AcademyPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import StudentLifePage from "./pages/StudentLifePage";
import GalleryPage from "./pages/GalleryPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      {/* Admin routes are standalone — no public site header/footer. */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdminAuth>
            <AdminDashboardPage />
          </RequireAdminAuth>
        }
      />

      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cafe" element={<CafePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/student-life" element={<StudentLifePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
