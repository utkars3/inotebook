const express=require('express')
const router=express.Router();
const Note  = require('../models/Note')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//ROUTE1:Get All the notes : GET "/api/auth/getuser".login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
     try {
          
     
    const notes=await Note.find({user:req.user.id});
     res.json(notes)
} catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
}
})


//ROUTE2:Add a new notes using : POST "/api/auth/addnote".login required
router.post('/addnote',fetchuser,[
     body('title', 'Enter a valid title').isLength({ min: 3 }),
     body('description', 'Description must be at least 5 characters').isLength({min:5}),   
],async (req,res)=>{

     try {
          
     
     //destructuring
     const {title,description,tag}=req.body;

// If there are errors ,return Bad request and the errors 
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const note=new Note({
     title,description,tag,user:req.user.id
})
const savedNote=await note.save();
res.json(savedNote)

} catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
}
 })


 

//ROUTE3:Update a existing  notes using : put "/api/auth/updatenote".login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
     const {title,description,tag}=req.body;
     try {
          
     
     //create a new note object
     const newNote={};
     if(title){newNote.title=title};
     if(description){newNote.description=description};
     if(tag){newNote.tag=tag};

     //find the note to be updated 
     //params id url me lagi hui id h khud se likha hu
     let note=await Note.findById(req.params.id);
     if(!note){return res.status(404).send("Not Found")};

     //note.user.toString() se uski id milegi (jo user dhoondhne ko bol rha h)
     //req.user.id wo user hai jiski change karna hai
     if(note.user.toString()!= req.user.id){
          return res.status(401).send("Not Allowed");
     }

     note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
     res.json({note})
}catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
}
})


//ROUTE4:Delete a existing  notes using : POST "/api/auth/deletenote".login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
     try { 
     //find the note to be updated and deleted
     //params id url me lagi hui id h khud se likha hu
     let note=await Note.findById(req.params.id);
     if(!note){return res.status(404).send("Not Found")};

     //note.user.toString() se uski id milegi (jo user dhoondhne ko bol rha h)
     //req.user.id wo user hai jiski change karna hai
     //allow deletion only if user owns this
     if(note.user.toString()!= req.user.id){
          return res.status(401).send("Not Allowed");
     }

     // note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
     note = await Note.findByIdAndDelete(req.params.id);
     res.json({"Success":"Note has been deleted",note:note  })
}catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
}
})


module.exports=router 