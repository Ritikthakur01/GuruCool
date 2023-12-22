const mongoose= require("mongoose");
const env=require("./environment") // importing environment.js file to set value at needed placed

async function main(){
    // connecting with mongodb
    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     };
     const encodedPassword = encodeURIComponent("Ritik@2000")
    await mongoose.connect(`mongodb+srv://bhadauriaritik:${encodedPassword}@cluster0.bf8akzu.mongodb.net/?retryWrites=true&w=majority`,connectionOptions)
    return;
}

main().then(function(data){
    //hendelling success
    console.log("Connected to MongoDB");
    return;
}).catch(function(err){
     //hendelling error
    console.log("Error on connecting with MongoDB:",err);
    return;
})
