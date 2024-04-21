import AddSnippetModal from "./add-snippet-modal"
export default function Header() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Snippet Manager</a>
            </div>
            <div className="navbar-end">
                <AddSnippetModal/>
            </div>
        </div>
    )
}