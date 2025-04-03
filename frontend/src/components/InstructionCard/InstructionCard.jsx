import { motion } from 'motion/react';

import './InstructionCard.css'

export default function InstructionCard(props) {
  return (
    <motion.div className="instruction-card" style={{opacity: props.opacity, y: props.y}}>
      <div className="instruction-card__icon-container">
        <img src={props.icon}></img>
      </div>
      <div className="instruction-card__content">
        <h1>{props.number}</h1>
        <p>{props.description}</p>
      </div>
    </motion.div>
  )
}