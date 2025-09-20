import React , { useState }from 'react';
import { connect } from 'react-redux';
import { clearProducts } from '../redux/actions';
import { addToCart } from '../redux/actions';
import { dispatchDecrementCount } from '../redux/actions';
import { dispatchIncrementCount } from '../redux/actions';
import { removeFromCart } from '../redux/actions';
import LoginWarning from './LoginWarning';
const ProductCards = ({ products, clearProducts, addToCart, cart, dispatchIncrementCount,  dispatchDecrementCount, removeFromCart, loginDetails}) => {

    const showCategories = () => {
        clearProducts();
    }
    const [loginWarning, setLoginWarning] = useState(false);
    const onAddToCart = (product) => {
        if(Object.keys(loginDetails).length === 0) {
            setLoginWarning(true);
        } else {
            product.count = 1;
            addToCart(product);
        }
        
    }
    const incrementCount = (product) => {
        console.log(product, "DGDFG")
        dispatchIncrementCount(product);
    }
    const decrementCount = (product) => {
        if(cart.find((item)=> (item._id=== product._id)).count === 1) {
            removeFromCart(product);
        } else {
            dispatchDecrementCount(product);
        }
    }
  return (
    <>
    {loginWarning && <LoginWarning onClose={() => {setLoginWarning(false)}}/>}
    <div className="product-cards">
        <span className="back-categories" onClick={showCategories}><i className="fa fa-arrow-left" aria-hidden="true"></i> Catagories</span>
        <h3 className="product-header">{products.category}</h3>
        <div className="product-container">  
            {products && products.data && products.data.map((product) => (
                <div key={product.name} className="card">
                    <img src={"/assets/" + product.image} alt={product.name} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">{product.productDescription}</p>
                        <p className="card-text">${product.price}</p>
                    </div>
                    {cart && cart.find((item)=> (item._id=== product._id)) ?
                        
                        <div className="quantity">
                            <button onClick={() => decrementCount(product)}  className="card-add-to-cart decrement">-</button>
                            <span >{cart.find((item)=> (item._id=== product._id)).count}</span>
                            <button onClick={() => incrementCount(product)} className="card-add-to-cart increment">+</button>
                        </div> :
                        <button onClick={() => onAddToCart(product)} className="add-to-cart">Add to cart</button>
                     }
                    
                </div>
            ))}
        </div>
    </div> 
    </>   
  ); 
};



const mapDispatchToProps = (dispatch) => ({
    clearProducts: () => dispatch(clearProducts()),
    addToCart: (product) => dispatch(addToCart(product)),
    dispatchIncrementCount: (product) => dispatch(dispatchIncrementCount(product)),
    dispatchDecrementCount: (product) => dispatch(dispatchDecrementCount(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  });
  
  export default connect(null, mapDispatchToProps)(ProductCards);