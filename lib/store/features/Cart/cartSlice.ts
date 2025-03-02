import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
    id: string;
    title: string;
    price: number;
    stock: number;
    images: string[];
    category: string;
}

export interface CartItem {
    id: string;
    userId: string;
    productId: string; // Use productId instead of product
    quantity: number;
    product:Product;
    createdAt?: string;
    updatedAt?: string;
}

interface CartState {
    cartItems: CartItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    cartItems: [],
    status: 'idle',
    error: null,
};

// Async Thunk to fetch cart items
export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async () => {
        const response = await axios.get<{ cartItems: CartItem[] }>('/api/cart/get');
        return response.data.cartItems;
    }
);

// Async Thunk to add a cart item
export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async (productId: string, { rejectWithValue }) => {
        try {
            const response = await axios.post<{ adCart: CartItem }>('/api/cart/add', { productId, quantity: 1 });
            return response.data.adCart; // Ensure this includes the `product` object
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to add item to cart');
        }
    }
);

// Async Thunk to update a cart item
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ id, quantity }: { id: string; quantity: number }, { rejectWithValue }) => {
        try {
            await axios.post('/api/cart/update', { id, quantity });
            return { id, quantity }; // Return the updated item
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to update item');
        }
    }
);

// Async Thunk to remove a cart item
export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem',
    async (cartItemId: string, { rejectWithValue }) => { // Use cartItemId instead of productId
        try {
            await axios.post(`/api/cart/remove`, { id: cartItemId }); // Pass cartItemId to the API
            return cartItemId; // Return the cartItemId
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
        }
    }
);

// Create the slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Synchronous reducers (if needed)
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart Items
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
                state.status = 'succeeded';
                state.cartItems = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to fetch cart items';
            })

            // Add Cart Item
            .addCase(addCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.status = 'succeeded';
                const existingItem = state.cartItems.find((item) => item.product.id === action.payload.product.id);
                if (existingItem) {
                    // Replace the quantity with the value returned by the API
                    existingItem.quantity = action.payload.quantity;
                } else {
                    // Add the new item to the cart
                    state.cartItems.push(action.payload);
                }
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to add item to cart redu case';
            })

            // Update Cart Item
            .addCase(updateCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<{ id: string; quantity: number }>) => {
                const item = state.cartItems.find((item) => item.id === action.payload.id);
                if (item) {
                    item.quantity = action.payload.quantity;
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to update cart item';
            })

            // Remove Cart Item
            .addCase(removeCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<string>) => {
                console.log('Removed Cart Item ID:', action.payload); // Log the removed item ID
                state.status = 'succeeded';
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
                console.log('Updated Cart State:', state.cartItems); // Log the updated cart state
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to remove item from cart';
            });
    },
});

export default cartSlice.reducer;