import React from "react";

function OrderConfirmation({ id, orders }) {
    const { name, address, items } = orders;
    return (
        <div>
            <p>Thank you for the order.</p>
            <p>Customer Name: {name}</p>
            <p>Customer Address: {address}</p>
            <br/>
            <p>Items ordered: </p>
            <br/>
            {
                items?.map((item) => (
                    <div>
                        <p>Name: {item.item.name}</p>
                        <p>Price: {item.item.price}</p>
                        <p>Description: {item.item.description}</p>
                        <br/>
                    </div>
                ))
            }
            <p>Order id: {id}</p>
        </div>
    );
}

export default OrderConfirmation;
