const Url=require("../../../model/url");


module.exports.renderShortURL=function(req,res){
    return res.render("shortURL",{
        shortURL:""
    })
}

function generateShortURL(length){

    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let randomstring = ''; 

    for (let i=0; i<length; i++) {  
        let rnum = Math.floor(Math.random() * characters.length);  
        randomstring += characters.substring(rnum, rnum+1);  
    }  
    return randomstring
}

module.exports.create_url=async function(req,res){
    try{
        const { fullURL } = req.body;

        if(!fullURL){
            req.flash("Please provide a URL.");
            return res.redirect("back")
        }
        
        const randomURL = generateShortURL(8);

        const createURL = await Url.create({
            username: req.user.email,
            long_url:fullURL,
            short_url:randomURL,
            visitHistory : []
        })

        if(!createURL){
            req.flash("error","Internal server error.")      
            return res.redirect("back");
        }

        req.flash("success","URL created successfully.")      
        // return res.redirect("back")
        return res.render('shortURL', { shortURL: createURL.short_url });
        
    }catch(err){
        req.flash("error","Internal server error.")      
        return res.status(500).json({ message:'server side error' , error: err })
    }
}

module.exports.redirectToOriginal=async function(req,res){
    try{
        const {shortURL} = req.params;

        if(!shortURL){
            return res.status(400).json({msg : "Provide short url"})
        }

        const foundUrl = await Url.findOneAndUpdate(
            {
                short_url : shortURL
            }, 
            {
                $push:{
                    visitHistory:{
                        timestamp: Date.now()
                    }
                }
            })

        if(!foundUrl){
            return res.status(404).json({msg : "Invalid Short URL!"})
        }

        return res.redirect(foundUrl.long_url)

    }catch(err){
        return res.status(500).json({ message:'server side error' , error: err })
    }
}