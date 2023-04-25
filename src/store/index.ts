import { combineReducers, createStore } from 'redux';
import { bookReducer, BookState } from './reducer';

export interface RootState {
  bookState: BookState;
}

const rootReducer = combineReducers<RootState>({
  bookState: bookReducer,
});

export const store = createStore(rootReducer);