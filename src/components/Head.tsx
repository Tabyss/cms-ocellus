import React from 'react'
import { Helmet } from 'react-helmet-async'

interface IHead {
    title: string
}

const Head: React.FC<IHead> = (props: IHead) => {
    const  { title } = props

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default Head
