import { motion } from "motion/react";

import './AboutUs.css';
import Footer from '../../components/Footer/Footer.jsx';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import samProfile from '../../assets/Sam_Profile.jpeg';
import sofiaProfile from '../../assets/Sofia_Profile.jpeg';
import rodProfile from '../../assets/Rod_Profile.jpeg';
import jakeProfile from '../../assets/Jake_Profile.jpeg';
import sydneyProfile from '../../assets/Sydney_Profile.jpeg';
import benProfile from '../../assets/Ben_Profile.jpeg';
import kristiProfile from '../../assets/Kristi_Profile.jpeg';
import danielProfile from '../../assets/Daniel_Profile.jpeg';
import tavishaProfile from '../../assets/LinkedInImage.png';

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
                            <ProfileCard name={"Sam Haskel"} year={"2026"} description={"Studies Economics and Quantitative Social Science"} profileURL={samProfile} hyperlink={"https://www.linkedin.com/in/sam-haskel-abba65255/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Sofia Ortiz"} year={"2026"} description={"Studies Film/Media and Human Centered Design"} profileURL={sofiaProfile} hyperlink={"https://www.linkedin.com/in/sofia-ortiz-8a7b86207/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Rod Oskouian"} year={"2026"} description={"Studies Economics and Philosophy"} profileURL={rodProfile} hyperlink={"https://www.linkedin.com/in/rod-oskouian/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Jake Zrihen"} year={"2026"} description={"Studies in Economics and Philosophy"} profileURL={jakeProfile} hyperlink={"https://www.linkedin.com/in/jakexzrihen/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Sydney Rawie"} year={"2026"} description={"Studies Economics and English"} profileURL={sydneyProfile} hyperlink={"https://www.linkedin.com/in/sydney-rawie/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Ben Offit"} year={"2026"} description={"Studies Classics"} profileURL={benProfile} hyperlink={""}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Kristi Conner"} year={"2026"} description={"Studies Economics and Human Centered Design"} profileURL={kristiProfile} hyperlink={"https://www.linkedin.com/in/kristi-elizabeth-conner/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Daniel Chang"} year={"2026"} description={"Studies Economics and Mathematics"} profileURL={danielProfile} hyperlink={"https://www.linkedin.com/in/danielchang924/"}/>
                        </motion.div>
                        <motion.div variants={cardVariants}>
                            <ProfileCard name={"Tavisha Khanna"} year={"2026"} description={"Studies Economics and Human Centered Design"} profileURL={tavishaProfile} hyperlink={"https://www.linkedin.com/in/tavisha-khanna/"}/>
                        </motion.div>
                    </motion.div>
                </div>
                <Footer />
            </main>
    )
}

export default AboutUs;
