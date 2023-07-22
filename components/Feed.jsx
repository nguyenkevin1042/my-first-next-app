"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data &&
                data.map(postItem => (
                    <PromptCard
                        key={postItem._id}
                        post={postItem}
                        handleTagClick={handleTagClick} />
                ))}
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearchChange = (e) => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()
            setPosts(data)
        }

        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input type='text'
                    placeholder='Search for a tag or username'
                    value={searchText}
                    onChange={handleSearchChange}
                    className='search_input peer'
                    required />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={() => { }} />

        </section>
    )
}

export default Feed