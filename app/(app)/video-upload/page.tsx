'use client'
import React,{useState} from 'react'
// import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VideoUpload() {

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [numInferenceSteps, setNumInferenceSteps] = useState<number>(1);
  const [seed, setSeed] = useState<number>(0);
  const [proMode, setProMode] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [resolution, setResolution] = useState<string>("480");
  const [numFrames, setNumFrames] = useState<number>(129);
  const [safetyEnabled, setSafetyEnabled] = useState<boolean>(true);
  const [strength, setStrength] = useState<number>(0.85);
  const [isUploading, setIsUploading] = useState(false);

  // const router = useRouter();

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
    formData.append("prompt", prompt)
    formData.append("numInferenceSteps", numInferenceSteps.toString())
    formData.append("seed", seed.toString())
    formData.append("proMode", proMode.toString())
    formData.append("aspectRatio", aspectRatio)
    formData.append("resolution", resolution)
    formData.append("numFrames", numFrames.toString())
    formData.append("safetyEnabled", safetyEnabled.toString())
    formData.append("safetyEnabled", safetyEnabled.toString())
    formData.append("strength", strength.toString())


    try{
        const response = await axios.post("/api/video-upload", formData);

        //Check 200 response.
        if(response.status === 200 ){
          console.log("Upload successfull", response.data)          
        }

    }catch(error){
      console.log("Error while uploading video ",error)
      toast.error("Video upload unsuccessfull, please try again.")
    }finally{
      toast.success("Video uploaded successfully.")
      setIsUploading(true);
    }
  }
  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 10000);
    setSeed(randomSeed);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Prompt */}
        <div>
          <label className="label">
            <span className="label-text">Prompt</span>
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        {/* Num Inference Steps */}
        <div>
          <label className="label">
            <span className="label-text">Num Inference Steps: {numInferenceSteps}</span>
          </label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={numInferenceSteps}
            onChange={(e) => setNumInferenceSteps(Number(e.target.value))}
            className="range range-primary w-full"
          />
        </div>

        {/* Seed with Random Button */}
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Seed</span>
            </label>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </div>
          <button type="button" onClick={handleRandomSeed} className="btn btn-accent mt-6">
            Random
          </button>
        </div>

        {/* Pro Mode */}
        <div>
          <label className="label">
            <span className="label-text">Pro Mode</span>
          </label>
          <input
            type="checkbox"
            checked={proMode}
            onChange={(e) => setProMode(e.target.checked)}
            className="toggle toggle-primary"
          />
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="label">
            <span className="label-text">Aspect Ratio (W:H)</span>
          </label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="16:9">16:9</option>
            <option value="9:16">9:16</option>
          </select>
        </div>

        {/* Resolution */}
        <div>
          <label className="label">
            <span className="label-text">Resolution</span>
          </label>
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value={480}>480</option>
            <option value={580}>580</option>
            <option value={720}>720</option>
          </select>
        </div>

        {/* Number of Frames */}
        <div>
          <label className="label">
            <span className="label-text">Number of Frames</span>
          </label>
          <select
            value={numFrames}
            onChange={(e) => setNumFrames(Number(e.target.value))}
            className="select select-bordered w-full"
          >
            <option value={129}>129</option>
            <option value={85}>85</option>
          </select>
        </div>

        {/* Enable Safety Checker */}
        <div>
          <label className="label">
            <span className="label-text">Enable Safety Checker</span>
          </label>
          <input
            type="checkbox"
            checked={safetyEnabled}
            onChange={(e) => setSafetyEnabled(e.target.checked)}
            className="toggle toggle-primary"
          />
        </div>

        {/* Strength */}
        <div>
          <label className="label">
            <span className="label-text">Strength: {strength}</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
            className="range range-primary w-full"
          />
        </div>

        {/* Video File Upload */}
        <div>
          <label className="label">
            <span className="label-text">Video File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload