import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders(){
            const response = await fetch(`/api/orders/`);
            const data = await response.json();

            data.forEach(datum => {
                if(id === datum.id){
                    setOrders(datum);
                }
            });
            
        }
        fetchOrders();
    }, [])
    
    return (
        <div>
            <h1>Order Confirmation Page</h1>
            <OrderConfirmation id={id} orders={orders}/>
        </div>
    );
}

export default ConfirmationPage;
