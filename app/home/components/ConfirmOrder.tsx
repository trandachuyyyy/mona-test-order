"use client";
import { CartItem } from '@/types/ICreateOrder';
import { Image, List, Modal } from 'antd';
import React, { memo } from 'react';
import styled from 'styled-components';
import { useOrder } from '../OrderContext/OrderContext';

const StyledModal = styled(Modal)`
  .ant-modal-header {
    background-color: #1890ff;
    color: white;
    border-radius: 8px 8px 0 0;
  }

  .ant-modal-close {
    top: -12px;
    right: -12px;
    background-color: oklch(70.7% 0.022 261.325) !important;
    color: white;
    border-radius: 100% !important;
  }

  .ant-modal-title {
    color: white;
    font-weight: 600;
    padding: 8px;
  }

  .ant-modal-body {
    max-height: 60vh;
    overflow-y: auto;
    padding: 24px;
    background-color: #f9f9f9;

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
  }

  .ant-modal-content {
    border-radius: 22px !important;
  }
`;

const InfoBlock = styled.div`
  margin-bottom: 16px;
  line-height: 1.6;

  p {
    margin: 4px 0;
    strong {
      color: #555;
    }
  }
`;

const TotalBlock = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;

  p {
    margin: 6px 0;
    font-size: 15px;

    strong {
      color: #222;
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    object-fit: cover;
    margin-right: 12px;
  }

  span {
    color: #333;
    font-size: 14px;
  }
`;

const ScrollableList = styled(List<CartItem>)`
  max-height: 250px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 16px;

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


interface ConfirmOrderProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = memo(({ open, onClose }) => {
  const { order, calculateTotal } = useOrder();

  const formatCurrency = (value: number) =>
    `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`;

  return (
    <StyledModal
      title="Xác nhận đơn hàng"
      open={open}
      onOk={onClose}
      onCancel={onClose}
      width={600}
      style={{ maxWidth: '90vw' }}
    >
      <InfoBlock>
        <p><strong>Khách hàng:</strong> {order.customerName}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Số điện thoại:</strong> {order.phone}</p>
      </InfoBlock>

      <ScrollableList
        dataSource={order.cart}
        renderItem={(item) => (
          <List.Item>
            <ItemContainer>
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                style={{ borderRadius: 4, objectFit: 'cover', marginRight: 12 }}
                preview={false}
              />
              <span>
                {item.name} - SL: {item.quantity} - {item.price.toLocaleString()} ₫
                {item.promo && ` (${item.promo.code})`}
              </span>
            </ItemContainer>
          </List.Item>
        )}
      />


      <TotalBlock>
        <p><strong>Tổng tiền:</strong> {formatCurrency(calculateTotal())}</p>
        <p><strong>Phương thức:</strong> {order.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ'}</p>

        {order.paymentMethod === 'cash' && (
          <>
            <p><strong>Khách đưa:</strong> {formatCurrency(order.customerPayment)}</p>
            {order.customerPayment > calculateTotal() && (
              <p style={{ color: '#52c41a' }}>
                <strong>Tiền thừa:</strong> {formatCurrency(order.customerPayment - calculateTotal())}
              </p>
            )}
          </>
        )}
      </TotalBlock>
    </StyledModal>
  );
});

export default ConfirmOrder;
