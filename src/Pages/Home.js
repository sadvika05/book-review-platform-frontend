import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/LandingPage/Hero/Hero";
import FeatureBooks from "../Components/LandingPage/FeatureBooks/FeatureBooks";
import Testimonials from "../Components/LandingPage/Testimonials/Testinomials";
import Footer from "./../Components/Footer/Footer"
import Contribute from "../Components/LandingPage/Contribute/Contribute";

export default function Home(){
    return (
        <>
            <Navbar currentPage={"Home"}/>
            <Hero />
            <FeatureBooks />
            <Testimonials />
            <Contribute />
            <Footer />
        </>
    )
}