export function normalizeClinic(response) {
  const clinicList = response?.data || [];
  const res = clinicList.map((item) => {
    const clinic = { ...item };
    return {
      id: clinic.id || 0,
      name: clinic.clinic_name || '',
      address: clinic.clinic_address || '',
    };
  });
  return res;
}
