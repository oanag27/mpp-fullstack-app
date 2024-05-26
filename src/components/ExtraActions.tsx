import React, {useState, useEffect} from 'react';

interface UserModel {
    userId: number;
    email: string;
    password: string;
    role: number;
}

const ExtraActionsPage = () => {
    const [userUsers, setUserUsers] = useState<UserModel[]>([]);
    const [managerUsers, setManagerUsers] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState(true);
    const user = 'User';
    const manager = 'Manager';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch(
                    `https://localhost:7149/api/User/GetUsersByRole/${user}`,
                );
                const managerResponse = await fetch(
                    `https://localhost:7149/api/User/GetUsersByRole/${manager}`,
                );

                if (!userResponse.ok || !managerResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const userData = await userResponse.json();
                const managerData = await managerResponse.json();

                setUserUsers(userData);
                setManagerUsers(managerData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleDelete = async (email: string) => {
        try {
            const response = await fetch(
                `https://localhost:7149/api/User/DeleteUser/${email}`,
                {
                    method: 'DELETE',
                },
            );
            if (response.ok) {
                setUserUsers((prevUsers) =>
                    prevUsers.filter((user) => user.email !== email),
                );
                setManagerUsers((prevUsers) =>
                    prevUsers.filter((user) => user.email !== email),
                );
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdate = (userId: number) => {
        console.log('Update user with ID:', userId);
        // Implement update logic here
    };

    return (
        <div>
            <h2>Users</h2>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <>
                    <div>
                        <h3>User Role Users</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userUsers.length > 0 ? (
                                    userUsers.map((user: UserModel) => (
                                        <tr key={user.userId}>
                                            <td>{user.userId}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <i
                                                    className='far fa-edit edit-icon'
                                                    data-testid='edit-icon'
                                                    style={{
                                                        color: '#3c3c3c',
                                                        cursor: 'pointer',
                                                        marginLeft: '15px',
                                                    }}
                                                    onClick={() =>
                                                        handleUpdate(
                                                            user.userId,
                                                        )
                                                    }
                                                ></i>
                                                <i
                                                    className='fas fa-trash-alt'
                                                    data-testid='delete-icon'
                                                    style={{
                                                        marginRight: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        handleDelete(user.email)
                                                    }
                                                ></i>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2}>No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3>Manager Role Users</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {managerUsers.length > 0 ? (
                                    managerUsers.map((user: UserModel) => (
                                        <tr key={user.userId}>
                                            <td>{user.userId}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <i
                                                    className='far fa-edit edit-icon'
                                                    data-testid='edit-icon'
                                                    style={{
                                                        color: '#3c3c3c',
                                                        cursor: 'pointer',
                                                        marginLeft: '15px',
                                                    }}
                                                    onClick={() =>
                                                        handleUpdate(
                                                            user.userId,
                                                        )
                                                    }
                                                ></i>
                                                <i
                                                    className='fas fa-trash-alt'
                                                    data-testid='delete-icon'
                                                    style={{
                                                        marginRight: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        handleDelete(user.email)
                                                    }
                                                ></i>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2}>No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExtraActionsPage;
