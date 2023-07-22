"use client"

import { useState, useEffect, useCallback } from 'react'
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
    const [copyPosts, setCopyPosts] = useState([])

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleDoSearching = async (e) => {
        e.preventDefault()

        const postsByPromptContent = copyPosts.filter(item => {
            return item.prompt.includes(searchText);
        })
        const postsByUsername = copyPosts.filter(item =>
            item.creator.username === searchText)
        const postsByTag = copyPosts.filter(item =>
            item.tag === searchText)

        const finalResult = checkSameElementsAndGetFinalResult(postsByPromptContent,
            postsByUsername, postsByTag)

        setPosts(finalResult)
    }

    const checkSameElementsAndGetFinalResult = (postsByPromptContent, postsByUsername, postsByTag) => {
        let finalResult = [...postsByPromptContent,
        ...postsByUsername, ...postsByTag]

        finalResult = finalResult.filter((item, index) =>
            finalResult.indexOf(item) === index)

        return finalResult
    }

    const handleSearchByTag = async (event, selectedTag) => {
        event.preventDefault()
        setSearchText(selectedTag)
        const postsByTag = posts.filter(item =>
            item.tag === selectedTag)
        setPosts(postsByTag)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()
            setPosts(data)
            setCopyPosts(data)
        }
        if (searchText.length === 0) {
            fetchPosts()
        }
        // fetchPosts()
    }, [searchText])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'
                onSubmit={handleDoSearching}>
                <input type='text'
                    placeholder='Search for a keyword, a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    className='search_input peer' />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={handleSearchByTag} />

            {searchText.length > 0 && posts.length === 0 &&
                <p className='desc text-center max-w-md'>
                    There is no result that match with your keyword</p>}
        </section>
    )
}

export default Feed