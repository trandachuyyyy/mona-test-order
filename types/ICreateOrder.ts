export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
}

export interface PromoCode {
    code: string;
    type: "fixed" | "percent";
    value: number;
}

export interface CartItem extends Product {
    quantity: number;
    promo: PromoCode | null;
}

export interface Order {
    customerName: string;
    email: string;
    phone: string;
    cart: CartItem[];
    paymentMethod: "cash" | "card";
    customerPayment: number;
}
