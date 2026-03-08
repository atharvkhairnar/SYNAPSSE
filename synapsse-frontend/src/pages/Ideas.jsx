import { useState } from "react"
import PageWrapper from "../components/PageWrapper"

export default function Ideas(){

const [niche,setNiche] = useState("")
const [ideas,setIdeas] = useState([])

async function generateIdeas(){

try{

const res = await fetch("https://dfd5qmxvmi.execute-api.us-east-1.amazonaws.com/default/api/generate-ideas",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
niche:niche,
platform:"Instagram Reels"
})
})

const data = await res.json()

console.log("IDEAS RESPONSE:",data)

if(data && data.success && data.data && data.data.ideas){

setIdeas(data.data.ideas)

localStorage.setItem("ideaCount", data.data.ideas.length)

window.dispatchEvent(new Event("ideasUpdated"))

}else{

alert("Idea generation failed")

}

}catch(err){

console.error("Idea generation error:",err)

}

}

async function addToCalendar(idea){

try{

const res = await fetch("https://dfd5qmxvmi.execute-api.us-east-1.amazonaws.com/default/api/calendar/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
day:"Auto",
idea:idea
})
})

const data = await res.json()

console.log("CALENDAR RESPONSE:",data)

if(data && data.success){

window.dispatchEvent(new Event("calendarUpdated"))

alert("Idea added to calendar!")

}else{

alert("Failed to add idea to calendar")

}

}catch(err){

console.error("Calendar error:",err)

}

}

return(

<PageWrapper>

<div className="max-w-4xl">

<h1 className="text-3xl font-bold text-primary mb-6">
AI Idea Generator
</h1>

<input
className="bg-black border border-border text-textMain p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
placeholder="Enter niche..."
value={niche}
onChange={(e)=>setNiche(e.target.value)}
/>

<button
onClick={generateIdeas}
className="bg-primary hover:bg-primaryHover px-6 py-3 rounded-lg text-white hover:scale-105 hover:shadow-lg transition duration-200"
>
Generate Ideas
</button>

<div className="mt-8">

{ideas.length === 0 ? (

<div className="bg-surface border border-border p-6 rounded-xl text-center text-textMuted shadow-lg">

<p className="text-lg mb-2">
No ideas generated yet.
</p>

<p>
Click Generate Ideas to get AI content suggestions.
</p>

</div>

) : (

ideas.map((idea,index)=>(
<div
key={index}
className="bg-surface border border-border p-4 rounded-xl mb-4 flex justify-between items-center shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition duration-300"
>

<p className="text-textMain">

<span className="text-primary font-bold mr-3 text-lg">
{index + 1}.
</span>

{idea}

</p>

<button
onClick={()=>addToCalendar(idea)}
className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm text-white hover:scale-105 transition duration-200"
>
Add to Calendar
</button>

</div>
))

)}

</div>

</div>

</PageWrapper>

)

}