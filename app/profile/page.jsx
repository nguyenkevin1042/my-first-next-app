"use client"

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Profile from '@components/Profile'

const MyProfile = () => {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const creatorId = searchParams.get('creatorId');
    const router = useRouter()

    const [posts, setPosts] = useState([])
    const [profile, setProfile] = useState({
        name: '',
        desc: ''
    })

    useEffect(() => {
        const userId = session?.user.id
        const fetchPosts = async () => {
            //fetch when in other's profile
            if (creatorId) {
                const res = await fetch(`/api/users/${creatorId}/posts`)
                const data = await res.json()
                const username = data[0].creator.username
                setPosts(data)
                setProfile({
                    name: `${username}'s`,
                    desc: `Welcome to ${username}'s profile page`
                })
                return;
            }


            //fetch when in my profile
            const res = await fetch(`/api/users/${userId}/posts`)
            const data = await res.json()
            setPosts(data)
            setProfile({
                name: 'My',
                desc: 'Welcome to your personalized profile page'
            })
        }

        if (userId || creatorId) {
            fetchPosts()
        }
    }, [creatorId])

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
            name={profile.name}
            desc={profile.desc}

            // desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} />
    )
}

export default MyProfile