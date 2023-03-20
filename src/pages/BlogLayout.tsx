import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BlogPost } from '../interfaces';
import { ICommentProps } from '../interfaces';
import { Comment } from '../components/Comment';
import { FormEvent } from 'react';

// TODO: Increment view on page load

export function BlogLayout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPost>();
  const [err, setErr] = useState('');

  function deletePost(id: string) {
    fetch(`http://localhost:5000/posts/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      mode: 'cors',
      referrerPolicy: 'no-referrer',
    })
      .then((response) => {
        if (!response.ok) {
          setErr(
            `Error: ${response.statusText} (${response.status.toString()})`
          );
        } else {
          response.json();
          navigate('/posts');
        }
      })
      .catch((err) => {
        setErr(err);
      });
  }

  function updatePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      title: (document.getElementById('title') as HTMLInputElement).value,
      tags: (document.getElementById('tags') as HTMLInputElement).value.split(
        ','
      ),
      body: (document.getElementById('body') as HTMLInputElement).value,
      preview: (document.getElementById('preview') as HTMLInputElement).value,
      // prettier-ignore
      isPublished: (document.getElementById('isPublished') as HTMLInputElement)
        .checked,
    };
    fetch(`http://localhost:5000/posts/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      mode: 'cors',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          setErr(
            `Error: ${response.statusText} (${response.status.toString()})`
          );
        } else {
          response.json();
          navigate(0);
        }
      })
      .catch((err) => {
        setErr(err);
      });
  }

  useEffect(() => {
    const controller = new AbortController();

    fetch(`http://localhost:5000/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((err) => {
        err.name === 'AbortError' || setErr('Error retrieving post.');
      });

    return () => controller.abort();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <div className="error">{err}</div>
        {post && (
          <div className="blog-post-wrapper">
            <form className="blog-form" onSubmit={updatePost}>
              <div className="form-item-container">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={post.title}
                  minLength={3}
                />
              </div>
              <div className="form-item-container">
                <label htmlFor="preview">Preview</label>
                <input
                  type="text"
                  name="preview"
                  id="preview"
                  defaultValue={post.preview}
                  minLength={3}
                />
              </div>
              <div className="form-item-container">
                <label htmlFor="tags">Tags (e.g Javascript,HTML,React)</label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  defaultValue={[...post.tags]}
                  minLength={3}
                />
              </div>
              <div className="form-item-container">
                <label htmlFor="body">Body</label>
                <textarea
                  className="post-body"
                  id="body"
                  name="body"
                  rows={20}
                  defaultValue={post.body}
                ></textarea>
              </div>

              <div className="checkbox-container">
                <label htmlFor="isPublished">Published</label>
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  defaultChecked={post.isPublished === true}
                />
              </div>
              <input type="submit" value="Update post" readOnly />
            </form>
            <div className="comment-section">
              <h1 className="comment-section-headline">Comments</h1>
              <div className="comment-wrapper">
                <ul>
                  {post &&
                    post.comments.map((comment: any) => (
                      <Comment
                        key={comment._id}
                        comment={comment as ICommentProps}
                        postId={id as string}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <button
          className="delete-post delete-button"
          onClick={() => {
            deletePost(id as string);
          }}
        >
          Delete post
        </button>
      </main>
    </div>
  );
}
