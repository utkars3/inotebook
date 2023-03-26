
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:4000"


    const notesInitial=[]

      const [notes, setnotes] = useState(notesInitial)


      //Get all Notes
      const getNotes=async ()=>{

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        //getting input 
        const json=await response.json();
        setnotes(json);
       
      }




      //add a Note
      const addNote=async (title,description,tag)=>{
        //TODO API CALL

        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
         const note=await response.json();
         setnotes(notes.concat(note))
      
      }




      //Delete a Note
      const deleteNote=async (id)=>{
         
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json=response.json();
        console.log(json);  
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setnotes(newNotes);
      }

      //Edit a Note
      const editNote=async (id,title,description,tag)=>{
         //TODO API CALL

         const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
        const json=await response.json(); 
     console.log(json);
      

        let newNotes=JSON.parse(JSON.stringify(notes))
         //logic to edit client side
        for (let index = 0; index < newNotes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
          
        }
        setnotes(newNotes);
      }




//   const s1={
//     "name":"Harry",
//     "class":"5b"
//   }

//   const [state, setstate] = useState(s1);
//   const update=()=>{
//     setTimeout(()=>{
//         setstate({
//             "name":"Larry",
//             "class":"10b"
//         })
//     },1000)
//   }






    return(
        // <NoteContext.Provider value={{state,update}}>


        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;