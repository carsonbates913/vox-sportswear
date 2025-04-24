import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
      <div className="footer__socials">
        <h1>Vox Sportswear</h1>
        <div className="footer__socials__logo">
          <img src="/assets/linkedin-icon.svg"></img>
          <a href="https://www.linkedin.com/company/vox-sportswear-inc-"></a>
        </div>
      </div>
      <p className="footer__socials__contact">contact us at <a href="mailto:voxsportswear@gamil.com">vox.sportswear.email@gmail.com</a></p>
      </div>
    </footer>
  )
}