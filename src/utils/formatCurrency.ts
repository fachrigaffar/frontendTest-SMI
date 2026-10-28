const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

export function formatCurrency(value: number | null): string {
  return value === null || !Number.isFinite(value) ? '-' : currencyFormatter.format(value);
}

export function formatCategory(value: string): string {
  return value.split(/[-\s]+/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join(' ');
}
