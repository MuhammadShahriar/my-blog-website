import axios from './axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
  } from 'baseui/card';
  import {Button} from 'baseui/button';

function PostDetails() {
    const [post, setPost] = useState();
    const param = useParams();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`/${param.postId}`);
            setPost(request.data);
            console.log(post)
            
            return request;
        }
        fetchData();
    }, []);

    return (
        <div>
            {!post? (<p>Loading...</p>)
            :
            (
                <Card
                    overrides={{Root: {style: {width: '100%', alignItems: 'center'} }}}
                    title={post.postTitle}
                >
                    <StyledBody>
                        <p>{`Auther : ${post.authorName}`}</p>
                        {/* <p>{`Published date : ${post.createdAt}`}</p> */}
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
