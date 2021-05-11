import React, { useEffect, useState } from 'react';
import './Posts.css'
import axios from './axios';
import { Pagination } from "baseui/pagination";
import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
  } from 'baseui/card';
  import {Button} from 'baseui/button';

function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`?page=${currentPage}&limit=10`);
            setPosts(request.data);
            const request1 = await axios.get('');
            setTotalPages(request1.data.length);
            console.log(totalPages)
            return request;
        }
        fetchData();
    }, [currentPage]);

    return (
        <div className = 'posts' >
            {posts.map ( post => (
                <Card
                    overrides={{Root: {style: {width: '80%', alignItems: 'center'} }}}
                    title={post.postTitle}
                >
                    <StyledBody>
                        <p>{`Auther : ${post.authorName}`}</p>
                        {/* <p>{`Published date : ${post.createdAt}`}</p> */}
                    </StyledBody>
                    
                    <StyledBody>
                        <p>{post.postContent.substring(0, 300)}...</p>
                    </StyledBody>
                    <StyledAction>
                    <Button overrides={{BaseButton: {style: {width: '33%'}}}}>
                        Read more
                    </Button>
                    </StyledAction>
                </Card>
            ) )}

            <Pagination
                numPages={Math.ceil(((1.0 * totalPages)/10.0))}
                currentPage={currentPage}
                onPageChange={({ nextPage }) => {
                    setCurrentPage(
                    Math.min(Math.max(nextPage, 1), Math.ceil(((1.0 * totalPages)/10.0)))
                    );
                }}
            />
        </div>
    )
}

export default Posts