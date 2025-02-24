import { NavLink } from 'react-router-dom';
import './HomepageCompanyDescriptionSection.css';

const HomepageCompanyDescriptionSection = () => {
    return(
        <section className="homepage__company-description-section">
                <ul className="company-description-section__description-list">
                    <li className="description-list__item">Cheaper than Custom</li>
                    <li className="description-list__item">Faster than Online Orders</li>
                    <li className="description-list__item">Student Owned</li>
                </ul>
        </section>
    )
}

export default HomepageCompanyDescriptionSection