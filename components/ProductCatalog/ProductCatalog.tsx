"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Empty,
  Flex,
  Grid,
  Image,
  Pagination,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import { PlusSquareOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import CompareSuccessModal from "@/components/common/CompareSuccessModal";
import { useCompare } from "@/contexts/CompareContext";

export interface CatalogProduct {
  id: string | number;
  title: string;
  imageUrl: string;
  productUrl: string;
  price: number;
  oldPrice?: number;
  badges?: string[];
  specifications?: string[];
}

export interface CatalogSortOption {
  label: ReactNode;
  value: string;
}

export interface ProductCatalogProps {
  title: ReactNode;
  products: CatalogProduct[];
  initialPageSize?: number;
  desktopColumns?: number;
  paginationMode?: "replace" | "append";
  pageSizeOptions?: number[];
  sortOptions?: CatalogSortOption[];
  onBuyNow?: (product: CatalogProduct) => void;
  onCompare?: (product: CatalogProduct) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onSortChange?: (sortBy: string) => void;
  emptyText?: ReactNode;
}

const defaultSortOptions: CatalogSortOption[] = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("en-US").format(price)}৳`;

interface PaginationPrevProps {
  disabled: boolean;
}

function PaginationPrev({ disabled }: PaginationPrevProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "0 8px",
        height: 28,
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        color: disabled ? "#bfbfbf" : hovered ? "#ffffff" : "#3f4654",
        background: hovered ? "#ff4400" : "transparent",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      PREV
    </span>
  );
}

interface PaginationNextProps {
  disabled: boolean;
}

function PaginationNext({ disabled }: PaginationNextProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "0 8px",
        height: 28,
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        color: disabled ? "#bfbfbf" : hovered ? "#ffffff" : "#3f4654",
        background: hovered ? "#ff4400" : "transparent",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      NEXT
    </span>
  );
}

interface ProductCardProps {
  product: CatalogProduct;
  compact: boolean;
  onBuyNow?: (product: CatalogProduct) => void;
  onCompare?: (product: CatalogProduct) => void;
}

function ProductCard({
  product,
  compact,
  onBuyNow,
}: ProductCardProps) {
  const imageAspectRatio = compact ? "4 / 3" : "1 / 1";
  const [hoveredAction, setHoveredAction] = useState<"buy" | "compare" | null>(
    null,
  );
  const { addProduct, isInCompare, products, maxProducts } = useCompare();
  const [messageApi, contextHolder] = message.useMessage();
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareProductName, setCompareProductName] = useState("");
  const router = useRouter();

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 8,
      }}
      styles={{
        body: {
          minHeight: compact ? 200 : 240,
          padding: compact ? 10 : 12,
          display: "flex",
          flexDirection: "column",
        },
      }}
      cover={
        <div
          style={{
            position: "relative",
            aspectRatio: imageAspectRatio,
            padding: compact ? "30px 8px 8px" : "36px 10px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#ffffff",
            borderBottom: "1px solid #edf0f3",
          }}
        >
          {product.badges?.length ? (
            <Flex
              vertical
              gap={3}
              align="flex-start"
              style={{
                position: "absolute",
                zIndex: 2,
                top: 9,
                left: 0,
                maxWidth: "95%",
              }}
            >
              {product.badges.map((badge) => (
                <Tag
                  variant="filled"
                  key={badge}
                  style={{
                    maxWidth: "100%",
                    margin: 0,
                    padding: "2px 8px",
                    overflow: "hidden",
                    color: "#ffffff",
                    background: "linear-gradient(100deg, #73279d, #4a176e)",
                    borderRadius: "0 999px 999px 0",
                    fontSize: compact ? 9 : 10,
                    lineHeight: "16px",
                    fontWeight: 700,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {badge}
                </Tag>
              ))}
            </Flex>
          ) : null}

          <Link href={product.productUrl} aria-label={product.title}>
            <Image
              preview={false}
              src={product.imageUrl}
              alt={product.title}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>
      }
    >
      <Link
        href={product.productUrl}
        style={{ color: "inherit", textDecoration: "none" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#ff4400";
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "inherit";
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        <Typography.Title
          level={3}
          ellipsis={{ rows: 3 }}
          style={{
            margin: 0,
            color: "inherit",
            fontSize: compact ? 12 : 13,
            lineHeight: 1.45,
            fontWeight: 700,
          }}
        >
          {product.title}
        </Typography.Title>
      </Link>

      <div
        style={{
          marginTop: 8,
        }}
      >
        {product.specifications?.length ? (
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              listStyleType: "disc",
              listStylePosition: "outside",
              color: "#4b5563",
              fontSize: compact ? 10 : 11,
              lineHeight: 1.35,
            }}
          >
            {product.specifications.map((specification) => (
              <li
                key={specification}
                style={{ display: "list-item", marginBottom: 6 }}
              >
                {specification}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <Divider style={{ margin: "6px 0" }} />

      <Flex
        align="baseline"
        justify="center"
        wrap
        gap={8}
        style={{ marginBottom: 4 }}
      >
        <Typography.Text
          strong
          style={{ color: "#5D5D5D", fontSize: compact ? 14 : 16 }}
        >
          {formatPrice(product.price)}
        </Typography.Text>
        {product.oldPrice ? (
          <Typography.Text delete type="secondary" style={{ fontSize: 11 }}>
            {formatPrice(product.oldPrice)}
          </Typography.Text>
        ) : null}
      </Flex>

      <Space orientation="vertical" size={5} style={{ width: "100%" }}>
        {contextHolder}
        <Button
          type="text"
          block
          icon={<ShoppingCartOutlined />}
          onClick={() => onBuyNow?.(product)}
          onMouseEnter={() => setHoveredAction("buy")}
          onMouseLeave={() => setHoveredAction(null)}
          onFocus={() => setHoveredAction("buy")}
          onBlur={() => setHoveredAction(null)}
          style={{
            color: hoveredAction === "buy" ? "#ffffff" : "#ff4400",
            background: hoveredAction === "buy" ? "#ff4400" : "#fff5f0",
            borderColor: "transparent",
            fontSize: 13,
            fontWeight: 600,
            transition: "color 0.2s ease, background-color 0.2s ease",
          }}
        >
          Buy Now
        </Button>
        <Button
          type="text"
          block
          icon={<PlusSquareOutlined />}
          onClick={() => {
            if (isInCompare(product.id)) {
              messageApi.info("This product is already in your comparison list.");
              return;
            }
            const specs: Record<string, string> = {};
            product.specifications?.forEach((s) => {
              const [label, ...rest] = s.split(":");
              if (label && rest.length) specs[label.trim()] = rest.join(":").trim();
            });
            const added = addProduct({
              id: product.id,
              title: product.title,
              imageUrl: product.imageUrl,
              productUrl: product.productUrl,
              price: product.price,
              oldPrice: product.oldPrice,
              specs,
            });
            if (added) {
              if (products.length + 1 >= maxProducts) {
                router.push("/compare");
              } else {
                setCompareProductName(product.title);
                setCompareModalOpen(true);
              }
            } else {
              messageApi.warning("You can compare up to 3 products. Remove one first.");
            }
          }}
          onMouseEnter={() => setHoveredAction("compare")}
          onMouseLeave={() => setHoveredAction(null)}
          onFocus={() => setHoveredAction("compare")}
          onBlur={() => setHoveredAction(null)}
          style={{
            color: isInCompare(product.id) ? "#ff4400" : "#3f4654",
            background: hoveredAction === "compare" ? "#f0f1f3" : "transparent",
            fontSize: 13,
            fontWeight: 600,
            transition: "background-color 0.2s ease",
          }}
        >
          {isInCompare(product.id) ? "Added to Compare" : "Add to Compare"}
        </Button>
      </Space>

      <CompareSuccessModal
        open={compareModalOpen}
        productName={compareProductName}
        onClose={() => setCompareModalOpen(false)}
      />
    </Card>
  );
}

export default function ProductCatalog({
  title,
  products,
  initialPageSize = 20,
  desktopColumns,
  paginationMode = "replace",
  pageSizeOptions = [20, 40, 60],
  sortOptions = defaultSortOptions,
  onBuyNow,
  onCompare,
  onPageChange,
  onSortChange,
  emptyText = "No products found",
}: ProductCatalogProps) {
  const screens = Grid.useBreakpoint();
  const compact = !screens.md;
  const desktopColumnWidth = desktopColumns
    ? `${100 / Math.max(1, desktopColumns)}%`
    : undefined;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc")
      result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [products, sortBy]);

  const visibleProducts =
    paginationMode === "append"
      ? sortedProducts.slice(0, page * pageSize)
      : sortedProducts.slice((page - 1) * pageSize, page * pageSize);
  const firstProduct = products.length
    ? paginationMode === "append"
      ? 1
      : (page - 1) * pageSize + 1
    : 0;
  const lastProduct = Math.min(page * pageSize, products.length);
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

  const changePageSize = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
    onPageChange?.(1, nextPageSize);
  };

  const changeSort = (nextSort: string) => {
    setSortBy(nextSort);
    setPage(1);
    onSortChange?.(nextSort);
  };

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    onPageChange?.(nextPage, pageSize);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#304ac4",
          borderRadius: 4,
          colorText: "#111111",
          colorBgTextActive: "transparent",
        },
        components: {
          Button: {
            fontWeight: 600,
            textHoverBg: "transparent",
          },
        },
      }}
    >
      <section
        style={{ width: "100%" }}
        aria-label={typeof title === "string" ? title : "Products"}
      >
        <Card
          size="small"
          style={{ marginBottom: 8, borderRadius: 6 }}
          styles={{ body: { padding: compact ? 10 : "9px 14px" } }}
        >
          <Flex
            vertical={!screens.sm}
            align={screens.sm ? "center" : "stretch"}
            justify="space-between"
            gap={10}
          >
            <Typography.Title
              level={2}
              style={{ margin: 0, fontSize: 15, lineHeight: "28px" }}
            >
              {title}
            </Typography.Title>

            <Flex wrap align="center" gap={12}>
              <Flex align="center" gap={7}>
                <Typography.Text style={{ fontSize: 12 }}>
                  Show:
                </Typography.Text>
                <Select
                  aria-label="Products per page"
                  value={pageSize}
                  options={pageSizeOptions.map((size) => ({
                    label: size,
                    value: size,
                  }))}
                  onChange={changePageSize}
                  style={{ width: 68 }}
                />
              </Flex>

              <Flex align="center" gap={7}>
                <Typography.Text style={{ fontSize: 12 }}>
                  Sort By:
                </Typography.Text>
                <Select
                  aria-label="Sort products"
                  value={sortBy}
                  options={sortOptions}
                  onChange={changeSort}
                  style={{ width: compact ? 128 : 138 }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Card>

        {visibleProducts.length ? (
          <Row gutter={[8, 8]}>
            {visibleProducts.map((product) => (
              <Col
                flex={
                  screens.lg && desktopColumnWidth
                    ? `0 0 ${desktopColumnWidth}`
                    : screens.sm
                      ? "0 0 calc(50% - 4px)"
                      : "0 0 100%"
                }
                key={product.id}
                style={{
                  display: "flex",
                  maxWidth:
                    screens.lg && desktopColumnWidth
                      ? desktopColumnWidth
                      : screens.sm
                        ? "calc(50% - 4px)"
                        : "100%",
                }}
              >
                <ProductCard
                  product={product}
                  compact={compact}
                  onBuyNow={onBuyNow}
                  onCompare={onCompare}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Card>
            <Empty description={emptyText} />
          </Card>
        )}

        {products.length ? (
          <Card
            size="small"
            style={{
              marginTop: 8,
              borderRadius: 0,
              borderInline: 0,
              borderColor: "#eceef2",
              background: "#f7f8fa",
              boxShadow: "none",
            }}
            styles={{
              body: {
                padding: compact ? "12px 8px" : "14px 28px",
              },
            }}
          >
            <Flex
              vertical={!screens.md}
              align={screens.md ? "center" : "stretch"}
              justify="space-between"
              gap={12}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#ff4400",
                    colorPrimaryHover: "#ff4400",
                    colorPrimaryActive: "#ff4400",
                    colorBgTextHover: "transparent",
                    colorBgTextActive: "transparent",
                    borderRadius: 2,
                    fontSize: 11,
                  },
                  components: {
                    Pagination: {
                      itemBg: "transparent",
                      itemActiveBg: "#ff4400",
                      itemActiveColor: "#ffffff",
                      itemActiveColorHover: "#ffffff",
                      itemLinkBg: "transparent",
                      itemSize: 28,
                    },
                  },
                }}
              >
                <Pagination
                  current={page}
                  pageSize={pageSize}
                  total={products.length}
                  style={{ fontWeight: 600 }}
                  showTitle={false}
                  showSizeChanger={false}
                  onChange={changePage}
                  itemRender={(_, type, originalElement) => {
                    if (type === "prev") {
                      return <PaginationPrev disabled={page === 1} />;
                    }

                    if (type === "next") {
                      return <PaginationNext disabled={page >= totalPages} />;
                    }

                    return originalElement;
                  }}
                />
              </ConfigProvider>
              <Typography.Text
                style={{
                  fontSize: 11,
                  textAlign: screens.md ? "right" : "left",
                }}
              >
                Showing {firstProduct} to {lastProduct} of {products.length} (
                {totalPages} Pages)
              </Typography.Text>
            </Flex>
          </Card>
        ) : null}
      </section>
    </ConfigProvider>
  );
}
