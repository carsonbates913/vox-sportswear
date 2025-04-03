import './LoadingModule.css';

export default function LoadingModule(props) {
  return (
    <div className="loader-container" style={props.viewport && { height: "calc(100vh - 80px)" }}>
      <div className="loader"></div>
    </div>
  )
}