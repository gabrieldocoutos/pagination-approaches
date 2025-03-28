import { useEffect, useState } from "react";
import { UserCard } from "./components/card";
import { User } from "./domain/user";
import "./cursor.css";
import { Button } from "@mantine/core";

type ApiResponse = {
	users: User[];
	prev_cursor: number;
	next_cursor: number;
};

async function fetchUsers(cursor: number) {
	const response = await fetch(
		`http://localhost:3001/cursor?next_cursor=${cursor}`
	);
	return response.json();
}

function Cursor() {
	const [response, setResponse] = useState<null | ApiResponse>(null);
	const [cursor, setCursor] = useState(0);

	useEffect(() => {
		fetchUsers(cursor).then((data: ApiResponse) =>
			setResponse((prevState) => ({
				users: prevState?.users
					? [...prevState.users, ...data.users]
					: data.users,
				next_cursor: data.next_cursor,
				prev_cursor: data.prev_cursor,
			}))
		);
	}, [cursor]);

	if (response === null) {
		return <h1>Loading...</h1>;
	}

	const foo = response.users.slice();

	return (
		<div>
			<div className={"grid"}>
				{foo.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
			<Button onClick={() => setCursor(response.next_cursor)}>load more</Button>
		</div>
	);
}

export { Cursor };
