"use client";

import { Avatar, Card, ConfigProvider, Typography } from "antd";
import {
  FileTextOutlined,
  ProfileOutlined,
  UserOutlined,
  LockOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  DesktopOutlined,
  StarOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const menuItems = [
  { icon: <FileTextOutlined />, label: "Orders", href: "/account/orders" },
  { icon: <ProfileOutlined />, label: "Quote", href: "/account/quote" },
  { icon: <UserOutlined />, label: "Edit Profile", href: "/account/edit-profile" },
  { icon: <LockOutlined />, label: "Change Password", href: "/account/change-password" },
  { icon: <EnvironmentOutlined />, label: "Addresses", href: "/account/addresses" },
  { icon: <HeartOutlined />, label: "Wish List", href: "/account/wishlist" },
  { icon: <DesktopOutlined />, label: "Saved PC", href: "/account/saved-pc" },
  { icon: <StarOutlined />, label: "Star Points", href: "/account/star-points" },
  { icon: <WalletOutlined />, label: "Your Transactions", href: "/account/transactions" },
];

export default function AccountDashboard() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff4400",
          colorPrimaryHover: "#ff4400",
        },
      }}
    >
      <Header
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Account" },
        ]}
      />

      <main style={{ background: "#f1f3f7", minHeight: "60vh" }}>
        <div
          style={{
            width: "calc(100% - 32px)",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "24px 0 40px",
          }}
        >
          <Card
            style={{
              borderRadius: 8,
              marginBottom: 24,
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#ff4400" }}
                />
                <div>
                  <Typography.Text style={{ fontSize: 13, color: "#6b7280" }}>
                    Hello,
                  </Typography.Text>
                  <Typography.Title
                    level={4}
                    style={{ margin: 0, fontSize: 18, fontWeight: 700 }}
                  >
                    Muhammad Khan
                  </Typography.Title>
                </div>
              </div>

              <div style={{ display: "flex", gap: 32 }}>
                <div style={{ textAlign: "center" }}>
                  <Typography.Text style={{ fontSize: 12, color: "#6b7280" }}>
                    Star Points
                  </Typography.Text>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#ff4400" }}>
                    0
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Typography.Text style={{ fontSize: 12, color: "#6b7280" }}>
                    Store Credit
                  </Typography.Text>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#ff4400" }}>
                    0
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  hoverable
                  style={{
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    textAlign: "center",
                  }}
                  styles={{
                    body: {
                      padding: "32px 16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    },
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#fff5f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      color: "#ff4400",
                    }}
                  >
                    {item.icon}
                  </div>
                  <Typography.Text
                    style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}
                  >
                    {item.label}
                  </Typography.Text>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </ConfigProvider>
  );
}
