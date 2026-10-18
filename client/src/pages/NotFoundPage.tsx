import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  ArrowLeft,
  Search,
  Home,
  HelpCircle,
  Briefcase,
  CalendarCheck,
  Compass,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#191A16] text-[#252621] dark:text-[#F5F2EB] flex flex-col justify-between selection:bg-[#E87532] selection:text-white">
      {/* Top Simple Header */}
      <header className="h-20 max-w-7xl mx-auto w-full px-4 sm:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#E87532] flex items-center justify-center text-white shadow-orange-glow">
            <Wrench className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xl font-extrabold font-display tracking-tight text-[#252621] dark:text-white">
            Janta<span className="text-[#E87532]">Garaj</span>
          </span>
        </Link>
        <Link
          to="/help"
          className="text-xs font-semibold text-stone-500 hover:text-[#E87532] dark:text-stone-400 flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Support Desk</span>
        </Link>
      </header>

      {/* Main 404 Hero */}
      <main className="max-w-3xl mx-auto px-4 py-12 text-center flex-1 flex flex-col items-center justify-center">
        {/* Animated 404 Graphic */}
        <div className="relative mb-6">
          <div className="text-[120px] sm:text-[160px] font-black font-display tracking-tighter text-stone-200 dark:text-[#2A2B24] select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white dark:bg-[#141210] border-2 border-[#E87532] flex items-center justify-center shadow-xl shadow-[#E87532]/20 rotate-6 transition-transform hover:rotate-0 duration-300">
              <Compass className="w-12 h-12 text-[#E87532] animate-pulse" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#252621] dark:text-white mb-3">
          Engine Stall: Route Not Found
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-lg mb-8 leading-relaxed">
          Looks like the road you took doesn't exist or has been relocated. Don't worry, our pit crew will help you get back on track.
        </p>

        {/* Quick Recovery Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate(-1)}
            className="border-[#E7E5DF] dark:border-[#2B231D] text-xs sm:text-sm font-semibold"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Go Back
          </Button>

          <Link to="/">
            <Button
              variant="primary"
              size="md"
              className="shadow-orange-glow font-bold text-xs sm:text-sm"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return to Home
            </Button>
          </Link>
        </div>

        {/* Popular Destination Shortcuts */}
        <div className="w-full max-w-md pt-8 border-t border-[#E7E5DF] dark:border-[#2B231D]">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-4">
            Popular Pit Stops
          </p>
          <div className="grid grid-cols-2 gap-2.5 text-left">
            <Link
              to="/services"
              className="p-3 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532] transition-colors flex items-center gap-2.5 group shadow-2xs"
            >
              <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#E87532] group-hover:scale-105 transition-transform">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#252621] dark:text-white">All Services</p>
                <p className="text-[10px] text-stone-500">Doorstep repairs</p>
              </div>
            </Link>

            <Link
              to="/technicians"
              className="p-3 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532] transition-colors flex items-center gap-2.5 group shadow-2xs"
            >
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 group-hover:scale-105 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#252621] dark:text-white">Technicians</p>
                <p className="text-[10px] text-stone-500">Find local mechanics</p>
              </div>
            </Link>

            <Link
              to="/customer/bookings"
              className="p-3 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532] transition-colors flex items-center gap-2.5 group shadow-2xs"
            >
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 group-hover:scale-105 transition-transform">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#252621] dark:text-white">My Bookings</p>
                <p className="text-[10px] text-stone-500">Track active jobs</p>
              </div>
            </Link>

            <Link
              to="/help"
              className="p-3 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532] transition-colors flex items-center gap-2.5 group shadow-2xs"
            >
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#252621] dark:text-white">Help Center</p>
                <p className="text-[10px] text-stone-500">FAQs & support</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="h-16 text-center text-xs text-stone-400 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-center">
        © {new Date().getFullYear()} JantaGaraj · Doorstep Auto Garage Platform
      </footer>
    </div>
  );
};
