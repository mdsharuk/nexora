"use client";

import { Button, Empty, Rate, Typography } from "antd";
import { StarOutlined } from "@ant-design/icons";

export interface Review {
  id: string | number;
  rating: number;
  title?: string;
  comment: string;
  reviewedBy?: string;
  date?: string;
}

export interface ProductReviewsProps {
  reviews: Review[];
  productName: string;
}

export default function ProductReviews({ reviews, productName }: ProductReviewsProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Typography.Text strong style={{ fontSize: 15 }}>
          Reviews ({reviews.length})
        </Typography.Text>
        <Button
          style={{
            borderColor: "#ff4400",
            color: "#ff4400",
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          Write a Review
        </Button>
      </div>

      <Typography.Paragraph style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        Get specific details about this product from customers who own it.
      </Typography.Paragraph>

      {reviews.length === 0 ? (
        <Empty
          image={<StarOutlined style={{ fontSize: 48, color: "#d1d5db" }} />}
          description={
            <span style={{ color: "#9ca3af", fontSize: 13 }}>
              This product has no reviews yet. Be the first one to write a review.
            </span>
          }
        />
      ) : (
        reviews.map((r) => (
          <div
            key={r.id}
            style={{
              borderBottom: "1px solid #f3f4f6",
              padding: "14px 0",
            }}
          >
            <Rate disabled value={r.rating} style={{ fontSize: 14, color: "#ff4400" }} />
            {r.title && (
              <Typography.Text strong style={{ fontSize: 13, display: "block", marginTop: 4 }}>
                {r.title}
              </Typography.Text>
            )}
            <Typography.Text style={{ fontSize: 12, color: "#4b5563", display: "block", marginTop: 4 }}>
              {r.comment}
            </Typography.Text>
            {r.reviewedBy && (
              <Typography.Text style={{ fontSize: 11, color: "#9ca3af", display: "block", marginTop: 6 }}>
                By {r.reviewedBy} {r.date && `on ${r.date}`}
              </Typography.Text>
            )}
          </div>
        ))
      )}
    </div>
  );
}
