import { About } from "@/components/About";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { JoinUs } from "@/components/Newsletter";
export const LandingPage=()=>{
    return(
        <div>
            <Navbar/>
            <Hero/>
            <About/>
            <HowItWorks/>
            <Features/>
            <Services/>
            <Team/>
            <JoinUs/>
        </div>
        
        
    )
}