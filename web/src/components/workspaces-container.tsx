import { useState, useEffect, useCallback } from "react";
import Workspace from "./workspace";
import axios from "axios";
type Workspace = {
    id:string;
    name:string;
    projects:Array<any>;
    createdAt:string;
    updatedAt:string;
}
const WorkSpacesContainer  = ()=>{
    const [workspaces, setWorkspaces] = useState<Array<Workspace>>([]);
    const getWorkspaces = useCallback(async ()=>{
        try {
            const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;
            const res = await axios.get(BASE_URL+'/workspace');
            const data =  res.data;
            setWorkspaces(data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(()=>{getWorkspaces()},[])
    return (
        <div>
            {
                workspaces && workspaces.map(workspace=><Workspace key={workspace.id} workspace={workspace}/>)
            }
        </div>
    )
};
export default WorkSpacesContainer;