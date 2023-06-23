import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import { NAVIGATION, URL_HOME, URL_LOGIN } from '../../constants/urls';
import { styImage } from './styles';
import { UserContext } from '../../contexts/UserContext';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userData, isLogin, logout } = useContext(UserContext);
  const onClickLogo = () => navigate(URL_HOME);
  const onClickLogin = () => navigate(URL_LOGIN);

  const navMenu = NAVIGATION[userData.role];
  const navStyle = navBg ? 'navigation navigation-white' : 'navigation';

  useEffect(() => {
    // untuk handle background headernya transparent atau putih
    const handleScroll = () => {
      if (window.scrollY && !navBg) {
        setNavBg(true);
      }
      if (window.scrollY === 0 && navBg) {
        setNavBg(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navBg, setNavBg]);

  return (
    <Navbar className={`fixed-top w-100 px-3 ${navStyle}`}>
      <Navbar.Brand onClick={onClickLogo}>
        <img
          style={styImage}
          src={logo}
          height={50}
          className="d-inline-block align-top"
          alt="Paw Inc Logo"
        />
      </Navbar.Brand>
      <Nav className="me-auto">
        {navMenu.map((navItem) => {
          const { label, url } = navItem;
          const onClick = () => navigate(url);
          const isActive = pathname.startsWith(url);
          return (
            <Nav.Link
              data-active={isActive}
              className="navbar-item"
              onClick={onClick}
              key={label}
            >
              {label}
            </Nav.Link>
          );
        })}
      </Nav>
      <div className="text-main">
        {isLogin ? (
          <Nav.Link
            className="navbar-item d-flex align-items-center"
            onClick={logout}
            role="presentation"
          >
            <div style={{ marginRight: '6px' }}>{userData.name}</div>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Nav.Link>
        ) : (
          <Nav.Link
            className="navbar-item"
            onClick={onClickLogin}
            data-active={pathname.includes('/login') || pathname.includes('/register') ? true : ''}
          >
            Login / Register
          </Nav.Link>
        )}
      </div>
    </Navbar>
  );
}

export default Header;
