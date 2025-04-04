"use client";
import { Button, Col, Form, Input, Radio, Row, Select, Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useOrder } from '../OrderContext/OrderContext';
import CartList from './CartList';
import ConfirmOrder from './ConfirmOrder';

const { Title } = Typography;

const Container = styled.div`
  height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const FormWrapper = styled.div`
  background: white;
  border-radius: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;

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

const BottomBar = styled.div`
  padding: 16px 32px;
  border-top: 1px solid #eee;
  background-color: white;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const StyledTitle = styled(Title)`
  color: #1d39c4;
  margin-bottom: 24px;
  font-size: 24px !important;

  @media (max-width: 768px) {
    font-size: 18px !important;
  }
`;

const StyledButton = styled(Button)`
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
  background: #1890ff;
  border: none;
  width: 100%;

  &:hover {
    background: #40a9ff;
  }

  @media (max-width: 768px) {
    height: 40px;
    font-size: 14px;
  }
`;

const products = [
    {
        id: 1,
        name: 'IPhone 14',
        price: 29990000,
        image: 'https://cdn.tgdd.vn/Products/Images/42/240259/iPhone-14-plus-thumb-xanh-600x600.jpg',
        brand: 'Apple',
    },
    {
        id: 2,
        name: 'IPhone 16',
        price: 26990000,
        image: 'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-sa-mac-thumb-1-600x600.jpg',
        brand: 'Apple',
    },
    {
        id: 3,
        name: 'IPhone 16 plus',
        price: 19990000,
        image: 'https://cdn.tgdd.vn/Products/Images/42/329135/iphone-16-xanh-mong-ket-thumbnew-600x600.png',
        brand: 'Apple',
    },
    {
        id: 4,
        name: 'IPhone 15',
        price: 23000000,
        image: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-black-thumbnew-600x600.jpg',
        brand: 'Apple',
    },
];

const CreateOrder: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {
        order,
        updateCustomerInfo,
        addToCart,
        setPaymentMethod,
        setCustomerPayment,
    } = useOrder();

    const onFinish = () => {
        setIsModalOpen(true);
    };

    const formatCurrency = (value: number | undefined) => {
        if (!value) return '';
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`;
    };

    const parseCurrency = (value: string | undefined) => {
        if (!value) return 0;
        return Number(value.replace(/[^0-9]/g, ''));
    };

    return (
        <Container>
            <FormWrapper>
                <Content>
                    <StyledTitle level={3}>Tạo đơn hàng mới</StyledTitle>

                    <ScrollArea>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            id="orderForm"
                            initialValues={{
                                customerName: order.customerName,
                                email: order.email,
                                phone: order.phone,
                                paymentMethod: order.paymentMethod,
                                customerPayment: order.customerPayment
                                    ? formatCurrency(order.customerPayment)
                                    : '',
                            }}
                        >
                            <Row gutter={24}>
                                <Col xs={24} sm={24} md={8}>
                                    <Form.Item
                                        label="Tên khách hàng"
                                        name="customerName"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tên khách hàng!' },
                                            { min: 2, message: 'Tên phải có ít nhất 2 ký tự!' },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            value={order.customerName}
                                            onChange={e => {
                                                updateCustomerInfo('customerName', e.target.value);
                                                form.setFieldsValue({ customerName: e.target.value });
                                            }}
                                            placeholder="Nhập tên khách hàng"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập email!' },
                                            { type: 'email', message: 'Email không hợp lệ!' },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            value={order.email}
                                            onChange={e => {
                                                updateCustomerInfo('email', e.target.value);
                                                form.setFieldsValue({ email: e.target.value });
                                            }}
                                            placeholder="Nhập email"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                            {
                                                pattern: /^[0-9]{10}$/,
                                                message: 'Số điện thoại phải có đúng 10 chữ số!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            value={order.phone}
                                            onChange={e => {
                                                updateCustomerInfo('phone', e.target.value);
                                                form.setFieldsValue({ phone: e.target.value });
                                            }}
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                label={
                                    <span>
                                        <span style={{ color: 'red' }}>*</span> Chọn sản phẩm
                                    </span>
                                }
                                name="products"
                                rules={[
                                    {
                                        validator: () =>
                                            order.cart.length > 0
                                                ? Promise.resolve()
                                                : Promise.reject('Vui lòng chọn ít nhất một sản phẩm!'),
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    onChange={value => {
                                        const product = products.find(p => p.id === +value);
                                        if (product) {
                                            addToCart(product);
                                            form.setFieldsValue({ products: '' });
                                        }
                                    }}
                                    placeholder="Chọn sản phẩm"
                                    style={{ width: '100%' }}
                                    options={products.map(product => ({
                                        value: product.id,
                                        label: `${product.name} - ${product.price.toLocaleString()} ₫`,
                                    }))}
                                />
                            </Form.Item>


                            <CartList />

                            <Form.Item label="Phương thức thanh toán" name="paymentMethod">
                                <Radio.Group
                                    value={order.paymentMethod}
                                    onChange={e => {
                                        setPaymentMethod(e.target.value);
                                        form.setFieldsValue({ paymentMethod: e.target.value });
                                    }}
                                >
                                    <Radio value="cash">Tiền mặt</Radio>
                                    <Radio value="card">Thẻ</Radio>
                                </Radio.Group>
                            </Form.Item>

                            {order.paymentMethod === 'cash' && (
                                <Form.Item
                                    label="Số tiền khách đưa"
                                    name="customerPayment"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số tiền khách đưa!' },
                                        {
                                            validator: (_, value) =>
                                                parseCurrency(value) >=
                                                    order.cart.reduce((sum, item) => {
                                                        let itemTotal = item.price * item.quantity;
                                                        if (item.promo) {
                                                            itemTotal =
                                                                item.promo.type === 'fixed'
                                                                    ? itemTotal - item.promo.value
                                                                    : itemTotal * (1 - item.promo.value / 100);
                                                        }
                                                        return sum + Math.max(itemTotal, 0);
                                                    }, 0)
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                        'Số tiền khách đưa phải lớn hơn hoặc bằng tổng tiền!'
                                                    ),
                                        },
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        value={
                                            order.customerPayment
                                                ? formatCurrency(order.customerPayment)
                                                : ''
                                        }
                                        onChange={e => {
                                            const rawValue = parseCurrency(e.target.value);
                                            setCustomerPayment(rawValue);
                                            form.setFieldsValue({
                                                customerPayment: formatCurrency(rawValue),
                                            });
                                        }}
                                        placeholder="Nhập số tiền"
                                    />
                                </Form.Item>
                            )}
                        </Form>
                    </ScrollArea>
                </Content>

                <BottomBar>
                    <StyledButton type="primary" htmlType="submit" form="orderForm">
                        Thanh toán
                    </StyledButton>
                </BottomBar>
            </FormWrapper>

            <ConfirmOrder open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Container>
    );
};


export default CreateOrder;
