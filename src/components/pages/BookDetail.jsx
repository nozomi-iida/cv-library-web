import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteModal from "../templates/DeleteModal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 350,
    margin: "auto",
    marginTop: 10,
    justifyContent: "center",
    paddingBottom: 60,
  },
  back: {
    padding: 0,
  },
  text: {
    margin: 0,
  },
  img: {
    maxWidth: 150,
    borderColor: "#3399FF",
  },
  overview: {
    display: "flex",
    justifyContent: "space-between",
  },
  description: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  info: {
    color: "#808080",
  },
  button: {
    width: 170,
    margin: "auto",
    marginTop: 15,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  contents: {
    marginTop: 13,
  },
  more: {
    textAlign: "right",
  },
  read: {
    padding: 0,
  },
  sentence: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 4,
    overflow: "hidden",
  },
}));

export default function BookDetail({ history }) {
  const { id } = useParams();
  const books = useSelector((state) => state.books);
  const book = books.find((b) => b.id === id);
  const classes = useStyles();
  const handleBack = () => {
    history.push("/");
  };
  const [open, setOpen] = useState(false);
  const date = new Date(book.time.seconds * 1000);
  const manth = date.getMonth() + 1;
  const date1 =
    date.getFullYear() + "年" + manth + "月" + date.getDate() + "日";
  return (
    <div className={classes.root}>
      <Button className={classes.back} onClick={handleBack}>
        ←戻る
      </Button>
      <div className={classes.overview}>
        <img
          className={classes.img}
          src={`${process.env.PUBLIC_URL}/reactimg.jpg`}
          border="4"
        />
        <div className={classes.description}>
          <h4 className={classes.text}>{book.title}</h4>
          <div className={classes.info}>
            <p>作成者：{book.username}</p>
            <p className={classes.text}>{`作成日：${date1}`}</p>
          </div>
        </div>
      </div>
      <div className={classes.details}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableElevation
        >
          本を購入する
        </Button>
        <div className={classes.contents}>
          <h3 className={classes.text}>本の簡単な概要</h3>
          <p className={classes.text + " " + classes.sentence}>
            {book.details}
          </p>
          <div className={classes.more}>
            <Button className={classes.read}>全文を読む</Button>
          </div>
        </div>
        <div className={classes.contents}>
          <h3 className={classes.text}>読みたい理由</h3>
          <p className={classes.text + " " + classes.sentence}>{book.reason}</p>
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableElevation
        >
          編集する
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleOpen}
        >
          削除する
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableElevation
        >
          読了
        </Button>
      </div>
      <DeleteModal open={open} setOpen={setOpen} />
    </div>
  );
}
