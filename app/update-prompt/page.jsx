"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

import Form from "@components/Form"

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    console.log(searchParams)

    useEffect(() => {
        const getPrompt = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) getPrompt()

    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        if (!promptId) {
            return alert('PromptID not found')
        }

        try {
            const res = await fetch(`/api/prompt/${promptId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    }),
                })

            if (res.ok) {
                router.push('/profile')
            }

        } catch (error) {
            console.log('createPrompt error: ', error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt 