import React from "react";
import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidv4 } from "uuid";

import NewNote from "./NewNote";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <React.Fragment>
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />

          {/* id could be a num or letter. url ex- localhost:5173/a or localhost:5173/1 etc.*/}
          <Route path="/:id">
            {/* using index so that at localhost:5173/1 url, it will view/show Show page*/}
            <Route index element={<h1>Show</h1>} />
            {/* at localhost:5173/1/edit url, it will show Edit page*/}
            <Route path="edit" element={<h1>Edit</h1>} />
          </Route>

          {/* if path provided by user doesn't matches with any of the defined paths, then it navigates/redirects the user to the homepage */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
