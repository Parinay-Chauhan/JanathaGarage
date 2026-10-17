import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service } from "../../types/api.types";

export interface BookingDraftState {
  service: Service | null;
  problemDescription: string;
  scheduledAt: string;
  serviceAddress: string;
  latitude: number | null;
  longitude: number | null;
  step: number;
}

const initialState: BookingDraftState = {
  service: null,
  problemDescription: "",
  scheduledAt: "",
  serviceAddress: "",
  latitude: null,
  longitude: null,
  step: 1,
};

export const bookingDraftSlice = createSlice({
  name: "bookingDraft",
  initialState,
  reducers: {
    selectServiceForBooking: (state, action: PayloadAction<Service>) => {
      state.service = action.payload;
      state.step = 2; // move to details step
    },
    updateBookingDraft: (
      state,
      action: PayloadAction<Partial<Omit<BookingDraftState, "service">>>
    ) => {
      return { ...state, ...action.payload };
    },
    setBookingStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    resetBookingDraft: () => initialState,
  },
});

export const {
  selectServiceForBooking,
  updateBookingDraft,
  setBookingStep,
  resetBookingDraft,
} = bookingDraftSlice.actions;

export default bookingDraftSlice.reducer;
