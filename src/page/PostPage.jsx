import axios from 'axios'
import { formatISO9075 } from 'date-fns'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function PostPage() {
  const [data, setData] = useState([])
  const [acsessUpdate, setAcsessUpdate] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    axios.get(`https://blogs-api-delta.vercel.app/post/${id}`).then((response) => {
      setData(response.data.post)
    }).catch(error => { console.log(error) })
    if (localStorage.getItem("tkn")) {
      const token = jwt_decode(localStorage.getItem("tkn"));
      if (token.id === data?.createdBy?._id) {
        console.log("llll");
        setAcsessUpdate(true)
        console.log("lol");
      }
    }
  }, [])


  return (
    <div className='px-5 w-full lg:flex justify-start items-center mt-5 gap-3'>
      <div className='image flex self-start justify-center items-center '>
        <img src={data.file?.secure_url} className='w-[500px]' alt="cover" />
      </div>

      <div className='text self-start w-full mt-4 lg:mt-0'>
          <h1 className='text-xl font-semibold  mb-2'>{data.title}</h1>
          <div className='my-1 text-sm font-semibold flex justify-between gap-3 items-center px-2'>
            <span>{data?.createdBy?.userName}</span>
            <span>{data?.createdAt && formatISO9075(new Date(data?.createdAt))}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
          {acsessUpdate && <div className='mt-4 flex gap-2 items-start justify-end'>
          <button className='p-2 border-spacing-1 bg-slate-900 text-white rounded-md'>Update</button>
          <button className='p-2 border-spacing-1 bg-zinc-500 text-white rounded-md'>Delete</button>
        </div>}

      </div>
       
      
    </div> 
  )
}
