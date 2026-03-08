import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Generator from "./pages/Generator"
import ScriptHistory from "./pages/ScriptHistory"
import Ideas from "./pages/Ideas"
import Calendar from "./pages/Calendar"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import logo from "./assets/logo.png"

export default function App(){

return(

<Router>

<div className="flex min-h-screen bg-background text-textMain">

{/* SIDEBAR */}

<div className="w-64 bg-black border-r border-border p-6 flex flex-col">

{/* LOGO */}

<div className="mb-12 flex items-center gap-3">

<img
src={logo}
alt="Synapsse Logo"
className="w-10 h-10"
/>

<div>

<h1 className="text-xl font-bold text-primary tracking-wide">
Synapsse
</h1>

<p className="text-xs text-textMuted">
AI Creator Studio
</p>

</div>

</div>

{/* NAVIGATION */}

<nav className="flex flex-col gap-2">

<Link
to="/"
className="text-textMuted px-4 py-2 rounded-lg hover:bg-surface hover:text-white transition duration-200"
>
Dashboard
</Link>

<Link
to="/generator"
className="text-textMuted px-4 py-2 rounded-lg hover:bg-surface hover:text-white transition duration-200"
>
Script Generator
</Link>

<Link
to="/history"
className="text-textMuted px-4 py-2 rounded-lg hover:bg-surface hover:text-white transition duration-200"
>
Script History
</Link>

<Link
to="/ideas"
className="text-textMuted px-4 py-2 rounded-lg hover:bg-surface hover:text-white transition duration-200"
>
Idea Generator
</Link>

<Link
to="/calendar"
className="text-textMuted px-4 py-2 rounded-lg hover:bg-surface hover:text-white transition duration-200"
>
Content Calendar
</Link>

</nav>

</div>


{/* MAIN CONTENT */}

<div className="flex-1 flex flex-col">

<Navbar/>

<div className="p-10 flex-1">

<Routes>

<Route path="/" element={<Dashboard/>} />

<Route path="/generator" element={<Generator/>} />

<Route path="/history" element={<ScriptHistory/>} />

<Route path="/ideas" element={<Ideas/>} />

<Route path="/calendar" element={<Calendar/>} />

</Routes>

</div>

<Footer/>

</div>

</div>

</Router>

)

}