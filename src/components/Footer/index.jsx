import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF, faTwitter, faInstagram, faGooglePlusG,
} from '@fortawesome/free-brands-svg-icons';

import { styleFooter, styleFooterEmail, styleIcon } from './styles';

const SOCIAL = [
  { key: 'facebook', href: 'https://www.facebook.com/', icon: <FontAwesomeIcon icon={faFacebookF} size="xl" color="white" /> },
  { key: 'twitter', href: 'https://www.twitter.com/', icon: <FontAwesomeIcon icon={faTwitter} size="xl" color="white" /> },
  { key: 'instagram', href: 'https://www.instagram.com/', icon: <FontAwesomeIcon icon={faInstagram} size="xl" color="white" /> },
  { key: 'google', href: 'https://www.google.com/', icon: <FontAwesomeIcon icon={faGooglePlusG} size="xl" color="white" /> },
];

function Footer() {
  return (
    <footer className="text-white p-5" style={styleFooter}>
      <Container>
        <section className="d-flex justify-content-between">
          <div>
            <h4 className="fw-bold mb-4">
              Contact
            </h4>
            <div className="d-flex">
              <div className="d-flex flex-column">
                <span>Call Center</span>
                <span>(Whatsapp):</span>
                <span>081234567891</span>
              </div>
              <div className="d-flex flex-column" style={styleFooterEmail}>
                <span>Email:</span>
                <span>admin@logo.id</span>
                <span>helpdesk@logo.id</span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex">
              {SOCIAL.map((item) => {
                const { key, href, icon } = item;
                return <a href={href} style={styleIcon} key={key}>{icon}</a>;
              })}
            </div>
          </div>
        </section>
        <div className="pt-4 text-center">
          Copyright: ©2023 All rights reserved by Logo
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
