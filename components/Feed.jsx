"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import { useSearchParams } from 'next/navigation'

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
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleDoSearching = async (e) => {
        e.preventDefault()

    }

    const handleSearchByTag = (event, selectedTag) => {
        setSearchText(selectedTag)
        setIsSearching(true)
        // handleDoSearching(event)
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
            <form className='relative w-full flex-center'
                onSubmit={handleDoSearching}>
                <input type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    className='search_input peer'
                    required />
                {/* <button type='submit'
                    className='absolute right-2 px-5 py-1.5 text-sm bg-primary-orange
                    rounded text-white peer'>
                    Search
                </button> */}
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={handleSearchByTag} />

        </section>
    )
}

export default Feed