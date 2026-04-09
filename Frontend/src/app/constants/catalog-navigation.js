export const catalogNavigation = [
  {
    id: "women",
    name: "Women",
    featured: [
      {
        name: "Woman",
        imageAlt: "Women collection",
        href: "/products?category=Women",
      },
    ],
    sections: [
      {
        id: "clothing",
        name: "Clothing",
        items: [
          { name: "Browse All", href: "/products?category=Women" },
          { name: "Dresses", href: "/products?category=Women&subCategory=Dresses" },
          { name: "Blazers", href: "/products?category=Women&subCategory=Blazers" },
          { name: "Handbags", href: "/products?category=Women&subCategory=Handbags" },
          { name: "Tops", href: "/products?category=Women&subCategory=Tops" },
          { name: "Coats", href: "/products?category=Women&subCategory=Coats" },
          { name: "Sweaters", href: "/products?category=Women&subCategory=Sweaters" },
          { name: "Scarfs", href: "/products?category=Women&subCategory=Scarfs" },
          { name: "Jackets", href: "/products?category=Women&subCategory=Jackets" },
        ],
      },
      {
        id: "watch",
        name: "Watch",
        items: [
          {
            name: "Browse All Women's Watch",
            href: "/products?category=Women&subCategory=Watch",
          },
        ],
      },
      {
        id: "accessories",
        name: "Accessories",
        items: [
          {
            name: "Browse All Women's Accessories",
            href: "/products?category=Women&subCategory=Accessories",
          },
        ],
      },
    ],
  },
  {
    id: "men",
    name: "Men",
    featured: [
      {
        name: "Men",
        imageAlt: "Men collection",
        href: "/products?category=Men",
      },
    ],
    sections: [
      {
        id: "clothing",
        name: "Clothing",
        items: [
          { name: "Browse All", href: "/products?category=Men" },
          { name: "T-Shirts", href: "/products?category=Men&subCategory=T-Shirts" },
          { name: "Jackets", href: "/products?category=Men&subCategory=Jackets" },
          { name: "Suits", href: "/products?category=Men&subCategory=Suits" },
          { name: "Hoodies", href: "/products?category=Men&subCategory=Hoodies" },
          { name: "Pants", href: "/products?category=Men&subCategory=Pants" },
          { name: "Shoes", href: "/products?category=Men&subCategory=Shoes" },
          { name: "Belts", href: "/products?category=Men&subCategory=Belts" },
        ],
      },
      {
        id: "watch",
        name: "Watch",
        items: [
          {
            name: "Browse All Men's Watch",
            href: "/products?category=Men&subCategory=Watch",
          },
        ],
      },
      {
        id: "accessories",
        name: "Accessories",
        items: [
          {
            name: "Browse All Men's Accessories",
            href: "/products?category=Men&subCategory=Accessories",
          },
        ],
      },
    ],
  },
];

export const catalogQuickLinks = [
  { name: "All Products", path: "/products" },
  { name: "New Arrivals", path: "/products?new=true" },
  { name: "Accessories", path: "/products?subCategory=Accessories" },
];
