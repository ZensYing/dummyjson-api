document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
            expiresInMins: 30 // This is optional
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.token) {
            // Store the token in local storage
            localStorage.setItem('userToken', data.token);
            
            // Redirect to index.html with a success message
            Swal.fire({
                title: 'Success!',
                text: 'Login successful.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'index.html';
                }
            });
        } else {
            // Login failed, show error message
            Swal.fire({
                title: 'Failed!',
                text: 'Login failed. Please check your credentials.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        // Show error message using SweetAlert
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred during login. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
});
