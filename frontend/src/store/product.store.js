import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || ! newProduct.price) {
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
        set((state) => ({products: [...state.products, resData.data]}));
        return {
            success: true,
            message: 'Product created successfully'
        };
    }
}));