const { InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime")
const client=require("../config/bedrockClient")

async function generateIdeas(niche,platform){

const prompt=`Generate 10 viral video ideas.

Niche:${niche}
Platform:${platform}

Return JSON:
{
"ideas":["idea1","idea2","idea3"]
}`

const command=new InvokeModelCommand({

modelId:"amazon.nova-lite-v1:0",
contentType:"application/json",
accept:"application/json",

body:JSON.stringify({
messages:[{role:"user",content:[{text:prompt}]}],
inferenceConfig:{maxTokens:800,temperature:0.7}
})

})

const response=await client.send(command)

const decoded=new TextDecoder().decode(response.body)

const parsed=JSON.parse(decoded)

let text=""

if(parsed?.output?.message?.content?.length){
text=parsed.output.message.content[0].text
}

text=text.replace(/```json/g,"").replace(/```/g,"").trim()

let json

try{
json=JSON.parse(text)
}catch{
json={ideas:[]}
}

return json
}

module.exports={generateIdeas}