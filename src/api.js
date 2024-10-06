import axios from 'axios';

export const register = async (credentials) => {
    try {
        const response = await axios.post('https://demo2.z-bit.ee/users', {
            username: credentials.username,
            firstname: credentials.firstname,
            lastname: credentials.lastname,
            newPassword: credentials.newPassword

        });

        sessionStorage.setItem("access_token", response.data.access_token)
        sessionStorage.setItem("username", response.data.username)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post('https://demo2.z-bit.ee/users/get-token', {
            username: credentials.username,
            password: credentials.password
        });

        sessionStorage.setItem("access_token", response.data.access_token)
        sessionStorage.setItem("username", response.data.username)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTask = async (token) => {
    try {
        const response = await axios.get('https://demo2.z-bit.ee/tasks', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);

        // Collect all tasks in an array
        const tasks = response.data.map(task => ({
            id: task.id,
            name: task.title,
            completed: task.marked_as_done,
            description: task.desc
        }));

        // Log all tasks
        tasks.forEach(task => console.log(task));

        // Return the array of tasks
        return tasks;
    } catch (error) {
        throw error;
    }
};

export const addTask = async (token, title, desc) => {
    try {
        const response = await axios.post('https://demo2.z-bit.ee/tasks', {
            title: title,
            desc: desc
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data; // Return the newly created task
    } catch (error) {
        throw error;
    }
};

export const changeName = async (token, title, id, desc) => {
    try {

        console.log("Token:", token);
        console.log("Data:", { title, id});

        const response = await axios.put('https://demo2.z-bit.ee/tasks/' + id, {
            title: title,
            desc: desc
            }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        throw error;
    }
};

export const changeDesc = async (token, title, id, desc) => {
    try {

        const response = await axios.put('https://demo2.z-bit.ee/tasks/' + id, {
            title: title,
            desc: desc
            }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        throw error;
    }
};

export const changeCompleted = async (token, change, id ) => {
    try {

        const response = await axios.put('https://demo2.z-bit.ee/tasks/' + id, {
            marked_as_done: change
            }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (token, id ) => {
    try {

        const response = await axios.delete('https://demo2.z-bit.ee/tasks/' + id, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        throw error;
    }
};