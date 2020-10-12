export const Book_Status = "Book_Status";

export const BookStatusChange = (bookStatus) => {
  return {
    type: Book_Status,
    payload: bookStatus,
  };
};
