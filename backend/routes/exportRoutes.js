import express from "express"
import { exportTXT, exportPDF } from "../services/exportService.js"

const router = express.Router()

/* TXT EXPORT */

router.post("/txt", (req,res)=>{

try{

const script = req.body

const filePath = exportTXT(script)

res.download(filePath,"script.txt")

}catch(err){

console.error(err)

res.status(500).json({
success:false,
message:"TXT export failed"
})

}

})


/* PDF EXPORT */

router.post("/pdf", async (req,res)=>{

try{

const script = req.body

const filePath = await exportPDF(script)

res.download(filePath,"script.pdf")

}catch(err){

console.error(err)

res.status(500).json({
success:false,
message:"PDF export failed"
})

}

})

export default router



