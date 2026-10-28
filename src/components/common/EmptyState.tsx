import { SearchX } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <section className="empty-state" role="status">
      <span className="empty-icon"><SearchX size={28} aria-hidden="true" /></span>
      <h2>Produk tidak ditemukan</h2>
      <p>Coba kata kunci lain atau hapus filter untuk melihat semua produk.</p>
      <Button variant="secondary" onClick={onReset}>Reset filter</Button>
    </section>
  );
}
