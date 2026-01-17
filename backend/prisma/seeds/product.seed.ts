// import  prisma from '../../src/shared/prisma/prismaClient';

const shop_id="cmk8c98550000tm8vt92a3d4q"

const products = [
    {
      shop_id: shop_id,
      product_name: 'Rose Bouquet Deluxe',
      product_description: 'Premium red roses arrangement',
      product_price: 89.99,
      product_stock: 15,
      category_id: 1,
    },
    {
      shop_id: shop_id,
      product_name: 'Spring Tulip Set',
      product_description: 'Colorful tulip collection',
      product_price: 49.99,
      product_stock: 30,
      category_id: 2,
    },
    {
      shop_id: shop_id,
      product_name: 'Carnation Love',
      product_description: 'Set of three colorful tulip bouquets',
      product_price: 59.99,
      product_stock: 20,
      category_id: 1,
    },
    {
      shop_id: shop_id,
      product_name: 'Ceramic Vase Pink',
      product_description: 'Elegant ceramic vase',
      product_price: 32.00,
      product_stock: 5,
      category_id: 1,
    },
    {
      shop_id: shop_id,
      product_name: 'Sunflower Smile',
      product_description: 'Bright sunflower arrangement',
      product_price: 52.00,
      product_stock: 15,
      category_id: 1,
    },
]

console.log(JSON.stringify(products))


const mockProducts = [
  {
    product_id: "1",
    product_name: "Rose Bouquet",
    product_description: "Beautiful red roses perfect for any occasion",
    product_price: 45.99,
    product_stock: 25,
    category: { category_name: "Bouquets" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500",
      },
    ],
    colors: ["Red", "Pink"],
    tags: ["Valentine", "Romance"],
  },
  {
    product_id: "2",
    product_name: "Tulip Arrangement",
    product_description: "Fresh spring tulips in vibrant colors",
    product_price: 32.5,
    product_stock: 18,
    category: { category_name: "Arrangements" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
      },
    ],
    colors: ["Yellow", "Orange"],
    tags: ["Spring", "Birthday"],
  },
  {
    product_id: "3",
    product_name: "Sunflower Bundle",
    product_description: "Cheerful sunflowers to brighten any room",
    product_price: 28.99,
    product_stock: 30,
    category: { category_name: "Bundles" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=500",
      },
    ],
    colors: ["Yellow"],
    tags: ["Summer", "Cheer"],
  },
  {
    product_id: "4",
    product_name: "Lily Paradise",
    product_description: "Elegant white lilies for special moments",
    product_price: 52.0,
    product_stock: 15,
    category: { category_name: "Premium" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500",
      },
    ],
    colors: ["White", "Pink"],
    tags: ["Wedding", "Elegant"],
  },
  {
    product_id: "5",
    product_name: "Mixed Garden",
    product_description: "Colorful mix of seasonal flowers",
    product_price: 38.75,
    product_stock: 22,
    category: { category_name: "Mixed" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500",
      },
    ],
    colors: ["Mixed"],
    tags: ["Birthday", "Celebration"],
  },
  {
    product_id: "6",
    product_name: "Orchid Elegance",
    product_description: "Exotic orchids in decorative pot",
    product_price: 65.0,
    product_stock: 12,
    category: { category_name: "Potted" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1551738808-2d0a1f3c6e02?w=500",
      },
    ],
    colors: ["Purple", "White"],
    tags: ["Gift", "Premium"],
  },
];