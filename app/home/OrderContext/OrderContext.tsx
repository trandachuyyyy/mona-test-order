"use client"
import { CartItem, Order, Product } from '@/types/ICreateOrder';
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface OrderContextType {
    order: Order;
    updateCustomerInfo: (field: keyof Pick<Order, 'customerName' | 'email' | 'phone'>, value: string) => void;
    addToCart: (product: Product) => void;
    updateCart: (index: number, field: keyof CartItem, value: any) => void;
    removeFromCart: (index: number) => void;
    setPaymentMethod: (method: 'cash' | 'card') => void;
    setCustomerPayment: (amount: number) => void;
    calculateTotal: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = React.memo(({ children }) => {
    const [order, setOrder] = useState<Order>({
        customerName: '',
        email: '',
        phone: '',
        cart: [],
        paymentMethod: 'cash',
        customerPayment: 0,
    });

    const calculateTotal = useMemo(() => () => {
        return order.cart.reduce((total, item) => {
            let itemTotal = item.price * item.quantity;
            if (item.promo) {
                itemTotal = item.promo.type === 'fixed'
                    ? itemTotal - item.promo.value
                    : itemTotal * (1 - item.promo.value / 100);
            }
            return total + Math.max(itemTotal, 0);
        }, 0);
    }, [order.cart]);

    const updateCustomerInfo = (field: keyof Pick<Order, 'customerName' | 'email' | 'phone'>, value: string) => {
        setOrder(prev => ({ ...prev, [field]: value }));
    };

    const addToCart = (product: Product) => {
        setOrder(prev => {
            const existingItem = prev.cart.find(item => item.id === product.id);

            if (existingItem) {
                const updatedCart = prev.cart.map(item => {
                    if (item.id === product.id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                });

                return { ...prev, cart: updatedCart };
            }
            return {
                ...prev,
                cart: [...prev.cart, { ...product, quantity: 1, promo: null }],
            };
        });
    };



    const updateCart = (index: number, field: keyof CartItem, value: any) => {
        setOrder(prev => {
            const newCart = [...prev.cart];
            newCart[index] = { ...newCart[index], [field]: value };
            return { ...prev, cart: newCart };
        });
    };

    const removeFromCart = (index: number) => {
        setOrder(prev => ({
            ...prev,
            cart: prev.cart.filter((_, i) => i !== index),
        }));
    };

    const setPaymentMethod = (method: 'cash' | 'card') => {
        setOrder(prev => ({ ...prev, paymentMethod: method }));
    };

    const setCustomerPayment = (amount: number) => {
        setOrder(prev => ({ ...prev, customerPayment: amount }));
    };

    const value = useMemo(() => ({
        order,
        updateCustomerInfo,
        addToCart,
        updateCart,
        removeFromCart,
        setPaymentMethod,
        setCustomerPayment,
        calculateTotal
    }), [order]);

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
});

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrder must be used within OrderProvider');
    return context;
};