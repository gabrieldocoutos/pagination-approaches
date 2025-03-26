import { useEffect, useState } from "react";


type User = {
    id: number;
    name: string;
    email: string;
}

type ApiResponse =  {
    users: User[];
    prev_cursor: number;
    next_cursor: number;
}

async function fetchUsers(cursor: number) {
    const response = await fetch(`http://localhost:3001/cursor?next_cursor=${cursor}`);
    return response.json();
}


function Cursor() {

    const [response, setResponse] = useState<null | ApiResponse>(null);
    const [cursor, setCursor] = useState(0);

    useEffect(() => {
        fetchUsers(cursor).then((data: ApiResponse) => setResponse(data))
    }, [cursor])

    console.log(response)

    if (response === null) {
        return <h1>Loading...</h1>
    }
    
    return (
        <div>
            {response.users.map(user => <div key={user.id}>
                    <h2>name: {user.name}</h2>
                    <p>email: {user.email}</p>
                    <span>id: {user.id}</span>
                    </div>)}

            <button onClick={() => setCursor(response.prev_cursor)}>Previous</button>
            <button onClick={() => setCursor(response.next_cursor)}>Next</button>
        </div>
    )
}

export { Cursor }