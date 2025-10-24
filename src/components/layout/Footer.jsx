import './Footer.css'

// Only information we've actually confirmed goes here. Hours and
// ratings were mentioned as unverified public-listing data — leaving
// them out until confirmed rather than publishing a possibly-wrong figure.
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__block">
          <h2 className="site-footer__heading">Muddy Mug Bakers & Brewers</h2>
          <p>Mahendra Pool, Pokhara, Gandaki Province 33700, Nepal</p>
          <p>
            <a href="tel:+9779811759805">+977 9811759805</a>
          </p>
        </div>

        <div className="site-footer__block">
          <h2 className="site-footer__heading">Follow</h2>
          <ul className="site-footer__social">
            <li>
              <a
                href="https://www.instagram.com/muddymugbakersandbrewers/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/muddymug/" target="_blank" rel="noreferrer noopener">
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@muddy_mug"
                target="_blank"
                rel="noreferrer noopener"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="site-footer__copyright">
        © {year} Muddy Mug Bakers & Brewers
      </p>
    </footer>
  )
}
