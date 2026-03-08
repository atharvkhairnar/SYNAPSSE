const express = require("express")
const fs = require("fs")
const path = require("path")

const router = express.Router()

const cacheDir = path.join(__dirname,"../cache")
const filePath = path.join(cacheDir,"calendar.json")

/*
ADD IDEA TO CALENDAR
*/

router.post("/add",(req,res)=>{

try{

const { day, idea } = req.body

if(!day || !idea){

return res.status(400).json({
success:false,
message:"Day and idea are required"
})

}

if(!fs.existsSync(cacheDir)){
fs.mkdirSync(cacheDir)
}

let calendar = []

if(fs.existsSync(filePath)){

const data = fs.readFileSync(filePath,"utf8")

calendar = JSON.parse(data)

}

const newIdea = {
id: Date.now(),
day: day,
idea: idea
}

calendar.push(newIdea)

fs.writeFileSync(filePath,JSON.stringify(calendar,null,2))

res.json({
success:true,
data:calendar
})

}catch(err){

console.error(err)

res.status(500).json({
success:false,
message:"Server error"
})

}

})

/*
GET ALL CALENDAR ENTRIES
*/

router.get("/",(req,res)=>{

try{

let calendar = []

if(fs.existsSync(filePath)){

const data = fs.readFileSync(filePath,"utf8")

calendar = JSON.parse(data)

}

res.json({
success:true,
data:calendar
})

}catch(err){

console.error(err)

res.json({
success:true,
data:[]
})

}

})

module.exports = router