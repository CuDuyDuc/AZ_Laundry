
export const NotificationMessage = {
  shop: {
    order: (orderId: string, customerName : string) => ({
      title: "Bạn có đơn hàng mới!",
      body: `Khách hàng ${customerName} vừa đặt hàng. Mã đơn hàng: ${orderId}.`,
      shortDescription: "Thông báo đơn hàng mới",
    }),
    
  },
  client: {
    promotion: (promoTitle: string, discount: string) => ({
      title: "Khuyến mãi đặc biệt!",
      body: `Đừng bỏ lỡ ${promoTitle}! Giảm ngay ${discount}%.`,
      shortDescription: "Ưu đãi độc quyền dành cho bạn",
    }),
  },
  admin: {
    product: (productName: string, shopName: string) => ({
      title: "Dịch vụ mới!",
      body: `${shopName} vừa thêm dịch vụ mới: ${productName} !`,
      shortDescription: "Thông báo dịch vụ mới",
    }),
  },
};

