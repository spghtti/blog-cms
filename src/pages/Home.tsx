import { ReactElement, useContext } from 'react';
import { Header } from '../components/Header';
import { checkLogin } from '../checkLogin';

export function Home(): ReactElement {
  return (
    <div>
      <Header />
      {checkLogin() && (
        <main>
          <p>THis is home</p>
        </main>
      )}
    </div>
  );
}
