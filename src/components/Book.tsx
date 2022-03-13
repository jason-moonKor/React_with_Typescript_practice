import {Link} from "react-router-dom";
import {
	BookOutlined,
	DeleteOutlined,
	EditOutlined,
	HomeOutlined
} from "@ant-design/icons";
import React from "react";
import {BookType} from "../types";
import moment from "moment";
import {Button, Tooltip} from "antd";
import styles from "./Book.module.css";

interface BookProps extends BookType {}

const Book: React.FC<BookProps> = ({url, bookId, title, author, createdAt}) => (
	<div className={styles.book}>
		<div className={styles.title}>
			<Link to={`/book/${bookId}`} className={styles.link_detail_title}>
				<BookOutlined />
				{title}
			</Link>
		</div>
		<div className={styles.author}>
			<Link to={`/book/${bookId}`} className={styles.link_detail_author}>
				{author}
			</Link>
		</div>
		<div className={styles.created}>
			{moment(createdAt).format("MM-DD-YYYY hh:mm a")}
		</div>
		<div className={styles.tooltips}>
			<Tooltip title={url}>
				<a
					className={styles.link_url}
					href={url}
					rel="noreferrer"
					target="_BLANK"
				>
					<Button
						size="small"
						type="primary"
						shape="circle"
						icon={<HomeOutlined />}
						className={styles.button_url}
					/>
				</a>
			</Tooltip>
			<Tooltip title="Edit">
				<Button
					className={styles.button_edit}
					size="small"
					shape="circle"
					icon={<EditOutlined />}
				/>
			</Tooltip>
			<Tooltip title="Delete">
				<Button
					className={styles.button_delete}
					size="small"
					type="primary"
					shape="circle"
					danger
					icon={<DeleteOutlined />}
				/>
			</Tooltip>
		</div>
	</div>
);

export default Book;
