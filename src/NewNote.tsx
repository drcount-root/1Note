import React from "react";
import NoteForm from "./NoteForm";
import { NoteData } from "./App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};

const NewNote = ({ onSubmit }: NewNoteProps) => {
  return (
    <React.Fragment>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </React.Fragment>
  );
};

export default NewNote;
