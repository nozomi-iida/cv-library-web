export const Book_Add = "Book_Add";
export const BookAddAction = (bookState) => {
  return {
    type: "Book_Add",
    payload:bookState
    ,
  };
};
