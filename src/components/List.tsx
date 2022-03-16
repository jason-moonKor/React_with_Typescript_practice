import Layout from "./Layout";
import React, {useEffect} from "react";
import {Button, PageHeader, Table} from "antd";
import {BookType} from "../types";
import Book from "./Book";
import styles from "./List.module.css";

interface ListProps {
	books: BookType[] | null;
	loading: boolean;
	error: Error | null;
	getBooks: () => void;
	logout: () => void;
	goAdd: () => void;
	deleteBook: (bookId: number) => void;
}
const List: React.FC<ListProps> = ({
	error,
	logout,
	books,
	loading,
	getBooks,
	goAdd,
	deleteBook
}) => {
	useEffect(() => {
		getBooks();
	}, [getBooks]);

	useEffect(() => {
		if (error) {
			logout();
		}
	}, [error, logout]);

	return (
		<Layout>
			<PageHeader
				title={<div>Book List</div>}
				extra={[
					<Button
						className={styles.button}
						key="2"
						type="primary"
						onClick={goAdd}
					>
						Add Book
					</Button>,
					<Button
						className={styles.button}
						key="1"
						type="primary"
						onClick={logout}
					>
						LogOut
					</Button>
				]}
			/>
			<Table
				dataSource={books || []}
				columns={[
					{
						title: "Book",
						dataIndex: "book",
						key: "book",
						render: (text, record) => (
							<Book {...record} deleteBook={deleteBook} />
						)
					}
				]}
				loading={books === null || loading}
				showHeader={false}
				rowKey="bookId"
				pagination={false}
				className={styles.table}
			/>
		</Layout>
	);
};

export default List;
