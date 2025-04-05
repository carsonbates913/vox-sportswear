import './BlockButton.css'
import '../../index.css'

export default function BlockButton(props) {
  return (
    <button 
      className={`block-button ${props.className}`} 
      style={{fontSize: props.fontSize, padding: props.padding, border: '0px solid', borderColor: props.color, color: props.color, backgroundColor: props.backgroundColor}} 
      onClick={props.onClick} 
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = props.color;
        e.target.style.color = props.backgroundColor;
      }}
      onMouseLeave={(e) => (e.target.style.backgroundColor = props.backgroundColor, e.target.style.color = props.color)}
      >{props.children} </button>
  )
}