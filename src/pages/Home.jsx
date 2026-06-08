import { StyleInject } from "../components/StyleInject";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { About } from "../components/About";
import WhyUs from "../components/Whyus";
import { Destinations } from "../components/Destinations";
import { TravelerStories } from "../components/TravellerStories";
import { Pricing } from "../components/Pricing";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import HomeNavbar from "../components/HomeNavbar";

export default function Home() {
    return (
        <div>
            <StyleInject />

            <HomeNavbar />

            <main className="overflow-x-hidden">
                <Hero />
                <Stats />
                <About />
                <WhyUs />
                <Destinations />
                <TravelerStories />
                <Pricing />
                <CTA />
            </main>

            <Footer />
        </div>
    );
}