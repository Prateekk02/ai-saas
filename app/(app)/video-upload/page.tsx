'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VideoUpload() {

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  // Max file size 70 mb

  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(!file) return;
    if(file.size > MAX_FILE_SIZE){
      toast.error("File size too large. Please upload file smaller than 70MB.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file",file);
    formData.append("title",title);
    formData.append("description",description);
    formData.append("originalSize",file.size.toString());

    try{
        const response = await axios.post("/api/video-upload", formData);

        //Check 200 response.
        if(response.status === 200 ){
          console.log("Upload successfull", response.data)
          toast.success("Video upload successfull.");
        }

    }catch(error){
      console.log("Error while uploading video ",error)
      toast.error("Video upload unsuccessfull, please try again.")
    }finally{
      setIsUploading(true);
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='label'>
            <span className='label-text'>Title</span>            
          </label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input input-bordered w-full'
            required
          />
        </div>
        <div>
          <label className="label">
            <span className='label-text'>
              Description
            </span>
          </label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='textarea textarea-bordered w-full'
          />
        </div>
        <div>
        <label className="label">
            <span className='label-text'>
              Video File
            </span>
          </label>
          <input 
            type="file" 
            accept='video/*'
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className='file-input file-input-bordered w-full'
            required
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          disabled={isUploading}
        >{isUploading? "Uploading...": "Upload Video"}</button>
      </form>      
       
    </div>
  )
}

export default VideoUpload