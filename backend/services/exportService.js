import fs from "fs"
import path from "path"
import PDFDocument from "pdfkit"

/*
SAFE TEXT FUNCTION
Prevents unicode crashes in PDFKit
*/

function safeText(text){
if(!text) return ""
return text.normalize("NFKC")
}


/*
EXPORT TXT
*/

export function exportTXT(script){

let content = ""

const data = script.scripts[0]

content += "HOOK\n"
content += safeText(data.hook) + "\n\n"

data.narrative.forEach(scene => {

content += `SEGMENT ${scene.segment}\n`
content += `Visual: ${safeText(scene.visual)}\n`
content += `Voiceover English: ${safeText(scene.voiceover.english)}\n`
content += `Voiceover Hindi: ${safeText(scene.voiceover.hindi)}\n`
content += `Ambience: ${safeText(scene.audio.ambience)}\n`
content += `Transition: ${safeText(scene.audio.transitions)}\n`

content += `Shot Type: ${safeText(scene.camera_setup.shot_type)}\n`
content += `Angle: ${safeText(scene.camera_setup.angle)}\n`
content += `Movement: ${safeText(scene.camera_setup.movement)}\n`
content += `Lighting: ${safeText(scene.camera_setup.lighting)}\n`

content += `ISO: ${safeText(scene.settings.iso_range)}\n`
content += `Aperture: ${safeText(scene.settings.aperture)}\n`

content += "\n---------------------------------\n\n"

})

const filePath = path.join("backend","exports","script.txt")

fs.writeFileSync(filePath,content)

return filePath

}



/*
EXPORT PDF
*/

export function exportPDF(script){

const doc = new PDFDocument()

// stable font (prevents fontkit crash)
doc.font("backend/fonts/NotoSans-Regular.ttf")

const filePath = path.join("backend","exports","script.pdf")

const stream = fs.createWriteStream(filePath)

doc.pipe(stream)

const data = script.scripts[0]

/* HOOK */

doc.fontSize(18).text("HOOK")
doc.moveDown()

doc.fontSize(12).text(safeText(data.hook))
doc.moveDown()


/* SEGMENTS */

data.narrative.forEach(scene => {

doc.fontSize(14).text(`SEGMENT ${scene.segment}`)
doc.moveDown()

doc.fontSize(12).text(`Visual: ${safeText(scene.visual)}`)

doc.text(`Voiceover English: ${safeText(scene.voiceover.english)}`)

doc.text(`Voiceover Hindi: ${safeText(scene.voiceover.hindi)}`)

doc.text(`Ambience: ${safeText(scene.audio.ambience)}`)

doc.text(`Transition: ${safeText(scene.audio.transitions)}`)

doc.text(`Shot Type: ${safeText(scene.camera_setup.shot_type)}`)

doc.text(`Angle: ${safeText(scene.camera_setup.angle)}`)

doc.text(`Movement: ${safeText(scene.camera_setup.movement)}`)

doc.text(`Lighting: ${safeText(scene.camera_setup.lighting)}`)

doc.text(`ISO: ${safeText(scene.settings.iso_range)}`)

doc.text(`Aperture: ${safeText(scene.settings.aperture)}`)

doc.moveDown()
doc.text("-----------------------------------")
doc.moveDown()

})


doc.end()

return new Promise((resolve)=>{
stream.on("finish",()=>{
resolve(filePath)
})
})

}


