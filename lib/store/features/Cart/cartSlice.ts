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
// Define the CartItem type
export interface CartItem {
    id: string;
    quantity: number;
    product: Product;
}

// Define the initial state
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
    async (cartItem: Omit<CartItem, 'id'>, { rejectWithValue }) => {
        try {
            const response = await axios.post<CartItem>('/api/cart/add', cartItem);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to add item to cart');
        }
    }
);

// Async Thunk to update a cart item
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async (updatedCartItem: CartItem, { rejectWithValue }) => {
        try {
            const response = await axios.put<CartItem>(`/api/cart/update`, updatedCartItem);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to update cart item');
        }
    }
);

// Async Thunk to remove a cart item
export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem',
    async (cartItemId: string, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/cart/remove`, { data: { id: cartItemId } });
            return cartItemId;
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
                state.cartItems.push(action.payload);
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to add item to cart';
            })

            // Update Cart Item
            .addCase(updateCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.status = 'succeeded';
                const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.cartItems[index] = action.payload;
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
                state.status = 'succeeded';
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to remove item from cart';
            });
    },
});

// Export actions and reducer
export const { /* synchronous actions if any */ } = cartSlice.actions;
export default cartSlice.reducer;