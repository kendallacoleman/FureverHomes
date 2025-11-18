import { useNavigate } from "react-router-dom";
import AdoptionCharts from "../components/AdoptionCharts";
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <div className="home-page">
            {/* Hero Section with Video Background */}
            <section className="hero-section">
                <div className="video-background">
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src="/videos/FureverHomes-Homepage-Video.mp4" type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>
                
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Furever Homes</h1>
                    <p className="hero-subtitle">
                        Find your new best friend today. Connect with adoptable animals and give them the loving home they deserve.
                    </p>
                    <button className="hero-cta-button" onClick={handleSearchClick}>
                        Browse Adoptable Pets
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    {/* <h2 className="section-title">The Numbers Behind the Mission 🐾</h2>
                    
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">6.5M</div>
                            <div className="stat-label">Animals enter shelters yearly</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">4.2M</div>
                            <div className="stat-label">Get adopted</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">2.3M</div>
                            <div className="stat-label">Left in shelters</div>
                        </div> */}
                    {/* </div> */}
                </div>
            </section>

            

            {/* About Section */}
            <section className="about-section">
                <div className="about-container">
                    <h2 className="about-title">About Us and Our Vision 🐾</h2>

                    <div className="about-content">
                        <div className="about-card highlight">
                            <h3>Our Mission</h3>
                            <p>
                                At FureverHomes, our mission is to help reduce the number of pets in shelters by 
                                making it easier than ever to find and adopt pets. As pet owners ourselves, we 
                                understand the joy and companionship that pets bring to our lives, and we want to 
                                help more animals find their forever homes.
                            </p>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <AdoptionCharts />

                    <div className="help-callout">
                        <p>
                            Have any questions? Click the help button at the top of the page to learn more 
                            and check out our Frequently Asked Questions!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;