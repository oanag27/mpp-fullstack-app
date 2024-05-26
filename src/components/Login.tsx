import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://localhost:7149/api/Auth/login',
                {
                    email,
                    password,
                },
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                setMessage('Login successful!');
                window.location.href = '/task';
            } else {
                setMessage('Login failed!');
            }
        } catch (error) {
            setMessage('Error occurred during login.');
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '50px auto',
                padding: '20px',
                boxShadow: '0px 3px 50px #a5a5a5',
                backgroundColor: '#fff',
                borderRadius: '8px',
            }}
        >
            <h2 style={{textAlign: 'center', color: '#3c3c3c'}}>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: '#3c3c3c',
                        }}
                    >
                        Email:
                    </label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: '#3c3c3c',
                        }}
                    >
                        Password:
                    </label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <button
                    type='submit'
                    name='button-login'
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#3c3c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '15px',
                        marginBottom: '15px',
                    }}
                >
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}
            <p>
                Don't have an account?{' '}
                <Link
                    to='/register'
                    style={{
                        textDecoration: 'none',
                        color: 'green',
                    }}
                >
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default Login;
