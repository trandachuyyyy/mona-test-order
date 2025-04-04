'use client'
import dynamic from 'next/dynamic'
import { OrderProvider } from './OrderContext/OrderContext'
const CreateOrder = dynamic(() => import('@/app/home/components/CreateOrder'), { ssr: false })

const Page = () => {
    return (
        <OrderProvider>
            <CreateOrder />
        </OrderProvider>
    )
}

export default Page