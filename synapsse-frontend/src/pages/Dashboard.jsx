import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PageWrapper from "../components/PageWrapper"

const API = "https://dfd5qmxvmi.execute-api.us-east-1.amazonaws.com/default"

export default function Dashboard(){

const [scripts,setScripts] = useState(0)
const [calendar,setCalendar] = useState(0)
const [ideas,setIdeas] = useState(0)
const [recentScripts,setRecentScripts] = useState([])

useEffect(()=>{

/* UPDATE IDEAS */

function updateIdeas(){
setIdeas(Number(localStorage.getItem("ideaCount")) || 0)
}

updateIdeas()

/* FETCH SCRIPTS */

async function fetchScripts(){

try{

const res = await fetch(`${API}/api/scripts`)
const data = await res.json()

if(data && data.success){

const scriptsData = Array.isArray(data.data) ? data.data : []

setScripts(scriptsData.length)

const latest = scriptsData.slice(-5).reverse()

setRecentScripts(latest)

}

}catch(err){

console.error("Script fetch error:",err)

}

}

/* FETCH CALENDAR */

async function fetchCalendar(){

try{

const res = await fetch(`${API}/api/calendar`)
const data = await res.json()

if(data && data.success){

const calendarData = Array.isArray(data.data) ? data.data : []

setCalendar(calendarData.length)

}

}catch(err){

console.error("Calendar fetch error:",err)

}

}

fetchScripts()
fetchCalendar()

window.addEventListener("ideasUpdated", updateIdeas)
window.addEventListener("calendarUpdated", fetchCalendar)

return ()=>{
window.removeEventListener("ideasUpdated", updateIdeas)
window.removeEventListener("calendarUpdated", fetchCalendar)
}

},[])

return(

<PageWrapper>

<div className="max-w-6xl">

<h1 className="text-3xl font-bold text-primary mb-8">
Synapsse Dashboard
</h1>

{/* STATS */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-surface border border-border p-6 rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.03] transition duration-300">

<h2 className="text-lg text-textMuted flex items-center gap-2">
📜 Total Scripts
</h2>

<p className="text-3xl font-bold text-textMain mt-2">
{scripts}
</p>

</div>

<div className="bg-surface border border-border p-6 rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.03] transition duration-300">

<h2 className="text-lg text-textMuted flex items-center gap-2">
💡 Total Ideas
</h2>

<p className="text-3xl font-bold text-textMain mt-2">
{ideas}
</p>

</div>

<div className="bg-surface border border-border p-6 rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.03] transition duration-300">

<h2 className="text-lg text-textMuted flex items-center gap-2">
📅 Calendar Entries
</h2>

<p className="text-3xl font-bold text-textMain mt-2">
{calendar}
</p>

</div>

</div>

{/* RECENT SCRIPTS */}

<div className="mt-12">

<h2 className="text-xl font-bold text-primary mb-4">
Recent Scripts
</h2>

<div className="bg-surface border border-border rounded-xl p-4 shadow-lg">

{recentScripts.length === 0 ? (

<p className="text-textMuted">
No scripts generated yet.
</p>

) : (

recentScripts.map((script)=>(
<div
key={script?.id || Math.random()}
className="border-b border-border py-3 text-textMuted hover:text-white hover:translate-x-1 transition duration-200"
>

{script?.topic || "Untitled Script"}

</div>
))

)}

</div>

</div>

{/* QUICK ACTIONS */}

<div className="mt-10">

<h2 className="text-xl font-bold text-primary mb-4">
Quick Actions
</h2>

<div className="flex gap-4 flex-wrap">

<Link
to="/generator"
className="bg-primary hover:bg-primaryHover px-6 py-3 rounded-lg text-white hover:scale-105 hover:shadow-lg transition duration-200"
>
Generate Script
</Link>

<Link
to="/ideas"
className="bg-primary hover:bg-primaryHover px-6 py-3 rounded-lg text-white hover:scale-105 hover:shadow-lg transition duration-200"
>
Generate Ideas
</Link>

<Link
to="/calendar"
className="bg-primary hover:bg-primaryHover px-6 py-3 rounded-lg text-white hover:scale-105 hover:shadow-lg transition duration-200"
>
Open Calendar
</Link>

</div>

</div>

</div>

</PageWrapper>

)

}