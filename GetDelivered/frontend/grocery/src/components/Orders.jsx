// Orders.js
import React from 'react';


const Orders = ({ orders,onClose }) => {
  return (
    <div className='order-main'>
    <span className="back-categories" onClick={onClose}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</span>
    <h3 className="product-header">Your Orders</h3>
    <div className="orders-container">
        
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID: {order._id}</h3>
          <p>{order.address}</p>
          <p>Items: {order.items.join(', ')}</p>
          <p>Final Price: {order.finalPrice}</p>
        </div>
      ))}
      {orders.length===0 &&
      <div>You have no previous orders</div>
      }
    </div>
    </div>
    
  );
};

export default Orders;
