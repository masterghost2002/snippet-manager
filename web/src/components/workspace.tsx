import AddProjectModal from "./add-project-modal"
type Workspace = {
    id:string;
    name:string;
    projects:Array<any>;
    createdAt:string;
    updatedAt:string;
}
type props = {
    workspace:Workspace
}
export default function Workspace({ workspace }: props) {
    return (<div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
            <h2 className="card-title">{workspace.name}</h2>
            <p>Created At: {workspace.createdAt}</p>
            <p>Updated At: {workspace.updatedAt}</p>
            <div className="card-actions justify-end">
                <AddProjectModal workspaceId = {workspace.id}/>
               {workspace.projects.length > 0 &&  <button className="btn">View All projects</button>}
            </div>
        </div>
    </div>)
}