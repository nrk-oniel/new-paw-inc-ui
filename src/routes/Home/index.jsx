import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import SectionCustom from './components/SectionCustom';
import SectionCheckPet from './components/SectionCheckPet';
import SectionBook from './components/SectionBook';

import { styleHomeJumbotron } from './styles';
import ROLES from '../../constants/roles';

function Home() {
  const { userData, isLogin } = useContext(UserContext);

  return (
    <div>
      <div style={styleHomeJumbotron} />
      {isLogin && <SectionCustom />}
      {isLogin && userData.role === ROLES.CUST && (
        <>
          <SectionCheckPet />
          <SectionBook />
        </>
      )}
    </div>
  );
}

export default Home;
