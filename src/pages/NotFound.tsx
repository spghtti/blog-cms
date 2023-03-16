import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <Header />
      <main>
        <p className="error">Page not found</p>
      </main>
    </div>
  );
}
