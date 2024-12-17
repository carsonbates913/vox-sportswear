import './Homepage.css'

const Homepage = () => {
    return (
        <div>
            <div className="homepage-main-content">
                <section className="welcome-section">
                    <div className="logo-container">
                        <div className="vox-logo">Vox</div>
                        <div className="sportswear-logo">sportswear</div>
                    </div>
                    <button className="button-shop-now">Shop Now</button>
                </section>
                <section className="company-description-section">
                    <ul className="company-description-container">
                        <li>Cheaper than Custom</li>
                        <li>Faster than Online Orders</li>
                        <li>Student Owned</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Homepage;