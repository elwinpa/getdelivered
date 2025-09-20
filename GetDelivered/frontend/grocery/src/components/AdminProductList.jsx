import React , { useState }from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions';
import AddProduct from './AddProduct';
import { deleteProductApi } from '../redux/actions';


const AdminProductList = ({fetchProducts, products, deleteProductApi}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addProductOverlay, setaddProductOverlay] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };

  const categories = [
    { id: 1, name: 'Fruit' },
    { id: 2, name: 'Vegetables' },
    { id: 3, name: 'Dairy' },
    { id: 4, name: 'Meat' },
    { id: 5, name: 'Fish'},
    { id: 6, name: 'Bakery' },
    { id: 7, name: 'Pharmacy' }
    
  ];
  const editProduct = (product) => {
    setEditedProduct(product);
    setaddProductOverlay(true);
  }
  const deleteProduct = (product) => {
    deleteProductApi(product);
  }


  return (
    <div className="admin-container">
     { addProductOverlay &&
        <AddProduct category={selectedCategory} editProduct={editedProduct} onClose={() => {setEditedProduct({}); setaddProductOverlay(false)}}/>
     } 
                    
    <div className="admin-filter">
        <select value={selectedCategory} onChange={handleDropdownChange} className="custom-dropdown">
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
            <option key={category.id} value={category.name}>
            {category.name}
            </option>
        ))}
        </select>
        <button className="filter-button" onClick={() => {
                            const payload = {
                            "category":selectedCategory
                            }
                        fetchProducts(payload)
                    }}>
        Fetch Products</button>
        {selectedCategory !== '' && 
        <button className="filter-button" onClick={() => {
          setaddProductOverlay(true)    
      }     }>
          Add Product</button>
        }
        
    </div>
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.data && products.data.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.price}</td>
              <td>
                <img src={`/assets/${product.image}`} alt={product.productName} className="product-image" />
              </td>
              <td>{product.category}</td>
              <td>{new Date(product.created).toLocaleString()}</td>
              <td><span onClick={() => editProduct(product)} className='admin-edit-icon'><i className="fas fa-edit"></i></span> 
              <span onClick={() => deleteProduct(product)} className='admin-delete-icon'><i className="fa fa-trash"></i></span> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      products: state.products,
    };
  };

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: (payload) => dispatch(fetchProducts(payload)),
    deleteProductApi: (payload) => dispatch(deleteProductApi(payload)),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminProductList);
