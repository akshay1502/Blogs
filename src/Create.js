import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Akshay');
  const history = useHistory();

  const handlesubmit = (e) => {
    e.preventDefault();
    const doc = {title, body, author, likes:0 };
    fetch('http://localhost:8000/blogs',{
      method: 'POST',
      body: JSON.stringify(doc),
      headers: {'Content-Type' : 'application/json'}
    })
    .then(() => {
      console.log(`blog added`);
      history.push('/'); 
    });
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handlesubmit}>
        <label>Blog Title</label>
        <input 
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Blog body</label>
        <textarea 
          rows="5"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}  
        ></textarea>
        <label>Blog Author</label>
        <select
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Akshay">Akshay</option>
          <option value="Anjali">Anjali</option>
        </select>
        <button>Add Blog</button>
      </form>
    </div>
  );
}
 
export default Create;