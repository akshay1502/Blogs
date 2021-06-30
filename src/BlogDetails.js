// import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";

const BlogDetails = () => {
    const [likes, setLikes] = useState('');

    const { id } = useParams();
    const { data, isPending, error } = useFetch('http://localhost:8000/blogs/'+id);
    console.log(data);
    if(data){
        // setLikes(data.likes);
        console.log(`it's here`);
    }
    const history = useHistory();
    const handleclick = () => {
        fetch('http://localhost:8000/blogs/'+id,{
            method: 'DELETE'
        })
        .then(() => history.push('/'));
    }

    const handlelike = () => {
        // const doc = { ...data, likes: data.likes+1, name: 'unknown error' };
        const doc = {
            likes: data.likes+1
        };
        // console.log(doc);
        fetch('http://localhost:8000/blogs/'+id,{
            method: 'PATCH',
            body: JSON.stringify(doc),
            headers: {'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(res => setLikes(res.likes))
        .then(() => {
            console.log(`new blog likes added`);
            
        });
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
                    <button onClick={handlelike}>Likes {likes}</button>
                    <button onClick={handleclick}>Delete</button>
                </article>
            }
            
        </div>
    );
}
 
export default BlogDetails;