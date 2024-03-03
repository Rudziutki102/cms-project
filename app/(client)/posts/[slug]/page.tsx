import Header from '@/app/components/Header'
import { Post } from '@/app/utils/interface'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { VT323 } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import React from 'react'
interface Params {
    params:{
        slug:string
    }
}
const dateFont = VT323({weight:"400",subsets:["latin"]})

const getPost = async (slugString:string)=>{
    const query = `
    *[_type=='post' && slug.current == "${slugString}"][0]{
        title,
        slug,
        publishedAt,
        excerpt,
        _id,
        body,
          tags[]->{
            _id,
            slug,
            name
          }
      }
    `
    const post = await client.fetch(query)
    return post;
}
const page = async ({params}:Params) => {
    const post : Post = await getPost(params?.slug)
    if(!post) notFound()
  return (
    <div>
        <Header title={post?.title}/>
        <div className='text-center'>
            <span className={`${dateFont.className} text-purple-500`}>
                {new Date(post?.publishedAt).toDateString()}
            </span>
            <div className='mt-5'>
                {post?.tags?.map(tag=>(
                    <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
                        <span className='mr-2 p-1 rounded-sn lowercase dark:bg-gray-950 border dark:border-gray-900'>
                            #{tag?.name}
                        </span>
                    </Link>
                ))}
            </div>
            <div className={richTextStyles}>
                <PortableText 
                value={post.body}
                components={myPortableTextComponents}
                />
            </div>
        </div>
    </div>
  )
}

const myPortableTextComponents = {
    types: {
      image: ({value}:any) => <Image src={urlForImage(value)} alt="Post" width={700} height={700} />,
    },
  }
export default page

const richTextStyles = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-5
prose-headings:text-2xl
prose-p:mb-5
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`