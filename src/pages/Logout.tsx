import { logoutInterface } from '../interfaces';
import { Header } from '../components/Header';
import { checkLogin } from '../checkLogin';

export function Logout(props: logoutInterface) {
  return (
    <div>
      <Header />
      <main>
        {checkLogin() && (
          <div>
            <h1>Are you sure you want to logout?</h1>
            <button onClick={props.logoutAccount}>Yes</button>
          </div>
        )}
      </main>
    </div>
  );
}
