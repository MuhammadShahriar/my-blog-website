import React from 'react'
import { Button, SHAPE, SIZE } from "baseui/button";
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1>Welcome to Shahriar's blog</h1>
            <h3>Click below button to see posts</h3>
            <Link to='/posts' ><Button shape={SHAPE.pill} size={SIZE.large} >See Posts</Button></Link>
        </div>
    )
}

export default Home
