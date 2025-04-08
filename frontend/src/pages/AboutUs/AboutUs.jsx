import { motion } from "motion/react";

import './AboutUs.css';
import Footer from '../../components/Footer/Footer.jsx';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';

const AboutUs = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: .0,
          },
        },
      };
    
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2} },
      };

    return (
            <main className="about-us">
                <div className="about-us-wrapper">
                    <p className="about-us__title">Meet the <span className="about-us__title--bold">Team</span></p>
                    <motion.div className="about-us__grid-members" variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Sam Haskel"} year={"2026"} description={"Studies Economics and Quantitative Social Science"} profileURL={'/assets/Sam_Profile.jpeg'} hyperlink={"https://www.linkedin.com/in/sam-haskel-abba65255/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Sofia Ortiz"} year={"2026"} description={"Studies Film/Media and Human Centered Design"} profileURL={'/assets/Sofia_Profile.jpeg'} hyperlink={"https://www.linkedin.com/in/sofia-ortiz-8a7b86207/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Rod Oskouian"} year={"2026"} description={"Studies Economics and Philosophy"} profileURL={'/assets/Rod_Profile.jpeg'} hyperlink={"https://www.linkedin.com/in/rod-oskouian/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Jake Zrihen"} year={"2026"} description={"Studies in Economics and Philosophy"} profileURL={'/assets/Jake_Profile.jpeg'} hyperlink={"https://www.linkedin.com/in/jakexzrihen/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Sydney Rawie"} year={"2026"} description={"Studies Economics and English"} profileURL={'/assets/Sydney_Profile.jpeg'} hyperlink={"https://www.linkedin.com/in/sydney-rawie/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Ben Offit"} year={"2026"} description={"Studies Classics"} profileURL={'/assets/Ben_Profile.jpeg'} hyperlink={""}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Kristi Conner"} year={"2026"} description={"Studies Economics and Human Centered Design"} profileURL={'/assets/Kristi_Profile.jpeg'} hyperlink={"https://www.linkedin.com/in/kristi-elizabeth-conner/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Daniel Chang"} year={"2026"} description={"Studies Economics and Mathematics"} profileURL={'/assets/Daniel_Profile.jpeg'} hyperlink={"https://www.linkedin.com/in/danielchang924/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Tavisha Khanna"} year={"2026"} description={"Studies Economics and Human Centered Design"} profileURL={'/assets/LinkedInImage.png'} hyperlink={"https://www.linkedin.com/in/tavisha-khanna/"}/>
                        </motion.div>
                    </motion.div>
                </div>
                <Footer />
            </main>
    )
}

export default AboutUs;
