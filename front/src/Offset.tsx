import { Pagination } from "@mantine/core";
import { useSearchParams } from "wouter";
import { useEffect, useState } from "react";
import { User } from "./domain/user";
import { UserCard } from "./components/card";
import "./offset.css";

function Offset() {
	const [searchParams] = useSearchParams();

	const pageParam = searchParams.get("page");

	const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

	const [content, setContent] = useState<null | {
		users: User[];
		totalPages: number;
	}>(null);

	useEffect(() => {
		fetch(`http://localhost:3001/offset?page=${page}`)
			.then((response) => response.json())
			.then((data) => setContent(data));
	}, [page]);

	if (content === null) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className={"page"}>
			<div className={"grid"}>
				{content.users.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
			<Pagination
				value={page}
				onChange={(x) => setPage(x)}
				total={content.totalPages}
			/>
		</div>
	);
}

export { Offset };
