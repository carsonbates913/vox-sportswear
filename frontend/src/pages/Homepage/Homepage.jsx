import { NavLink } from 'react-router-dom';
import './Homepage.css'

const Homepage = () => {
    return (
        <main className="homepage">
            <section className="homepage__welcome-section">
                <div className="welcome-section__logo-container">
                    <div className="logo-container__vox-element">Vox</div>
                    <div className="logo-container__sportswear-element">sportswear</div>
                </div>
                <NavLink className="welcome-section__shop-button" to="/products">Shop Now</NavLink>
            </section>
            <section className="homepage__company-description-section">
                <ul className="company-description-section__description-list">
                    <li className="description-list__item">Cheaper than Custom</li>
                    <li className="description-list__item">Faster than Online Orders</li>
                    <li className="description-list__item">Student Owned</li>
                </ul>
            </section>
        </main>
    )
}

export default Homepage;