import React,{useContext,useEffect,useRef,useState}  from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from "./Noteitem"
import Addnote from "./Addnote";
import { useNavigate } from 'react-router-dom';
const Notes   = (props) => {
    const context=useContext(noteContext);
  const {notes,getNotes,editNote}=context;
  const [note, setNote] = useState({id:"", etitle:"",edescription:"",etag:"default"})
const history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }else {
      history("/login")
    }
    // eslint-disable-next-line
  },[])

const ref=useRef(null);
const refClose=useRef(null);

  const updateNote=(currentnote)=>{
     ref.current.click();
      setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
   }

  const handleClick=(e)=>{

    
    
    console.log("Updating the note" , note)
    
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully","success");
  }
  const onChange=(e)=>{
    ///... ka matlab pahle se same rakho aur baad me daal do
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
    <Addnote showAlert={props.showAlert}/>
<button  ref={ref} type="button"  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">Title</label>
            <input type="text" minLength={5} required className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">Description</label>
            <input type="text" minLength={5} required className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
          </div>
         
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
      
        <h1>Your Notes</h1>
        <div className="container mx-2minlength={5} required ">        {notes.length===0 && 'No notes to display'}</div>
        {notes.map((notes)=>{
          return <Noteitem key={notes._id} note={notes} updateNote={updateNote} showAlert={props.showAlert}/>
        })}
      </div> 
      </>
  )
}

export default Notes
