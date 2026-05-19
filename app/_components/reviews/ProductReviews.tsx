"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ProductInterface } from "@/app/interfaces/Product.interface";

import ReviewForm from "@/app/_components/reviews/ReviewForm";

import { Star, MoreVertical, Pencil, Trash2, } from "lucide-react";

import { updateReviewAction } from "@/app/_components/reviews/actions/updateReview.action";
import { deleteReviewAction } from "./actions/deletReview.action";

type Review = {
    _id: string;
    review: string;
    rating: number;

    user: {
        _id: string;
        name: string;
    };
};

type ProductReviewsProps = {
    data: ProductInterface;
    reviews: Review[];
};

export default function ProductReviews({
    data,
    reviews,
}: ProductReviewsProps) {
    const router = useRouter();

    const { data: session } = useSession();

    const userId = session?.user?.id;

    const [openMenu, setOpenMenu] =
        useState<string | null>(null);

    const [showAllReviews, setShowAllReviews] =
        useState(false);

    const [showReviewForm, setShowReviewForm] =
        useState(false);

    const [editingReviewId, setEditingReviewId] =
        useState<string | null>(null);

    const [editedText, setEditedText] =
        useState("");

    const [editedRating, setEditedRating] =
        useState(5);

    const hasReviews = reviews.length > 0;

    const average = hasReviews
        ? reviews.reduce(
            (acc, r) => acc + r.rating,
            0,
        ) / reviews.length
        : data.ratingsAverage || 0;

    const visibleReviews = showAllReviews
        ? reviews
        : reviews.slice(0, 2);

    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenu(null);
        };

        window.addEventListener(
            "click",
            handleClickOutside,
        );

        return () => {
            window.removeEventListener(
                "click",
                handleClickOutside,
            );
        };
    }, []);

    const handleUpdateReview = async (
        reviewId: string,
    ) => {
        await updateReviewAction({
            reviewId,
            productId: data._id,
            review: editedText,
            rating: editedRating,
        });

        setEditingReviewId(null);

        router.refresh();
    };


    const handleDeleteReview = async (
        reviewId: string,
    ) => {
        await deleteReviewAction({
            reviewId,
            productId: data._id,
        });

        router.refresh();
    };
    return (
        <div className="bg-white p-8 rounded-xl border space-y-10">
            {/* STATS */}
            <div className="flex items-center gap-6">
                <div className="w-[150px] flex flex-col items-center gap-1 text-center">
                    <h2 className="text-4xl font-bold text-gray-900">
                        {average.toFixed(1)}
                    </h2>

                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                size={16}
                                className={
                                    i <= Math.round(average)
                                        ? "fill-[#facc15] text-[#facc15]"
                                        : "text-gray-300"
                                }
                            />
                        ))}
                    </div>

                    <p className="text-xs text-gray-400">
                        Based on {reviews.length} reviews
                    </p>
                </div>

                <div className="flex-1 space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter(
                            (r) => r.rating === star,
                        ).length;

                        const percent = hasReviews
                            ? (count / reviews.length) * 100
                            : 0;

                        return (
                            <div
                                key={star}
                                className="flex items-center gap-4"
                            >
                                <span className="w-14 text-sm text-gray-600">
                                    {star} star
                                </span>

                                <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                    <div
                                        className="bg-[#facc15] h-2.5 rounded-full"
                                        style={{
                                            width: `${percent}%`,
                                        }}
                                    />
                                </div>

                                <span className="text-sm text-gray-400 w-10 text-right">
                                    {Math.round(percent)}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CREATE REVIEW */}
            <div className="border-t pt-8 text-center">
                {!showReviewForm ? (
                    <>
                        <div className="flex justify-center mb-3">
                            <Star
                                size={45}
                                className="text-gray-300"
                            />
                        </div>

                        {!hasReviews && (
                            <p className="text-sm text-gray-500 mb-3">
                                Customer reviews will be displayed here.
                            </p>
                        )}

                        <button
                            onClick={() =>
                                setShowReviewForm(true)
                            }
                            className="text-green-600 font-medium text-sm hover:underline"
                        >
                            Write a Review
                        </button>
                    </>
                ) : (
                    <ReviewForm productId={data._id} />
                )}
            </div>

            {/* REVIEWS LIST */}
            {hasReviews && (
                <div className="space-y-5">
                    {visibleReviews.map((review) => (
                        <div
                            key={review._id}
                            className="border rounded-xl p-5 bg-gray-50"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-800">
                                    {review.user?.name}
                                </h4>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={14}
                                                className={
                                                    star <= review.rating
                                                        ? "fill-[#facc15] text-[#facc15]"
                                                        : "text-gray-300"
                                                }
                                            />
                                        ))}
                                    </div>

                                    {review.user._id === userId && (
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setOpenMenu(
                                                        openMenu === review._id
                                                            ? null
                                                            : review._id,
                                                    );
                                                }}
                                                className="p-1 hover:bg-gray-200 rounded-md transition"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {openMenu === review._id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20">
                                                    <button
                                                        onClick={() => {
                                                            setEditingReviewId(
                                                                review._id,
                                                            );

                                                            setEditedText(
                                                                review.review,
                                                            );

                                                            setEditedRating(
                                                                review.rating,
                                                            );

                                                            setOpenMenu(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 transition"
                                                    >
                                                        <Pencil size={14} />
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDeleteReview(review._id)
                                                        }
                                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {editingReviewId === review._id ? (
                                <div className="space-y-3 mt-3">
                                    <textarea
                                        value={editedText}
                                        onChange={(e) =>
                                            setEditedText(
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border rounded-lg p-3 outline-none min-h-[100px]"
                                    />

                                    <input
                                        type="number"
                                        min={1}
                                        max={5}
                                        value={editedRating}
                                        onChange={(e) =>
                                            setEditedRating(
                                                Number(e.target.value),
                                            )
                                        }
                                        className="border rounded-lg px-3 py-2 w-20"
                                    />

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                handleUpdateReview(
                                                    review._id,
                                                )
                                            }
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() =>
                                                setEditingReviewId(
                                                    null,
                                                )
                                            }
                                            className="text-sm text-gray-500 hover:underline"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-600 leading-6">
                                    {review.review}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* SHOW MORE */}
            {reviews.length > 2 && (
                <div className="flex justify-center pt-2">
                    <button
                        onClick={() =>
                            setShowAllReviews(
                                !showAllReviews,
                            )
                        }
                        className="text-green-600 font-medium text-sm hover:underline"
                    >
                        {showAllReviews
                            ? "Show Less"
                            : "Show More"}
                    </button>
                </div>
            )}
        </div>
    );
}