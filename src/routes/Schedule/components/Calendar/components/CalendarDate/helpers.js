export function getDate(selected) {
  const { year, month, date } = selected;

  // buat angka 1 jadi 01 (untuk bisa dipassing ke new Date)
  const monthValue = `${month + 1}`.padStart(2, '0');
  const dateValue = `${date}`.padStart(2, '0');

  const newDate = new Date(`${year}-${monthValue}-${dateValue}T00:00:00.000+07:00`);

  if (newDate.getMonth() !== month) {
    // filterout other month
    return '';
  }

  return newDate.getDate();
}
