export const registerUser = async (data) => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3000/api/user', option)
        .then(data => data.json())
    localStorage.setItem('token', response.token)
    return response
}