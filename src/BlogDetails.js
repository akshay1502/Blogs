// import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data, isPending, error } = useFetch('http://localhost:8000/blogs/'+id);
    // console.log(data);
    const history = useHistory();
    const handleclick = () => {
        fetch('http://localhost:8000/blogs/'+id,{
            method: 'DELETE'
        })
        .then(() => history.push('/'));
    }

    const handlelike = () => {
        // data.likes += 1;
        const doc = { ...data };
        console.log(doc);
        fetch('http://localhost:8000/blogs',{
            method: 'POST',
            body: JSON.stringify(doc),
            headers: {'Content-Type' : 'application/json'}
        })
        .then(() => {
            console.log(`blog added`);
            history.push('/'); 
        });
        // axios.post('http://localhost:8000/blogs',doc)
        //     .then(() => { console.log(`done`); history.push('/') });

    }

    return ( 
        <div className="blog-details">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && 
                <article>
                    <h2>{ data.title }</h2>
                    <p>Written by { data.author }</p>
                    <div>{data.body}</div>
                    <button onClick={handlelike}>Likes {data.likes}</button>
                    <button onClick={handleclick}>Delete</button>
                </article>
            }
            
        </div>
    );
}
 
export default BlogDetails;