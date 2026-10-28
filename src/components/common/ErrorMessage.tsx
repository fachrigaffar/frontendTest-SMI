import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <section className="error-state" role="alert">
      <span className="error-icon"><AlertTriangle size={26} aria-hidden="true" /></span>
      <h2>Oops, ada kendala</h2>
      <p>{message}</p>
      <Button onClick={onRetry}>Coba lagi</Button>
    </section>
  );
}
