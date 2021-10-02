import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from '../API';


const Posts = () => {
    
    
    
    
    const [posts, setPosts] = useState([]);
    

    useEffect(async () => {
        
        const result = await fetchAllPosts();
        console.log("UseEffect Posts", result)
        setPosts(result)
    }, []);

    
    return (<div>
                <h1>Current Postings</h1>
                <br></br>
                <div>
                    {posts.map((element, index) => {
                        console.log(element);
                        return (<div key={index} className="container">
                                    <div >
                                    { element.title ? <h2 className="list-group-item-heading text-danger">{ element.title }</h2> : <h2>Post Title: none</h2>}
                                    </div>
                                    { element.author.username ? <h3 className="list-group-item-info">Posted by: { element.author.username }</h3> : null }
                                    { element.description ? <h4 className="bg-success">Description: { element.description }</h4> : <h4>Description: none</h4> }
                                    { element.location ? <h4 className="bg-success list-group-item-text">Location: { element.location }</h4> : <h4>Location: unknown</h4>}
                                    { element.price ? <h4 className="list-group-item-text bg-success text-danger">Price: { element.price }</h4> : <h4>Price: No price listed</h4> }
                                    { element.willDeliver ? <h4 className="bg-success list-group-item-text">Delivery Available { element.willDeliver }</h4> : <h4>Will Not Deliver</h4> }
                                    <br></br>
                                    <br></br>
                                </div>)
                    })}
                </div>
            </div>)
}

export default Posts;