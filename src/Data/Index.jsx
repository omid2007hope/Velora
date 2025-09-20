// sampleData.js
import Shirt from "../assets/Images/Shirt.png";

export const categories = [
  { id: 1, name: "New Arrivals", image: Shirt },
  { id: 2, name: "Accessories", image: Shirt },
  { id: 3, name: "Men’s Collection", image: Shirt },
  { id: 4, name: "Women’s Collection", image: Shirt },
];

export const products = [
  {
    id: 101,
    name: "Wireless Headphones",
    oldPrice: 199,
    newPrice: 99,
    discount: "50%",
    category: "Electronics",
    image: Shirt,
  },
  {
    id: 102,
    name: "Smart Watch",
    oldPrice: 249,
    newPrice: 149,
    discount: "40%",
    category: "Electronics",
    image: Shirt,
  },
  {
    id: 103,
    name: "Minimalist Chair",
    oldPrice: 399,
    newPrice: 199,
    discount: "50%",
    category: "Furniture",
    image: Shirt,
  },
  {
    id: 104,
    name: "Stylish Backpack",
    oldPrice: 99,
    newPrice: 49,
    discount: "45%",
    category: "Bags",
    image: Shirt,
  },
];

export const watchCollection = [
  {
    id: 201,
    name: "Luxury Chrono Watch",
    price: 350,
    category: "Watches",
    image: Shirt,
  },
];

export const bestSellers = [
  {
    id: 301,
    name: "Earthen Bottle",
    price: 48,
    image: Shirt,
  },
  {
    id: 302,
    name: "Nomad Tumbler",
    price: 35,
    image: Shirt,
  },
  {
    id: 303,
    name: "Focus Paper Refill",
    price: 89,
    image: Shirt,
  },
  {
    id: 304,
    name: "Machined Mechanical Pencil",
    price: 35,
    image: Shirt,
  },
  {
    id: 305,
    name: "Focus Card Tray",
    price: 64,
    image: Shirt,
  },
  {
    id: 306,
    name: "Focus Multi-Pack",
    price: 39,
    image: Shirt,
  },
  {
    id: 307,
    name: "Brass Scissors",
    price: 50,
    image: Shirt,
  },
  {
    id: 308,
    name: "Focus Carry Pouch",
    price: 32,
    image: Shirt,
  },
];
