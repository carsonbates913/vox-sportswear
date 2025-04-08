import { useState } from 'react';

import './InfoBox.css';
import notesIcon from '../../assets/notes-icon.svg';

export default function InfoBox() {

    const [isVisible, setIsVisible] = useState(true);

    if(!isVisible) {
        return null;
    }

    return (
        <div className="info-box">
            <div className="info-box__icon-container">
                <img src={notesIcon} />
            </div>
            <div className="info-box__note">If there's a specific size, color, image, or anything else you'd like that isn't listed below, just let us know in the Request Notes section — we can make it happen!</div>
            <div className="info-box__exit">
                <button onClick={() => setIsVisible(false)}>x</button>
            </div>
        </div> 
        
    )
}