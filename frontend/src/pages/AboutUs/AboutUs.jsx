import { useRef } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx'
import './AboutUs.css'

const AboutUs = () => {
    const gridRef = useRef(null);

    return (
            <main className="about-us">
                <p className="about-us__title">Meet the <span className="about-us__title--bold">Team</span></p>
                <div className="about-us__grid-members" ref={gridRef}>
                    <ProfileCard name={"Sam Haskel '26"} description={"Studies Economics and Quantitative Social Science"} profileURL={'/assets/Sam_Profile.jpeg'}/>
                    <ProfileCard name={"Sofia Ortiz '26"} description={"Studies Film/Media and Human Centered Design"} profileURL={'/assets/Sofia_Profile.jpeg'}/>
                    <ProfileCard name={"Rod Oskouian '26"} description={"Studies Economics and Philosophy"} profileURL={'/assets/Rod_Profile.jpeg'}/>
                    <ProfileCard name={"Kristi Conner '26"} description={"Studies Economics and Human Centered Design"} profileURL={'/assets/Kristi_Profile.jpeg'}/>
                    <ProfileCard name={"Sydney Rawie '26"} description={"Studies Economics and English"} profileURL={'/assets/Sydney_Profile.jpeg'}/>
                    <ProfileCard name={"Jake Zrihen '26"} description={"Studies in Economics and Philosophy"} profileURL={'/assets/Jake_Profile.jpeg'}/>
                    <ProfileCard name={"Daniel Chang '26"} description={"Studies Economics and Mathematics"} profileURL={'/assets/Daniel_Profile.jpeg'}/>
                    <ProfileCard name={"Tavisha '26"} description={"Studies Economics and Human Centered Design"} profileURL={'/assets/LinkedInImage.png'}/>
                    <ProfileCard name={"Ben Offit '26"} description={"Studies Classics"} profileURL={'/assets/LinkedInImage.png'}/>
                </div>
            </main>
    )
}

export default AboutUs;
