import axios from 'axios'
import { formatISO9075 } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function IndexPage() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get("https://blogs-api-delta.vercel.app/post").then((response) => {
      console.log(response.data.post)
      setData(response.data.post)
    })
      .catch((error) => { console.log(error) })
  }, [])

  return (
    <section>
      <div className='  mx-auto mt-5 px-4'>
        {data.map((post) => <div key={post._id} className='post bg-slate-50 gap-4 md:flex justify-start items-center w-full mb-3' >
            <div className='flex justify-center self-start  md:min-w-[350px] h-full items-center '>
              <img src={post.file.secure_url} className=' w-full' alt="post" />
            </div>

            <div className='self-start w-full'>
              <Link to={`/post/${post._id}`}>
                <h1 className='text-[21px] text-start my-1 font-semibold '>{post?.title}</h1>
              </Link>
              <div className='my-1 text-sm font-semibold flex justify-between gap-3 items-center px-2'>
                <span>{post?.createdBy?.userName}</span>
                <span>{formatISO9075(new Date(post.createdAt))}</span>
              </div>
              <p className=' text-start text-lg	font-light mt-2'>
              {post?.summary}
              </p>
            </div>
          </div>
        )}



      </div>
    </section>
  )
}
