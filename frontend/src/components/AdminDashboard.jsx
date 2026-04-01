import React, { useState } from 'react';
import '../styles/adminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, title: 'Sample Product 1', price: 29.99 },
    { id: 2, title: 'Sample Product 2', price: 49.99 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: ''
  });

  const [editingId, setEditingId] = useState(null);

  const handleAddProduct = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({ title: '', price: '' });
  };

  const handleEditProduct = (product) => {
    setShowForm(true);
    setEditingId(product.id);
    setFormData({
      title: product.title,
      price: product.price
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price) {
      alert('Please fill all fields');
      return;
    }

    if (editingId) {
      // Edit existing product
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                title: formData.title,
                price: parseFloat(formData.price)
              }
            : p
        )
      );
      alert('Product updated successfully!');
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        title: formData.title,
        price: parseFloat(formData.price)
      };
      setProducts([...products, newProduct]);
      alert('Product added successfully!');
    }

    setShowForm(false);
    setFormData({ title: '', price: '' });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      alert('Product deleted successfully!');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>📊 Admin Dashboard</h1>

      <button onClick={handleAddProduct} className="add-product-btn">
        ➕ Add New Product
      </button>

      {showForm && (
        <div className="form-modal">
          <div className="form-modal-content">
            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Product Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter product title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-list">
        <h2>Product List ({products.length})</h2>

        {products.length === 0 ? (
          <p>No products yet. Add one to get started!</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>{product.title}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="edit-btn"
                    >
                      ✎ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="delete-btn"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
