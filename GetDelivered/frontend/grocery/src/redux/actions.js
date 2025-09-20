import axios from 'axios';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Login action
export const loginReq = (payload) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    axios.post('http://localhost:5050/auth/sign_in', payload)
      .then((response) => {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAILURE, payload: true});
        
      
        //dispatch({ type: LOGIN_FAILURE, payload: 'Login failed. Check your email and password.' });
      });
  };
};

export const loginFailureClose = () => {
  return (dispatch) => {
  dispatch({ type: LOGIN_FAILURE, payload: false});
  }
}

// Registration actions
export const registerReq = (payload) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    axios.post('http://localhost:5050/auth/register', payload)
      .then((response) => {
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        
        dispatch({ type: REGISTER_SUCCESS, payload: {"error": true} });
      });
  };
};


export const fetchProducts = (payload) => {
  console.log(payload)
  return (dispatch) => {
      
    axios.post('http://localhost:5050/findbycategory', payload)
      .then((response) => {
        const products ={
          "category": payload && payload.category,
          "data": response.data
        }
        dispatch(fetchProductSuccess(products));
      })
      .catch((error) => {
          
        const products={
          "category": payload && payload.category,
          "data": [
            {
                "_id": "65764b83bcfb0ea62497792e",
                "productName": "Mango",
                "productDescription": "This is a Fruit",
                "image": "banana.jpeg",
                "category": "Fruit",
                "created": "2023-12-10T23:36:35.102Z",
                "__v": 0
            },
            {
                "_id": "65764b8abcfb0ea624977930",
                "productName": "Orange",
                "productDescription": "This is a Fruit",
                "image": "mandarins.jpg",
                "category": "Fruit",
                "created": "2023-12-10T23:36:42.675Z",
                "__v": 0
            }
        ]}
            
        dispatch(fetchProductSuccess(products));
      });
  };
};

export const clearProducts = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_PRODUCTS' });
  }
}


export const addToCart = (product) => {
  return (dispatch) => {
    dispatch({type: 'ADD_PRODUCT', addedProduct: product});
  }
}

export const dispatchIncrementCount = (product) => {
  console.log(product, "QQQ")
  return (dispatch) => {
    dispatch({type: 'INCREMENT_COUNT', productId: product._id});
  }
}

export const dispatchDecrementCount = (product) => {
  return (dispatch) => {
    dispatch({type: 'DECREMENT_COUNT', productId: product._id});
  }
}


export const removeFromCart = (product) => {
  return (dispatch) => {
    dispatch({type: 'REMOVE_PRODUCT', removedProduct: product});
  }
}

export const clearRegister = () => {
  return (dispatch) => {
    dispatch({type: 'CLEAR_REGISTER'});
  }
}

export const logOut = (payload) => {
  return (dispatch) => {
    axios.post('http://localhost:5050/auth/sign_out', payload)
  .then((response) => {
    dispatch({type:'LOG_OUT', payload: response.data})
  })
      .catch((error) => {
        dispatch({type:'LOG_OUT', payload: {
          "message": "Logged out successfully"
        }
      })
      });
  }
}


export const fetchOrders = (payload) => {
  return (dispatch) => {
    axios.post('http://localhost:5050/getorder', payload)
  .then((response) => {
    dispatch({type:'ORDER_LIST', payload: response.data})
  })
  }
}





export const fetchProductSuccess = (data) => ({
  type: 'FETCH_PRODUCT_SUCCESS',
  payload: data,
});


export const addProductSubmit = (productData,image) => {
  return (dispatch) => {
    
    axios.post('http://localhost:5050/upload', image)
      .then((response) => {
        return response.data;
      })
      .then((data)=> {
        productData.image = data
        axios.post('http://localhost:5050/products', productData)
          .then((response) => {
            const payload = {
              "category": response && response.data && response.data.category
            }
            dispatch(fetchProducts(payload));
            return response.data;
          })
      })
      .catch((error) => {
        
      });
  };
};


export const editProductSubmit = (productData,image) => {
  return (dispatch) => {
    if(image) {
      axios.post('http://localhost:5050/upload', image)
      .then((response) => {
        return response.data;
      })
      .then((data)=> {
        productData.image = data
        axios.post('http://localhost:5050/update', productData)
          .then((response) => {
            const payload = {
              "category": response && response.data && response.data.category
            }
            dispatch(fetchProducts(payload));
            return response.data;
          })
      })
      .catch((error) => {
        
      });
    } else {
      axios.post('http://localhost:5050/update', productData)
          .then((response) => {
            const payload = {
              "category": response && response.data && response.data.category
            }
            dispatch(fetchProducts(payload));
            return response.data;
          })

    }
    
  };
};



export const deleteProductApi = (productData) => {
  return (dispatch) => {
    
    axios.post('http://localhost:5050/delete', {"productId": productData._id})
          .then((response) => {
            const payload = {
              "category": response && response.data && response.data.category
            }
            dispatch(fetchProducts(payload));
            return response.data;
          })
  };
};

export const submitOrder = (payload) => {

  return (dispatch) => {
    
    axios.post('http://localhost:5050/createorder', payload)
          .then((response) => {
            console.log(response);
            dispatch({type: 'SUBMIT_SUCCESS', payload: true});
          })
          
  };
};

export const submitSuccessClose = (data) => ({
  type: 'SUBMIT_SUCCESS',
  payload: false
});
