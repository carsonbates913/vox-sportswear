import { useRef } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx'
import './AboutUs.css'

const AboutUs = () => {
    const gridRef = useRef(null);

    const handleScrollDown = () => {
        if(gridRef.current){
            gridRef.current.scrollBy({
                top: 570,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div>
            <div>
            <section className="aboutus-main-content">
                <p className="section-title">Meet the <span className="bold">Team</span></p>
                <div className="grid-members" ref={gridRef}>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Sofia_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Rod_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Kristi_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Sam_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Sydney_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Jake_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Sofia_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Rod_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Kristi_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Sam_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Sydney_Profile.jpeg'}/>
                    <ProfileCard name={"Henry"} description={"i work here"} profileURL={'/assets/Jake_Profile.jpeg'}/>
                </div>
                <button className="button-scroll-profile" onClick={handleScrollDown}>
                    <svg width="68" height="28" viewBox="0 0 79 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M76.4728 13.9926C79.4941 10.9713 79.4941 6.07272 76.4728 3.05137C73.4514 0.0300255 68.5528 0.0300293 65.5315 3.05138L39.5478 29.0351L13.4686 2.95596C10.4473 -0.0653954 5.54871 -0.0653954 2.52737 2.95596C-0.493988 5.9773 -0.493988 10.8759 2.52736 13.8972L33.5803 44.9501C35.0004 46.3703 36.8354 47.1229 38.6951 47.208C41.0695 47.5965 43.5903 46.8751 45.4214 45.044L76.4728 13.9926Z" fill="black"/>
                    </svg>

                </button>

            </section>
            </div>
        </div>
    )
}

export default AboutUs;
