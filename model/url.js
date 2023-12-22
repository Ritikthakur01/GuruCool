const mongoose=require("mongoose");

const urlSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    long_url: {
         type: String,
         required: true
    },
    short_url: {
         type: String,
         required: true,
         unique: true 
    },
    visitHistory : [
        {
            timestamp : {
                type: Number
            }
        }
    ]
})

const url =  mongoose.model("Url", urlSchema);

module.exports= url;