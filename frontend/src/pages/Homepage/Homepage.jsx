import './Homepage.css'
import HomepageWelcomeSection from '../../components/HomepageWelcomeSection/HomepageWelcomeSection.jsx'
import HomepageCompanyDescriptionSection from '../../components/HomepageCompanyDescriptionSection/HomepageCompanyDescriptionSection.jsx';


const Homepage = () => {
    return (
        <main className="homepage">
            <HomepageWelcomeSection />
            <HomepageCompanyDescriptionSection />
        </main>
    )
}

export default Homepage;