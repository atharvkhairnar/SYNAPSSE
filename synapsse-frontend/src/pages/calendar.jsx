import { useState, useEffect } from "react"
import PageWrapper from "../components/PageWrapper"

export default function Calendar(){

const [day,setDay] = useState("")
const [idea,setIdea] = useState("")
const [calendar,setCalendar] = useState([])

/* LOAD EXISTING CALENDAR ENTRIES */

useEffect(()=>{

fetch("http://localhost:3000/api/calendar")
.then(res=>res.json())
.then(data=>{

if(data && Array.isArray(data.data)){
setCalendar(data.data)
}

})
.catch(err=>{
console.error("Calendar fetch error:",err)
})

},[])


/* ADD IDEA */

async function addIdea(){

try{

const res = await fetch("http://localhost:3000/api/calendar/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
day:day,
idea:idea
})
})

const data = await res.json()

if(data && Array.isArray(data.data)){
setCalendar(data.data)
}
else if(data && data.data && Array.isArray(data.data.calendar)){
setCalendar(data.data.calendar)
}

setDay("")
setIdea("")

window.dispatchEvent(new Event("calendarUpdated"))

}catch(err){

console.error("Calendar error:",err)

}

}

return(

<PageWrapper>

<div className="max-w-4xl">

<h1 className="text-3xl font-bold text-primary mb-6">
Content Calendar
</h1>


{/* INPUT CARD */}

<div className="bg-surface border border-border p-6 rounded-xl shadow-lg mb-8 hover:shadow-primary/20 transition duration-300">

<input
className="bg-black border border-border text-textMain p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
placeholder="Enter Day (1-30)"
value={day}
onChange={(e)=>setDay(e.target.value)}
/>

<input
className="bg-black border border-border text-textMain p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
placeholder="Enter Content Idea"
value={idea}
onChange={(e)=>setIdea(e.target.value)}
/>

<button
onClick={addIdea}
className="bg-primary hover:bg-primaryHover px-6 py-3 rounded-lg text-white hover:scale-105 hover:shadow-lg transition duration-200"
>
Add Idea
</button>

</div>


{/* CALENDAR LIST */}

<div className="mt-8">

{calendar.length === 0 ? (

<div className="bg-surface border border-border p-6 rounded-xl text-center text-textMuted shadow-lg">

<p className="text-lg mb-2">
No calendar entries yet
</p>

<p>
Add your first content idea to start planning
</p>

</div>

) : (

calendar.map((item)=>(
<div
key={item.id}
className="bg-surface border border-border p-5 rounded-xl mb-4 shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition duration-300"
>

<div className="flex items-center gap-2">

<span className="text-lg">📅</span>

<b className="text-primary">
Day {item.day}
</b>

</div>

<p className="text-textMain mt-2">
{item.idea}
</p>

</div>
))

)}

</div>

</div>

</PageWrapper>

)

}