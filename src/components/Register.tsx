import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://localhost:7149/api/Auth/register',
                {
                    email,
                    password,
                },
            );

            if (response.data) {
                setMessage('Registration successful!');
                window.location.href = '/';
            } else {
                setMessage('Registration failed!');
            }
        } catch (error) {
            setMessage('Error occurred during registration.');
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
            <h2 style={{textAlign: 'center', color: '#3c3c3c'}}>Register</h2>
            <form onSubmit={handleRegister}>
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
                    Register
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
