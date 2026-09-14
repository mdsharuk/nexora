"use client";

import { useMemo, useState } from "react";
import { BankOutlined, CalculatorOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Collapse, Modal, Table, type TableProps } from "antd";

interface EmiPlansModalProps {
  price: number;
  onOpen?: () => void;
}

interface EmiPlan {
  key: string;
  months: number;
  chargeRate: number;
  charge: number;
  installment: number;
  total: number;
}

const banks = [
  { name: "Al-Arafah Islami Bank", shortName: "AIBL", color: "#166534", rates: [1, 2, 3, 4] },
  { name: "AB Bank Limited", shortName: "AB", color: "#dc2626", rates: [1.2, 2.2, 3.2, 4.2] },
  { name: "Bank Asia Limited", shortName: "BA", color: "#2563eb", rates: [1.1, 2.1, 3.1, 4.1] },
  { name: "BRAC Bank Limited", shortName: "BRAC", color: "#0284c7", rates: [1.25, 2.25, 3.25, 4.25] },
  { name: "City Bank Limited", shortName: "CITY", color: "#e11d48", rates: [1.15, 2.15, 3.15, 4.15] },
  { name: "Dhaka Bank Limited", shortName: "DBL", color: "#1d4ed8", rates: [1.3, 2.3, 3.3, 4.3] },
  { name: "Dutch-Bangla Bank Limited", shortName: "DBBL", color: "#059669", rates: [1.2, 2.2, 3.2, 4.2] },
  { name: "Eastern Bank Limited", shortName: "EBL", color: "#f59e0b", rates: [1.1, 2.1, 3.1, 4.1] },
  { name: "Jamuna Bank", shortName: "JBL", color: "#7c3aed", rates: [1.25, 2.25, 3.25, 4.25] },
  { name: "LankaBangla Finance", shortName: "LBF", color: "#10b981", rates: [1.15, 2.15, 3.15, 4.15] },
  { name: "Mutual Trust Bank", shortName: "MTB", color: "#ef4444", rates: [1.2, 2.2, 3.2, 4.2] },
  { name: "Islami Bank Bangladesh", shortName: "IBBL", color: "#15803d", rates: [1.1, 2.1, 3.1, 4.1] },
  { name: "NCC Bank", shortName: "NCC", color: "#0284c7", rates: [1.25, 2.25, 3.25, 4.25] },
  { name: "Shahjalal Islami Bank", shortName: "SJIB", color: "#0ea5e9", rates: [1.15, 2.15, 3.15, 4.15] },
  { name: "Southeast Bank", shortName: "SEBL", color: "#7c3aed", rates: [1.2, 2.2, 3.2, 4.2] },
  { name: "Standard Bank", shortName: "SBL", color: "#059669", rates: [1.1, 2.1, 3.1, 4.1] },
] as const;

const months = [3, 6, 9, 12] as const;

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("en-US").format(value)}৳`;

export default function EmiPlansModal({ price, onOpen }: EmiPlansModalProps) {
  const [open, setOpen] = useState(false);

  const columns: TableProps<EmiPlan>["columns"] = useMemo(
    () => [
      { title: "Month", dataIndex: "months", key: "months", width: 90 },
      {
        title: "Charge",
        dataIndex: "charge",
        key: "charge",
        render: (value: number) => formatPrice(value),
      },
      {
        title: "Installment",
        dataIndex: "installment",
        key: "installment",
        render: (value: number) => formatPrice(value),
      },
      {
        title: "Total Cost",
        dataIndex: "total",
        key: "total",
        render: (value: number) => formatPrice(value),
      },
    ],
    [],
  );

  const showModal = () => {
    onOpen?.();
    setOpen(true);
  };

  return (
    <>
      <Button
        type="link"
        size="small"
        icon={<BankOutlined />}
        onClick={showModal}
        className="emi-plans-trigger"
      >
        View Banks EMI Plans
      </Button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={720}
        className="emi-plans-modal"
        title={
          <span className="emi-plans-modal__title">
            <CalculatorOutlined /> EMI Calculator
          </span>
        }
      >
        <Collapse
          accordion
          defaultActiveKey={["0"]}
          expandIconPosition="end"
          className="emi-bank-list"
          items={banks.map((bank, bankIndex) => {
            const plans: EmiPlan[] = months.map((month, planIndex) => {
              const charge = Math.round((price * bank.rates[planIndex]) / 100);
              const total = price + charge;

              return {
                key: `${bankIndex}-${month}`,
                months: month,
                chargeRate: bank.rates[planIndex],
                charge,
                installment: Math.round(total / month),
                total,
              };
            });

            return {
              key: String(bankIndex),
              label: (
                <span className="emi-bank-list__label">
                  <span
                    className="emi-bank-list__logo"
                    style={{ backgroundColor: bank.color }}
                    aria-hidden="true"
                  >
                    {bank.shortName}
                  </span>
                  <strong>{bank.name}</strong>
                </span>
              ),
              children: (
                <Table<EmiPlan>
                  columns={columns}
                  dataSource={plans}
                  pagination={false}
                  size="small"
                  scroll={{ x: 520 }}
                  rowKey="key"
                />
              ),
            };
          })}
        />

        <div className="emi-plans-modal__note">
          <InfoCircleOutlined />
          <span>
            These are estimated installments. Final charges and eligibility depend on the selected bank and card.
          </span>
        </div>
      </Modal>
    </>
  );
}
