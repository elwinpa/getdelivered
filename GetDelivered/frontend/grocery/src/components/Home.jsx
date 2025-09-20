// Home.jsx

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import ProductCards from './ProductCards';
import Registration from './Registration';
import Cart from './Cart';
import Login from './Login';
import StaticCards from './StaticCards';
import Catagories from './Catagories';
import RegistrationSuccessOverlay from './RegistrationSuccessOverlay';
import { clearRegister } from '../redux/actions';
import { logOut } from '../redux/actions';
import CheckoutPage from './checkout';
import LoginFailure from './LoginFailure';
import { loginFailureClose } from '../redux/actions';
import SubmitSuccess from './SubmitSuccess';
import { submitSuccessClose } from '../redux/actions';
import Orders from './Orders';
import { fetchOrders } from '../redux/actions';

function Home({ products, cart, loginDetails, registerDetails, clearRegister, logOut, loginFailureClose,fetchOrders, orderList, loginFailure, submitSuccessClose, submitSuccess}) {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkout, setcheckout] = useState(false);
  const [orders, setOrders] = useState(false)

  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeModals = () => {
    setIsRegistrationModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  }
  const closeCart = () => {
    setIsCartOpen(false);
  }

  const closeRegisterSuccess = () => {
    clearRegister();
  }

  console.log("products from home", products);
  console.log("cart from home", cart);

  return (
    <div>
      <Header
        openLoginModal={openLoginModal}
        openRegistrationModal={openRegistrationModal}
        openCart={openCart}
        count={cart && cart.length}
        loginDetails={loginDetails}
        logOut={() => { setcheckout(false); setOrders(false); logOut(); setIsCartOpen(false);}}
        openOrders={() => {setOrders(true);  const payload= {"userId":loginDetails._id}; fetchOrders(payload) }}
      />
      {!checkout && ! orders &&
        <>
          {isCartOpen && <Cart closeCart={closeCart} cart={cart} checkout={() => setcheckout(true)}/> }
          <div className="main-content">
            {Object.keys(products).length === 0 &&
              <>
                <StaticCards/>
                <Catagories />
              </>
            }
            {products && products.data && 
              <ProductCards products={products} cart={cart} loginDetails={loginDetails}/>
            }
          </div>
        </>
      }
      {checkout &&
        <CheckoutPage cart={cart} loginDetails={loginDetails}  onClose={() => {setcheckout(false); setIsCartOpen(false);}}/>
      }
      {orders &&
          <Orders orders={orderList} onClose={() => setOrders(false)}/>

      }
      


      {Object.keys(registerDetails).length !== 0 && <RegistrationSuccessOverlay registerDetails={registerDetails} onClose={closeRegisterSuccess}/>}
      {isRegistrationModalOpen && <Registration onClose={closeModals} />}
      {isLoginModalOpen && <Login onClose={closeModals} />}
      {loginFailure && <LoginFailure onClose={() => loginFailureClose()}/>}
      {submitSuccess && <SubmitSuccess onClose={() => {submitSuccessClose(); setcheckout(false); setIsCartOpen(false); }}/>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
    loginDetails: state.loginDetails,
    registerDetails: state.registerDetails,
    loginFailure: state.loginFailure,
    submitSuccess: state.submitSuccess,
    orderList: state.orderList
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearRegister: () => dispatch(clearRegister()),
  logOut: () => dispatch(logOut()),
  loginFailureClose: () => dispatch(loginFailureClose()),
  submitSuccessClose: () => dispatch(submitSuccessClose()),
  fetchOrders: (payload) => dispatch(fetchOrders(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
