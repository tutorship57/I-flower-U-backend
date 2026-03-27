import swaggerAutogen from "swagger-autogen";
import path from "path";

const outputFile = path.resolve(__dirname, "./swagger-output.json");

// ส่งหลายไฟล์ หรือ glob pattern ของ router ของคุณ
const endpointsFiles = [
  path.resolve(__dirname, "../../server.ts"), // router หลัก
//   path.resolve(__dirname, "../../modules/**/routes/*.ts"), // router ย่อยทั้งหมด
//   path.resolve(__dirname, "../../routes/api.ts"),
];

const doc = {
  info: {
    title: "My API",
    description: "Auto generated API documentation",
  },
  host: "localhost:3000",
  schemes: ["http"],
  tags: [
    { name: "Auth", description: "Authentication & Login" },
    { name: "Cart", description: "Shopping Cart" },
    { name: "CartItem", description: "CartItem manage" },
    { name: "Checkout", description: "Checkout process" },
    { name: "Order", description: "Order management" },
    { name: "OrderItem", description: "OrderItem management" },
    { name: "Payment", description: "Payment handling" },
    { name: "PaymentType", description: "Type Payment manage" },
    { name: "Category", description: "Category management" },
    { name: "Color", description: "Color management" },
    { name: "TagEvent", description: "TagEvent management" },
    { name: "Product", description: "Product management" },
    { name: "ProductType", description: "ProductType management" },
    { name: "ProductColor", description: "ProductColor management" },
    { name: "ProductImage", description: "ProductImage management" },
    { name: "ProductSet", description: "ProductSet management" },
    { name: "ProductTagEvent", description: "ProductTagEvent management" },
    { name: "Recommendation", description: "Recommendation system" },
    { name: "Shop", description: "Shop management" },
    { name: "ProductStock", description: "Inventory / stock" },
    { name: "TransactionStock", description: "transaction-stock" },
    { name: "ReservationStock", description: "reservation-stock" },
    { name: "User", description: "User management" },
    { name: "Role", description: "Role management" },
    { name: "Webhook", description: "External webhooks (Stripe etc.)" },
  ],
    // #swagger.tags = ['OrderItem']
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
