const products = require('../model/brandProducts');
const cart = require('../model/userCartModel');
const Users = require('../model/userModel');
const brands = require('../model/brandModel');

const dotenv = require('dotenv');

dotenv.config();


const addToCart = async (req, res) => {
    try {
        const { userId, brandId, productId } = req.body;
        const user = await Users.findById(userId);
        const brand = await brands.findById(brandId);
        const product = await products.findById(productId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (!brand) {
            return res.status(404).json({ message: "brand not found" });
        }
        const existingItem = await cart.findOne({
            userId: userId,
            brandId: brandId,
            "items.productId": productId,
        });
        if (existingItem) {
            return res.status(400).json({ message: "Item already in cart" });
        }
        const newCartItem = new cart({
            userId,
            brandId,
            items: [{ productId }],
            totalPrice: product.productPrice,
        });
        await newCartItem.save();
        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;


        const carts = await cart.find({ userId }).populate("items.productId");

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: "Cart is Empty...!" });
        }


        const allItems = carts.flatMap(cart =>
            cart.items.map(item => ({
                cartId: cart._id,
                productId: item.productId,
                quantity: item.quantity,
                itemId: item._id,
            }))
        );

        const totalPrice = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);

        res.status(200).json({ items: allItems, totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const cartSingleDelete = async (req, res) => {
    try {
        const { cartId } = req.params;
        await cart.findByIdAndDelete(cartId);
        res.status(200).json({ message: "Cart item removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        await cart.deleteMany({ userId });
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


async function updateQuantity(req, res) {
    try {
        const cartId = req.params.cartId;
        const { productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const carts = await cart.findById(cartId);
        if (!carts) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = carts.items.findIndex(
            (item) => item.productId.toString() === productId
        );
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        carts.items[itemIndex].quantity = quantity;

        let total = 0;
        for (const item of carts.items) {
            const product = await products.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found in DB` });
            }
            total += product.productPrice * item.quantity;
        }

        carts.totalPrice = total;
        await carts.save();

        res.status(200).json({ message: "Quantity updated", carts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}













module.exports = { addToCart, getCartItems, cartSingleDelete, clearCart, updateQuantity };