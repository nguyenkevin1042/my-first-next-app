"use client"

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from '@components/Profile'

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const userId = session?.user.id
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${userId}/posts`)
            const data = await res.json()
            setPosts(data)
        }

        if (userId) {
            fetchPosts()
        }
    }, [session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })

                const filterPosts = posts.filter(item => item._id !== post._id)
                setPosts(filterPosts)
            } catch (error) {
                console.log('deletePrompt error: ', error)
            }
        }

    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} />
    )
}

export default MyProfile