import { FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginInterface } from '../interfaces';
import { checkLogin } from '../checkLogin';

interface FormElements {
  day: HTMLInputElement;
  month: HTMLInputElement;
  year: HTMLInputElement;
}

export function Login(props: loginInterface) {
  const navigate = useNavigate();

  async function loginPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.target);

    fetch(`${import.meta.env.VITE_BLOG_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: (document.getElementById('email') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement)
          .value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.user) {
          navigate(0);
        } else {
          props.loginAccount(res.token);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {!checkLogin() ? (
        <main>
          <form onSubmit={loginPost} className="login-form">
            <label htmlFor="email">email</label>
            <input type="text" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" />
            <input type="submit" id="submit" value="Log in" />
          </form>
        </main>
      ) : (
        <p className="error">You're already logged in</p>
      )}
    </div>
  );
}
