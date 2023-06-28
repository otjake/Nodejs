const mongoose = require('mongoose')
const Role = require('../../models/Role');

mongoose.connect('mongodb+srv://nodeClasses:12345@cluster0.r1tfh.mongodb.net/ECOMMERCE-API?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // bufferCommands: false   // Disable buffering
}).then(() => console.log("connected to Db")).catch((err) => console.log(err))
const roles = [
    {
        name: 'Admin',
        description: 'Administrator role',
        permissions: ['create', 'read', 'update', 'delete']
    },
    {
        name: 'Customer',
        description: 'Customer role',
        permissions: ['read']
    },
    // Add more roles as needed
];

async function seedRoles() {
    try {
        await Role.deleteMany().maxTimeMS(30000); // Clear existing roles from the database

        for (const roleData of roles) {
            const role = new Role(roleData);
            await role.save();
            console.log(`Role '${role.name}' seeded successfully`);
        }

        console.log('Roles seeding completed');
        process.exit();

    } catch (error) {
        console.error('Error seeding roles', error);
    }
}

seedRoles().then(()=>{
    mongoose.connection.close()
});
