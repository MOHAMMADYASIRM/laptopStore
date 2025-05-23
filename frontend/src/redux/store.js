import { configureStore } from "@reduxjs/toolkit";
import { authReducer, productReducer, cartReducer, bookingReducer, featuredProductsReducer, brandBookingsReducer, userReducer, brandReducer, countReducer, paymentReducer, complaintReducer, profileReducer, individualBrandReducer } from "./authSlice";
import popupReducer from "./popupSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    popup: popupReducer,
    cart: cartReducer,
    booking: bookingReducer,
    featuredProducts: featuredProductsReducer,
    brandBookings: brandBookingsReducer,
    user: userReducer,
    brand: brandReducer,
    count: countReducer,
    payment: paymentReducer,
    complaint: complaintReducer,
    profile: profileReducer,
    individualbrand: individualBrandReducer,
  },
});

export default store;
