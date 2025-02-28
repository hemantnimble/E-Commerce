import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Product type
export interface Product {
    id: string;
    title: string;
    price: string;
    category: string;
    stock: number;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

// Define the initial state
interface ProductState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    status: 'idle',
    error: null,
};

// Async Thunk to fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (category: string) => {
        const response = await axios.post<{ products: Product[] }>('/api/products/filter', { category });
        return response.data.products;
    }
);

// Async Thunk to add a product
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (newProduct: Omit<Product, 'id'>, { rejectWithValue }) => {
        try {
            const response = await axios.post<Product>('/api/products', newProduct); // Replace with your API endpoint
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to add product');
        }
    }
);

// Async Thunk to update a product
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (updatedProduct: Product, { rejectWithValue }) => {
        try {
            const response = await axios.put<Product>(`/api/products/${updatedProduct.id}`, updatedProduct); // Replace with your API endpoint
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to update product');
        }
    }
);

// Async Thunk to delete a product
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId: string, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/products/${productId}`); // Replace with your API endpoint
            return productId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to delete product');
        }
    }
);

// Create the slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Synchronous reducers (if needed)
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            })

            // Add Product
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to add product';
            })

            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = 'succeeded';
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to update product';
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.items = state.items.filter((p) => p.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to delete product';
            });
    },
});

// Export actions and reducer
export const { /* synchronous actions if any */ } = productSlice.actions;
export default productSlice.reducer;