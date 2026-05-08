import { getSellerStore } from "../../../../api/seller/Seller_API";

export const getSellerNavigation = async () => {
  const store = await getSellerStore();

  if (Array.isArray(store) && store.length > 0) {
    return [
      {
        href: "/seller",
        label: "Dashboard",
        icon: "dashboard",
      },
      {
        href: "/seller/store",
        label: "Create Store",
        icon: "create",
      },
      {
        href: "/seller/products/new",
        label: "Add Product",
        icon: "create",
      },
    ];
  }

  return [
    {
      href: "/seller",
      label: "Dashboard",
      icon: "dashboard",
    },
    {
      href: "/seller/store",
      label: "Create Store",
      icon: "create",
    },
  ];
};
