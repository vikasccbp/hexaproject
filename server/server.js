const express = require("express");

const cors = require('cors');

const axios = require("axios");

const app = express();

const PORT = 8001;

app.use(cors());

app.use(express.json());

// Endpoint to fetch combined user and post data
app.get('/v1/users', async (request, response) => {
    try {
        // Fetch user data
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = usersResponse.data;

        // Fetch post data
        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = postsResponse.data;

        // Combine user and post data based on userId
        const combinedData = users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);
            return { ...user, posts: userPosts };
        });

        // Search functionality

        const searchText = request.query.searchText;
        if (searchText) {
            const filteredData = combinedData.filter(user =>
                user.name.toLowerCase().includes(searchText.toLowerCase())
            );
            return response.json(filteredData);
        }

        // Send the combined data as a response
        
        response.json(combinedData);
    } catch (error) {
        console.error(error);
        request.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
