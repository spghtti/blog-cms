import { ReactElement, useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { checkLogin } from '../checkLogin';
import { PostPreview } from '../components/PostPreview';
import { BlogPost } from '../interfaces';

export function AllPosts(): ReactElement {
  const [list, setList] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('http://localhost:5000/posts', { signal })
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((err) => {
        err.name === 'AbortError' || setErr('Error retrieving posts.');
      });

    return () => controller.abort();
  }, []);

  return (
    <div>
      <Header />
      {err.length ? (
        <div className="error">{err}</div>
      ) : (
        <div className="post-list">
          {list.map((post: BlogPost) => (
            <PostPreview key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
