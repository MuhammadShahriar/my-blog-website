import React, { useEffect, useState } from 'react';
import './Posts.css'
import axios from './axios';
import { Pagination } from "baseui/pagination";
import {Link} from 'react-router-dom';

import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
  } from 'baseui/card';
  import {Button} from 'baseui/button';

  import { Input, SIZE } from "baseui/input";

function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [value, setValue] = useState("");
    //const [condition, setCondintion] = useState('');

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

    const getData = () => {
        async function fetchData1() {
            setCurrentPage(1);
            const request = await axios.get(`?page=${currentPage}&limit=10`);
            setPosts(request.data);
            const request1 = await axios.get('');
            setTotalPages(request1.data.length);
            console.log(totalPages)
            return request;
        }

        async function fetchData2() {
            setCurrentPage(1);
            const request = await axios.get(`?page=${currentPage}&limit=10&search=${value}`);
            setPosts(request.data);
            const request1 = await axios.get(`?search=${value}`);
            setTotalPages(request1.data.length);
            console.log(totalPages)
            return request;
        }

        if ( !value ) {
            fetchData1();
        } else {
            fetchData2 ();
        }
    }

    return (
        <div className = 'posts' >
            <div className = 'posts__search' >
                <Input
                    value={value}
                    onChange={e => {
                        setValue(e.target.value);
                    }}
                    size={SIZE.large}
                    placeholder="Search Posts"
                    clearable
                    clearOnEscape
                    overrides={{
                        Root: {
                        style: {
                            width: '60%',
                        },
                        },
                    }}
                />

                <Button
                    overrides={{
                        Root: {
                        style: {
                            height: '60px',
                        },
                        },
                    }}
                    onClick={() => getData()}
                >
                    Click to search
                </Button>
            </div>
            
            {posts.map ( post => (
                <Card
                    overrides={{Root: {style: {width: '80%', alignItems: 'center'} }}}
                    title={post.postTitle}
                >
                    <StyledBody>
                        <p>{`Auther : ${post.authorName}`}</p>
                    </StyledBody>
                    
                    <StyledBody>
                        <p>{post.postContent.substring(0, 300)}...</p>
                    </StyledBody>
                    <StyledAction>
                    <Link to={`/post/${post.id}`} >
                        <Button overrides={{BaseButton: {style: {width: '33%', height:'100%'}}}}>
                            Read more
                        </Button>
                    </Link>
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