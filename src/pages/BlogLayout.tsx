import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { BlogPost } from '../interfaces';
import { ICommentProps } from '../interfaces';
import { FormattedDate } from '../components/FormattedDate';
import { Comment } from '../components/Comment';

// TODO: Increment view on page load

export function BlogLayout() {
  const { id } = useParams();

  const [post, setPost] = useState<BlogPost>();
  const [err, setErr] = useState('');

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
        {err && <div className="error">Error fetching post.</div>}
        {post && (
          <article className="blog-post">
            <h1 className="post-title">{post.title}</h1>
            <span className="post-date">
              <FormattedDate date={post.date} />
            </span>
            {post.updated && (
              <span className="post-date">
                Updated on <FormattedDate date={post.date} />
              </span>
            )}
            <ul className="post-tags">
              {post.tags.map((tag: string, i) => (
                <li key={i}>{tag}</li>
              ))}
            </ul>
            <article className="post-body">{post.body}</article>
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
          </article>
        )}
      </main>
    </div>
  );
}
