"use client";

import { Button, Empty, Typography } from "antd";
import { MessageFilled } from "@ant-design/icons";

export interface Question {
  id: string | number;
  question: string;
  answer: string;
  askedBy?: string;
  date?: string;
}

export interface ProductQuestionsProps {
  questions: Question[];
  productName: string;
}

export default function ProductQuestions({ questions, productName }: ProductQuestionsProps) {
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
          Questions ({questions.length})
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Have question about this product? Get specific details about this product from expert.
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
          Ask Question
        </Button>
      </div>

      {questions.length === 0 ? (
        <Empty
          className="product-feedback__empty"
          image={<span className="product-feedback__icon"><MessageFilled /></span>}
          styles={{ image: { height: 88, marginBottom: 20 } }}
          description={
            <span style={{ color: "#6b7280", fontSize: 14 }}>
              There are no questions asked yet. Be the first one to ask a question.
            </span>
          }
        />
      ) : (
        questions.map((q) => (
          <div
            key={q.id}
            style={{
              borderBottom: "1px solid #f3f4f6",
              padding: "12px 0",
            }}
          >
            <Typography.Text strong style={{ fontSize: 13, display: "block", marginBottom: 4 }}>
              Q: {q.question}
            </Typography.Text>
            <Typography.Text style={{ fontSize: 12, color: "#4b5563", display: "block" }}>
              A: {q.answer}
            </Typography.Text>
            {q.askedBy && (
              <Typography.Text style={{ fontSize: 11, color: "#9ca3af", display: "block", marginTop: 4 }}>
                Asked by {q.askedBy} {q.date && `on ${q.date}`}
              </Typography.Text>
            )}
          </div>
        ))
      )}
    </div>
  );
}
