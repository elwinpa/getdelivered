
export default function Header({ openLoginModal, openRegistrationModal,openCart, count, loginDetails, logOut, openOrders}) {
  return (
    <nav className="navbar">
      <img  className="logo" src="\assets\logo.png" alt=""/>    
            <div className="navbar-search">
                <input type="text" placeholder="Search for products"/>
                <button type="submit"><i className="fas fa-search"></i></button>
            </div>
            
            {Object.keys(loginDetails).length !== 0 ?
        (
          <div className="navbar-login-register">
            <span className="user-name">Welcome {loginDetails.name},</span>
            {loginDetails.name === "Admin" &&
              <a href="/Admin" className="login-header">
                Admin
              </a>
            }
            
            <a href="!#" className="login-header" onClick={(e) => { e.preventDefault(); openOrders(); }}>
             Your Orders
            </a>
            <a href="!#" className="login-header" onClick={(e) => { e.preventDefault(); logOut(); }}>
              Logout
            </a>
          </div>
        ) : (
          <div className="navbar-login-register">
            <a href="!#" className="login-header" onClick={(e) => { e.preventDefault(); openLoginModal(); }}>
              Login
            </a>
            <a href="!#" className="login-header" onClick={(e) => { e.preventDefault(); openRegistrationModal(); }}>
              Register
            </a>
          </div>
        )
      }

      
      <div onClick={openCart} className="navbar-cart">
                <button ><i className="fas fa-shopping-cart"></i></button>
                <span id="count-header" className="cart-count">{count}</span>
            </div>
    </nav>
  );
}
