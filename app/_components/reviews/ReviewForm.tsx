"use client";

import { useState } from "react";
import { createReviewAction } from "@/app/_components/reviews/actions/createReview.action";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

type ReviewFormProps = {
    productId: string;
};

export default function ReviewForm({
    productId,
}: ReviewFormProps) {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const router = useRouter();
    const handleCreateReview = async () => {
        if (!reviewText.trim()) return;

        const res = await createReviewAction({
            productId,
            review: reviewText,
            rating,
        });

        setReviewText("");
        setRating(5);

        router.refresh();
    };

    return (
        <div className="border rounded-2xl p-5 space-y-5 bg-gray-50 text-left max-w-xl mx-auto">
            <h3 className="font-semibold text-gray-800 text-lg">
                Write a Review
            </h3>

            {/* TEXTAREA */}
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={1}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-green-500 transition min-h-[50px]"
            />

            {/* STARS */}
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                    Rating:
                </span>

                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="transition hover:scale-110"
                        >
                            <Star
                                size={22}
                                className={
                                    star <= rating
                                        ? "fill-[#facc15] text-[#facc15]"
                                        : "text-gray-300"
                                }
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* BUTTON */}
            <button
                onClick={handleCreateReview}
                className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2.5 rounded-xl font-medium shadow-sm"
            >
                Submit Review
            </button>
        </div>
    );
}