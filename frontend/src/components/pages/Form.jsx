import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  font: {
    color: "red",
  },
}));

export default function Form() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h3
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 0,
              fontWeight: "normal",
            }}
          >
            タイトル*
          </h3>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="title"
            name="title"
            autoComplete="title"
            autoFocus
            inputRef={register({ required: true })}
          />

          {errors.title && (
            <span className={classes.font}>書き忘れています</span>
          )}
          <h3
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 0,
              fontWeight: "normal",
            }}
          >
            AmaszonのURL*
          </h3>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="url"
            type="url"
            id="url"
            inputRef={register({ required: true })}
          />
          {errors.url && <span className={classes.font}>書き忘れています</span>}
          <h3
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 0,
              fontWeight: "normal",
            }}
          >
            本の簡単な詳細*
          </h3>
          <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            rows={5}
            name="details"
            type="details"
            id="details"
            inputRef={register({ required: true })}
          />
          {errors.details && (
            <span className={classes.font}>書き忘れています</span>
          )}
          <h3
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 0,
              fontWeight: "normal",
            }}
          >
            読みたい理由*
          </h3>
          <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            rows={5}
            name="reason"
            type="text"
            id="reason"
            inputRef={register({ required: true })}
          />
          {errors.reason && (
            <>
              <span className={classes.font}>書き忘れています</span>
              <br />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            追加する
          </Button>
        </form>
      </div>
    </Container>
  );
}
