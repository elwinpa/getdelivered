import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/actions';

const Cart = ({closeCart, cart, removeFromCart, checkout}) => {
  const handleCloseCart = () => {
    closeCart();
  }
  const onRemoveFromCart = (product) => {
    removeFromCart(product)
  }
  return (
    <div className="cart-sidebar">
      <div onClick={handleCloseCart} className="cart-close"><i className="fa fa-times" aria-hidden="true"></i></div>
      <div className='cart-container'>
        {cart.map((product) => (
          <div className="cart-card">
            <img src={"/assets/" + product.image} alt={product.productName} />
            <div className="product-count">{product.count}</div>
            <h3>{product.productName}</h3>
            <span onClick={() => onRemoveFromCart(product)} className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
          </div>
        ))}
        {cart && cart.length === 0 &&
            <div className="no-item">No items in Cart</div>
        }
        
      </div>
      <div onClick={checkout} className="checkout">Proceed to Checkout &nbsp;&nbsp; &nbsp;<i className="fa-solid fa-arrow-right fa-beat"></i></div>
    </div>
  );
};

;

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (product) => dispatch(removeFromCart(product)),

});

export default connect(null, mapDispatchToProps)(Cart);




