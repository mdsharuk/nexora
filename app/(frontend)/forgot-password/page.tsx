"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Form, Input, message } from "antd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";

interface ForgotPasswordValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = ({ email }: ForgotPasswordValues) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      messageApi.success(
        `Password reset instructions have been sent to ${email}.`,
      );
    }, 1500);
  };

  return (
    <>
      {contextHolder}
      <Header />
      <Breadcrumb
        items={[
          { label: "Account", href: "/account" },
          { label: "Forgot Password", href: "/forgot-password" },
        ]}
      />

      <main className="auth-page">
        <div className="auth-container">
          <h1 className="auth-title">Forgot Password</h1>

          <div className="auth-form-wrapper">
            <p className="auth-description">
              Enter the email address associated with your account. We&apos;ll
              send you instructions to reset your password.
            </p>

            <Form<ForgotPasswordValues>
              name="forgot-password"
              className="auth-form"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input type="email" placeholder="Email" autoComplete="email" />
              </Form.Item>

              <Form.Item className="auth-submit-item">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>

            <div className="auth-footer auth-footer-compact">
              Remember your password? <Link href="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
