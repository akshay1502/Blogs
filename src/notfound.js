import { Link } from 'react-router-dom';

const Notfound = () => {
    return ( 
        <>
            <h2>Page not found</h2>
            <Link to="/">Back to Home</Link>
        </>
    );
}
 
export default Notfound;