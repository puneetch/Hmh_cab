const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hmhLoginDatabase", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection successful`)
}).catch((err)=>{
    console.log("no connection")
})