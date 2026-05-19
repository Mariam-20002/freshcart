"use client";

import { useState } from "react";
import { createReviewAction } from "@/app/_components/reviews/actions/createReview.action";
import { useRouter } from "next/navigation";

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
        <div className="border rounded-xl p-5 space-y-4 bg-gray-50 text-left max-w-xl mx-auto">
            <h3 className="font-semibold text-gray-800">
                Write a Review
            </h3>

            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full border rounded-lg p-3 outline-none min-h-[120px]"
            />

            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                    Rating:
                </span>

                <input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border rounded-lg px-3 py-2 w-20"
                />
            </div>

            <button
                onClick={handleCreateReview}
                className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg"
            >
                Submit Review
            </button>
        </div>
    );
}