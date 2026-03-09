import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import client from "../config/bedrockClient.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { getCachedScript, storeScript } from "../utils/cacheService.js";
import { generateHooks } from "./hookService.js";

export async function generateScript(data){

const { topic, platform, audience, tone, duration, language, format } = data;

const cacheKey = `${topic}_${platform}_${tone}_${duration}_${language}`;

try{

const cachedScript = getCachedScript(cacheKey);

if(cachedScript){
console.log("⚡ Returning cached script");
return cachedScript;
}

const prompt = buildPrompt({
topic,
platform,
audience,
tone,
duration,
language,
format
});

const command = new InvokeModelCommand({

modelId: "amazon.nova-lite-v1:0",

contentType: "application/json",

accept: "application/json",

body: JSON.stringify({

messages: [

{

role:"user",

content:[{text:prompt}]

}

],

inferenceConfig:{

maxTokens:2000,

temperature:0.7,

topP:0.9

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

let aiData;

try{

aiData = JSON.parse(jsonString);

}catch(err){

console.log("AI returned invalid JSON. Using fallback.");

aiData = {

scripts:[

{

hook:"Generated hook",

narrative:[],

retention_prediction:{},

viral_probability_score:0

}

],

titles:[],

thumbnail_text:[]

};

}

const optimizedHooks = await generateHooks(topic);

const result = {

scripts: aiData.scripts || [],

hooks: optimizedHooks,

titles: aiData.titles || [],

thumbnail_text: aiData.thumbnail_text || [],

shot_list: aiData.scripts?.map(script=>script.narrative) || [],

retention_prediction: aiData.scripts?.[0]?.retention_prediction || {},

viral_probability_score: aiData.scripts?.[0]?.viral_probability_score || 0

};

storeScript(cacheKey,result);

return result;

}catch(error){

console.error("AI generation error:",error);

throw new Error("Script generation failed");

}

}

import fs from "fs";
import path from "path";

const historyPath = path.resolve("backend/cache/scripts.json");

function readHistory(){

if(!fs.existsSync(historyPath)){
fs.writeFileSync(historyPath, JSON.stringify([]));
}

const data = fs.readFileSync(historyPath);

return JSON.parse(data);

}

function writeHistory(data){

fs.writeFileSync(historyPath, JSON.stringify(data,null,2));

}

export function saveScript(script){

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

export function getScriptHistory(){

return readHistory();

}

export function deleteScript(id){

const history = readHistory();

const updated = history.filter(s => s.id != id);

writeHistory(updated);

return updated;

}



