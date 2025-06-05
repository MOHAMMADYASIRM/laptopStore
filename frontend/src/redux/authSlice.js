import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;



export const registerUser = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/auth/signup`, userData, {
                headers: { "Content-Type": "application/json" },
            });

            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            else if (error.response?.status === 401) {
                return rejectWithValue("incorrect password");
            } else {
                return rejectWithValue(error.response?.data?.message || "Something went wrong!");
            }
        }
    }
);


export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        console.log(url);
        const response = await axios.post(`${url}/api/auth/login`, userData, {
            headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem("userToken", response.data.authtoken);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userEmail", response.data.isEmail.userEmail);
        return response.data;

    } catch (error) {
        if (error.response?.status === 400) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.response?.data?.message || "Something went wrong!");
        }
    }
});


export const registerBrand = createAsyncThunk(
    "brand/brandreg",
    async (brandData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/brand/brandreg`, brandData, {
                headers: { "Content-Type": "application/json" },
            });

            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            else if (error.response?.status === 401) {
                return rejectWithValue("incorrect password");
            } else {
                return rejectWithValue(error.response?.data?.message || "Something went wrong!");
            }
        }
    }
);


export const adminLogin = createAsyncThunk(
    "admin/adminauth",
    async ({ adminEmail, adminPassword }, { rejectWithValue }) => {
        try {
            console.log(adminEmail, adminPassword);
            const response = await axios.post(`${url}/api/admin/adminauth`, { adminEmail, adminPassword }, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            else if (error.response?.status === 401) {
                return rejectWithValue("incorrect password");
            } else {
                return rejectWithValue(error.response?.data?.message || "Something went wrong!");
            }
        }
    }
);

export const brandLogin = createAsyncThunk(
    "brand/brandlogin",
    async (brandData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/brand/brandlogin`, brandData, {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("brandToken", response.data.authtoken);
            localStorage.setItem("brandId", response.data.userId);
            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            else if (error.response?.status === 401) {
                return rejectWithValue("incorrect password");
            } else {
                return rejectWithValue(error.response?.data?.message || "Something went wrong!");
            }
        }
    }
);

export const addProduct = createAsyncThunk(
    "brand/addproduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/brand/addproduct`, productData, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        }
        catch (error) {
            if (error.response?.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            else {
                return rejectWithValue(error.response?.data?.message || "Something went wrong!");
            }
        }
    }
);

export const fetchBrandProducts = createAsyncThunk(
    "products/fetchBrandProducts",
    async (brandId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/brand/get-products/${brandId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

export const fetchSingleProduct = createAsyncThunk(
    "product/fetchSingleProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/brand/single-product/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch product");
        }
    }
);


export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (
        {
            id,
            brandId,
            productCategory,
            productName,
            productModel,
            productProcessor,
            productGpu,
            productRam,
            productStorage,
            displaySize,
            displayResolution,
            refreshRate,
            operatingSystem,
            batteryLife,
            weight,
            productPrice,
            productStock,
            productImage,
            productDescription
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.put(
                `${url}/api/brand/update-product/${id}`,
                {
                    brandId,
                    productCategory,
                    productName,
                    productModel,
                    productProcessor,
                    productGpu,
                    productRam,
                    productStorage,
                    displaySize,
                    displayResolution,
                    refreshRate,
                    operatingSystem,
                    batteryLife,
                    weight,
                    productPrice,
                    productStock,
                    productImage,
                    productDescription
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update product"
            );
        }
    }
);




export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/auth/get-products`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/auth/product/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch product");
        }
    }
);


export const addToCartThunk = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, brandId, userId }, { rejectWithValue }) => {
        try {

            const response = await axios.post(`${url}/api/auth/add-cart`, { productId, brandId, userId }, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to add to cart");
        }
    }
);


export const displayCart = createAsyncThunk(
    "cart/displayCart",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/auth/get-cart/${userId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to add to cart");
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (cartId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${url}/api/auth/remove-cart/${cartId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to remove from cart");
        }
    }
);

export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${url}/api/auth/clear-cart/${userId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to clear cart");
        }
    }
);

export const productBookingThunk = createAsyncThunk(
    "booking/productBooking",
    async ({ productId, userEmail, userId, brandId, quantity, paymentId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/auth/user-booking`, {
                productId, userEmail, userId, brandId, quantity, paymentId,
            }, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to book product");
        }
    });



export const fetchBooking = createAsyncThunk(
    "booking/fetchBooking",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/auth/get-booking/${userId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch booking");
        }
    }
);

export const addToFeatured = createAsyncThunk(
    "product/addToFeatured",
    async ({ brandId, productId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/brand/add-to-featured`, { brandId, productId }, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;

        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch booking");
        }
    }
);

export const fetchFeaturedProducts = createAsyncThunk(
    "product/fetchFeaturedProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/auth/get-featured`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

export const brandBookingsThunk = createAsyncThunk(
    "booking/brandBookings",
    async (brandId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/brand/get-orders/${brandId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch booking");
        }
    }
);

export const getUsersThunk = createAsyncThunk(
    "admin/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/admin/get-users`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch booking");
        }
    }
);

export const handleBanThunk = createAsyncThunk(
    "admin/handleBan",
    async (userId, { rejectWithValue }) => {
        try {
            console.log("userId", userId);
            const response = await axios.put(`${url}/api/admin/userban/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to ban user");
        }
    }
);

export const handleUserDeleteThunk = createAsyncThunk(
    "admin/handleUserDelete",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${url}/api/admin/user-delete/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete user");
        }
    }
);

export const getBrandsThunk = createAsyncThunk(
    "admin/getBrands",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/admin/get-brands`);
            console.log(response.data);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch brands");
        }
    }
);

export const handleBrandVerificationThunk = createAsyncThunk(
    "admin/handleBrandVerification",
    async (brandId, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${url}/api/admin/verify-brand/${brandId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to verify brand");
        }
    }
);

export const handleBrandBanThunk = createAsyncThunk(
    "admin/handleBanVerification",
    async (brandId, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${url}/api/admin/ban-brand/${brandId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to verify brand");
        }
    }
);

export const handleBrandDeleteThunk = createAsyncThunk(
    "admin/handleDeleteVerification",
    async (brandId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${url}/api/admin/brand-delete/${brandId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to verify brand");
        }
    }
);

export const countThunk = createAsyncThunk(
    "admin/userCount",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/admin/get-count`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch user count");
        }
    }
);


export const createOrder = createAsyncThunk(
    'payment/createOrder',
    async (amount, thunkAPI) => {
        try {
            const response = await axios.post(`${url}/api/payment/create-order`, {
                amount: amount * 100,
            });
            return response.data.order;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Failed to create order';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createComplaints = createAsyncThunk(
    'user/createComplaints',
    async ({ name, email, complaint }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/auth/add-complaint`, {
                name,
                email,
                complaint
            });
            return response.data;
        } catch (error) {
            const message =
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : error.message || "Something went wrong";

            return rejectWithValue(message);
        }
    }
);

export const getComplaints = createAsyncThunk(
    'admin/getComplaints',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/admin/get-complaint`);
            return response.data;
        } catch (error) {
            const message =
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : error.message || "Something went wrong";

            return rejectWithValue(message);
        }
    }
);

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/api/auth/get-profile/${userId}`);
            return response.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Something went wrong';
            return rejectWithValue(message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ userId, username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${url}/api/auth/update-profile/${userId}`,
                { username, password }
            );
            return response.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Something went wrong';
            return rejectWithValue(message);
        }
    }
);


export const cartBookingThunk = createAsyncThunk(
    "booking/cartBooking",
    async ({ userId, userEmail, items, totalPrice, paymentId }, thunkAPI) => {
        try {
            console.log("Booking info:", userId, items, totalPrice, paymentId);
            const response = await axios.post(`${url}/api/auth/cart-booking`, {
                userId,
                userEmail,
                items,
                totalPrice,
                paymentId,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const updateCartQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ cartId, productId, quantity }) => {
        const response = await axios.put(
            `${url}/api/auth/update-quantity/${cartId}`,
            { productId, quantity }
        );
        return response.data;
    }
);


export const updateDeliveryStatusThunk = createAsyncThunk(
    'brand/updateDeliveryStatus',
    async ({ bookingId, status }, { rejectWithValue }) => {
        try {
            console.log(bookingId, status);

            const response = await axios.put(`${url}/api/brand/update-deliverystatus/${bookingId}`, {
                deliveryStatus: status,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getBrandDetails = createAsyncThunk(
    'brand/getBrandDetails',
    async (brandId, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${url}/api/brand/get-brand-details/${brandId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const brandProfileUpdate = createAsyncThunk(
    'brand/brandProfileUpdate',
    async ({ brandId, name, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${url}/api/brand/brand-profile-update/${brandId}`, { name, email, password }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteProductThunk = createAsyncThunk(
    'brand/deleteProductThunk',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${url}/api/brand/brand-product-delete/${productId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);






const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        order: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetPaymentState: (state) => {
            state.order = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});







const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null, loading: false, error: null, products: {
            items: [],
            total: 0
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(brandLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(brandLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBrandProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrandProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products.items = action.payload;
            })
            .addCase(fetchBrandProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder


            .addCase(fetchSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(displayCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(displayCart.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(displayCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalPrice: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(displayCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(displayCart.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action", action.payload.items);
                state.cartItems = action.payload.items || [];
                console.log("state.cartItems", state.cartItems);
                state.totalPrice = action.payload.totalPrice || 0;
            })
            .addCase(displayCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load cart";
            });
    },
});

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookings: [],
        totalPrice: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload.items;
                state.totalPrice = action.payload.totalPrice || 0;
            })
            .addCase(fetchBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

const featuredProductsSlice = createSlice({
    name: "featuredProducts",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


const brandBookingsSlice = createSlice({
    name: "brandBookings",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(brandBookingsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(brandBookingsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;

            })
            .addCase(brandBookingsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



const userSlice = createSlice({
    name: "users",
    initialState: {
        allUsers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;

            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while fetching users.";
            });
    },
});

const brandSlice = createSlice({
    name: "brands",
    initialState: {
        allBrands: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrandsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBrandsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.allBrands = action.payload;

            })
            .addCase(getBrandsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while fetching users.";
            });
    },
});

const countSlice = createSlice({
    name: "countSlice",
    initialState: {
        count: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(countThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(countThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload;
            })
            .addCase(countThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

const complaintSlice = createSlice({
    name: "complaints",
    initialState: {
        complaints: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComplaints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getComplaints.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = action.payload;

            })
            .addCase(getComplaints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while fetching users.";
            });
    },
});

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;

            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while fetching users.";
            });
    },
});

const individualBrandSlice = createSlice({
    name: 'individualBrand',
    initialState: {
        brand: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearBrandError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrandDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBrandDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.brand = action.payload;
            })
            .addCase(getBrandDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});





export const cartReducer = cartSlice.reducer;
export const authReducer = authSlice.reducer;
export const productReducer = productSlice.reducer;
export const bookingReducer = bookingSlice.reducer;
export const featuredProductsReducer = featuredProductsSlice.reducer;
export const brandBookingsReducer = brandBookingsSlice.reducer;
export const userReducer = userSlice.reducer;
export const brandReducer = brandSlice.reducer;
export const countReducer = countSlice.reducer;
export const { resetPaymentState } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
export const complaintReducer = complaintSlice.reducer;
export const profileReducer = profileSlice.reducer;
export const individualBrandReducer = individualBrandSlice.reducer;
