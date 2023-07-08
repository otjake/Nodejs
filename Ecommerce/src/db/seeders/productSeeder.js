const mongoose = require('mongoose')
const Product = require('../../models/Product');

mongoose.connect('mongodb+srv://nodeClasses:12345@cluster0.r1tfh.mongodb.net/ECOMMERCE-API?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // bufferCommands: false   // Disable buffering
}).then(() => console.log("connected to Db")).catch((err) => console.log(err))
const productData = [
    { name: 'Product one', price: 10, image: 'product1.jpg' },
    { name: 'Product two', price: 20, image: 'product2.jpg' },
    { name: 'Product three', price: 30, image: 'product3.jpg' },
];

const seedProducts = async () => {
    try {
        // Delete existing products
        await Product.deleteMany();

        // Create new products using the product data array
        await Product.create(productData);

        console.log('Products seeded successfully!');
        process.exit(); // Exit the script after seeding
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1); // Exit with a non-zero status code to indicate an error
    }
};

// Call the seedProducts function to initiate the seeding process
seedProducts().then(()=>{
    mongoose.connection.close()
});
