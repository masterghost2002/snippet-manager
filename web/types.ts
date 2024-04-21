export type Snippet = {
    id:string;
    name:string;
    type:"GIT" | "LOCAL";
    desc:string;
    location?:string;
    git_path?:string;
    createdAt:string;
    updatedAt:string;
}