"use client";
import { useOrder } from '@/app/home/OrderContext/OrderContext';
import { PromoCode } from '@/types/ICreateOrder';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, InputNumber, List, Select } from 'antd';
import React, { memo } from 'react';
import styled from 'styled-components';

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 370px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ScrollableList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 12px;

  scrollbar-width: none; 
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0px; 
    background: transparent;
  }

  &:hover {
    scrollbar-width: thin;
  }

  &:hover::-webkit-scrollbar {
    width: 6px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
  }

  &:hover::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;


const Total = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
  text-align: right;
`;

const CartItem = styled(List.Item)`
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .cart-item-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .cart-item-controls {
    display: flex;
    gap: 16px;
    margin-top: 8px;
    flex-wrap: wrap;
    align-items: center;

    @media (max-width: 768px) {
      gap: 8px;
      flex-direction: column;
      width: 100%;

      .ant-input-number,
      .ant-select,
      .ant-btn {
        width: 100% !important;
      }
    }
  }

   .delete-btn-desktop {
    display: block;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .delete-btn-mobile {
    display: none;

    @media (max-width: 768px) {
      display: inline-block;
    }
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 16px;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin-right: 0;
  }
`;

const promoCodes: PromoCode[] = [
  { code: 'PHONE200K', type: 'fixed', value: 200000 },
  { code: 'SALE15', type: 'percent', value: 15 },
];

const CartList: React.FC = memo(() => {
  const { order, updateCart, removeFromCart, calculateTotal } = useOrder();

  return (
    <CartWrapper>
      <ScrollableList>
        <List
          dataSource={order.cart}
          renderItem={(item, index) => (
            <CartItem>
              <div className="cart-item-wrapper">
                <ProductImage src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <div>{item.name}</div>
                  <div className="cart-item-controls">
                    <InputNumber
                      min={0}
                      value={item.price}
                      onChange={value => updateCart(index, 'price', Number(value))}
                      formatter={value =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                    />
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={value => updateCart(index, 'quantity', Number(value))}
                    />
                    <Select
                      allowClear
                      placeholder="Mã khuyến mãi"
                      style={{ width: 150 }}
                      onChange={value =>
                        updateCart(
                          index,
                          'promo',
                          promoCodes.find(p => p.code === value) || null
                        )
                      }
                    >
                      {promoCodes.map(promo => (
                        <Select.Option key={promo.code} value={promo.code}>
                          {promo.code}
                        </Select.Option>
                      ))}
                    </Select>
                    <Button
                      className="delete-btn-mobile"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(index)}
                    />

                  </div>
                </div>
              </div>
              <div className="delete-btn-desktop">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeFromCart(index)}
                />
              </div>
            </CartItem>
          )}
        />
      </ScrollableList>

      <Total>Tổng tiền: {calculateTotal().toLocaleString()} ₫</Total>
    </CartWrapper>
  );
});

export default CartList;
