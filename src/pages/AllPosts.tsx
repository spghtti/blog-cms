import { ReactElement, useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { checkLogin } from '../checkLogin';
import { PostPreview } from '../components/PostPreview';
import { BlogPost } from '../interfaces';

export function AllPosts(): ReactElement {
  const [list, setList] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch('http://localhost:5000/posts/all', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      mode: 'cors',
      referrerPolicy: 'no-referrer',
      signal,
    })
      .then((response) => {
        if (!response.ok) {
          setErr(
            `Error: ${response.statusText} (${response.status.toString()})`
          );
        }
        return response.json();
      })
      .then((data) => setList(data))
      .catch((err) => {
        err.name === 'AbortError' || setErr('Error retrieving posts.');
      });
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <main>
        {err.length ? (
          <div className="error">{err}</div>
        ) : (
          <div className="post-list">
            {list.map((post: BlogPost) => (
              <PostPreview key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
