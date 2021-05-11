import axios from './axios';
import './PostDetails.css'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import {
    Card,
    StyledBody,
  } from 'baseui/card';

function PostDetails() {
    const [post, setPost] = useState();
    const param = useParams();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`/${param.postId}`);
            setPost(request.data);
            return request;
        }
        fetchData();
    }, []);

    return (
        <div className = 'PostDetails'>
            {!post? (<p>Loading...</p>)
            :
            (
                <Card
                    overrides={{
                        Root: {
                            style: {
                                width: '80%', 
                                alignItems: 'center',
                                margin: '20px',
                            } 
                        }
                    }}
                    title={post.postTitle}
                >
                    <StyledBody>
                        <p>{`Auther : ${post.authorName}`}</p>
                    </StyledBody>
                    
                    <StyledBody>
                        <p>{post.postContent}</p>
                    </StyledBody>
                </Card>
            )}
        </div>
    )
}

export default PostDetails
