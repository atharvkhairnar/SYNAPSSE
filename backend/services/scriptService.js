const { InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime")
const client = require("../config/bedrockClient")
const { buildPrompt } = require("../utils/promptBuilder")

const fs = require("fs")
const path = require("path")

const historyFile = path.join(__dirname,"../cache/scripts.json")

async function generateScript(data){

const prompt = buildPrompt(data)

const command = new InvokeModelCommand({

modelId:"amazon.nova-lite-v1:0",
contentType:"application/json",
accept:"application/json",

body:JSON.stringify({
messages:[{role:"user",content:[{text:prompt}]}],
inferenceConfig:{maxTokens:2000,temperature:0.7}
})

})

const response = await client.send(command)

const decoded = new TextDecoder().decode(response.body)

const parsed = JSON.parse(decoded)

let text=""

if(parsed?.output?.message?.content?.length){
text=parsed.output.message.content[0].text
}

text=text.replace(/```json/g,"").replace(/```/g,"").trim()

let json

try{
json=JSON.parse(text)
}catch{
json={scripts:[{hook:"AI output error",narrative:[]}]}
}

/* force 8 segments */

const narrative=json.scripts[0].narrative

while(narrative.length<8){
narrative.push({
segment:String(narrative.length+1),
visual:"Story continues",
voiceover:{
english:"Continuation of the story",
hindi:"कहानी जारी रहती है"
}
})
}

saveScript(json)

return json
}

function readHistory(){

if(!fs.existsSync(historyFile)) return []

return JSON.parse(fs.readFileSync(historyFile))
}

function saveScript(script){

const history=readHistory()

history.push({
id:Date.now(),
topic:"Generated Script",
script,
createdAt:new Date().toISOString()
})

fs.writeFileSync(historyFile,JSON.stringify(history,null,2))
}

function getScriptHistory(){
return readHistory()
}

module.exports={
generateScript,
getScriptHistory
}