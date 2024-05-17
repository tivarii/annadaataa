import { About } from "@/components/About";
import { Navbar } from "@/components/Navbar";
import { Import } from "lucide-react";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
export const LandingPage=()=>{
    return(
        <div>
            <Navbar/>
            <Hero/>
            <About/>
            <HowItWorks/>
            
        </div>
        
        
    )
}