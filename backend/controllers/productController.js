

// Function for adding a new product
const addProduct = async (req, res) => {
    try {
        const { name, brand, price, description, category, rating } = req.body;
        const image = req.file.filename;

        // Validate required fields
        if (!name || !brand || !price || !description || !category || !rating) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        console.log(name, brand, price, description, category, rating)
        console.log(image)

    } catch (error) {
        console.error(error);
        res.json({ success: false, message:error.message });
    }
};

// Function for getting all products
const listProducts = async (req, res) => {

}


// Function for removing a product
const removeProduct = async (req, res) => {

}


// Function for getting a single product
const singleProduct = async (req, res) => {

}

export { addProduct, listProducts, removeProduct, singleProduct };