import React from 'react';
import { useState } from 'react';

const Profile = () => {

    return (<div key={index} className="containter">
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
            </div>)
}

export default Profile;