const mongoose = require('mongoose')
const Category = require('../../models/Category');

mongoose.connect('mongodb+srv://nodeClasses:12345@cluster0.r1tfh.mongodb.net/ECOMMERCE-API?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // bufferCommands: false   // Disable buffering
}).then(() => console.log("connected to Db")).catch((err) => console.log(err))
const categoryData = [
    { name: 'Men', },
    { name: 'Women' },
    { name: 'Children'},
];

const seedProducts = async () => {
    try {
        // Delete existing categories
        await Category.deleteMany();

        // Create new categories using the categories data array
        await Category.create(categoryData);

        console.log('Categories seeded successfully!');
        process.exit(); // Exit the script after seeding
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1); // Exit with a non-zero status code to indicate an error
    }
};

// Call the seedCategories function to initiate the seeding process
seedProducts().then(()=>{
    mongoose.connection.close()
});
