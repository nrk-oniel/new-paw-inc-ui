import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import catImage from '../../../../assets/cat.png';
import ROLES from '../../../../constants/roles';
import { URL_MANAGE_ACCOUNT, URL_USER_LIST } from '../../../../constants/urls';
import { UserContext } from '../../../../contexts/UserContext';

const SECTION_PROPS = {
  [ROLES.CUST]: {
    url: URL_MANAGE_ACCOUNT,
    ctaText: 'Account',
    title: 'Manage your account here',
  },
  [ROLES.STAFF]: {
    url: URL_MANAGE_ACCOUNT,
    ctaText: 'Clinic',
    title: 'Manage your clinic’s information here',
  },
  [ROLES.ADM]: {
    url: URL_USER_LIST,
    ctaText: 'Add',
    title: 'Add new user here',
  },
};

function SectionCustom() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const { url, ctaText, title } = { ...SECTION_PROPS[userData.role] };
  const handleCtaClick = () => navigate(url);

  return (
    <div className="d-flex justify-content-between align-items-center py-5 px-4">
      <div className="text-center w-75">
        <h2>{title}</h2>
        <Button variant="main" size="lg" className="btn-circle mt-2" onClick={handleCtaClick}>{ctaText}</Button>
      </div>
      <img src={catImage} alt="cat" height={450} className="my-3" />
    </div>
  );
}

export default SectionCustom;
