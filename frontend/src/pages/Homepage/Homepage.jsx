import Navbar from '../../components/Navbar/Navbar';
import './Homepage.css'

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <section className="main-content">
                <div className="logo-container">
                    <img className="logo-image" src="/assets/Logo.png"></img>
                </div>
                <div className="carousel-slider">
                    <div classNamme=""></div>
                </div>
                <div className="space-break"/>
                <div className="company-title">Vox Sportswear</div>
            </section>
        </div>
    )
}

export default Homepage;