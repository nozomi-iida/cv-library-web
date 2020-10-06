import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  primary: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}

const BookListItem = ({ book }) => {
  const history = useHistory();
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
