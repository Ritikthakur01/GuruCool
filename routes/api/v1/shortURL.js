const express= require("express")
const router= express.Router();// creating router

const shortURL_cnt=require("../../../controller/api/v1/shortURL_cnt")

// router.get("/profile/:id",passport.checkAuthentication,users_cnt.profile)

router.get("/",shortURL_cnt.renderShortURL)
router.post("/",shortURL_cnt.create_url)
router.get("/:shortURL",shortURL_cnt.redirectToOriginal)


module.exports= router;