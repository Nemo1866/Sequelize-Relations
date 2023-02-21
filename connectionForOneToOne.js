const {Sequelize,DataTypes}=require("sequelize")
const sequelize=new Sequelize("association","root","nimap123",{
    host:"localhost",
    dialect:"mysql",
 

})

sequelize.authenticate().then(()=>{
    console.log("Db is Connected");
}).catch(err=>console.log(err))

let Capital=sequelize.define("capital",{
    capitalName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    timestamps:false
})


let Country=sequelize.define("country",{
    countryName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    timestamps:false
})

Country.hasOne(Capital)
Capital.belongsTo(Country)

sequelize.sync().then(async()=>{
//     let result=await Country.bulkCreate([
//     {
//             countryName:"Zimbabwe"
//     }, {
//         countryName:"England"
// }, {
//     countryName:"United Arab Emirates"
// }, {
//     countryName:"India"
// }, {
//     countryName:"Bangladesh"
// }

//     ])  /// THis is used for Saving bulk Data in Database


let Capital1=await Capital.findOne({where:{capitalName:"London"}})
let Country1=await Country.findOne({where:{countryName:"England"}})
Country1.setCapital(Capital1)                 //This is for setting Capital for country In One-to-One relationship
  
})

module.exports={Country,Capital}