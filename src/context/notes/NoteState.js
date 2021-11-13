import NoteContext from "./NoteContext";
import {useState} from 'react'
 
const NoteState = (props)=>{
  const host = "http://node3.somehost.xyz:4070"
    const NotesInitial =[]
      const [notes, setnotes] = useState(NotesInitial)

      // Get All Notes Of a user
      const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
         
          headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3MjVlMDg4NTdhMWVlYWJlZjE2YWUyIn0sImlhdCI6MTYzNDg4NTEyOH0.LxIxUoYrOgSXcMgHWd6W60H5s2prg3XFJaFSo23dW9o"
      
          },
         
        });
        const json = await response.json()
        console.log(json)
        setnotes(json)
      } 
      // Add A New Note
      const addNote = async (title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3MjVlMDg4NTdhMWVlYWJlZjE2YWUyIn0sImlhdCI6MTYzNDg4NTEyOH0.LxIxUoYrOgSXcMgHWd6W60H5s2prg3XFJaFSo23dW9o"
          },
          body: JSON.stringify({title, description, tag})
        });
    
        const note = await response.json();
        setnotes(notes.concat(note))
      }
    
      // Delete A Note
      const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3MjVlMDg4NTdhMWVlYWJlZjE2YWUyIn0sImlhdCI6MTYzNDg4NTEyOH0.LxIxUoYrOgSXcMgHWd6W60H5s2prg3XFJaFSo23dW9o"
          }
        });
        const json = response.json(); 
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)
      }

       // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3MjVlMDg4NTdhMWVlYWJlZjE2YWUyIn0sImlhdCI6MTYzNDg4NTEyOH0.LxIxUoYrOgSXcMgHWd6W60H5s2prg3XFJaFSo23dW9o"
      },
      body: JSON.stringify({title, description, tag})
    });
    // eslint-disable-next-line
    const json = await response.json(); 
     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setnotes(newNotes);
  }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

    }
export default NoteState;