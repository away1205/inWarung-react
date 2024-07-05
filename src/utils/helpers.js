export const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'idr',
    maximumSignificantDigits: 3,
  }).format(value);
