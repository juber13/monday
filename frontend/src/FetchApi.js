

import axios from "axios"

const FetchApi = () => {

const endPoints = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/comments"
]

   const fetchRequests = endPoints.map(url => axios.get(url));
   return Promise.all(fetchRequests);
}

export default FetchApi;
