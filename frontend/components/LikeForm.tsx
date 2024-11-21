'use client'
import { MainLike } from '@/app/actions/adminActions'
import React from 'react'

const LikeForm = ({ id }: { id: number }) => {
    return (
        <form
            action={() => MainLike(id)}
        >
            <button
                className="text-sm border py-1 px-2 rounded-md bg-muted-foreground/30 hover:bg-muted-foreground/10 duration-200"
            >
                Like
            </button>
        </form>
    )
}

export default LikeForm