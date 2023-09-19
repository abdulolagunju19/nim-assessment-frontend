import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const validateForm = () => {
    const phoneRegex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
    const validPhone = phone.match(phoneRegex);

    if (!name && !phone && !address) {
      setErrorMessage("All fields should be filled out!");
      return false;
    }

    if (validPhone) {
      setPhone(`(${validPhone[1]}) ${validPhone[2]}-${validPhone[3]}`);
    } else {
      setErrorMessage("Please enter a valid 10-digit phone number !");
      return false;
    }

    if(!name){
      setErrorMessage("The name should be filled out!");
      return false;
    }

    if(!address){
      setErrorMessage("The address should be filled out!");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const placeOrder = async () => {
    if (!validateForm()) {
      return;
    }
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    const data = await response.json();
    if(response.status === 200){
      navigate(`/order-confirmation/${data.id}`)
    }
  };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="tel"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="text"
                id="address"
              />
            </label>
          </div>
        </form>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}       
        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
