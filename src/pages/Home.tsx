import { FormEvent, useState, useRef } from 'react';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../checkLogin';
import { Editor } from '@tinymce/tinymce-react';

export function Home() {
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);

  function submitPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      title: (document.getElementById('title') as HTMLInputElement).value,
      preview: (document.getElementById('preview') as HTMLInputElement).value,
      tags: (document.getElementById('tags') as HTMLInputElement).value.split(
        ','
      ),
      body: editorRef.current && (editorRef.current.getContent() as string),
      // prettier-ignore
      isPublished: (document.getElementById('isPublished') as HTMLInputElement)
        .checked,
    };
    fetch(`http://localhost:5000/posts/`, {
      method: 'POST',
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

  return (
    <div>
      <Header />
      <main>
        <p className="error">{err}</p>
        {checkLogin() ? (
          <div className="blog-post-wrapper">
            <form className="blog-form" onSubmit={submitPost}>
              <div className="form-item-container">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" minLength={3} />
              </div>
              <div className="form-item-container">
                <label htmlFor="preview">Preview</label>
                <input type="text" name="preview" id="preview" minLength={3} />
              </div>
              <div className="form-item-container">
                <label htmlFor="tags">Tags (e.g Javascript,HTML,React)</label>
                <input type="text" name="tags" id="tags" />
              </div>
              <div className="form-item-container">
                <label htmlFor="body">Body</label>
                <Editor
                  tagName="body"
                  id="body"
                  tinymceScriptSrc={import.meta.env.VITE_TINYMCE_URL}
                  initialValue=""
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'preview',
                      'link',
                      'codesample',
                    ],
                    codesample_languages: [
                      { text: 'HTML/XML', value: 'markup' },
                      { text: 'JavaScript', value: 'javascript' },
                      { text: 'TypeScript', value: 'typescript' },
                      { text: 'CSS', value: 'css' },
                      { text: 'JSX', value: 'jsx' },
                      { text: 'TSX', value: 'tsx' },
                    ],
                    toolbar:
                      'undo redo | blocks | ' +
                      'codesample link bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                />
              </div>
              <div className="checkbox-container">
                <label htmlFor="isPublished">Publish?</label>
                <input type="checkbox" name="isPublished" id="isPublished" />
              </div>
              <input type="submit" value="Create post" readOnly />
            </form>
          </div>
        ) : (
          <p className="error">You must login.</p>
        )}
      </main>
    </div>
  );
}
