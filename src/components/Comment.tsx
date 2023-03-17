import { ICommentProps } from '../interfaces';
import { FormattedDate } from '../components/FormattedDate';

function deleteComment(commentId: string, postId: string) {
  const comment = document.getElementById(commentId);
  fetch(`http://localhost:5000/posts/${postId}/comments/${commentId}`, {
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
        console.log(
          `Error: ${response.statusText} (${response.status.toString()})`
        );
      } else {
        if (comment) comment.style.display = 'none';
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function Comment(props: { comment: ICommentProps; postId: string }) {
  return (
    <li className="comment" id={props.comment._id}>
      <div className="comment-info">
        <h1 className="comment-name">{props.comment.name}</h1>{' '}
        <span className="comment-date">
          <FormattedDate date={props.comment.date} />
        </span>
      </div>
      <p className="comment-body">{props.comment.body}</p>
      <div>
        <button
          onClick={() => {
            deleteComment(props.comment._id, props.postId);
          }}
        >
          Delete comment
        </button>
      </div>
    </li>
  );
}
