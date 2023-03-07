const jwt = require("jsonwebtoken")
const User = require("../model/User")

const auth = async (req,resp,next)=>{
    const token = req.header("auth-token")
    try {
        const data = await jwt.verify (token,"thisismywebtoken")
        if(data){
                const userdata =  await User.findOne({_id: data._id})
                next();
        }
        else{
            resp.send("Invalid token")
        }
    } catch (error) {
        resp.send("Invalid token")
    }
}

module.exports = auth;