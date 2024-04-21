import axios from "axios";
import React, { useState, useRef } from "react";

interface DaisyUIHTMLElement extends HTMLElement {
    showModal: () => void
}
type FormData = {
    name:string;
    desc:string;
    type:"GIT" | "LOCAL" | undefined;
    git_path:string;
}
const FileUploadHandler = ()=>{
    const inputFileRef = useRef<null | HTMLInputElement>(null);
    const handleUploadClick = ()=>{
        if(!inputFileRef.current) return;
        inputFileRef.current.click();
    }
    return (
        <div>
            <button className="btn btn-primary" onClick={handleUploadClick}>Upload ZIP</button>
            <input ref = {inputFileRef} type="file" className="hidden"></input>
        </div>
    )
}
export default function AddSnippetModal() {
    const [formData, setFormData] = useState<FormData>({
        name:"",
        desc:"",
        type:undefined,
        git_path:""
    });
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>)=>[
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    ]
    const handleOpenModal = () => {
        const my_modal_1 = document.getElementById('my_modal_1') as DaisyUIHTMLElement;
        if (!my_modal_1) return;
        my_modal_1.showModal();
    }
    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;
        try {
            const res = await axios.post(BASE_URL+'/snippets/add-snippet', formData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <button className="btn" onClick={handleOpenModal}>Add Snippet</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Snippet</h3>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <input type="text" onChange={handleOnChange} placeholder="Snippet Name" name="name" className="input input-bordered w-full max-w-xs" />
                        <input type="text" placeholder="Desc" onChange={handleOnChange} name="desc" className="input input-bordered w-full max-w-xs" />
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1">Select Installation Type</div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><button onClick={()=>setFormData(prev=>({...prev, type:"GIT"}))} type="button">GitHub</button></li>
                                <li><button onClick={()=>setFormData(prev=>({...prev, type:"LOCAL"}))} type="button">Local</button></li>
                            </ul>
                        </div>
                        {
                            formData.type === "GIT" &&   <input type="text" name="git_path" onChange={handleOnChange} placeholder="GitHub URL" className="input input-bordered w-full max-w-xs" />
                        }
                        {
                            formData.type === "LOCAL" &&   <FileUploadHandler/>
                        }
                        <button type="submit" className="btn btn-accent">Add</button>
                    </form>
                    <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <form method="dialog">
                            <button className="btn btn-secondary">Close</button>
                            </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

