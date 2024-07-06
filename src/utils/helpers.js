export const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'idr',
    maximumSignificantDigits: 3,
  }).format(value);

export function formatDate(dateString) {
  const date = new Date(dateString);

  // Array of Indonesian day names and month names
  const dayNames = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];

  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  // Get day, month, year components from the date
  const day = dayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Format the date string
  const formattedDate = `${day}, ${date.getDate()} ${month} ${year}`;

  return formattedDate;
}

export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
