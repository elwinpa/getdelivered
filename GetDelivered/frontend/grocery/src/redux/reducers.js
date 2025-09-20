const initialState = {
    products: {},
    cart:[],
    loginDetails:{},
    registerDetails:{},
    loginFailure: false,
    submitSuccess: false,
    orderList:[]
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCT_SUCCESS':
        return {
          ...state,
          products: action.payload,
        };
      case 'CLEAR_PRODUCTS':
        return {
          ...state,
          products: {}
        };
      case 'ADD_PRODUCT':
        return {
            ...state,
            cart: [
              ...state.cart,
              action.addedProduct,
            ]
        };
        case 'REMOVE_PRODUCT':
          return {
              ...state,
              cart: state.cart.filter(product => (product._id !== (action.removedProduct && action.removedProduct._id))),
          };
        case 'INCREMENT_COUNT':
            return {
                ...state,
                cart: state.cart.map(item => {
                  if (item._id === action.productId) {
                    return { ...item, count: item.count + 1 };
                  }
                  return item;
                }),
            };
        case 'DECREMENT_COUNT':
          return {
            ...state,
            cart: state.cart.map(item => {
              if (item._id === action.productId) {
                return { ...item, count: item.count - 1 };
              }
              return item;
            }),
        };
        case 'LOGIN_SUCCESS' :
          return {
            ...state,
            loginDetails: action.payload,
            loginFailure: false
          };
        case 'REGISTER_SUCCESS' :
            return {
              ...state,
              registerDetails: action.payload,
            };
        case 'CLEAR_REGISTER':
              return {
                ...state,
                registerDetails: {}
              };
        case 'LOG_OUT':
          return {
            ...state,
            loginDetails: {},
            cart: []
          };
        case 'LOGIN_FAILURE':
        return {
          ...state,
          loginFailure: action.payload
        };
        case 'SUBMIT_SUCCESS':
        return {
          ...state,
          submitSuccess: action.payload,
          cart: [],
          products: {}

        };
        case 'ORDER_LIST':
        return {
          ...state,
          orderList: action.payload
        };
        
      default:
        return state;
    }
  };
  
  export default rootReducer;
  