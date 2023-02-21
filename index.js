const express=require("express")


const app=express()
// require("./connectionForOneToOne")
// require("./connectionForOneToMany")
require("./connectionForManyToMany")





app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})