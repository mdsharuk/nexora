"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, Button, Checkbox, message } from "antd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: Record<string, unknown>) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageApi.success("Account created successfully! Please login.");
      console.log("Register values:", values);
    }, 1500);
  };

  return (
    <>
      {contextHolder}
      <Header />
      <Breadcrumb
        items={[
          { label: "Account", href: "/account" },
          { label: "Register", href: "/register" },
        ]}
      />
      <main className="auth-page">
        <div className="auth-container">
          <h1 className="auth-title">Register Account</h1>
          <div className="auth-form-wrapper">
            <Form
              name="register"
              className="auth-form"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
            >
              <div className="auth-form-row">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </div>

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
                label="Telephone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  {
                    pattern: /^[0-9+\-\s()]+$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input placeholder="Telephone" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please create a password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match"),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item
                name="agree"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("You must agree to the privacy policy"),
                          ),
                  },
                ]}
              >
                <Checkbox>
                  I have read and agree to the{" "}
                  <Link href="/privacy" style={{ color: "#ff4400" }}>
                    Privacy Policy
                  </Link>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Continue
                </Button>
              </Form.Item>
            </Form>

            <div className="auth-divider">Already have an account?</div>

            <div className="auth-footer">
              <p>
                If you already have an account with us, please login at the{" "}
                <Link href="/login">Login here</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
