import './Homepage.css'

const Homepage = () => {
    return (
        <div>
            <section className="main-content">
                <div className="logo-container">
                    <img className="logo-image" src="/assets/Logo.png"></img>
                </div>
                <div className="carousel-slider">
                    <div className=""></div>
                </div>
                <div className="space-break"/>
                <div className="company-title">Vox Sportswear</div>
                <div className="homeinfo-container">
                    <div className="homeinfo-selectors">
                        <div className="homeinfo-select"></div>
                        <div className="homeinfo-select"></div>
                        <div className="homeinfo-select"></div>
                    </div>
                    <div className="homeinfo-text"></div>
                </div>
            </section>
        </div>
    )
}

export default Homepage;