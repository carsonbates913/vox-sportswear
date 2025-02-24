import { NavLink } from 'react-router-dom';
import './HomepageWelcomeSection.css';

const HomepageWelcomeSection = () => {
    return(
        <section className="homepage__welcome-section">
                <div className="welcome-section__logo-container">
                    <div className="logo-container__vox-element">Vox</div>
                    <div className="logo-container__sportswear-element">sportswear</div>
                </div>
                <NavLink className="welcome-section__shop-button" to="/products">Shop Now</NavLink>
        </section>
    )
}

export default HomepageWelcomeSection