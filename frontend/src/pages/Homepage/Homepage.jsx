import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import './Homepage.css'
import HeroTitle from '../../components/HeroTitle/HeroTitle.jsx';
import Carousel from '../../components/Carousel/Carousel.jsx';
import Hoodie from '../../assets/Vox-Hoodie2.svg?react'
import Bag from '../../assets/Vox-Bag.svg?react'
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


const Homepage = () => {

    const [animationDone, setAnimationDone] = useState(false);

    const navigate = useNavigate();

    const images = [Bag, Hoodie];

    const carouselVariantRight = {
        offscreen: {
            opacity: 0,
            x: 100,
        },
        onscreen: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6, ease: "easeOut"
            },
        },
    }

    const carouselVariantLeft = {
        offscreen: {
            opacity: 0,
            x: -100,
        },
        onscreen: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6, ease: "easeOut"
            },
        },
    }

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

    const width = useTransform(scrollYProgress, [.95, 1], ["100vw", "95vw"])
    const roundedBorder = useTransform(scrollYProgress, [.95, 1], ["0px", "50px"]);

    return (
        <main className="homepage">
            <div className="homepage-wrapper">
                <ScrollIndicator />
                <section className="homepage__hero-section">
                    <HeroTitle/>
                    <motion.h2
                        initial={{ opacity: 0, y: 50}}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{duration: 0.6, delay: 1.2}}
                    >
                        FOR THE DARTMOUTH COMMUNITY AND BEYOND
                    </motion.h2>
                    <motion.div className="homepage__btns-container"
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
                            />
                            <button className="homepage__shop-now-btn" onClick={() => navigate('./products')}>
                                <p>SHOP NOW</p>
                                <img src={rightArrow2}></img>
                            </button>
                    </motion.div>
                </section>
                <motion.div 
                    className="homepage__carousel-section"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.div 
                        className="homepage__carousel-section__title"
                        variants={carouselVariantLeft}
                    >
                        <img src={businessDescription}></img>
                    </motion.div>
                    <motion.div 
                        className="homepage__carousel-section__carousel-container"
                        onAnimationComplete={() => setAnimationDone(true)}
                        variants={carouselVariantRight}
                    >
                        <Carousel isRunning={animationDone} images={images}/>
                    </motion.div>
                </motion.div>
                <section 
                    ref={hijackRef}
                    className="homepage__process-section"
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
                                description="Pick any type of clothing" 
                                opacity={fade2} 
                                y={move2}
                            />
                            <InstructionCard 
                                icon={designIcon} 
                                number="02" 
                                description="Pick a color, size, and quantity" 
                                opacity={fade3} 
                                y={move3}/>
                            <InstructionCard 
                                icon={wandIcon} 
                                number="03" 
                                description="Add any additional instructions into the request notes" 
                                opacity={fade4} 
                                y={move4}/>
                            <InstructionCard 
                                icon={mailIcon} 
                                number="04" 
                                description="Your order will be on its way!" 
                                opacity={fade5} 
                                y={move5}/>
                        </div>
                    </motion.div>
                </section>
                <section className="note-section">
                    <div className="note-section__titles-container">
                        <motion.h1
                            initial={{ opacity: 0, y: 50}}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{duration: 0.6}}
                            viewport={{ once: true, margin: "-200px"}}
                        >
                            CHEAPER THAN CUSTOM
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 50}}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{duration: 0.6}}
                            viewport={{ once: true, margin: "-200px"}}
                        >
                            100% STUDENT-OWNED
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 50}}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{duration: 0.6}}
                            viewport={{ once: true, margin: "-200px"}}
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