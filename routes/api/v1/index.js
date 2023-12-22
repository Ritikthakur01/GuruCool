const express= require("express");
const router = express.Router();
const passport=require("passport");

const home_cnt= require("../../../controller/api/v1/home_cnt")

router.get("/",home_cnt.home);
router.use('/user',require("./user"))
router.use('/shortURL',passport.checkAuthentication,require("./shortURL"))


module.exports=router;