import ROLES from '../constants/roles';

function mapRole(role) {
  // mapping role from backend

  if (role === 1) return ROLES.CUST;
  if (role === 2) return ROLES.STAFF;
  if (role === 3) return ROLES.ADM;
  return ROLES.DEFAULT;
}

export default mapRole;
