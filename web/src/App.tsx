import { createContext, useEffect, useState } from "react";
import Header from "./components/header";
import CreateWorkSpace from "./components/create-workspace-modal";
import WorkSpacesContainer from "./components/workspaces-container";
import type {Snippet} from '../types';
import axios from "axios";
type SnippetContext = {
  snippets:Array<Snippet>;
}
export const SnippetContext = createContext<SnippetContext | undefined>(undefined);
function App() {
  const [snippets, setSnippets] = useState([]);
  useEffect(()=>{
    const getSnippets = async ()=>{
      try {
        const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;
        const res = await axios.get(BASE_URL+'/snippets');
        const data =res.data;
        setSnippets(data);
      } catch (error) {
        console.log(error);
      }
    }
    getSnippets();
  }, []);
  return (
   <div className="flex flex-col gap-10 p-5">
    <SnippetContext.Provider value={{snippets}}>
      <Header/>
      <CreateWorkSpace/>
      <WorkSpacesContainer/>
    </SnippetContext.Provider>
   </div>
  )
}

export default App
