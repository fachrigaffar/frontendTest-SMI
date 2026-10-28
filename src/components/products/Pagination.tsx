import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1);
  const compact: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];
  pages.forEach((value, index) => {
    if (index > 0 && value - pages[index - 1] > 1) compact.push(index === 1 ? 'ellipsis-start' : 'ellipsis-end');
    compact.push(value);
  });
  return (
    <nav className="pagination" aria-label="Halaman produk">
      <button className="page-arrow" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Halaman sebelumnya"><ChevronLeft size={17} /></button>
      {compact.map((value) => typeof value === 'number' ? <button key={value} className={`page-number ${value === page ? 'active' : ''}`} aria-current={value === page ? 'page' : undefined} onClick={() => onChange(value)}>{value}</button> : <span className="page-ellipsis" key={value}>…</span>)}
      <button className="page-arrow" onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Halaman berikutnya"><ChevronRight size={17} /></button>
    </nav>
  );
}
