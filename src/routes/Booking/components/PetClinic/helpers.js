export function normalizeClinic(response) {
  const clinicList = response?.data || [];
  const res = clinicList.map((item) => {
    const clinic = { ...item };
    return {
      id: clinic.id || 0,
      name: clinic.clinic_name || '',
      address: clinic.clinic_address || '',
      distance: clinic.distance || '',

    };
  });
  return res;
}

export function distanceMarker(response) {
  const clinicList = response?.data || [];
  const res = clinicList.map((item) => {
    const clinic = { ...item };
    return {
      lat: clinic.coordinates.lat || '',
      lng: clinic.coordinates.long || '',
    };
  });
  return res;
}
