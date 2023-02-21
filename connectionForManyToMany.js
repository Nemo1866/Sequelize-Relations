const {Sequelize,DataTypes}=require("sequelize")
const sequelize=new Sequelize("association","root","nimap123",{
    host:"localhost",
    dialect:"mysql",
 logging:false

})

sequelize.authenticate().then(()=>{
    console.log("Db is Connected");
}).catch(err=>console.log(err))

let Customer=sequelize.define("customer",{
    customerName:{
        type:DataTypes.STRING,
        allowNull:false,
        
    }
},{
    timestamps:false
})


let Product=sequelize.define("product",{
    ProductName:{
        type:DataTypes.STRING,
        allowNull:false,

    }
},{
    timestamps:false
})

async function getAll(){
   

Customer.belongsToMany(Product,{through:"custPro",timestamps:false})
Product.belongsToMany(Customer,{through:"custPro",timestamps:false})

await sequelize.sync({alter:true})

// let customers=await Customer.bulkCreate([
//     {
//         customerName:"Naeem",
//     },{
//         customerName:"Murtaza",
//     },{
//         customerName:"Ahmed",
//     },{
//         customerName:"Saad",
//     },{
//         customerName:"Hamza",
//     },
// ])

// let products=await Product.bulkCreate([
//     {
//         ProductName:"Pen"
//     },{
//         ProductName:"Pencil"
//     },{
//         ProductName:"Compass"
//     },{
//         ProductName:"Rubber"
//     },
// ])               THis is used for creating both products and customers in bulk.

let user2=await Customer.findOne({where:{id:2}})


// user2.addProduct(products)  //Add method is used to add product & customer id in many-to-many tables 
// console.log(await user2.getProducts({raw:true})) // This is used to get all the products corresponds to a specific user

let product2=await Product.findOne({where:{id:2}})
user2.removeProduct(product2)  // This will remove the product



    
}
getAll()

