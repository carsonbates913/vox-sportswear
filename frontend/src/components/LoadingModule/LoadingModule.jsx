import './LoadingModule.css';

export default function LoadingModule(props) {

  if(props.modal) {
    return (
      <></>
      <div className="loader-modal">
      <div className="loader"></div>
    </div>
    )

  }else{
    return (
      <div className="loader-container" style={props.viewport && { height: "calc(100vh - 80px)" }}>
        <div className="loader"></div>
      </div>
    )
  }
}