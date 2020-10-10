import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const BookListItem = ({ book }) => {
  const classes = useStyles();

  const reviews = book.reviews;
  return (
    <div>
      <Link style={{ display: "flex" }} to={`/book/${book.documentId}`}>
        <ListItemText
          className={classes.list}
          primary={book.title}
          classes={{ primary: classes.primary }}
        />
        {book.status === "読了" && (
          <Rating
            name="half-rating-read"
            defaultValue={reviews}
            precision={0.5}
            readOnly
          />
        )}
      </Link>
      <Divider />
    </div>
  );
};

export default BookListItem;
