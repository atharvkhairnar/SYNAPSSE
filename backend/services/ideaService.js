const { InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime")
const client = require("../config/bedrockClient.js")

async function generateIdeas(niche, platform){

const prompt = `
Generate 10 viral short-form video ideas.

Niche: ${niche}
Platform: ${platform}

Return ONLY valid JSON.

{
 "ideas":[
  "idea 1",
  "idea 2",
  "idea 3",
  "idea 4",
  "idea 5",
  "idea 6",
  "idea 7",
  "idea 8",
  "idea 9",
  "idea 10"
 ]
}
`

try{

const command = new InvokeModelCommand({

modelId:"amazon.nova-lite-v1:0",
contentType:"application/json",
accept:"application/json",

body:JSON.stringify({

messages:[
{
role:"user",
content:[{text:prompt}]
}
],

inferenceConfig:{
maxTokens:1000,
temperature:0.7
}

})

})

const response = await client.send(command)

const decoded = new TextDecoder().decode(response.body)
const parsed = JSON.parse(decoded)

let text = ""

/* SAFE AI RESPONSE PARSE */

if(parsed?.output?.message?.content?.length){
text = parsed.output.message.content[0].text
}

/* CLEAN RESPONSE */

text = text.replace(/```json/g,"").replace(/```/g,"").trim()

/* EXTRACT JSON */

let data

try{

data = JSON.parse(text)

}catch{

const start = text.indexOf("{")
const end = text.lastIndexOf("}") + 1

const jsonString = text.substring(start,end)

data = JSON.parse(jsonString)

}

/* SAFETY FALLBACK */

if(!data.ideas || !Array.isArray(data.ideas)){
data = {
ideas:[
"Storytelling tip every creator should know",
"3 mistakes beginners make on Instagram Reels",
"How to make your first viral short video",
"Hidden algorithm trick creators ignore",
"Why most creators fail in first 30 days",
"Simple storytelling framework for viral content",
"Hook writing formula used by viral creators",
"How to turn one idea into 10 videos",
"Psychology behind viral reels",
"Content strategy for small creators"
]
}

}

return data

}catch(error){

console.error("Idea generation error:",error)

return {
ideas:[
"Content strategy for beginner creators",
"How to write viral hooks",
"3 storytelling mistakes creators make",
"Simple editing tricks for reels",
"How creators grow fast on Instagram",
"Algorithm myths creators believe",
"Content batching strategy",
"How to find viral video ideas",
"Secrets of engaging storytelling",
"Why short-form videos go viral"
]
}

}

}

module.exports = {
generateIdeas
}