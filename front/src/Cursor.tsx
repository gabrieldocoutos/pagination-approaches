import { useEffect, useState, useRef } from "react";
import { UserCard } from "./components/card";
import { User } from "./domain/user";
import "./cursor.css";

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
	const [isLoading, setIsLoading] = useState(false);
	const observerTarget = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const first = entries[0];
				if (first.isIntersecting && !isLoading && response?.next_cursor) {
					setCursor(response.next_cursor);
					setIsLoading(true);
				}
			},
			{ threshold: 0.1 }
		);

		const currentTarget = observerTarget.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [isLoading, response?.next_cursor]);

	useEffect(() => {
		fetchUsers(cursor).then((data: ApiResponse) => {
			setResponse((prevState) => ({
				users: prevState?.users
					? [...prevState.users, ...data.users]
					: data.users,
				next_cursor: data.next_cursor,
				prev_cursor: data.prev_cursor,
			}));
			setIsLoading(false);
		});
	}, [cursor]);

	if (response === null) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			<div className={"grid"}>
				{response.users.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
			<div ref={observerTarget} style={{ height: "20px" }}>
				{isLoading && <p>Loading more users...</p>}
			</div>
		</div>
	);
}

export { Cursor };
