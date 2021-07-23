import React, { useState } from "react";
import {
  Typography,
  Button,
  ButtonGroup,
  Container,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { RadioGroup } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  /*  btn: {
    fontSize: 20,
    backgroundColor: "violet",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  title: {
    textDecoration: "underline",
    margin: 20,
  }, */
});
const Create = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, currentCategory }),
      }).then(() => history.push("/"));
    }
  };
  return (
    <Container>
      <Typography
        /*         className={classes.title}
         */ variant="h4"
        color="textSecondary"
        display="block"
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form autoComplete="off" onSubmit={submitHandler}>
        <TextField
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(false);
          }}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          error={titleError}
        />

        <TextField
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            setDetailsError(false);
          }}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          /*         className={classes.btn}
           */ type="submit"
          color="secondary"
          variant="contained"
          /*         startIcon={<AddIcon />}
           */ endIcon={<SendIcon />}
        >
          Create
        </Button>
      </form>

      {/*  <ButtonGroup color="secondary" variant="contained">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
 */}
      {/* <Typography color="error" noWrap>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
        maxime laboriosam sequi illo quis consectetur explicabo sapiente unde
        dignissimos eius?
      </Typography> */}

      {/* Typography = p
       variant = h tags
        color = error
        align = center
        display = block
        component = h2 === it looks like h2 on console
        gutterBottom*/}
    </Container>
  );
};

export default Create;
