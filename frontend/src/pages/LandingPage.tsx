import { About } from "@/components/About";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { JoinUs } from "@/components/Newsletter";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
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
            <FAQ/>
            <Footer/>
            <ScrollToTop/>
        </div>
        
        
    )
}