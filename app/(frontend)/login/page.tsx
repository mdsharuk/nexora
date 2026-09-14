"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import ProductCatalog, { CatalogProduct } from "@/components/ProductCatalog";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageApi.success("Login successful! Welcome back.");
    }, 1500);
  };

  return (
    <>
      {contextHolder}
      <Header />
      <Breadcrumb
        items={[
          { label: "Account", href: "/account" },
          { label: "Login", href: "/login" },
        ]}
      />
      <main className="auth-page">
        <div className="auth-container">
          <h1 className="auth-title">Account Login</h1>
          <div className="auth-form-wrapper">
            <Form
              name="login"
              className="auth-form"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link
                  href="/forgot-password"
                  style={{ fontSize: 13, color: "#ff4400" }}
                >
                  Forgot password?
                </Link>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Continue
                </Button>
              </Form.Item>
            </Form>

            <div className="auth-divider">New Customer?</div>

            <div className="auth-footer">
              <p>
                If you are new here, please create an account at the{" "}
                <Link href="/register">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
