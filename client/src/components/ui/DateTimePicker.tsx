import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
} from "lucide-react";

export interface DateTimePickerProps {
  label?: string;
  value: string; // ISO format or "YYYY-MM-DDTHH:mm"
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
  id?: string;
}

const PRESET_TIME_SLOTS = [
  { label: "09:00 AM", hours: 9, minutes: 0, tag: "Morning" },
  { label: "11:00 AM", hours: 11, minutes: 0, tag: "Morning" },
  { label: "01:00 PM", hours: 13, minutes: 0, tag: "Afternoon" },
  { label: "03:00 PM", hours: 15, minutes: 0, tag: "Afternoon" },
  { label: "05:00 PM", hours: 17, minutes: 0, tag: "Evening" },
  { label: "07:00 PM", hours: 19, minutes: 0, tag: "Evening" },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label = "Preferred Appointment Slot",
  value,
  onChange,
  helperText,
  error,
  id = "appointment-slot-picker",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Safe parse current date value
  const parsedValue = useMemo(() => {
    const d = value ? new Date(value) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);

  // Calendar month view navigation state
  const [viewYear, setViewYear] = useState<number>(parsedValue.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(parsedValue.getMonth());

  // Local active selection
  const [selectedDate, setSelectedDate] = useState<Date>(parsedValue);
  const [customHour, setCustomHour] = useState<number>(
    parsedValue.getHours() % 12 || 12
  );
  const [customMinute, setCustomMinute] = useState<number>(
    parsedValue.getMinutes() < 30 ? 0 : 30
  );
  const [isPM, setIsPM] = useState<boolean>(parsedValue.getHours() >= 12);

  // Sync internal state when prop value changes
  useEffect(() => {
    setSelectedDate(parsedValue);
    setViewYear(parsedValue.getFullYear());
    setViewMonth(parsedValue.getMonth());
    setCustomHour(parsedValue.getHours() % 12 || 12);
    setCustomMinute(parsedValue.getMinutes() < 30 ? 0 : 30);
    setIsPM(parsedValue.getHours() >= 12);
  }, [parsedValue]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Calculate today
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  // Format date helper: "YYYY-MM-DDTHH:mm"
  const emitDateTime = (baseDate: Date, hours24: number, minutes: number) => {
    const d = new Date(baseDate);
    d.setHours(hours24, minutes, 0, 0);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");

    const isoString = `${year}-${month}-${day}T${h}:${m}`;
    onChange(isoString);
  };

  // Generate calendar days for viewMonth/viewYear
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);

    // Monday as 0, Sunday as 6
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days: { date: Date; isCurrentMonth: boolean; isPast: boolean; isToday: boolean; isSelected: boolean }[] = [];

    // Previous month padding
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(viewYear, viewMonth - 1, prevMonthLastDay - i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isPast: d < today,
        isToday: d.getTime() === today.getTime(),
        isSelected: false,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(viewYear, viewMonth, i);
      const isPast = d < today;
      const isToday = d.getTime() === today.getTime();
      const isSelected =
        d.getFullYear() === selectedDate.getFullYear() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getDate() === selectedDate.getDate();

      days.push({
        date: d,
        isCurrentMonth: true,
        isPast,
        isToday,
        isSelected,
      });
    }

    // Next month padding to complete 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(viewYear, viewMonth + 1, i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isPast: d < today,
        isToday: d.getTime() === today.getTime(),
        isSelected: false,
      });
    }

    return days;
  }, [viewYear, viewMonth, selectedDate, today]);

  // Navigate months
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Quick chips: Today, Tomorrow, Day After
  const handleQuickSelect = (daysFromToday: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysFromToday);
    setSelectedDate(target);
    setViewYear(target.getFullYear());
    setViewMonth(target.getMonth());

    const h24 = isPM ? (customHour % 12) + 12 : customHour % 12;
    emitDateTime(target, h24, customMinute);
  };

  // Day clicked on calendar
  const handleDaySelect = (dayDate: Date) => {
    setSelectedDate(dayDate);
    const h24 = isPM ? (customHour % 12) + 12 : customHour % 12;
    emitDateTime(dayDate, h24, customMinute);
  };

  // Time slot preset clicked
  const handlePresetSlot = (slot: typeof PRESET_TIME_SLOTS[0]) => {
    setCustomHour(slot.hours % 12 || 12);
    setCustomMinute(slot.minutes);
    setIsPM(slot.hours >= 12);
    emitDateTime(selectedDate, slot.hours, slot.minutes);
  };

  // Custom time adjustment
  const handleCustomTimeChange = (hour: number, minute: number, pm: boolean) => {
    setCustomHour(hour);
    setCustomMinute(minute);
    setIsPM(pm);
    const h24 = pm ? (hour % 12) + 12 : hour % 12;
    emitDateTime(selectedDate, h24, minute);
  };

  // Formatted display strings
  const formattedDisplay = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const datePart = selectedDate.toLocaleDateString("en-IN", options);

    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 || 12;
    const mStr = String(minutes).padStart(2, "0");
    const timePart = `${h12}:${mStr} ${ampm}`;

    // Relative check
    const diffDays = Math.round(
      (new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getTime() -
        today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    let relativeLabel = "";
    if (diffDays === 0) relativeLabel = "Today";
    else if (diffDays === 1) relativeLabel = "Tomorrow";
    else if (diffDays === 2) relativeLabel = "In 2 days";

    return { datePart, timePart, relativeLabel };
  }, [selectedDate, today]);

  // Is current view month in the past?
  const canGoPrev = useMemo(() => {
    const currentViewFirst = new Date(viewYear, viewMonth, 1);
    const thisMonthFirst = new Date(today.getFullYear(), today.getMonth(), 1);
    return currentViewFirst > thisMonthFirst;
  }, [viewYear, viewMonth, today]);

  return (
    <div className="w-full space-y-1.5 relative" ref={containerRef}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80"
          >
            {label}
          </label>
          <span className="text-[11px] font-medium text-[#FF771C] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Guaranteed 30-min Arrival</span>
          </span>
        </div>
      )}

      {/* Trigger Button / Display Input */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left rounded-2xl bg-white dark:bg-[#1A1613] border px-4 py-3 transition-all duration-200 flex items-center justify-between group shadow-sm hover:border-[#FF771C]/50 ${
          isOpen
            ? "border-[#FF771C] ring-2 ring-[#FF771C]/20 shadow-[0_0_16px_rgba(255,119,28,0.12)]"
            : error
            ? "border-rose-500"
            : "border-[#E7E5DF] dark:border-[#2E251E]"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#FFF5EE] dark:bg-[#251A12] border border-[#FFD9C2] dark:border-[#3D2617] text-[#FF771C] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#252621] dark:text-[#F5F2EB] truncate">
                {formattedDisplay.datePart}
              </span>
              {formattedDisplay.relativeLabel && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF771C]/10 text-[#FF771C] border border-[#FF771C]/20">
                  {formattedDisplay.relativeLabel}
                </span>
              )}
            </div>
            <p className="text-xs text-[#717167] dark:text-[#9E9488] flex items-center gap-1 mt-0.5 font-mono">
              <Clock className="w-3 h-3 text-[#FF771C]" />
              <span>{formattedDisplay.timePart} (IST)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pl-2">
          <span className="text-[11px] font-semibold text-[#FF771C] hidden sm:inline-block">
            {isOpen ? "Close" : "Change"}
          </span>
          <div className="p-1.5 rounded-lg bg-[#F8F7F3] dark:bg-[#251E18] text-[#8F8F85] group-hover:text-[#FF771C] transition-colors">
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {error ? (
        <p className="text-xs text-rose-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#717167] dark:text-[#9E9488]">{helperText}</p>
      ) : null}

      {/* Floating DateTime Popover Card */}
      {isOpen && (
        <div className="absolute left-0 right-0 w-full top-full mt-2 z-50 rounded-2xl bg-white dark:bg-[#15120F] border border-[#E7E5DF] dark:border-[#2E251E] shadow-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md max-h-[min(500px,calc(100vh-200px))] overflow-y-auto overscroll-contain">
          {/* Quick Day Chips */}
          <div className="flex items-center gap-2 pb-1 border-b border-[#E7E5DF] dark:border-[#2E251E]">
            <span className="text-[11px] font-bold text-[#8A8074] uppercase tracking-wider shrink-0 mr-1">
              Quick:
            </span>
            {[
              { label: "Today", days: 0 },
              { label: "Tomorrow", days: 1 },
              { label: "Day After", days: 2 },
            ].map((chip) => {
              const chipDate = new Date();
              chipDate.setDate(chipDate.getDate() + chip.days);
              const isSelected =
                chipDate.getFullYear() === selectedDate.getFullYear() &&
                chipDate.getMonth() === selectedDate.getMonth() &&
                chipDate.getDate() === selectedDate.getDate();

              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handleQuickSelect(chip.days)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-[#FF771C] text-white shadow-sm shadow-[#FF771C]/40"
                      : "bg-[#F8F7F3] dark:bg-[#201A16] text-[#252621] dark:text-[#D4CBC0] hover:bg-[#EFECE6] dark:hover:bg-[#2B231D] border border-[#E7E5DF] dark:border-[#2E251E]"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Month & Navigation Header */}
          <div className="flex items-center justify-between px-1">
            <h4 className="font-bold text-sm text-[#252621] dark:text-[#F5F2EB] flex items-center gap-1.5 font-display">
              <span>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={!canGoPrev}
                className="p-1.5 rounded-lg border border-[#E7E5DF] dark:border-[#2E251E] text-[#252621] dark:text-[#F5F2EB] hover:bg-[#F8F7F3] dark:hover:bg-[#231A14] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg border border-[#E7E5DF] dark:border-[#2E251E] text-[#252621] dark:text-[#F5F2EB] hover:bg-[#F8F7F3] dark:hover:bg-[#231A14] transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEK_DAYS.map((wd) => (
              <span
                key={wd}
                className="text-[11px] font-bold text-[#8A8074] py-1 select-none"
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((cell, idx) => {
              const isCellPast = cell.isPast;
              const isCellSelected = cell.isSelected;
              const isCellCurrent = cell.isCurrentMonth;

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isCellPast || !isCellCurrent}
                  onClick={() => handleDaySelect(cell.date)}
                  className={`h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all relative ${
                    isCellSelected
                      ? "bg-[#FF771C] text-white font-bold shadow-md shadow-[#FF771C]/35 scale-105 z-10"
                      : !isCellCurrent
                      ? "text-stone-300 dark:text-[#42372E] opacity-30 cursor-default pointer-events-none"
                      : isCellPast
                      ? "text-stone-300 dark:text-[#42372E] opacity-40 cursor-not-allowed pointer-events-none"
                      : cell.isToday
                      ? "border border-[#FF771C] text-[#FF771C] hover:bg-[#FF771C]/10 font-bold"
                      : "text-[#252621] dark:text-[#EAE5DC] hover:bg-[#F0EDE6] dark:hover:bg-[#251E18]"
                  }`}
                >
                  <span>{cell.date.getDate()}</span>
                  {cell.isToday && !isCellSelected && (
                    <span className="w-1 h-1 rounded-full bg-[#FF771C] absolute bottom-1"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Time Slot Selection */}
          <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2E251E] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF771C]" />
                <span>Select Arrival Window</span>
              </span>
              <span className="text-[11px] text-[#8A8074]">12-Hour Slots</span>
            </div>

            {/* Popular preset slot buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              {PRESET_TIME_SLOTS.map((slot) => {
                const isSelected =
                  selectedDate.getHours() === slot.hours &&
                  selectedDate.getMinutes() === slot.minutes;

                return (
                  <button
                    key={slot.label}
                    type="button"
                    onClick={() => handlePresetSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-0.5 transition-all ${
                      isSelected
                        ? "bg-[#FFF5EE] dark:bg-[#2B1B10] border-[#FF771C] text-[#FF771C] font-bold shadow-sm ring-1 ring-[#FF771C]"
                        : "bg-[#F8F7F3] dark:bg-[#1E1814] border-[#E7E5DF] dark:border-[#2E251E] text-[#252621] dark:text-[#D4CBC0] hover:border-[#FF771C]/50 hover:bg-white dark:hover:bg-[#251E18]"
                    }`}
                  >
                    <span>{slot.label}</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#8A8074]">
                      {slot.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Hour/Minute Stepper */}
            <div className="p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1B1511] border border-[#E7E5DF] dark:border-[#2E251E] flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#717167] dark:text-[#9E9488]">
                Custom Time:
              </span>
              <div className="flex items-center gap-1.5">
                {/* Hour Select */}
                <select
                  value={customHour}
                  onChange={(e) =>
                    handleCustomTimeChange(Number(e.target.value), customMinute, isPM)
                  }
                  className="bg-white dark:bg-[#261E18] border border-[#E7E5DF] dark:border-[#382B21] rounded-lg text-xs font-bold px-2 py-1 text-[#252621] dark:text-[#F5F2EB] focus:outline-none focus:border-[#FF771C]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <span className="text-xs font-bold text-[#8A8074]">:</span>

                {/* Minute Select */}
                <select
                  value={customMinute}
                  onChange={(e) =>
                    handleCustomTimeChange(customHour, Number(e.target.value), isPM)
                  }
                  className="bg-white dark:bg-[#261E18] border border-[#E7E5DF] dark:border-[#382B21] rounded-lg text-xs font-bold px-2 py-1 text-[#252621] dark:text-[#F5F2EB] focus:outline-none focus:border-[#FF771C]"
                >
                  {[0, 15, 30, 45].map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                {/* AM/PM toggle */}
                <div className="flex rounded-lg overflow-hidden border border-[#E7E5DF] dark:border-[#382B21] ml-1">
                  <button
                    type="button"
                    onClick={() => handleCustomTimeChange(customHour, customMinute, false)}
                    className={`px-2 py-1 text-[11px] font-bold transition-colors ${
                      !isPM
                        ? "bg-[#FF771C] text-white"
                        : "bg-white dark:bg-[#261E18] text-[#717167] dark:text-[#A89D91]"
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCustomTimeChange(customHour, customMinute, true)}
                    className={`px-2 py-1 text-[11px] font-bold transition-colors ${
                      isPM
                        ? "bg-[#FF771C] text-white"
                        : "bg-white dark:bg-[#261E18] text-[#717167] dark:text-[#A89D91]"
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Confirmation Footer */}
          <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2E251E] flex items-center justify-between">
            <div className="text-xs min-w-0 pr-2">
              <span className="text-[10px] text-[#8A8074] uppercase tracking-wider block">
                Selected Slot
              </span>
              <p className="font-bold text-[#252621] dark:text-[#F5F2EB] truncate">
                {formattedDisplay.datePart} • {formattedDisplay.timePart}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#FF771C] hover:bg-[#E56814] text-white text-xs font-bold shadow-md shadow-[#FF771C]/30 flex items-center gap-1.5 transition-all shrink-0"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Set Slot</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
