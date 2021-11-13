import React ,{useContext,useState} from 'react'
import notecontext from '../context/notes/NoteContext'

export const AddNote = () => {
    const context = useContext(notecontext)
    const {addNote} = context

    const [note, setnote] = useState({title: "", description: "", tag: "Default" })
    const handleClick =(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
    }  
    const onChange =(e)=>{
        setnote({...note,[e.target.name]: e.target.value})
    }
    return (
        <div>
            <h1>Add A N*de-Note</h1>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"> Note Title</label>
                    <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp"  onChange={onChange} minLength={5} required/>
                    <div id="emailHelp" class="form-text">Should be something naughty.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Note Description</label>
                    <input type="text" class="form-control" id="description" name="description" onChange={onChange} minLength={5} required/>
                </div>    
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Tag</label>
                    <input type="text" class="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" class="btn btn-primary"  onClick={handleClick}>Add A Note</button>
            </form>
        </div>
    )
}
