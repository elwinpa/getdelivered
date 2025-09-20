import React, { useState } from 'react';
import { connect } from 'react-redux';
import { submitOrder } from '../redux/actions';

const CheckoutPage = ({cart, onClose, loginDetails, submitOrder}) => {
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [phonePickUp, setPhonePickUp] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [errors, setErrors] = useState({});

  const handleOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleStreetNameChange = (e) => {
    setStreetName(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(formattedPhone);
  };
  
  const handlePhonePickUpChange = (e) => {
    const formattedPhone = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhonePickUp(formattedPhone);
  };
  
  

  const handleDeliveryTimeChange = (e) => {
    setDeliveryTime(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  let total = 0;
  let items = [];
  cart.forEach((item) => {
      total += parseFloat(item && item.price) * item.count;
      items.push(item.productName)
  })

  let totalPrice = total.toFixed(2);
   

  const handlePlaceOrder = (e) => {
    const errors = {};
    e.preventDefault(); 

    // Validate required fields
  // Validate required fields
  if (!name) errors.name = 'Name is required.';
  if (!address) errors.address = 'Address is required.';
  if (!streetName) errors.streetName = 'Street Name is required.';
  if (!postalCode) errors.postalCode = 'Postal Code is required.';
  if (!country) errors.country = 'Country is required.';
  
  if (!deliveryTime) errors.deliveryTime = 'Delivery Time is required.';

  if (!cardNumber) {
    errors.cardNumber = 'Card Number is required.';
  } else if (!/^\d{16}$/.test(cardNumber)) {
    errors.cardNumber = 'Invalid Card Number.';
  }

  if (!cardName) {
    errors.cardName = 'Cardholder Name is required.';
  } else if (!/^[a-zA-Z ]+$/.test(cardName)) {
    errors.cardName = 'Invalid Cardholder Name.';
  }

  if (!expiryDate) {
    errors.expiryDate = 'Expiry Date is required.';
  } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    errors.expiryDate = 'Invalid Expiry Date. Use MM/YY format.';
  }

  if (!cvv) {
    errors.cvv = 'CVV is required.';
  } else if (!/^\d{3}$/.test(cvv)) {
    errors.cvv = 'Invalid CVV. Must be a 3-digit number.';
  }

  if (deliveryOption === 'pickup') {
    if (!selectedLocation) {
      errors.selectedLocation = 'Location is required.';
    }
    if (!phonePickUp) {
      errors.phonePickUp = 'Phone Number is required.';
    } else if (!/^\d{10}$/.test(phonePickUp)) {
      errors.phonePickUp = 'Invalid Phone Number.';
    }
    delete errors.name;
    delete errors.address; 
    delete errors.streetName;
    delete errors.postalCode;
    delete errors.country;
    delete errors.phone;
  }

  if (deliveryOption === 'delivery') {
    if (!phone) {
      errors.phone = 'Phone Number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Invalid Phone Number.';
    }
    delete errors.phonePickUp;
  }

    setErrors(errors);
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      // Proceed with placing the order
      const placeOrder = {
        "userId": loginDetails._id,
        "items": items,
        "address": address ? "Address :" + address : "Pickup Location :" + selectedLocation,
        "finalPrice": totalPrice
      }
      console.log('Placing order...', placeOrder);
      submitOrder(placeOrder);

    }
  };
  
  return (
    
    <div className="checkout-container">
        <div className="checkout-section">
        <span className="back-categories" onClick={onClose}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</span>
 
        <h1>Checkout</h1>

        {/* Delivery/Pickup Options */}
        <div className="delivery-options">
  <label className={deliveryOption === 'delivery' ? 'active' : ''}>
    <input
      type="radio"
      value="delivery"
      checked={deliveryOption === 'delivery'}
      onChange={handleOptionChange}
    />
    <i className="fas fa-shipping-fast"></i>
    Delivery
  </label>
  <label className={deliveryOption === 'pickup' ? 'active' : ''}>
    <input
      type="radio"
      value="pickup"
      checked={deliveryOption === 'pickup'}
      onChange={handleOptionChange}
    />
    <i className="fa-solid fa-store"></i>
    Pickup
  </label>
</div>

        {/* Delivery Details */}
        {deliveryOption === 'delivery' && (
          <form className="delivery-form">
            <label>
              Name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            {errors.name && <span className="error-message">{errors.name}</span>}

            <label>
              Address:
              <input type="text" value={address} onChange={handleAddressChange} />
            </label>
            {errors.address && <span className="error-message">{errors.address}</span>}


            <label>
              Street Name:
              <input type="text" value={streetName} onChange={handleStreetNameChange} />
            </label>
            {errors.streetName && <span className="error-message">{errors.streetName}</span>}


            <label>
              Postal Code:
              <input type="text" value={postalCode} onChange={handlePostalCodeChange} />
            </label>
            {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}


            <label>
              Country:
              <input type="text" value={country} onChange={handleCountryChange} />
            </label>
            {errors.country && <span className="error-message">{errors.country}</span>}


            <label>
              Phone Number:
              <input type="text" value={phone} onChange={handlePhoneChange} />
            </label>
            {errors.phone && <span className="error-message">{errors.phone}</span>}


            <label>
              Delivery Time:
              <div className="delivery-time-options">
              <label>
                  <input
                    type="radio"
                    name="delivery-time-option"
                    value="priority"
                    checked={!deliveryTime || deliveryTime === 'priority'}
                    onChange={handleDeliveryTimeChange}
                  />
                  Priority Time by 30 mts <span id="priority-time"></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="delivery-time-option"
                    value="standard"
                    checked={deliveryTime === 'standard'}
                    onChange={handleDeliveryTimeChange}
                  />
                  Standard Time by 1 hr  <span id="standard-time"></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="delivery-time-option"
                    value="two-hour-window"
                    checked={deliveryTime === 'two-hour-window'}
                    onChange={handleDeliveryTimeChange}
                  />
                  2 Hour Window
                </label>
                <label>
                  <input
                    type="radio"
                    name="delivery-time-option"
                    value="three-hour-window"
                    checked={deliveryTime === 'three-hour-window'}
                    onChange={handleDeliveryTimeChange}
                  />
                  3 Hour Window
                </label>
              </div>
              
            </label>
          </form>
        )}

        {/* Pickup Details */}
     {/* Pickup Details */}
{deliveryOption === 'pickup' && (
  <form className="pickup-form">
     Pickup Location:
    <div className="pickup-locations">
      <div className="pickup-location">
     
        <label>
        
          <input
            type="radio"
            name="pickup-location"
            value="mississauga"
            checked={!selectedLocation || deliveryTime === 'mississauga'}
            onChange={handleLocationChange}
          />
          <div className="pickup-details">
            <div className="pickup-name">Mississauga</div>
            <div className="pickup-address">
              123 Main St, Mississauga, ON L5B 1V2
            </div>
          </div>
        </label>
      </div>
      <div className="pickup-location">
        <label>
          <input
            type="radio"
            name="pickup-location"
            value="niagara"
            checked={selectedLocation === 'niagara'}
            onChange={handleLocationChange}
          />
          <div className="pickup-details">
            <div className="pickup-name">Niagara</div>
            <div className="pickup-address">
              456 Queen St, Niagara, ON L2E 1H1
            </div>
          </div>
        </label>
      </div>
      <div className="pickup-location">
        <label>
          <input
            type="radio"
            name="pickup-location"
            value="brampton"
            checked={selectedLocation === 'brampton'}
            onChange={handleLocationChange}
          />
          <div className="pickup-details">
            <div className="pickup-name">Brampton</div>
            <div className="pickup-address">
              789 King St, Brampton, ON L6T 1H1
            </div>
          </div>
        </label>
      </div>
    </div>

    <label>
      Phone Number:
      <input type="text" value={phonePickUp} onChange={handlePhonePickUpChange} />
    </label>
    {errors.phonePickUp && <span className="error-message">{errors.phonePickUp}</span>}

    <label>
      Pickup Time:
      <div className="pickup-time-options">
        <form id="pickup-form">
          <div className="pick-up-time">
            <label>
              <input
                type="radio"
                name="pickup-time"
                value="10:00am"
                checked={!deliveryTime ||deliveryTime === '10:00am'}
                
                onChange={handleDeliveryTimeChange}
              />
              <span>10:00 AM</span>
            </label>
            <label>
              <input
                type="radio"
                name="pickup-time"
                value="12:00pm"
                checked={deliveryTime === '12:00pm'}
                onChange={handleDeliveryTimeChange}
              />
              <span>12:00 PM</span>
            </label>
            <label>
              <input
                type="radio"
                name="pickup-time"
                value="2:00pm"
                checked={deliveryTime === '2:00pm'}
                onChange={handleDeliveryTimeChange}
              />
              <span>2:00 PM</span>
            </label>
            </div>
            </form>
      </div>
    </label>
  </form>
)}

      </div>

      <div className="checkout-section item-details-section">
        {/* Item Details */}
        <h3>Items in Cart</h3>
        <div className='cart-container'>
        {cart.map((product) => (
          <div className="cart-card">
            <img src={"/assets/" + product.image} alt={product.productName} />
            <div className="product-count">{product.count}</div>
            <h3>{product.productName}</h3>
            <h3>${product.price}</h3>
                    </div>
        ))}
        {cart && cart.length === 0 &&
            <div className="no-item">No items in Cart</div>
        }
        
      </div>

      <h3>Total Price: ${totalPrice}</h3>

        {/* Payment Details */}
        <h3>Payment Details</h3>
        <form className="payment-form">
          <label>
            Card Number:
            <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
          </label>
          {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}

          <label>
            Cardholder Name:
            <input type="text" value={cardName} onChange={handleCardNameChange} />
          </label>
          {errors.cardName && <span className="error-message">{errors.cardName}</span>}

          <div className="form-row">
            <label>
              Expiry Date:
              <input type="text" value={expiryDate} onChange={handleExpiryDateChange} />
            </label>
            
            <label>
              CVV:
              <input type="text" value={cvv} onChange={handleCvvChange} />
            </label>
           
          </div>
         
            <div class="error-message-cvvexp">
          {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
        
          {errors.cvv && <span className="error-message">{errors.cvv}</span>}
          </div>
         
          <button className="place-order-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
  submitOrder: (payload) => dispatch(submitOrder(payload)),
});

export default connect(null, mapDispatchToProps)(CheckoutPage);