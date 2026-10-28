import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail } from '../services/authService';

export function LoginPage() {
  const { user, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = (location.state as { from?: string } | null)?.from ?? '/products';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  if (user) return <Navigate to="/products" replace />;

  const emailError = touched && !email.trim() ? 'Email wajib diisi.' : touched && !isValidEmail(email) ? 'Masukkan alamat email yang valid.' : '';
  const passwordError = touched && !password ? 'Password wajib diisi.' : touched && password.length < 8 ? 'Password minimal 8 karakter.' : '';
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setError('');
    if (!isValidEmail(email) || password.length < 8) return;
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    try {
      signIn(email, password);
      navigate(destination, { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Login gagal. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-decoration decoration-one" /><div className="login-decoration decoration-two" />
      <a className="brand login-brand" href="/login"><span className="brand-mark">FS</span><span>FachShop<span className="brand-period">.</span></span></a>
      <section className="login-card">
        <div className="login-icon"><Sparkles size={23} aria-hidden="true" /></div>
        <p className="eyebrow">SELAMAT DATANG KEMBALI</p>
        <h1>Temukan yang<br /><span>kamu cari.</span></h1>
        <p className="login-subtitle">Masuk untuk menjelajahi koleksi pilihan kami.</p>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="email">Alamat email</label>
            <div className={`input-wrap ${emailError ? 'input-error' : ''}`}><Mail size={17} aria-hidden="true" /><input id="email" type="email" autoComplete="username" placeholder="nama@email.com" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} onBlur={() => setTouched(true)} aria-invalid={Boolean(emailError)} aria-describedby={emailError ? 'email-error' : undefined} /></div>
            {emailError && <span className="field-error" id="email-error">{emailError}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div className={`input-wrap ${passwordError ? 'input-error' : ''}`}><LockKeyhole size={17} aria-hidden="true" /><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Masukkan password" value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} onBlur={() => setTouched(true)} aria-invalid={Boolean(passwordError)} aria-describedby={passwordError ? 'password-error' : undefined} /><button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
            {passwordError && <span className="field-error" id="password-error">{passwordError}</span>}
          </div>
          {error && <p className="login-error" role="alert">{error}</p>}
          <Button type="submit" className="login-submit" loading={loading}>Masuk <span aria-hidden="true">→</span></Button>
        </form>
        <aside className="demo-hint"><span className="demo-dot" /><div><strong>Akun demo</strong><span>emily.johnson@fachristudio.demo</span><span>Password: <code>emilyspass</code></span></div></aside>
        <p className="login-note">Dengan masuk, kamu setuju untuk menjelajahi hal-hal indah.</p>
      </section>
      <footer className="login-footer">© 2026 FachShop <span>·</span> Dibuat untuk menemukan favoritmu.</footer>
    </main>
  );
}
