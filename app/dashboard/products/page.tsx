// app/products/page.tsx
'use client';

import { useState } from 'react';
import { 
  Search,
  Plus,
  Edit,
  Trash2,
  Package
} from 'lucide-react';

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  thumbnail?: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: '1',
    name: 'AI Logo Pack',
    category: 'design',
    price: 49.99,
    thumbnail: '/api/placeholder/400/300?text=Logo+Pack'
  },
  {
    id: '2',
    name: 'Social Media Bundle',
    category: 'content',
    price: 29.99,
    thumbnail: '/api/placeholder/400/300?text=Social+Media'
  },
  {
    id: '3',
    name: 'Website Template',
    category: 'code',
    price: 79.99,
    thumbnail: '/api/placeholder/400/300?text=Website'
  },
  {
    id: '4',
    name: 'Background Music',
    category: 'audio',
    price: 19.99,
    thumbnail: '/api/placeholder/400/300?text=Music'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'design', name: 'Design' },
  { id: 'content', name: 'Content' },
  { id: 'code', name: 'Code' },
  { id: 'audio', name: 'Audio' }
];

// Components
function ProductCard({ product, onEdit, onDelete }: { 
  product: Product; 
  onEdit: (product: Product) => void; 
  onDelete: (id: string) => void; 
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow group">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img 
          src={product.thumbnail || '/api/placeholder/400/300'} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(product)}
              className="p-2 bg-white text-gray-600 hover:text-blue-600 rounded"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => onDelete(product.id)}
              className="p-2 bg-white text-gray-600 hover:text-red-600 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-medium text-gray-900 flex-1 pr-2">{product.name}</h3>
          <div className="text-lg font-semibold text-blue-600">${product.price}</div>
        </div>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
      </div>
    </div>
  );
}

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

function CreateProductModal({ isOpen, onClose, onSave }: CreateProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    thumbnail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
      thumbnail: formData.thumbnail || `/api/placeholder/400/300?text=${encodeURIComponent(formData.name)}`
    };
    onSave(newProduct);
    setFormData({ name: '', category: '', price: 0, thumbnail: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Add Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Product name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Category</option>
              {CATEGORIES.filter(cat => cat.id !== 'all').map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Price"
            />
          </div>

          <div>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Image URL (optional)"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Products</h1>
          </div>
          
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500"
          >
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Package size={32} className="mx-auto text-gray-400 mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-600 text-sm mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? "Try adjusting your search or filters"
                : "Create your first product"
              }
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        )}
      </div>

      {/* Create Product Modal */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateProduct}
      />
    </div>
  );
}