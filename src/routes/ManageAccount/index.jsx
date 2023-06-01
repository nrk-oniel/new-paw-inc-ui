import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';
import catImage from '../../assets/cat.png';
import AccountInfo from './components/AccountInfo';
import PasswordUpdate from './components/PasswordUpdate';

function ManageAccount() {
  const { userData } = useContext(UserContext);
  const { name } = userData;

  const title = `Welcome Paw Inc. ${name} !`;

  return (
    <div className="content px-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-main">{title}</h2>
        <img src={catImage} alt="cat" height={450} className="my-3" />
      </div>
      <AccountInfo />
      <PasswordUpdate />
    </div>
  );
}

export default ManageAccount;
