import Header from '@/app/components/Header'
import PostComponent from '@/app/components/PostComponent'
import { Post } from '@/app/utils/interface'
import { client } from '@/sanity/lib/client'
import React from 'react'

async function getPostByTag(tagName:string) {
    const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${tagName}"]._id)]{
        title,
        slug,
        publishedAt,
        excerpt,
          tags[]->{
            _id,
            slug,
            name
          }
      }
    `

    const posts = await client.fetch(query)
    return posts;
    
}
interface Params {
    params:{
        slug:string
    }
}
const page = async ({params}:Params) => {
    const posts:Post[] = await getPostByTag(params.slug)
  return (
    <div>
        <Header title={`#${params?.slug}`} tags/>
        <div>
            {posts?.length > 0 && posts.map(post=>(
                <PostComponent key={post._id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default page

