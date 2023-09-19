import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders(){
            const response = await fetch(`/api/orders/${id}`);
            const data = await response.json();

            setOrders(data)
        }
        fetchOrders();
    }, [id])

    if (orders.length === 0) {
        return <p>Loading...</p>;
    }

    console.log(orders)
    return (
        <div>
            <h1>Order Confirmation Page</h1>
            <OrderConfirmation order={orders}/>

        </div>
    );
}

export default ConfirmationPage;
