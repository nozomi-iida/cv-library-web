import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const BookListItem = ({ book }) => {
  const classes = useStyles();

  return (
    <div>
      <Link to={`/book/${book.id}`}>
        <ListItemText
          className={classes.list}
          primary={book.title}
          classes={{ primary: classes.primary }}
        />
      </Link>
      <Divider />
    </div>
  );
};

export default BookListItem;
