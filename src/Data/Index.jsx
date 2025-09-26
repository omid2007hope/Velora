// sampleData.js
// Professional sample database for Men’s & Women’s Clothing

import Shirt from "../assets/Images/Shirt.png";

// Categories (these can map to product.category values)
export const categories = [
  {
    id: 1,
    name: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
  },
  {
    id: 2,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
  },
  {
    id: 3,
    name: "Men’s Collection",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
  },
  {
    id: 4,
    name: "Women’s Collection",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
];

// Main Product Database (100 Items: Men + Women)
export const products = [
  // -------------------- MEN’S COLLECTION --------------------
  // ---- Men’s Collection ----
  {
    id: 1,
    name: "Men's Casual Shirt",
    oldPrice: 59,
    newPrice: 39,
    discount: "34%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
  },
  {
    id: 2,
    name: "Men's Denim Jacket",
    oldPrice: 120,
    newPrice: 85,
    discount: "29%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
  },
  {
    id: 3,
    name: "Men's Formal Suit",
    oldPrice: 350,
    newPrice: 299,
    discount: "15%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1520962918287-7448c2878f65?w=600&q=80",
  },
  {
    id: 4,
    name: "Men's Polo T-Shirt",
    oldPrice: 49,
    newPrice: 29,
    discount: "40%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389ad?w=600&q=80",
  },
  {
    id: 5,
    name: "Men's Leather Jacket",
    oldPrice: 220,
    newPrice: 175,
    discount: "20%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924a6e8192?w=600&q=80",
  },

  // ---- Women’s Collection ----
  {
    id: 6,
    name: "Women's Summer Dress",
    oldPrice: 89,
    newPrice: 59,
    discount: "34%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 7,
    name: "Women's Blazer",
    oldPrice: 140,
    newPrice: 99,
    discount: "29%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520975922215-7c71a6e947c6?w=600&q=80",
  },
  {
    id: 8,
    name: "Women's Leather Handbag",
    oldPrice: 199,
    newPrice: 149,
    discount: "25%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
  },
  {
    id: 9,
    name: "Women's Casual Top",
    oldPrice: 49,
    newPrice: 29,
    discount: "40%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602810318383-ea3e9b4bba84?w=600&q=80",
  },
  {
    id: 10,
    name: "Women's Winter Coat",
    oldPrice: 260,
    newPrice: 210,
    discount: "19%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  },

  {
    id: 11,
    name: "Men's Hoodie",
    oldPrice: 70,
    newPrice: 49,
    discount: "30%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1617957741644-1a4e5ec6b4f0?w=600&q=80",
  },
  {
    id: 12,
    name: "Women's Party Dress",
    oldPrice: 150,
    newPrice: 110,
    discount: "27%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520975698519-59c51a7a471d?w=600&q=80",
  },
  {
    id: 13,
    name: "Men's Cargo Pants",
    oldPrice: 90,
    newPrice: 65,
    discount: "28%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1604176354204-926a4e4ff7bc?w=600&q=80",
  },
  {
    id: 14,
    name: "Women's Knit Sweater",
    oldPrice: 80,
    newPrice: 55,
    discount: "31%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
  },
  {
    id: 15,
    name: "Men's Sneakers",
    oldPrice: 120,
    newPrice: 89,
    discount: "26%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: 16,
    name: "Women's Denim Jeans",
    oldPrice: 95,
    newPrice: 65,
    discount: "32%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1614288500447-f5c99a9abf19?w=600&q=80",
  },
  {
    id: 17,
    name: "Men's Sports Jacket",
    oldPrice: 150,
    newPrice: 115,
    discount: "23%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
  },
  {
    id: 18,
    name: "Women's Silk Scarf",
    oldPrice: 60,
    newPrice: 40,
    discount: "33%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 19,
    name: "Men's Wool Coat",
    oldPrice: 280,
    newPrice: 230,
    discount: "18%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  },
  {
    id: 20,
    name: "Women's Sport Leggings",
    oldPrice: 70,
    newPrice: 45,
    discount: "35%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1576511458949-26f2e6e55f4a?w=600&q=80",
  },
  {
    id: 21,
    name: "Men's Running Shorts",
    oldPrice: 55,
    newPrice: 35,
    discount: "36%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80",
  },
  {
    id: 22,
    name: "Women's Leather Boots",
    oldPrice: 180,
    newPrice: 140,
    discount: "22%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7b9d2a2c3?w=600&q=80",
  },
  {
    id: 23,
    name: "Men's Slim Fit Jeans",
    oldPrice: 95,
    newPrice: 70,
    discount: "26%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
  },
  {
    id: 24,
    name: "Women's Evening Gown",
    oldPrice: 300,
    newPrice: 240,
    discount: "20%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520974735194-5aa9f1f9c8d3?w=600&q=80",
  },
  {
    id: 25,
    name: "Men's Bomber Jacket",
    oldPrice: 160,
    newPrice: 125,
    discount: "22%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1580316014600-890d57d3b7d2?w=600&q=80",
  },
  {
    id: 26,
    name: "Women's Crop Top",
    oldPrice: 45,
    newPrice: 29,
    discount: "36%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 27,
    name: "Men's Wool Sweater",
    oldPrice: 120,
    newPrice: 95,
    discount: "21%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1614288500447-f5c99a9abf19?w=600&q=80",
  },
  {
    id: 28,
    name: "Women's Maxi Dress",
    oldPrice: 130,
    newPrice: 95,
    discount: "27%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
  },
  {
    id: 29,
    name: "Men's Flannel Shirt",
    oldPrice: 70,
    newPrice: 50,
    discount: "28%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389ad?w=600&q=80",
  },
  {
    id: 30,
    name: "Women's Trench Coat",
    oldPrice: 200,
    newPrice: 160,
    discount: "20%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  },
  {
    id: 31,
    name: "Men's Graphic T-Shirt",
    oldPrice: 45,
    newPrice: 25,
    discount: "44%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389ad?w=600&q=80",
  },
  {
    id: 32,
    name: "Women's Blouse",
    oldPrice: 65,
    newPrice: 45,
    discount: "31%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602810318383-ea3e9b4bba84?w=600&q=80",
  },
  {
    id: 33,
    name: "Men's Track Pants",
    oldPrice: 85,
    newPrice: 60,
    discount: "29%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1604176354204-926a4e4ff7bc?w=600&q=80",
  },
  {
    id: 34,
    name: "Women's Skirt",
    oldPrice: 75,
    newPrice: 55,
    discount: "27%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1614288500447-f5c99a9abf19?w=600&q=80",
  },
  {
    id: 35,
    name: "Men's Blazer",
    oldPrice: 190,
    newPrice: 150,
    discount: "21%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
  },
  {
    id: 36,
    name: "Women's Cardigan",
    oldPrice: 90,
    newPrice: 65,
    discount: "28%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
  },
  {
    id: 37,
    name: "Men's Overcoat",
    oldPrice: 250,
    newPrice: 199,
    discount: "20%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  },
  {
    id: 38,
    name: "Women's Jumpsuit",
    oldPrice: 140,
    newPrice: 110,
    discount: "21%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520975698519-59c51a7a471d?w=600&q=80",
  },
  {
    id: 39,
    name: "Men's Leather Belt",
    oldPrice: 50,
    newPrice: 35,
    discount: "30%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
  },
  {
    id: 40,
    name: "Women's Wool Hat",
    oldPrice: 40,
    newPrice: 25,
    discount: "38%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 41,
    name: "Men's Running Shoes",
    oldPrice: 130,
    newPrice: 95,
    discount: "27%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7b9d2a2c3?w=600&q=80",
  },
  {
    id: 42,
    name: "Women's High Heels",
    oldPrice: 160,
    newPrice: 120,
    discount: "25%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: 43,
    name: "Men's Tank Top",
    oldPrice: 45,
    newPrice: 29,
    discount: "36%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389ad?w=600&q=80",
  },
  {
    id: 44,
    name: "Women's Denim Jacket",
    oldPrice: 150,
    newPrice: 110,
    discount: "27%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924a6e8192?w=600&q=80",
  },
  {
    id: 45,
    name: "Men's Sports Shorts",
    oldPrice: 60,
    newPrice: 40,
    discount: "33%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80",
  },
  {
    id: 46,
    name: "Women's Yoga Pants",
    oldPrice: 80,
    newPrice: 55,
    discount: "31%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1576511458949-26f2e6e55f4a?w=600&q=80",
  },
  {
    id: 47,
    name: "Men's Beanie Hat",
    oldPrice: 35,
    newPrice: 20,
    discount: "43%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 48,
    name: "Women's Blazer Dress",
    oldPrice: 190,
    newPrice: 150,
    discount: "21%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520974735194-5aa9f1f9c8d3?w=600&q=80",
  },
  {
    id: 49,
    name: "Men's Chinos",
    oldPrice: 85,
    newPrice: 65,
    discount: "24%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1604176354204-926a4e4ff7bc?w=600&q=80",
  },
  {
    id: 50,
    name: "Women's Casual Hoodie",
    oldPrice: 90,
    newPrice: 65,
    discount: "28%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1617957741644-1a4e5ec6b4f0?w=600&q=80",
  },
  {
    id: 51,
    name: "Men's Pullover Sweatshirt",
    oldPrice: 75,
    newPrice: 55,
    discount: "27%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
  },
  {
    id: 52,
    name: "Women's Knit Dress",
    oldPrice: 110,
    newPrice: 85,
    discount: "23%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520975698519-59c51a7a471d?w=600&q=80",
  },
  {
    id: 53,
    name: "Men's Leather Gloves",
    oldPrice: 65,
    newPrice: 45,
    discount: "31%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
  },
  {
    id: 54,
    name: "Women's Summer Sandals",
    oldPrice: 70,
    newPrice: 49,
    discount: "30%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7b9d2a2c3?w=600&q=80",
  },
  {
    id: 55,
    name: "Men's Graphic Hoodie",
    oldPrice: 85,
    newPrice: 65,
    discount: "24%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
  },
  {
    id: 56,
    name: "Women's Floral Dress",
    oldPrice: 95,
    newPrice: 70,
    discount: "26%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 57,
    name: "Men's Casual Sneakers",
    oldPrice: 110,
    newPrice: 85,
    discount: "23%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: 58,
    name: "Women's Casual T-Shirt",
    oldPrice: 40,
    newPrice: 25,
    discount: "38%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602810318383-ea3e9b4bba84?w=600&q=80",
  },
  {
    id: 59,
    name: "Men's Formal Tie",
    oldPrice: 55,
    newPrice: 35,
    discount: "36%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
  },
  {
    id: 60,
    name: "Women's Wool Scarf",
    oldPrice: 50,
    newPrice: 35,
    discount: "30%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 61,
    name: "Men's Puffer Jacket",
    oldPrice: 180,
    newPrice: 140,
    discount: "22%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
  },
  {
    id: 62,
    name: "Women's Knit Beanie",
    oldPrice: 40,
    newPrice: 25,
    discount: "38%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 63,
    name: "Men's Track Jacket",
    oldPrice: 120,
    newPrice: 95,
    discount: "21%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924a6e8192?w=600&q=80",
  },
  {
    id: 64,
    name: "Women's Sleeveless Dress",
    oldPrice: 100,
    newPrice: 75,
    discount: "25%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 65,
    name: "Men's Casual Loafers",
    oldPrice: 110,
    newPrice: 85,
    discount: "23%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: 66,
    name: "Women's Faux Fur Coat",
    oldPrice: 220,
    newPrice: 175,
    discount: "20%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  },
  {
    id: 67,
    name: "Men's Checkered Shirt",
    oldPrice: 75,
    newPrice: 55,
    discount: "27%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389ad?w=600&q=80",
  },
  {
    id: 68,
    name: "Women's Long Skirt",
    oldPrice: 85,
    newPrice: 60,
    discount: "29%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1614288500447-f5c99a9abf19?w=600&q=80",
  },
  {
    id: 69,
    name: "Men's Sports Cap",
    oldPrice: 35,
    newPrice: 20,
    discount: "43%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 70,
    name: "Women's Ankle Boots",
    oldPrice: 160,
    newPrice: 125,
    discount: "22%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7b9d2a2c3?w=600&q=80",
  },
  {
    id: 71,
    name: "Men's Joggers",
    oldPrice: 85,
    newPrice: 60,
    discount: "29%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1604176354204-926a4e4ff7bc?w=600&q=80",
  },
  {
    id: 72,
    name: "Women's Summer Sandals",
    oldPrice: 65,
    newPrice: 45,
    discount: "31%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7b9d2a2c3?w=600&q=80",
  },
  {
    id: 73,
    name: "Men's Zip-Up Hoodie",
    oldPrice: 95,
    newPrice: 70,
    discount: "26%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1617957741644-1a4e5ec6b4f0?w=600&q=80",
  },
  {
    id: 74,
    name: "Women's Tunic Top",
    oldPrice: 55,
    newPrice: 35,
    discount: "36%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602810318383-ea3e9b4bba84?w=600&q=80",
  },
  {
    id: 75,
    name: "Men's Chelsea Boots",
    oldPrice: 150,
    newPrice: 120,
    discount: "20%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: 76,
    name: "Women's Wool Sweater",
    oldPrice: 100,
    newPrice: 75,
    discount: "25%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
  },
  {
    id: 77,
    name: "Men's Parka Coat",
    oldPrice: 200,
    newPrice: 160,
    discount: "20%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  },
  {
    id: 78,
    name: "Women's Fashion Scarf",
    oldPrice: 50,
    newPrice: 30,
    discount: "40%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 79,
    name: "Men's Dress Shoes",
    oldPrice: 180,
    newPrice: 140,
    discount: "22%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7b9d2a2c3?w=600&q=80",
  },
  {
    id: 80,
    name: "Women's Wrap Dress",
    oldPrice: 120,
    newPrice: 95,
    discount: "21%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520975698519-59c51a7a471d?w=600&q=80",
  },
  {
    id: 81,
    name: "Men's Polo Shirt",
    oldPrice: 65,
    newPrice: 45,
    discount: "31%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389ad?w=600&q=80",
  },
  {
    id: 82,
    name: "Women's Sequin Dress",
    oldPrice: 220,
    newPrice: 175,
    discount: "20%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520974735194-5aa9f1f9c8d3?w=600&q=80",
  },
  {
    id: 83,
    name: "Men's Hiking Boots",
    oldPrice: 160,
    newPrice: 125,
    discount: "22%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7b9d2a2c3?w=600&q=80",
  },
  {
    id: 84,
    name: "Women's Crop Hoodie",
    oldPrice: 85,
    newPrice: 60,
    discount: "29%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1617957741644-1a4e5ec6b4f0?w=600&q=80",
  },
  {
    id: 85,
    name: "Men's Cargo Shorts",
    oldPrice: 75,
    newPrice: 55,
    discount: "27%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1604176354204-926a4e4ff7bc?w=600&q=80",
  },
  {
    id: 86,
    name: "Women's Pencil Skirt",
    oldPrice: 90,
    newPrice: 65,
    discount: "28%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1614288500447-f5c99a9abf19?w=600&q=80",
  },
  {
    id: 87,
    name: "Men's Varsity Jacket",
    oldPrice: 190,
    newPrice: 150,
    discount: "21%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
  },
  {
    id: 88,
    name: "Women's Wool Coat",
    oldPrice: 210,
    newPrice: 170,
    discount: "19%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  },
  {
    id: 89,
    name: "Men's Denim Shorts",
    oldPrice: 70,
    newPrice: 50,
    discount: "28%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
  },
  {
    id: 90,
    name: "Women's Leather Skirt",
    oldPrice: 120,
    newPrice: 90,
    discount: "25%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520975698519-59c51a7a471d?w=600&q=80",
  },
  {
    id: 91,
    name: "Men's Trench Coat",
    oldPrice: 260,
    newPrice: 210,
    discount: "19%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  },
  {
    id: 92,
    name: "Women's Casual Sneakers",
    oldPrice: 95,
    newPrice: 70,
    discount: "26%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: 93,
    name: "Men's Wool Hat",
    oldPrice: 45,
    newPrice: 30,
    discount: "33%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 94,
    name: "Women's Satin Blouse",
    oldPrice: 75,
    newPrice: 55,
    discount: "27%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602810318383-ea3e9b4bba84?w=600&q=80",
  },
  {
    id: 95,
    name: "Men's Running Jacket",
    oldPrice: 130,
    newPrice: 95,
    discount: "27%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924a6e8192?w=600&q=80",
  },
  {
    id: 96,
    name: "Women's Wool Mittens",
    oldPrice: 40,
    newPrice: 25,
    discount: "38%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542062703-3cdbd5f89d93?w=600&q=80",
  },
  {
    id: 97,
    name: "Men's V-Neck Sweater",
    oldPrice: 95,
    newPrice: 70,
    discount: "26%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
  },
  {
    id: 98,
    name: "Women's Cocktail Dress",
    oldPrice: 160,
    newPrice: 125,
    discount: "22%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 99,
    name: "Men's Slim Blazer",
    oldPrice: 180,
    newPrice: 145,
    discount: "19%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
  },
  {
    id: 100,
    name: "Women's Maxi Gown",
    oldPrice: 250,
    newPrice: 199,
    discount: "20%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520974735194-5aa9f1f9c8d3?w=600&q=80",
  },
  // ... IDs 4 → 100 (already expanded with unique Men’s & Women’s items)
  // Keep same structure: { id, name, category, oldPrice, newPrice, discount, image }
  // ✅ You already have 100 filled, just keep the format identical to these samples.
];

// Example Watch Collection
export const watchCollection = [
  {
    id: 201,
    name: "Luxury Chrono Watch",
    category: "Watches",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
];

// Example Best Sellers
export const bestSellers = [
  {
    id: 1,
    name: "Men's Casual Shirt",
    oldPrice: 59,
    newPrice: 39,
    discount: "34%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
  },
  {
    id: 2,
    name: "Men's Denim Jacket",
    oldPrice: 120,
    newPrice: 85,
    discount: "29%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
  },
  {
    id: 3,
    name: "Men's Formal Suit",
    oldPrice: 350,
    newPrice: 299,
    discount: "15%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1520962918287-7448c2878f65?w=600&q=80",
  },
  {
    id: 4,
    name: "Men's Polo T-Shirt",
    oldPrice: 49,
    newPrice: 29,
    discount: "40%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389ad?w=600&q=80",
  },
  {
    id: 5,
    name: "Men's Leather Jacket",
    oldPrice: 220,
    newPrice: 175,
    discount: "20%",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924a6e8192?w=600&q=80",
  },

  // ---- Women’s Collection ----
  {
    id: 6,
    name: "Women's Summer Dress",
    oldPrice: 89,
    newPrice: 59,
    discount: "34%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 7,
    name: "Women's Blazer",
    oldPrice: 140,
    newPrice: 99,
    discount: "29%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1520975922215-7c71a6e947c6?w=600&q=80",
  },
  {
    id: 8,
    name: "Women's Leather Handbag",
    oldPrice: 199,
    newPrice: 149,
    discount: "25%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
  },
  {
    id: 9,
    name: "Women's Casual Top",
    oldPrice: 49,
    newPrice: 29,
    discount: "40%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602810318383-ea3e9b4bba84?w=600&q=80",
  },
  {
    id: 10,
    name: "Women's Winter Coat",
    oldPrice: 260,
    newPrice: 210,
    discount: "19%",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  },
];

export const deals = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: Shirt,
    oldPrice: "$199",
    newPrice: "$99",
    discount: "50% OFF",
  },
  {
    id: 2,
    name: "Smart Watch",
    image: Shirt,
    oldPrice: "$249",
    newPrice: "$149",
    discount: "40% OFF",
  },
  {
    id: 3,
    name: "Minimalist Chair",
    image: Shirt,
    oldPrice: "$399",
    newPrice: "$199",
    discount: "50% OFF",
  },
  {
    id: 4,
    name: "Stylish Backpack",
    image: Shirt,
    oldPrice: "$89",
    newPrice: "$49",
    discount: "45% OFF",
  },
];
