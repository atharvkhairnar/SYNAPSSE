export default function Sidebar({ setPage }) {

return (

<div className="w-64 bg-black text-white h-screen p-6">

<h1 className="text-2xl text-primary mb-8">
Synapsse
</h1>

<button
onClick={() => setPage("generator")}
className="block w-full text-left p-3 hover:bg-gray-800 rounded"
>


  <button
onClick={() => setPage("dashboard")}
className="block w-full text-left p-3 hover:bg-gray-800 rounded"
>
Dashboard
</button>

Script Generator
</button>

<button
onClick={() => setPage("history")}
className="block w-full text-left p-3 hover:bg-gray-800 rounded"
>
Script History
</button>

<button
onClick={() => setPage("ideas")}
className="block w-full text-left p-3 hover:bg-gray-800 rounded"
>
Idea Generator
</button>

</div>

)

}