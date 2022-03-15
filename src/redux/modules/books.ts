import {push} from "connected-react-router";
import {Action} from "redux-actions";
import {createActions, handleActions} from "redux-actions";
import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects";
import BookService from "../../services/BookService";
import {BookReqType, BooksState, BookType} from "../../types";

const initialState: BooksState = {
	books: null,
	loading: false,
	error: null
};

const prefix = "my-books/books";

export const {pending, success, fail} = createActions(
	"PENDING",
	"SUCCESS",
	"FAIL",
	{prefix}
);

const reducer = handleActions<BooksState, BookType[]>(
	{
		PENDING: (state) => ({...state, loading: true, error: null}),
		SUCCESS: (state, action) => ({
			books: action.payload,
			loading: false,
			error: null
		}),
		FAIL: (state, action: any) => ({
			...state,
			loading: false,
			error: action.payload
		})
	},
	initialState,
	{prefix}
);

export default reducer;

//saga

export const {getBooks, addBook} = createActions("GET_BOOKS", "ADD_BOOK", {
	prefix
});

function* getBooksSaga() {
	try {
		yield put(pending());
		const token: string = yield select((state) => state.auth.token);
		const books: BookType[] = yield call(BookService.getBooks, token);
		yield put(success(books));
	} catch (error) {
		yield put(fail(new Error(error?.reponse?.data?.error || "모르는 에러")));
	}
}

function* addBookSaga(action: Action<BookReqType>) {
	try {
		yield put(pending());
		const token: string = yield select((state) => state.auth.token);
		const book: BookType = yield call(
			BookService.addBook,
			token,
			action.payload
		);
		const books: BookType[] = yield select((state) => state.books.books);
		yield put(success([...books, book]));
		yield put(push("/"));
	} catch (error) {
		yield put(fail(new Error(error?.response?.data?.error || "모르는 에러!")));
	}
}

export function* booksSaga() {
	yield takeLatest(`${prefix}/GET_BOOKS`, getBooksSaga);
	yield takeEvery(`${prefix}/ADD_BOOK`, addBookSaga);
}
