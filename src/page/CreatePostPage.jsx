import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { TEInput } from "tw-elements-react";
import 'react-quill/dist/quill.snow.css'
import axios from 'axios';
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
}
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]
export default function CreatePostPage() {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [addedPost, setAddedPost] = useState(false)

  function createPost(ev) {
    ev.preventDefault();
    let formData = new FormData();
    formData.append('title', title)
    formData.append('summary', summary)
    formData.append('content', content)
    formData.append('file', files[0])
    axios.post("https://blogs-api-delta.vercel.app/post", formData,
      {
        headers: {
          "authorization": `Hamada__${localStorage.getItem("tkn")}`,
          'content-type': 'multipart/form-data'
        },
      }).then(response => {
        if (response.data.message == "Done") {
          setAddedPost(true)
          console.log("ok");
        }
      }).catch(err => { console.log(err) })
  }


  return (
    <div className='container py-8'>
      <form onSubmit={createPost}>
        <TEInput
          onChange={(e) => {
            setTitle(e.target.value)
            setAddedPost(false)
          }}
          value={title}
          className='mb-2'
          type="title"
          id="title"
          label="Title"
        ></TEInput>
        <TEInput
          onChange={(e) => {
            setSummary(e.target.value)
            setAddedPost(false)
          }}
          value={summary}
          className='mb-2'
          type="text"
          id="summary"
          label="Summary"
        ></TEInput>
        <TEInput
          className='mb-2'
          type="file"
          onChange={(e) => {
            setFiles(e.target.files)
            setAddedPost(false)
          }}
        ></TEInput>
        <ReactQuill
          value={content}
          id='content'
          theme="snow"
          onChange={(e) => {
            setContent(e)
            setAddedPost(false)
          }}
          modules={modules}
          formats={formats}
        />
        <div className='flex gap-2 justify-between items-center'>
        <button
          type="submit"
          className="inline-block mt-3 rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]">
          Create Post
        </button>
        {addedPost && <span className='p-2 border-spacing-1 rounded-sm flex justify-center items-center  text-white bg-green-700'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Added Post</span>}
        </div>


      </form>
    </div>
  )
}
