import { useEffect, useState } from "react";


function Offset() {

    const [page, setPage] = useState(1);

    const [content, setContent] = useState(null);


    useEffect(() => {
        fetch('http://localhost:3001/offset?limit=5&offset=5')
            .then(response => response.json())
            .then(data => setContent(data))
    }, [])

    
    
    return (
        <h1>Offset</h1>
    )
}

export { Offset }