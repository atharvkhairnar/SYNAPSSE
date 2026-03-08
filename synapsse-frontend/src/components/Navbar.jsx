import logo from "../assets/logo.png"

export default function Navbar(){

return(

<div className="w-full bg-black border-b border-border px-8 py-4 flex justify-between items-center">

{/* LEFT SIDE */}

<div className="flex items-center gap-3">

<img
src={logo}
alt="Synapsse Logo"
className="w-8 h-8 hover:scale-105 transition duration-200"
/>

<div className="flex flex-col leading-tight">

<h1 className="text-lg font-bold text-primary tracking-wide">
Synapsse
</h1>

<p className="text-xs text-textMuted">
AI Creator Studio
</p>

</div>

</div>

{/* RIGHT SIDE */}

<p className="text-sm text-textMuted font-medium tracking-wide hidden md:block">
AI Powered Content Engine
</p>

</div>

)

}