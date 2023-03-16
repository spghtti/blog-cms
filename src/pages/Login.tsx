import { FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginInterface } from '../interfaces';
import { checkLogin } from '../checkLogin';

// ? Remove dotenv if not used

export function Login(props: loginInterface) {
  const navigate = useNavigate();

  async function loginPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`http://www.localhost:5000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.user) {
          navigate(0);
        } else {
          props.loginAccount(res.token);
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {!checkLogin() && (
        <main>
          <form onSubmit={loginPost}>
            <label htmlFor="email">email</label>
            <input type="text" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" />
            <input type="submit" id="submit" />
          </form>
        </main>
      )}
    </div>
  );
}
