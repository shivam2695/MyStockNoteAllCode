import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Lazy load components to prevent circular dependencies and reduce bundle size
import { lazy, Suspense } from "react";

const Index = lazy(() => import("@/pages/Index"));
const Auth = lazy(() => import("@/pages/Auth"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const StockJournal = lazy(() => import("@/pages/StockJournal"));
const Profile = lazy(() => import("@/pages/Profile"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const BlogsBooks = lazy(() => import("@/pages/BlogsBooks"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journal" element={<StockJournal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/learn" element={<BlogsBooks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
