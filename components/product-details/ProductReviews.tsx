"use client";

import { Button, Empty, Rate, Typography } from "antd";
import { SnippetsFilled } from "@ant-design/icons";

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
      <div className="product-feedback__header">
        <div>
        <Typography.Title level={2} style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 600, color: "#000000" }}>
          Reviews ({reviews.length})
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Get specific details about this product from customers who own it.
        </Typography.Paragraph>
        </div>
        <Button
          className="product-feedback__action"
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

      {reviews.length === 0 ? (
        <Empty
          className="product-feedback__empty"
          image={<span className="product-feedback__icon"><SnippetsFilled /></span>}
          styles={{ image: { height: 88, marginBottom: 20 } }}
          description={
            <span style={{ color: "#6b7280", fontSize: 14 }}>
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
