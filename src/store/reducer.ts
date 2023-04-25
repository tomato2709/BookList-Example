import { Book, BookAction, BookActionTypes } from './actions';

export interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

export const bookReducer = (state = initialState, action: BookAction): BookState => {
  switch (action.type) {
    case BookActionTypes.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case BookActionTypes.EDIT_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case BookActionTypes.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    default:
      return state;
  }
};