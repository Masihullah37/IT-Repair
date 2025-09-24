// import React, { useState, useEffect } from 'react';
// import { fetchApi } from '../../config/api';
// import '../../styles/ProductManagement.css';

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     nom: '',
//     description: '',
//     prix: '',
//     stock: '',
//     image: ''
//   });

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const response = await fetchApi('get_products');
//       if (response.success || response.products) {
//         setProducts(response.products || response.data || []);
//       }
//     } catch (error) {
//       console.error('Error loading products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingProduct) {
//         // Update existing product (you'll need to add this endpoint)
//         await fetchApi('update_product', {
//           method: 'PUT',
//           body: JSON.stringify({ ...formData, id: editingProduct.id })
//         });
//       } else {
//         // Add new product
//         await fetchApi('add_product', {
//           method: 'POST',
//           body: JSON.stringify(formData)
//         });
//       }

//       resetForm();
//       loadProducts();
//     } catch (error) {
//       console.error('Error saving product:', error);
//       alert('Error saving product: ' + error.message);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       nom: product.nom,
//       description: product.description,
//       prix: product.prix,
//       stock: product.stock,
//       image: product.image || ''
//     });
//     setShowAddForm(true);
//   };

//   const handleDelete = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await fetchApi('delete_product', {
//           method: 'DELETE',
//           body: JSON.stringify({ id: productId })
//         });
//         loadProducts();
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         alert('Error deleting product: ' + error.message);
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       nom: '',
//       description: '',
//       prix: '',
//       stock: '',
//       image: ''
//     });
//     setEditingProduct(null);
//     setShowAddForm(false);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   if (loading) {
//     return <div className="loading">Loading products...</div>;
//   }

//   return (
//     <div className="product-management">
//       <div className="product-header">
//         <h2>Product Management</h2>
//         <button
//           className="btn-primary"
//           onClick={() => setShowAddForm(true)}
//         >
//           ➕ Add Product
//         </button>
//       </div>

//       {showAddForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
//               <button className="close-btn" onClick={resetForm}>×</button>
//             </div>

//             <form onSubmit={handleSubmit} className="product-form">
//               <div className="form-group">
//                 <label htmlFor="nom">Product Name</label>
//                 <input
//                   type="text"
//                   id="nom"
//                   name="nom"
//                   value={formData.nom}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter product name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Enter product description"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="prix">Price (€)</label>
//                   <input
//                     type="number"
//                     id="prix"
//                     name="prix"
//                     value={formData.prix}
//                     onChange={handleChange}
//                     step="0.01"
//                     required
//                     placeholder="0.00"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="stock">Stock</label>
//                   <input
//                     type="number"
//                     id="stock"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="image">Image URL</label>
//                 <input
//                   type="text"
//                   id="image"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleChange}
//                   placeholder="Enter image URL or filename"
//                 />
//               </div>

//               <div className="form-actions">
//                 <button type="button" onClick={resetForm} className="btn-secondary">
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   {editingProduct ? 'Update Product' : 'Add Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="products-grid">
//         {products.length === 0 ? (
//           <div className="no-products">
//             <p>No products found. Add your first product!</p>
//           </div>
//         ) : (
//           products.map(product => (
//             <div key={product.id} className="product-card">
//               <div className="product-image">
//                 {product.image ? (
//                   <img src={`/images/${product.image}`} alt={product.nom} />
//                 ) : (
//                   <div className="no-image">📦</div>
//                 )}
//               </div>

//               <div className="product-info">
//                 <h3>{product.nom}</h3>
//                 <p className="product-description">{product.description}</p>
//                 <div className="product-details">
//                   <span className="price">€{parseFloat(product.prix).toFixed(2)}</span>
//                   <span className="stock">Stock: {product.stock}</span>
//                 </div>
//               </div>

//               <div className="product-actions">
//                 <button
//                   className="btn-edit"
//                   onClick={() => handleEdit(product)}
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   className="btn-delete"
//                   onClick={() => handleDelete(product.id)}
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;

// import React, { useState, useEffect } from 'react';
// import { fetchApi } from '../../config/api';
// import '../../styles/ProductManagement.css';

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     nom: '',
//     description: '',
//     prix: '',
//     stock: '',
//     image: ''
//   });

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const response = await fetchApi('get_products');
//       console.log('Products response:', response); // Debug log

//       // Handle different response structures
//       if (response.success) {
//         setProducts(response.products || response.data || []);
//       } else if (Array.isArray(response)) {
//         setProducts(response);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error('Error loading products:', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingProduct) {
//         await fetchApi('update_product', {
//           method: 'PUT',
//           body: JSON.stringify({ ...formData, id: editingProduct.id })
//         });
//       } else {
//         await fetchApi('add_product', {
//           method: 'POST',
//           body: JSON.stringify(formData)
//         });
//       }

//       resetForm();
//       loadProducts();
//     } catch (error) {
//       console.error('Error saving product:', error);
//       alert('Error saving product: ' + error.message);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       nom: product.nom,
//       description: product.description,
//       prix: product.prix,
//       stock: product.stock,
//       image: product.image || ''
//     });
//     setShowAddForm(true);
//   };

//   const handleDelete = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await fetchApi('delete_product', {
//           method: 'DELETE',
//           body: JSON.stringify({ id: productId })
//         });
//         loadProducts();
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         alert('Error deleting product: ' + error.message);
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       nom: '',
//       description: '',
//       prix: '',
//       stock: '',
//       image: ''
//     });
//     setEditingProduct(null);
//     setShowAddForm(false);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   if (loading) {
//     return <div className="loading">Loading products...</div>;
//   }

//   return (
//     <div className="product-management">
//       <div className="product-header">
//         <h2>Product Management</h2>
//         <button
//           className="btn-primary"
//           onClick={() => setShowAddForm(true)}
//         >
//           ➕ Add Product
//         </button>
//       </div>

//       {showAddForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
//               <button className="close-btn" onClick={resetForm}>×</button>
//             </div>

//             <form onSubmit={handleSubmit} className="product-form">
//               <div className="form-group">
//                 <label htmlFor="nom">Product Name</label>
//                 <input
//                   type="text"
//                   id="nom"
//                   name="nom"
//                   value={formData.nom}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter product name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Enter product description"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="prix">Price (€)</label>
//                   <input
//                     type="number"
//                     id="prix"
//                     name="prix"
//                     value={formData.prix}
//                     onChange={handleChange}
//                     step="0.01"
//                     required
//                     placeholder="0.00"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="stock">Stock</label>
//                   <input
//                     type="number"
//                     id="stock"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="image">Image URL</label>
//                 <input
//                   type="text"
//                   id="image"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleChange}
//                   placeholder="Enter image URL or filename"
//                 />
//               </div>

//               <div className="form-actions">
//                 <button type="button" onClick={resetForm} className="btn-secondary">
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   {editingProduct ? 'Update Product' : 'Add Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="products-grid">
//         {products && products.length === 0 ? (
//           <div className="no-products">
//             <p>No products found. Add your first product!</p>
//           </div>
//         ) : (
//           products && products.map(product => (
//             <div key={product.id} className="product-card">
//               <div className="product-image">
//                 {product.image ? (
//                   <img src={`/images/${product.image}`} alt={product.nom} />
//                 ) : (
//                   <div className="no-image">📦</div>
//                 )}
//               </div>

//               <div className="product-info">
//                 <h3>{product.nom}</h3>
//                 <p className="product-description">{product.description}</p>
//                 <div className="product-details">
//                   <span className="price">€{parseFloat(product.prix).toFixed(2)}</span>
//                   <span className="stock">Stock: {product.stock}</span>
//                 </div>
//               </div>

//               <div className="product-actions">
//                 <button
//                   className="btn-edit"
//                   onClick={() => handleEdit(product)}
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   className="btn-delete"
//                   onClick={() => handleDelete(product.id)}
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;

// import React, { useState, useEffect } from "react";
// import { fetchApi } from "../../src/config/api";
// import "../../styles/ProductManagement.css";

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     nom: "",
//     description: "",
//     prix: "",
//     stock: "",
//     image: "",
//   });

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const response = await fetchApi("get_products");
//       console.log("Products response:", response); // Debug log

//       // Handle different response structures
//       if (response.success) {
//         // Try different possible locations for products data
//         const productsData =
//           response.products || response.data?.products || response.data || [];
//         setProducts(Array.isArray(productsData) ? productsData : []);
//       } else if (Array.isArray(response)) {
//         setProducts(response);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error("Error loading products:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingProduct) {
//         await fetchApi("update_product", {
//           method: "PUT",
//           body: JSON.stringify({ ...formData, id: editingProduct.id }),
//         });
//       } else {
//         await fetchApi("add_product", {
//           method: "POST",
//           body: JSON.stringify(formData),
//         });
//       }

//       resetForm();
//       loadProducts();
//     } catch (error) {
//       console.error("Error saving product:", error);
//       alert("Error saving product: " + error.message);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       nom: product.nom,
//       description: product.description,
//       prix: product.prix,
//       stock: product.stock,
//       image: product.image || "",
//     });
//     setShowAddForm(true);
//   };

//   const handleDelete = async (productId) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await fetchApi("delete_product", {
//           method: "DELETE",
//           body: JSON.stringify({ id: productId }),
//         });
//         loadProducts();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         alert("Error deleting product: " + error.message);
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       nom: "",
//       description: "",
//       prix: "",
//       stock: "",
//       image: "",
//     });
//     setEditingProduct(null);
//     setShowAddForm(false);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   if (loading) {
//     return <div className="loading">Loading products...</div>;
//   }

//   return (
//     <div className="product-management">
//       <div className="product-header">
//         <h2>Product Management</h2>
//         <button className="btn-primary" onClick={() => setShowAddForm(true)}>
//           ➕ Add Product
//         </button>
//       </div>

//       {showAddForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
//               <button className="close-btn" onClick={resetForm}>
//                 ×
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="product-form">
//               <div className="form-group">
//                 <label htmlFor="nom">Product Name</label>
//                 <input
//                   type="text"
//                   id="nom"
//                   name="nom"
//                   value={formData.nom}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter product name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Enter product description"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="prix">Price (€)</label>
//                   <input
//                     type="number"
//                     id="prix"
//                     name="prix"
//                     value={formData.prix}
//                     onChange={handleChange}
//                     step="0.01"
//                     required
//                     placeholder="0.00"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="stock">Stock</label>
//                   <input
//                     type="number"
//                     id="stock"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="image">Image URL</label>
//                 <input
//                   type="text"
//                   id="image"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleChange}
//                   placeholder="Enter image URL or filename"
//                 />
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="btn-secondary"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   {editingProduct ? "Update Product" : "Add Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="products-grid">
//         {products && products.length === 0 ? (
//           <div className="no-products">
//             <p>No products found. Add your first product!</p>
//           </div>
//         ) : (
//           products &&
//           products.map((product) => (
//             <div key={product.id} className="product-card">
//               <div className="product-image">
//                 {product.image ? (
//                   <img src={`/images/${product.image}`} alt={product.nom} />
//                 ) : (
//                   <div className="no-image">📦</div>
//                 )}
//               </div>

//               <div className="product-info">
//                 <h3>{product.nom}</h3>
//                 <p className="product-description">{product.description}</p>
//                 <div className="product-details">
//                   <span className="price">
//                     €{parseFloat(product.prix).toFixed(2)}
//                   </span>
//                   <span className="stock">Stock: {product.stock}</span>
//                 </div>
//               </div>

//               <div className="product-actions">
//                 <button
//                   className="btn-edit"
//                   onClick={() => handleEdit(product)}
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   className="btn-delete"
//                   onClick={() => handleDelete(product.id)}
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Package, Upload } from "react-feather";
import { toast } from "react-toastify";
import styles from "../styles/ProductManagement.module.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    stock: "",
    image: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/Backend/routes.php?action=get_products', {
        credentials: 'include'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data.products || []);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prix || !formData.stock) {
      toast.error("Name, price, and stock are required");
      return;
    }

    try {
      // Get CSRF token
      const csrfResponse = await fetch('/Backend/admin_routes.php?action=get_csrf', {
        credentials: 'include'
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.data.csrf_token;

      const formDataToSend = new FormData();
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('prix', formData.prix);
      formDataToSend.append('stock', formData.stock);
      
      if (editingProduct) {
        formDataToSend.append('product_id', editingProduct.id);
      }
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const action = editingProduct ? 'admin_update_product' : 'admin_add_product';
      
      const response = await fetch(`/Backend/admin_routes.php?action=${action}`, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: formDataToSend
      });

      const result = await response.json();
      
      if (result.success && result.data.success) {
        toast.success(result.data.message);
        setFormData({ nom: "", description: "", prix: "", stock: "", image: null });
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        toast.error(result.data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error("Operation failed");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nom: product.nom,
      description: product.description || "",
      prix: product.prix,
      stock: product.stock,
      image: null
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      // Get CSRF token
      const csrfResponse = await fetch('/Backend/admin_routes.php?action=get_csrf', {
        credentials: 'include'
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.data.csrf_token;

      const response = await fetch(`/Backend/admin_routes.php?action=admin_delete_product&product_id=${productId}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include'
      });

      const result = await response.json();
      
      if (result.success && result.data.success) {
        toast.success(result.data.message);
        fetchProducts();
      } else {
        toast.error(result.data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({ nom: "", description: "", prix: "", stock: "", image: null });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.productManagement}>
      <div className={styles.pageHeader}>
        <h1>Product Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className={styles.addButton}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className={styles.productForm}>
          <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Price (€) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.prix}
                  onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Stock *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Product Image</label>
                <div className={styles.fileUpload}>
                  <Upload size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  />
                  <span>{formData.image ? formData.image.name : "Choose image..."}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
              <button type="button" onClick={resetForm} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img
                src={product.image ? `/images/${product.image}` : '/images/default-product.png'}
                alt={product.nom}
                onError={(e) => {
                  e.target.src = '/images/default-product.png';
                }}
              />
            </div>
            
            <div className={styles.productInfo}>
              <h3>{product.nom}</h3>
              <p className={styles.productDescription}>
                {product.description || "No description available"}
              </p>
              <div className={styles.productMeta}>
                <span className={styles.productPrice}>€{product.prix}</span>
                <span className={`${styles.productStock} ${product.stock < 10 ? styles.lowStock : ""}`}>
                  Stock: {product.stock}
                </span>
              </div>
            </div>
            
            <div className={styles.productActions}>
              <button
                onClick={() => handleEdit(product)}
                className={`${styles.actionButton} ${styles.editButton}`}
                title="Edit Product"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                title="Delete Product"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <Package size={48} />
          <h3>No products found</h3>
          <p>No products match your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;