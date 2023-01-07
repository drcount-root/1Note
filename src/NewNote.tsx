import React from "react";
import NoteForm from "./NoteForm";

const NewNote = () => {
  return (
    <React.Fragment>
      <h1 className="mb-4">New Note</h1>
      <NoteForm />
    </React.Fragment>
  );
};

export default NewNote;
