import React, { useEffect, useState } from "react";
import { Paper, Grid, Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const deleteHandler = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <Container>
      {/* <Grid container>
        <Grid item md={3} xs={12} sm={6}>
          <Paper>1</Paper>
        </Grid>

        <Grid item md={3} xs={12} sm={6}>
          <Paper>2</Paper>
        </Grid>

        <Grid item md={3} xs={12} sm={6}>
          <Paper>3</Paper>
        </Grid>
        <Grid item md={3} xs={12} sm={6}>
          <Paper>4</Paper>
        </Grid>
      </Grid>
 */}

      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} deleteHandler={deleteHandler} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notes;
