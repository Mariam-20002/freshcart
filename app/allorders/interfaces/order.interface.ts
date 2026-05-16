export interface OrderInterface {
  _id: string;

  id: number;

  createdAt: string;

  totalOrderPrice: number;

  shippingAddress: {
    city: string;

    details: string;

    phone: string;
  };

  cartItems: {
    _id: string;

    count: number;

    price: number;

    product: {
      title: string;

      imageCover: string;
    };
  }[];
}