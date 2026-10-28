import { LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from './Button';

export function Navbar({ dark, onToggleTheme }: { dark: boolean; onToggleTheme: () => void }) {
  const { user, signOut } = useAuth();
  return (
    <header className="topbar">
      <a className="brand" href="/products" aria-label="FachShop — halaman produk">
        <span className="brand-mark">FS</span><span>FachShop<span className="brand-period">.</span></span>
      </a>
      <div className="topbar-actions">
        <span className="user-greeting">Hi, {user?.name.split(' ')[0] ?? 'there'}</span>
        <button className="icon-button theme-button" type="button" onClick={onToggleTheme} aria-label={dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'} title={dark ? 'Mode terang' : 'Mode gelap'}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Button variant="secondary" className="logout-button" onClick={signOut}><LogOut size={15} /> <span>Keluar</span></Button>
      </div>
    </header>
  );
}
