"use client";

import React from "react";
import Link from "next/link";
import { Button, Modal } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

interface CompareSuccessModalProps {
  open: boolean;
  productName: string;
  onClose: () => void;
}

export default function CompareSuccessModal({
  open,
  productName,
  onClose,
}: CompareSuccessModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={750}
      className="compare-success-modal"
      styles={{ body: { padding: "28px 32px", borderRadius: 12 } }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <CheckCircleFilled
            style={{ fontSize: 28, color: "#22c55e", marginTop: 2, flexShrink: 0 }}
          />
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#374151", whiteSpace: "nowrap" }}>
            Success: You have added{" "}
            <span style={{ color: "#ff4400", fontWeight: 600 }}>{productName}</span>{" "}
            to your product comparison!
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-start" }}>
          <Link href="/compare" onClick={onClose}>
            <Button
              type="primary"
              size="large"
              style={{
                background: "#ff4400",
                borderColor: "#ff4400",
                fontWeight: 600,
                minWidth: 140,
              }}
            >
              Compare Now
            </Button>
          </Link>
          <Button
            size="large"
            onClick={onClose}
            style={{ fontWeight: 600, minWidth: 120 }}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
}
