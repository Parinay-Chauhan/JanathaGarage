import React, { useState } from "react";
import { Star, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { useCreateReviewMutation } from "../api/reviewsApi";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  bookingId,
}) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      await createReview({
        bookingId,
        rating,
        comment: comment.trim(),
      }).unwrap();
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rate Mechanic Service"
      description="Help fellow vehicle owners by sharing your service feedback"
      maxWidth="md"
    >
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-center">
        {/* Star Rating Input */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-125 focus:outline-none"
            >
              <Star
                className={`w-9 h-9 transition-colors ${
                  (hoverRating || rating) >= star
                    ? "fill-amber-400 text-amber-400 drop-shadow"
                    : "text-stone-300 dark:text-stone-700"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
          {rating === 5 && "Excellent! Mechanic was professional and fast."}
          {rating === 4 && "Very Good service and clean repair work."}
          {rating === 3 && "Average service experience."}
          {rating <= 2 && "Needs improvement."}
        </p>

        <textarea
          rows={3}
          placeholder="Share your detailed experience (e.g. prompt arrival, fair pricing, clean work)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-xl bg-white dark:bg-stone-900/80 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          isLoading={isLoading}
          leftIcon={<CheckCircle2 className="w-5 h-5" />}
        >
          Submit Feedback
        </Button>
      </form>
    </Modal>
  );
};
