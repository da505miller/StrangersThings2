import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts, createPost } from '../API';


const Posts = (props) => {
    
    const posts = props.posts;
    const setPosts = props.setPosts;
    const loggedIn = props.loggedIn;
    
    
    // const [posts, setPosts] = useState([]);
    
    

    useEffect(async () => {
        
        const result = await fetchAllPosts();
        console.log("UseEffect Posts", result);
        setPosts(result);
    }, []);

    
    return (<div>
                <h1 className="text-center">Current Postings</h1>
                <br></br>
                <div>
                    {posts.map((element, index) => {
                        console.log(element);
                        return (<div key={index} className="container">
                                    <div >
                                    { element.title ? <h2 className="list-group-item-heading text-danger">{ element.title }</h2> : <h2>Post Title: none</h2>}
                                    </div>
                                    { element.author.username ? <h3 className="list-group-item-info">Posted by: { element.author.username }</h3> : null }
                                    { element.description ? <h4 className="bg-success">Description: { element.description }</h4> : <h4 className="bg-danger">Description: none</h4> }
                                    { element.location ? <h4 className="bg-success list-group-item-text">Location: { element.location }</h4> : <h4 className="bg-danger" >Location: unknown</h4>}
                                    { element.price ? <h4 className="list-group-item-text bg-success text-danger">Price: { element.price }</h4> : <h4 className="bg-danger">Price: No price listed</h4> }
                                    { element.willDeliver ? <h4 className="bg-success list-group-item-text">Delivery Available { element.willDeliver }</h4> : <h4 className="bg-danger">Will Not Deliver</h4> }
                                    {<Message />}
                                    {<Delete />}
                                    <br></br>
                                    <br></br>
                                </div>)
                    })}
                </div>
            </div>)
}

const Newpost = (props) => {

    const token = props.token;
    const loggedIn = props.loggedIn;
    const posts = props.posts;
    const setPosts = props.setPosts;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    const [deliver, setDeliver] = useState("");

    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await createPost(token, title, description, price, deliver);
                
                

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
                    <input onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" placeholder="Description" />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input onChange={(event) => setPrice(event.target.value)} type="number" className="form-control" placeholder="Price" />
                </div>

                <div className="form-group">
                    <label>Will deliver?</label>
                    <input onChange={(event) => setDeliver(event.target.value)} type="text" className="form-control" placeholder="Deliver?" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Create Post</button>
                
            </form>
    )
}

const Message = () => {
    return (
        <form className="form-group">
            <div className="col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Write message here..." />
                        <span class="input-group-btn">
                            <button className="btn btn-primary" type="submit">Send</button>
                        </span>
                </div>
            </div>
        </form>
    )
}

const Delete = () => {
    return (
        <form>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Delete</button>
            </div>
        </form>
        
    )
}

export default Posts;
export { Newpost, Message, Delete };