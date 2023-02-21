const {Sequelize,DataTypes}=require("sequelize")
const sequelize=new Sequelize("association","root","nimap123",{
    host:"localhost",
    dialect:"mysql",
 logging:false

})

sequelize.authenticate().then(()=>{
    console.log("Db is Connected");
}).catch(err=>console.log(err))

let User=sequelize.define("user",{
    user:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    timestamps:false
})


let Post=sequelize.define("post",{
    post:{
        type:DataTypes.STRING,
        allowNull:false,

    }
},{
    timestamps:false
})

async function getAll(){
    User.hasMany(Post)
    Post.belongsTo(User)
    
    await sequelize.sync({alter:true})
    // let user1=await User.bulkCreate([
    //     {
    //         user:"Naeem"
    //     },{
    //         user:"Murtaza"
    //     },{
    //         user:"Amruta"
    //     },{
    //         user:"Ahmed"
    //     },{
    //         user:"Chinmay"
    //     },
    // ])
    // console.log("Added Users")
    // let posts=await Post.bulkCreate([
    //     {
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     },{
    //         post:"Hello"
    //     }
    // ])
    // console.log("Added Posts") // For Creating Bulk Post
    let user1=await User.findOne({where:{
        user:"Naeem"
    }})
    let user2=await User.findOne({where:{user:"Ahmed"}})
  let post1=await Post.findAll()
  user1.removePost(post1) /// THis is used to remove a particular post from user
  user1.addPosts(post1) // THis will add all post to a particular USer
  user1.addPost(post1) // THis will add a specific post to a specific User

  user1.hasPost(post1)// THis will check whether a user have that post or not 




    
}
getAll()

