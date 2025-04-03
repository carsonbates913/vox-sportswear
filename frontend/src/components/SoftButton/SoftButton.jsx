import PropTypes from 'prop-types';

import './SoftButton.css'

export default function SoftButton(props) {

  return (
    <button className="soft-button" onClick={props.onClick} style={{height: props.height, width: props.width, padding: props.padding, fontSize: props.fontSize, fontWeight: props.fontWeight, color: props.color, backgroundColor: props.backgroundColor, border: props.border, letterSpacing: props.letterSpacing, borderRadius: props.borderRadius}}>
      {props.text}
    </button>
  )
}

SoftButton.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isButton: PropTypes.bool,
  onClick: PropTypes.func,
  border: PropTypes.string,
  type: PropTypes.string,
}
