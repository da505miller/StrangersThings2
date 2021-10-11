import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAllPosts, createPost, createMessage } from '../API';
import { Search } from '../Components';

// This component grabs all current postings from all users and then maps them out and displays them. 
// Only loggedin users will be able to see the message field where they can send a message to the author of each post.
const Posts = (props) => {
    
    const posts = props.posts;
    const setPosts = props.setPosts;
    const token = props.token;
    
    const isLoggedIn = props.isLoggedIn;
    
    // As soon as page hits the screen useEffect will fetch all posts from api and set them on state
    useEffect(async () => {
        
        const result = await fetchAllPosts(token);
        setPosts(result);
    
    }, []);
    // This useEffect is supposed to work with my Search component which i never got working.
    useEffect(() =>{
        
        setFilteredResults(posts)
    
    }, [posts]);

    // This was to be used with my Search component to make search work...new state, filter function. 
    // I never got the search component working.
    const [filteredResults, setFilteredResults] = useState([]);
    
    return (<div className="container">
                <h1 className="text-center">Current Postings</h1>
                <br></br>
                <Search setFilteredResults={setFilteredResults} posts={posts} />
                <br></br>
                <div>
                    {posts.map((element, index) => {
            
                        return (
                            <div key={index} className="containter">
                                <h2 className="list-group-item-heading text-danger">
                                    { element.title }
                                </h2>
                                <div className="list-group-item-info">
                                    Posted by: { element.author.username }
                                </div>
                                <div className="bg-success">
                                    Description: {element.description }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Location: { element.location }
                                </div>
                                <div className="list-group-item-text bg-success text-danger">
                                    Price: {element.price }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Will Deliver: { element.willDeliver }
                                </div>
                                <br></br>
                                {token ? <Message token={token} _id={element._id}/>  : null}
                            </div>)
                    })}
                </div>
            </div>)
}
// Newpost component is a form that user will use to make their own new posting and post it to the api for all users to see.
// Once the new post is created it will push them to the posts page.
const Newpost = ({ token, posts, setPosts }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [deliver, setDeliver] = useState("");
    const [location, setLocation] = useState("")
    const history = useHistory()
    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await createPost(token, title, description, price, deliver, location);
                
                setPosts([...posts, response]);
                history.push("/posts")
            }
            catch (error) {
                console.error(error)
            }
        }}>
                <h3>Make a new post</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input onChange={(event) => setTitle(event.target.value)} type="text" className="form-control" placeholder="Title" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" placeholder="Description" required />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input onChange={(event) => setLocation(event.target.value)} type="text" className="form-control" placeholder="Location" required />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input onChange={(event) => setPrice(event.target.value)} type="number" className="form-control" placeholder="Price" required />
                </div>

                <div className="form-group">
                    <label>Will deliver?</label>
                    <input onChange={(event) => setDeliver(event.target.value)} type="text" className="form-control" placeholder="Deliver?" required />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Create Post</button>
                
            </form>
    )
}

// Got sending a message to work, although I cannot tell if it is actually sending the messages to another user or if I am somehow just sending them to myself. 
const Message = ({token, content, _id }) => {
    
    const [message, setMessage] = useState("")
    const history = useHistory()
    return (
        <form 
            onSubmit={async (event) => {
                event.preventDefault();
                try {
                    const response = await createMessage(token, message, _id)
                    const newMessage = response.data.message.content
                    
                    console.log(newMessage);
                    setMessage(newMessage);
                    history.push("/posts")
                }
                catch (error) {
                console.error(error)
            }
                
            }}
            className="form-group">
            <div className="col-lg-6">
                <div className="input-group">
                    <input 
                        onChange={({target: {value}}) => setMessage(value)} 
                        type="text" className="form-control" placeholder="Write message here..." required />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">Send</button>
                        </span>
                </div>
            </div>
        </form>
    )
}

export { Posts, Newpost, Message };