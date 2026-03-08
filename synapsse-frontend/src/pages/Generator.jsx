import { useState } from "react"
import { motion } from "framer-motion"
import PageWrapper from "../components/PageWrapper"

const API = "https://dfd5qmxvmi.execute-api.us-east-1.amazonaws.com/default"

export default function Generator(){

const [topic,setTopic] = useState("")
const [script,setScript] = useState(null)
const [loading,setLoading] = useState(false)
const [platform,setPlatform] = useState("Instagram Reel")
const [tone,setTone] = useState("Motivational")
const [duration,setDuration] = useState("60 sec")
const [minutes,setMinutes] = useState("")

async function generateScript(){

if(!topic){
alert("Please enter a topic")
return
}

try{

setLoading(true)

const finalDuration = duration

const res = await fetch(
`${API}/api/generate-script`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
topic,
platform,
tone,
duration:finalDuration,
language:"Hinglish",
format:"Cinematic"
})
}
)

const data = await res.json()

setScript(data)

setLoading(false)

}catch(err){

console.error("Script generation error:",err)
setLoading(false)

}

}

return(

<PageWrapper>

<div className="max-w-4xl">

<h1 className="text-3xl font-bold text-primary mb-8">
AI Script Generator
</h1>

{/* INPUT CARD */}

<div className="bg-surface border border-border p-6 rounded-xl mb-8 shadow-lg hover:shadow-primary/20 transition duration-300 max-w-2xl">

<label className="text-textMuted text-sm mb-1 block">
Topic
</label>

<input
className="bg-black border border-border text-textMain p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
placeholder="Enter topic..."
value={topic}
onChange={(e)=>setTopic(e.target.value)}
/>

<label className="text-textMuted text-sm mb-1 block">
Platform
</label>

<select
value={platform}
onChange={(e)=>setPlatform(e.target.value)}
className="bg-black border border-border text-textMain p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
>
<option>Instagram Reel</option>
<option>YouTube Short</option>
</select>

<label className="text-textMuted text-sm mb-1 block">
Tone
</label>

<select
value={tone}
onChange={(e)=>setTone(e.target.value)}
className="bg-black border border-border text-textMain p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
>
<option>Motivational</option>
<option>Controversial</option>
<option>Educational</option>
<option>Happy</option>
<option>Emotional</option>
<option>Sad</option>
<option>Funny</option>
<option>Sarcastic</option>
</select>

<label className="text-textMuted text-sm mb-1 block">
Duration
</label>

<select
value={duration}
onChange={(e)=>setDuration(e.target.value)}
className="bg-black border border-border text-textMain p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
>
<option>30 sec</option>
<option>40 sec</option>
<option>60 sec</option>
<option>90 sec</option>
</select>

<button
onClick={generateScript}
disabled={loading}
className={`px-6 py-3 rounded-lg text-white flex items-center gap-2 transition duration-200 ${
loading
? "bg-gray-600 cursor-not-allowed"
: "bg-primary hover:bg-primaryHover hover:scale-105 hover:shadow-lg"
}`}
>

{loading && (
<span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
)}

{loading ? "Generating AI Script..." : "Generate Script"}

</button>

</div>

{/* SCRIPT OUTPUT */}

{script && (

<div className="mt-10">

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.4}}
className="bg-surface border border-border p-6 rounded-xl mb-8 shadow-lg hover:shadow-primary/20 transition duration-300"
>

<h2 className="text-xl text-primary font-bold mb-3">
🎬 Hook
</h2>

<p className="text-lg text-textMain leading-relaxed">
{
script?.data?.scripts?.[0]?.hook
||
script?.data?.scripts?.[0]?.narrative?.[0]?.voiceover?.english
||
"No hook generated"
}
</p>

</motion.div>

{script?.data?.scripts?.[0]?.narrative?.map((scene,index)=>(
<motion.div
key={scene.segment}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.15,duration:0.4}}
className="bg-surface border border-border p-6 rounded-xl mb-6 shadow-lg hover:shadow-primary/20 hover:scale-[1.01] transition duration-300"
>

<h3 className="text-lg text-primary font-bold mb-4">
🎥 Segment {scene.segment}
</h3>

<p><b>Visual:</b> {scene.visual}</p>
<p><b>English:</b> {scene?.voiceover?.english}</p>
<p><b>Hindi:</b> {scene?.voiceover?.hindi}</p>

</motion.div>
))}

</div>

)}

</div>

</PageWrapper>

)

}