const { InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const client = require("../config/bedrockClient.js");
const { buildPrompt } = require("../utils/promptBuilder.js");
const { getCachedScript, storeScript } = require("../utils/cacheService.js");
const { generateHooks } = require("./hookService.js");

const fs = require("fs");
const path = require("path");

/* ================================
   AI SCRIPT GENERATION
================================ */

async function generateScript(data){

const { topic, platform, audience, tone, duration, language, format } = data;

const cacheKey = `${topic}_${platform}_${tone}_${duration}_${language}`;

try{

/* CACHE CHECK */

const cachedScript = getCachedScript(cacheKey);

if(cachedScript){
console.log("⚡ Returning cached script");
return cachedScript;
}

/* BUILD PROMPT */

const prompt = buildPrompt({
topic,
platform,
audience,
tone,
duration,
language,
format
});

/* BEDROCK REQUEST */

const command = new InvokeModelCommand({

modelId: "amazon.nova-lite-v1:0",
contentType: "application/json",
accept: "application/json",

body: JSON.stringify({

messages:[
{
role:"user",
content:[{ text: prompt }]
}
],

inferenceConfig:{
maxTokens:4000,
temperature:0.7,
topP:0.9
}

})

});

/* CALL BEDROCK */

const response = await client.send(command);

const decoded = new TextDecoder().decode(response.body);
const parsed = JSON.parse(decoded);

let aiText = "";

if(parsed?.output?.message?.content?.length){
aiText = parsed.output.message.content[0].text;
}

/* CLEAN RESPONSE */

aiText = aiText
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();

/* PARSE JSON */

let aiData;

try{

aiData = JSON.parse(aiText);

}catch(err){

try{

const start = aiText.indexOf("{");
const end = aiText.lastIndexOf("}") + 1;

const jsonString = aiText.substring(start,end);

aiData = JSON.parse(jsonString);

}catch(e){

console.log("⚠️ AI returned invalid JSON");

aiData = {
scripts:[
{
hook:"AI generation failed",
narrative:[]
}
],
titles:[],
thumbnail_text:[]
};

}

}

/* HOOK OPTIMIZATION */

const optimizedHooks = await generateHooks(topic);

/* FINAL RESULT */

const result = {

scripts: aiData.scripts || [],
hooks: optimizedHooks || [],
titles: aiData.titles || [],
thumbnail_text: aiData.thumbnail_text || [],
shot_list: aiData.scripts?.map(s=>s.narrative) || [],
retention_prediction: aiData.scripts?.[0]?.retention_prediction || {},
viral_probability_score: aiData.scripts?.[0]?.viral_probability_score || 0

};

/* STORE CACHE */

storeScript(cacheKey,result);

return result;

}catch(error){

console.error("AI generation error:",error);

throw new Error("Script generation failed");

}

}

/* ================================
   SCRIPT HISTORY MANAGEMENT
================================ */

const historyPath = path.join(__dirname,"../cache/scripts.json");

function readHistory(){

try{

if(!fs.existsSync(historyPath)){
fs.writeFileSync(historyPath, JSON.stringify([]));
}

const data = fs.readFileSync(historyPath,"utf8");

return JSON.parse(data);

}catch(err){

console.log("History read error:",err);
return [];

}

}

function writeHistory(data){

try{

fs.writeFileSync(historyPath, JSON.stringify(data,null,2));

}catch(err){

console.log("History write error:",err);

}

}

function saveScript(script){

const history = readHistory();

const newScript = {
id: Date.now(),
script,
createdAt: new Date().toISOString()
};

history.push(newScript);

writeHistory(history);

return newScript;

}

function getScriptHistory(){
return readHistory();
}

function deleteScript(id){

const history = readHistory();

const updated = history.filter(s => s.id != id);

writeHistory(updated);

return updated;

}

module.exports = {
generateScript,
saveScript,
getScriptHistory,
deleteScript
};