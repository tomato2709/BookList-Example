export enum BookActionTypes {
    ADD_BOOK = 'ADD_BOOK',
    EDIT_BOOK = 'EDIT_BOOK',
    DELETE_BOOK = 'DELETE_BOOK',
  }
  
  export interface Book {
    id: number;
    title: string;
    author: string;
  }
  
  export interface AddBookAction {
    type: typeof BookActionTypes.ADD_BOOK;
    payload: Book;
  }
  
  export interface EditBookAction {
    type: typeof BookActionTypes.EDIT_BOOK;
    payload: Book;
  }
  
  export interface DeleteBookAction {
    type: typeof BookActionTypes.DELETE_BOOK;
    payload: number;
  }
  
  export type BookAction = AddBookAction | EditBookAction | DeleteBookAction;