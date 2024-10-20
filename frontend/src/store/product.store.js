import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {
                success: false,
                message: 'Please fill in all fields'
            }
        }
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        const resData = await res.json();
        if (!resData.success) {
            return resData;
        } else {
            set((state) => ({products: [...state.products, resData.data]}));
            return {
                success: true,
                message: 'Product created successfully'
            };
        }
    },

    fetchProducts: async() => {
        const res = await fetch('/api/products');
        const resData = await res.json();
        if (resData.success) {
            set({products: resData.data})
        } else {
            return resData;
        }
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'DELETE'
        });
        const resData = await res.json();
        if(resData.success) {
            // update UI immediately without needing refresh
            set((state) => ({products: state.products.filter(product => product._id !== pid)}));
        }
        return resData;
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        const resData = await res.json();
        if (resData.success) {
            // update UI immediately without needing refresh
            set((state) => ({
                products: state.products.map(
                    (product) => (product._id === pid ? resData.data : product)
                )}));
                return {
                    success: true,
                    message: 'Product updated successfully'
                }; 
        } else {
            return resData;
        }
    }
}));