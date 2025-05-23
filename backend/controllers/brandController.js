const brands = require('../model/brandModel');
const products = require('../model/brandProducts');
const featuredProducts = require('../model/featuredProducts');
const bookings = require('../model/userBooking');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const brandReister = async (req, res) => {
    try {
        const { brandName, brandEmail, brandPassword } = req.body;
        const isEmail = await brands.findOne({ brandEmail });

        if (isEmail) {
            return res.status(400).json({ message: "Brand Already Exists..!" });
        }
        const hashedpassword = await bcrypt.hash(brandPassword, 10);
        const brand = new brands({ brandName, brandEmail, brandPassword: hashedpassword });
        await brand.save();
        return res.status(201).json({ message: "Brand Registered..." })
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}


const brandLogin = async (req, res) => {
    try {
        const { brandEmail, brandPassword } = req.body;
        const isEmail = await brands.findOne({ brandEmail });
        if (!isEmail) {
            return res.status(400).json({ message: "Brand Not Exists..!" });
        }
        if (isEmail.brandVerification === false) {
            return res.status(400).json({ message: "Brand verification not completed..!" });
        }
        if (isEmail.brandBan === true) {
            return res.status(400).json({ message: "Brand banned" });
        }
        const comparedpass = await bcrypt.compare(brandPassword, isEmail.brandPassword);
        if (comparedpass) {
            const authtoken = jwt.sign({ brandEmail: isEmail.brandEmail }, process.env.jwtSecretKey, { expiresIn: '10min' });
            res.status(201).json({ message: "Brand Login Success", authtoken, isEmail, userId: isEmail._id });
            console.log(authtoken);

        } else {
            res.status(401).json({ message: "incorrect password" })

        }
    } catch (error) {

        res.status(500).json({ message: "Server Error", success: false })
    }
}

const addProduct = async (req, res) => {
    try {
        const {
            id,
            category,
            name,
            model,
            ram,
            processor,
            storage,
            graphics,
            displaySize,
            displayResolution,
            refreshRate,
            operatingSystem,
            batteryLife,
            weight,
            description,
            price,
            image,
            stock
        } = req.body;

        const exist = await products.findOne({
            brandId: id,
            productModel: model
        });

        if (exist) {
            return res
                .status(400)
                .json({ success: false, message: "Product Already Exists..!" });
        }

        const product = new products({
            brandId: id,
            productCategory: category,
            productName: name,
            productModel: model,
            productRam: ram,
            productProcessor: processor,
            productStorage: storage,
            productGpu: graphics,
            displaySize,
            displayResolution,
            refreshRate,
            operatingSystem,
            batteryLife,
            weight,
            productDescription: description,
            productPrice: price,
            productImage: image,
            productStock: stock
        });

        await product.save();

        return res
            .status(201)
            .json({ success: true, message: "Product Added Successfully", product });
    } catch (error) {
        console.error("addProduct error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
};



const getBrandProducts = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const brandProducts = await products.find({ brandId });
        res.status(200).json(brandProducts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const product = await products.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: "Server error" });
    }
};


const updateProduct = async (req, res) => {
    const {
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
    } = req.body;

    try {
        const updatedProduct = await products.findByIdAndUpdate(
            req.params.id,
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
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Server error" });
    }
};



const getProducts = async (req, res) => {
    try {
        const product = await products.find();
        res.status(200).json({ data: product });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

const addToFeatured = async (req, res) => {
    try {
        const { brandId, productId } = req.body;
        const product = await products.findById(productId);
        const brand = await brands.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingFeatured = await featuredProducts.find({ brandId });

        if (existingFeatured.length >= 2) {
            return res.status(400).json({ message: "Only 2 featured products allowed per brand" });
        }


        const isAlreadyFeatured = existingFeatured.some(fp => fp.productId.toString() === productId);
        if (isAlreadyFeatured) {
            return res.status(409).json({ message: "This product is already featured" });
        }

        const addedProducts = new featuredProducts({ brandId: brandId, productId: productId });
        await addedProducts.save();
        return res.status(200).json({ message: "Product Added Success" });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
}

const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProductsList = await featuredProducts.find().populate('productId');
        res.status(200).json(featuredProductsList);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch featured products", error: error.message });
    }
};

const getBrandBookings = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        if (!brandId) {
            return res.status(400).json({ message: "Brand ID is required" });
        }
        const brandBookings = await bookings
            .find({ brandId })
            .populate('items.productId')
            ;

        if (!brandBookings || brandBookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this brand" });
        }
        console.log(brandBookings);
        res.status(200).json(brandBookings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
    }
}

const deliveryStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { deliveryStatus } = req.body;

    if (!deliveryStatus) {
        return res.status(400).json({ message: 'Delivery status is required' });
    }

    try {
        const booking = await bookings.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.deliveryStatus = deliveryStatus;
        await booking.save();

        res.json({ message: 'Delivery status updated successfully', booking });
    } catch (error) {
        console.error('Error updating delivery status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getBrandDetails = async (req, res) => {
    try {
        const { brandId } = req.params;

        if (!brandId) {
            return res.status(400).json({ message: 'Brand ID is required' });
        }

        const brand = await brands.findById(brandId);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        console.log(brand);

        res.status(200).json(brand);
    } catch (error) {
        console.error('Error fetching brand details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const updateBrandProfile = async (req, res) => {
    try {
        const { brandId } = req.params;
        const { name, email, password } = req.body;

        if (!name || !email || !brandId) {
            return res.status(400).json({ message: 'Name, email, and brandId are mandatory' });
        }

        const brand = await brands.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        brand.brandName = name;
        brand.brandEmail = email;

        if (password && password !== brand.brandPassword) {
            const salt = await bcrypt.genSalt(10);
            brand.brandPassword = await bcrypt.hash(password, salt);
        }

        await brand.save();

        res.status(200).json({
            message: 'Brand profile updated successfully',
        });
    } catch (error) {
        console.error('Error updating brand profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const productDelete = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'No product found' });
        }

        await products.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error while deleting product' });
    }
};





module.exports = { brandReister, brandLogin, productDelete, addProduct, getBrandProducts, updateBrandProfile, getSingleProduct, updateProduct, getProducts, getBrandDetails, addToFeatured, getFeaturedProducts, getBrandBookings, deliveryStatus };