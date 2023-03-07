const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../model/User")
const jwt = require("jsonwebtoken")
const auth = require("../middelware/auth")

router.get("/users",auth, (req, resp) => {

    User.find().then(data => {
        resp.send(data)
    }).catch(err => {
        console.log(err);
        resp.send(err)
    })

})

router.post("/users", (req, resp) => {
    const user = new User(req.body)


    user.save().then(data => {
        resp.send(data)
    }).catch(err => {
        resp.send(err)
    })
})

router.get("/users/:id", (req, resp) => {

    const _id = req.params.id
    User.findById(_id).then(data => {
        resp.send(data)
    }).catch(err => {
        resp.send(err)
    })
})

router.put("/users/:id", (req, resp) => {
    const _id = req.params.id
    User.findByIdAndUpdate(_id, req.body).then(data => {
        resp.send(data)
    }).catch(err => {
        resp.send(err)
    })
})

router.delete("/users/:id", (req, resp) => {
    const _id = req.params.id
    User.findByIdAndDelete(_id).then(data => {
        resp.send(data)
    }).catch(err => {
        resp.send(err)
    })
})

// router.post("/userlogin",async(req,resp)=>{
//             try {
//                 const email = req.body.email;
//                 const pass = req.body.pass;

//                 const userdata = await User.findOne({email:email})
//                 const valid = await bcrypt.compare(pass,userdata.pass)
//                 if(valid){
//                     resp.send("Welcome",+ userdata.uname)
//                 }
//                 else{
//                     resp.send("Invalid credential !!!!")
//                 }

//             } catch (error) {
//                 resp.send("Invalid credential !!!!")
//             }
// })

router.post("/userlogin",async(req,resp)=>{
    try {
        const email = req.body.email;
        const pass = req.body.pass;

        const userdata = await User.findOne({email:email})
        const valid = await bcrypt.compare(pass,userdata.pass)


        if(valid){
            const token = await jwt.sign({_id: userdata._id},"thisismywebtoken")
            resp.send("auth-token :" + token)
            // resp.send("Welcome",+ userdata.uname)
        }
        else{
            resp.send("Invalid credential !!!!")
        }

    } catch (error) {
        resp.send("Invalid credential !!!!")
    }
})

module.exports = router