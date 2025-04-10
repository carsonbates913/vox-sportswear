import './ProfileCard.css'

export default function ProfileCard (props) {



  return (
    <div className="profile-card">
      {props.hyperlink && <a href={props.hyperlink} />}
      <img className="profile-card__image" src={props.profileURL} loading="lazy"/>
      <div className="profile-card__details">
        <div className="profile-card__details__title">
          <h1>{props.name}</h1>
          <h2>{props.year}</h2>
        </div>
        <p>{props.description}</p>
          <a></a>
      </div>
  </div>
  )
}