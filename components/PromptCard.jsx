"use client"

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>

            </div>
        </div>
    )
}

export default PromptCard