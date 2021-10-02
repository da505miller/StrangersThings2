import React from 'react';
import { useState, useEffect } from 'react';
import { createPost } from '../API';

const Newpost = (props) => {

    const token = props.token;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    const [deliver, setDeliver] = useState("");

    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await createPost(token, title, description, price, deliver)

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

export default Newpost;