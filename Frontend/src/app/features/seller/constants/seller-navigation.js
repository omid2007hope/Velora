export const sellerNavigation = (id) => [
  {
    href: "/seller",
    label: "Dashboard",
    icon: "dashboard",
  },

  {
    href: `/seller/store/${id}`,
    label: "Create Store",
    icon: "create",
  },

  {
    href: "/seller/products/new",
    label: "Add Product",
    icon: "create",
  },
];
