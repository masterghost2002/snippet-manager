import axios from "axios";
import React, { useState } from "react";

interface DaisyUIHTMLElement extends HTMLElement {
    showModal: () => void
}
type FormData = {
    name: string;
}
export default function CreateWorkSpace() {
    const [formData, setFormData] = useState<FormData>({
        name: ""
    });
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => [
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    ]
    const handleOpenModal = () => {
        const my_modal_1 = document.getElementById('workspace-modal') as DaisyUIHTMLElement;
        if (!my_modal_1) return;
        my_modal_1.showModal();
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;
        try {
            const res = await axios.post(BASE_URL + '/workspace/create-workspace', formData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <button className="btn w-[180px]" onClick={handleOpenModal}>Create Workspace +</button>
            <dialog id="workspace-modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create new Workspace</h3>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <input type="text" onChange={handleOnChange} placeholder="Workspace name" name="name" className="input input-bordered w-full max-w-xs" />
                        <button type="submit" className="btn btn-accent">Create Workspace</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-secondary">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

