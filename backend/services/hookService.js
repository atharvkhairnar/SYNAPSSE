const { InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const client = require("../config/bedrockClient.js");

async function generateHooks(topic) {

const prompt = `
You are a viral content strategist.

Generate 10 viral hooks for this topic.

Topic: ${topic}

Return ONLY JSON.

{
 "hooks":[
  "hook1",
  "hook2",
  "hook3",
  "hook4",
  "hook5",
  "hook6",
  "hook7",
  "hook8",
  "hook9",
  "hook10"
 ]
}
`;

const command = new InvokeModelCommand({
modelId: "amazon.nova-lite-v1:0",
contentType: "application/json",
accept: "application/json",

body: JSON.stringify({
messages: [
{
role: "user",
content: [{ text: prompt }]
}
],

inferenceConfig: {
maxTokens: 500,
temperature: 0.8
}

})
});

const response = await client.send(command);

const decoded = new TextDecoder().decode(response.body);

const parsed = JSON.parse(decoded);

let aiText = parsed.output.message.content[0].text;

aiText = aiText.replace(/```json/g,"").replace(/```/g,"").trim();

const start = aiText.indexOf("{");
const end = aiText.lastIndexOf("}")+1;

const jsonString = aiText.substring(start,end);

let data;

try{
data = JSON.parse(jsonString);
}catch{

data = {
hooks:[
"Curiosity hook",
"Controversial hook",
"Relatable hook",
"Statistic hook",
"Question hook",
"Pain point hook",
"Authority hook",
"FOMO hook",
"Story hook",
"Challenge hook"
]
};

}

return data.hooks;

}

module.exports = {
generateHooks
};