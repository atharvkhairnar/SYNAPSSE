import { useState } from "react"
import PageWrapper from "../components/PageWrapper"

const API = "https://dfd5qmxvmi.execute-api.us-east-1.amazonaws.com/default"

export default function Generator(){

const [topic,setTopic] = useState("")
const [script,setScript] = useState(null)
const [loading,setLoading] = useState(false)

async function generateScript(){

if(!topic){
alert("Enter a topic")
return
}

try{

setLoading(true)

const res = await fetch(`${API}/api/generate-script`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
topic:topic,
platform:"Instagram Reel",
tone:"Motivational",
duration:"60 sec",
language:"Hinglish",
format:"Cinematic"
})
})

const data = await res.json()

if(data.success){

setScript(data.data)

/* save script */

await fetch(`${API}/api/save-script`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
script:data.data
})
})

window.dispatchEvent(new Event("scriptsUpdated"))

}else{

alert("Script generation failed")

}

setLoading(false)

}catch(err){

console.error(err)
setLoading(false)

}

}

return(

<PageWrapper>

<div className="max-w-4xl">

<h1 className="text-3xl font-bold mb-6">
AI Script Generator
</h1>

<input
className="border p-3 w-full mb-4 rounded"
placeholder="Enter topic"
value={topic}
onChange={(e)=>setTopic(e.target.value)}
/>

<button
onClick={generateScript}
disabled={loading}
className="bg-blue-600 text-white px-6 py-3 rounded"
>

{loading ? "Generating..." : "Generate Script"}

</button>

{script && (

<div className="mt-10">

<h2 className="text-xl font-bold mb-4">
Hook
</h2>

<p className="mb-6">
{script?.scripts?.[0]?.hook}
</p>

{script?.scripts?.[0]?.narrative?.map((scene,index)=>(
<div key={index} className="border p-4 mb-4 rounded">

<h3 className="font-bold mb-2">
Segment {scene.segment || index+1}
</h3>

<p><b>Visual:</b> {scene.visual}</p>

<p><b>English:</b> {scene?.voiceover?.english}</p>

<p><b>Hindi:</b> {scene?.voiceover?.hindi}</p>

</div>
))}

</div>

)}

</div>

</PageWrapper>

)

}