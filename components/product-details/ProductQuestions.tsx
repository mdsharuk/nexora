"use client";

import { Button, Empty, Typography } from "antd";
import { MessageOutlined } from "@ant-design/icons";

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Typography.Text strong style={{ fontSize: 15 }}>
          Questions ({questions.length})
        </Typography.Text>
        <Button
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

      <Typography.Paragraph style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        Have question about this product? Get specific details about this product from expert.
      </Typography.Paragraph>

      {questions.length === 0 ? (
        <Empty
          image={<MessageOutlined style={{ fontSize: 48, color: "#d1d5db" }} />}
          description={
            <span style={{ color: "#9ca3af", fontSize: 13 }}>
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
