import axios from "axios";
import React, { useState, useContext } from "react";
import { SnippetContext } from "../App";
import type { Snippet } from "../../types";
type props = {
    workspaceId:string;
}
interface DaisyUIHTMLElement extends HTMLElement {
    showModal: () => void
}
type FormData = {
    name:string;
    snippetId:string;
}

export default function AddProjectModal({workspaceId}:props) {

    const {snippets} = useContext(SnippetContext);
    const [formData, setFormData] = useState<FormData>({
        name:"",
        snippetId:""
    });
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>)=>[
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    ]
    const handleOpenModal = () => {
        const my_modal_1 = document.getElementById('project-modal') as DaisyUIHTMLElement;
        if (!my_modal_1) return;
        my_modal_1.showModal();
    }
    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;
        try {
            const res = await axios.post(BASE_URL+'/projects/add-project', {...formData, workspaceId});
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <button className="btn" onClick={handleOpenModal}>Add Project</button>
            <dialog id="project-modal" className="modal">
                <div className="modal-box text-white">
                    <h3 className="font-bold text-lg text-white">Add Project</h3>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <input type="text" onChange={handleOnChange} placeholder="Project Name" name="name" className="input input-bordered w-full max-w-xs" />
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1">Select Snippet</div>
                            <ul tabIndex={0} className="dropdown-content z-[1] gap-2 menu p-2 shadow bg-base-100 rounded-box w-52 text-white font-medium">
                                {
                                    snippets.map((snippet:Snippet)=><li key={snippet.id} className="bg-gray-700 rounded-xl">
                                        <button type="button" onClick={()=>setFormData(prev=>({...prev, snippetId:snippet.id}))} >
                                            {snippet.name}
                                        </button>
                                    </li>)
                                }
                            </ul>
                        </div>
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

