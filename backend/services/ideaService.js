const { InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime")
const client = require("../config/bedrockClient.js")

async function generateIdeas(niche, platform){

const prompt = `
Generate 10 viral content ideas.

Niche: ${niche}
Platform: ${platform}

Return JSON format:

{
 "ideas":[
  "idea 1",
  "idea 2",
  "idea 3"
 ]
}
`

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

let text = parsed.output.message.content[0].text

text = text.replace(/```json/g,"").replace(/```/g,"").trim()

const start = text.indexOf("{")
const end = text.lastIndexOf("}") + 1

const jsonString = text.substring(start,end)

const data = JSON.parse(jsonString)

return data

}

module.exports = {
generateIdeas
}