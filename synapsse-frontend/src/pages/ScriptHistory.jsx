import { useEffect, useState } from "react"
import PageWrapper from "../components/PageWrapper"

export default function ScriptHistory(){

const [scripts,setScripts] = useState([])
const [selectedScript,setSelectedScript] = useState(null)

/* FETCH SCRIPT HISTORY */

useEffect(()=>{

fetch("https://dfd5qmxvmi.execute-api.us-east-1.amazonaws.com/default/api/scripts")
.then(res=>res.json())
.then(data=>{
if(data && data.success){
setScripts(data.data || [])
}
})

},[])


/* DOWNLOAD TXT */

const downloadTXT = async(script)=>{

const res = await fetch("https://dfd5qmxvmi.execute-api.us-east-1.amazonaws.com/default/api/export-script/txt",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(script)
})

const blob = await res.blob()
const url = window.URL.createObjectURL(blob)

const a = document.createElement("a")
a.href = url
a.download = "script.txt"
a.click()

}


/* DOWNLOAD PDF */

const downloadPDF = async(script)=>{

const res = await fetch("https://dfd5qmxvmi.execute-api.us-east-1.amazonaws.com/default/api/export-script/pdf",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(script)
})

const blob = await res.blob()
const url = window.URL.createObjectURL(blob)

const a = document.createElement("a")
a.href = url
a.download = "script.pdf"
a.click()

}


/* UI */

return(

<PageWrapper>

<div className="max-w-5xl">

<h1 className="text-3xl font-bold text-primary mb-6">
Script History ({scripts.length})
</h1>


{/* EMPTY STATE */}

{scripts.length === 0 ? (

<div className="bg-gray-800 border border-gray-700 p-6 rounded-xl text-center text-gray-400 shadow-lg">

<p className="text-lg mb-2">
No scripts generated yet.
</p>

<p>
Generate your first AI script to see it here.
</p>

</div>

) : (

scripts.map((item)=>{

const scriptData =
item?.script?.data?.scripts?.[0] ||
item?.script?.scripts?.[0]

return(

<div
key={item.id}
className="bg-gray-800 border border-gray-700 p-5 rounded-xl mb-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300"
>

<p className="text-gray-400 text-sm">
{item.createdAt ? new Date(item.createdAt).toLocaleString() : "Recently Generated"}
</p>

<h2 className="text-lg font-semibold mt-1 text-gray-200">
{item.topic}
</h2>

<button
className="mt-3 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white hover:scale-105 transition duration-200"
onClick={()=>setSelectedScript(scriptData)}
>
View Script
</button>

</div>

)

})

)}


{/* SCRIPT VIEWER */}

{selectedScript && (

<div className="mt-12 bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-xl">

<h2 className="text-2xl font-bold text-red-400 mb-6">
Script Viewer
</h2>


{/* EXPORT BUTTONS */}

<div className="flex gap-4 mb-6 flex-wrap">

<button
onClick={()=>downloadTXT({scripts:[selectedScript]})}
className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg text-white hover:scale-105 transition duration-200"
>
Download TXT
</button>

<button
onClick={()=>downloadPDF({scripts:[selectedScript]})}
className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg text-white hover:scale-105 transition duration-200"
>
Download PDF
</button>

<button
onClick={()=>setSelectedScript(null)}
className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg text-white hover:scale-105 transition duration-200"
>
Close
</button>

</div>


{/* HOOK */}

<div className="bg-gray-800 border border-gray-700 p-5 rounded-xl mb-8 shadow-lg">

<h3 className="text-xl text-red-400 font-bold mb-3">
Hook
</h3>

<p className="text-gray-200 leading-relaxed">
{selectedScript?.hook}
</p>

</div>


{/* SEGMENTS */}

{selectedScript?.narrative?.map((scene)=>(
<div
key={scene.segment}
className="bg-gray-800 border border-gray-700 p-5 rounded-xl mb-6 shadow-lg hover:shadow-2xl transition duration-300"
>

<h3 className="text-lg text-red-300 font-bold mb-3">
Segment {scene.segment}
</h3>

<p><b>Visual:</b> {scene.visual}</p>

<p><b>Voiceover (English):</b> {scene.voiceover?.english}</p>
<p><b>Voiceover (Hindi):</b> {scene.voiceover?.hindi}</p>

<p><b>Ambience:</b> {scene.audio?.ambience}</p>
<p><b>Transition:</b> {scene.audio?.transitions}</p>

<p><b>Shot Type:</b> {scene.camera_setup?.shot_type}</p>
<p><b>Angle:</b> {scene.camera_setup?.angle}</p>
<p><b>Movement:</b> {scene.camera_setup?.movement}</p>
<p><b>Lighting:</b> {scene.camera_setup?.lighting}</p>

<p><b>ISO:</b> {scene.settings?.iso_range}</p>
<p><b>Aperture:</b> {scene.settings?.aperture}</p>

</div>
))}

</div>

)}

</div>

</PageWrapper>

)

}