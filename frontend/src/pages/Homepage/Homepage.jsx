import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import './Homepage.css'
import HeroTitle from '../../components/HeroTitle/HeroTitle.jsx';
import Carousel from '../../components/Carousel/Carousel.jsx';
import Hoodie from '../../assets/Vox-Hoodie2.svg';
import Bag from '../../assets/Vox-Bag.svg';
import SoftButton from '../../components/SoftButton/SoftButton.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator.jsx';
import businessDescription from '../../assets/business-description.svg';
import InstructionCard from '../../components/InstructionCard/InstructionCard.jsx';
import searchIcon from '../../assets/search-icon.svg'
import designIcon from '../../assets/design-icon.svg'
import wandIcon from '../../assets/wand-icon.svg'
import mailIcon from '../../assets/mail-icon.svg'
import rightArrow2 from '../../assets/right-arrow-2.svg'
import { useAuth } from '../../context/AuthContext.jsx';


const Homepage = () => {

    const { signIn } = useAuth();

    const [animationDone, setAnimationDone] = useState(false);

    const navigate = useNavigate();

    const images = [Bag, Hoodie];

    const hijackRef = useRef(null);

    // Track scroll progress within this section
    const { scrollYProgress } = useScroll({
      target: hijackRef,
      offset: ["start 300px", "end end"], // Triggers when the section enters
    });

    const circleSize = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const fade1 = useTransform(scrollYProgress, [.25, .28], [0, 1]);
    const move1 = useTransform(scrollYProgress, [.25, .28], [20, 0]);

    const fade2 = useTransform(scrollYProgress, [.35, .39], [0, 1]);
    const move2 = useTransform(scrollYProgress, [.35, .39], [20, 0]);

    const fade3 = useTransform(scrollYProgress, [.51, .55], [0, 1]);
    const move3 = useTransform(scrollYProgress, [.51, .55], [20, 0]);

    const fade4 = useTransform(scrollYProgress, [.67, .71], [0, 1]);
    const move4 = useTransform(scrollYProgress, [.67, .71], [20, 0]);

    const fade5 = useTransform(scrollYProgress, [.83, .87], [0, 1]);
    const move5 = useTransform(scrollYProgress, [.83, .87], [20, 0]);

    const width = useTransform(scrollYProgress, [.95, 1], ["100vw", "95vw"]);
    const roundedBorder = useTransform(scrollYProgress, [.95, 1], ["0px", "50px"]);
    const backgroundColor = useTransform(scrollYProgress, [.8, .9], ["var(--green3)", "#ffffff"]);

    return (
        <main className="homepage">
            <div className="homepage-wrapper">
                <section className="homepage__hero-section">
                    <h1> Custom Merchandise Made Simple</h1>
                    <motion.h2
                        initial={{ opacity: 0, scale: .6}}
                        animate={{ opacity: 1, scale: 1}}
                        transition={{duration: 0.6, delay: .6, type: "spring"}}
                    >
                        For the Dartmouth Community and Beyond
                    </motion.h2>
                    <motion.div className="homepage__btns-container"
                        initial={{ opacity: 0, scale: .6}}
                        animate={{ opacity: 1, scale: 1}}
                        transition={{duration: 0.6, delay: .6, type: "spring"}}
                    >
                            <SoftButton 
                                padding="0px" 
                                height="65px" 
                                width="200px" 
                                text="SIGN IN" 
                                fontSize="20px" 
                                color="white" 
                                backgroundColor="black" 
                                border="1px solid black" 
                                fontWeight="700"
                                onClick={async() => { signIn()}}
                            />
                            <button className="homepage__shop-now-btn" onClick={() => navigate('./products')}>
                                <p>SHOP NOW</p>
                                <img src={rightArrow2}></img>
                            </button>
                    </motion.div>
                </section>
                <motion.div 
                    className="homepage__carousel-section"
                >
                    <div className="homepage__carousel-content">
                        <motion.div 
                            className="homepage__carousel-section__title"
                        >
                            <img src={businessDescription}></img>
                        </motion.div>
                        <motion.div 
                            className="homepage__carousel-section__carousel-container"
                        >
                            <motion.div 
                                className="bleep"
                                initial={{opacity: 0, scale: .6}}
                                whileInView={{opacity: 1, scale: 1}}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{duration: 0.6, type: "spring"}}
                                onAnimationComplete={() => setAnimationDone(true)}
                            >
                                <Carousel isRunning={animationDone} images={images}/>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.section 
                    ref={hijackRef}
                    className="homepage__process-section"
                    style={{backgroundColor: backgroundColor}}
                >
                    <motion.div className="sticky-container" style={{borderRadius: roundedBorder, width: width}}>
                        <motion.div 
                            className="circle-expand" 
                            style={{scale: circleSize, y: "-50%", x: "-50%"}} 
                        />
                        <motion.h1 style={{opacity: fade1, y: move1}}>
                            Send A Request
                        </motion.h1>
                        <div className="instruction-card-container">
                            <InstructionCard 
                                icon={searchIcon} 
                                number="01" 
                                description="Pick any item from our product list" 
                                opacity={fade2} 
                                y={move2}
                            />
                            <InstructionCard 
                                icon={designIcon} 
                                number="02" 
                                description="Choose your color, size, and quantity." 
                                opacity={fade3} 
                                y={move3}/>
                            <InstructionCard 
                                icon={wandIcon} 
                                number="03" 
                                description="Add any extra notes or special instructions to the request notes section" 
                                opacity={fade4} 
                                y={move4}/>
                            <InstructionCard 
                                icon={mailIcon} 
                                number="04" 
                                description="Submit your request — we'll get back to you soon!" 
                                opacity={fade5} 
                                y={move5}/>
                        </div>
                    </motion.div>
                </motion.section>
                <section className="note-section">
                    <div className="note-section__titles-container">
                        <motion.h1
                            initial={{ opacity: 0, y: 50}}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{duration: 0.6}}
                            viewport={{ once: true, amount: .8}}
                        >
                            CHEAPER THAN CUSTOM
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 50}}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{duration: 0.6}}
                            viewport={{ once: true, amount: .8}}
                        >
                            100% STUDENT-OWNED
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 50}}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{duration: 0.6}}
                            viewport={{ once: true, amount: .8}}
                        >
                            FASTER THAN ONLINE
                        </motion.h1>
                        <motion.div 
                            className="homepage__btns-container"
                            initial={{ opacity: 0, y: 50}}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{duration: 0.6, delay: 1.2}}
                        >
                            <SoftButton 
                                padding="0px" 
                                height="65px" 
                                width="200px" 
                                text="SIGN IN" 
                                fontSize="20px" 
                                color="white" 
                                backgroundColor="black" 
                                border="1px solid black" 
                                fontWeight="700"
                                onClick={async() => { signIn()}}
                            />
                            <button className="homepage__shop-now-btn" onClick={() => navigate('./products')}>
                                <p>SHOP NOW</p>
                                <img src={rightArrow2}></img>
                            </button>
                        </motion.div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    )
}

export default Homepage;