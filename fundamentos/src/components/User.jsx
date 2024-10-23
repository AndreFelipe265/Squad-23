import React,{ useEffect, useState } from 'react'

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch('http://localhost:5000/users');
            if (!response.ok) {
              throw new Error('Erro ao buscar usuários');
            }
            const data = await response.json();
            setUsers(data.users);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []);
    
      if (loading) return <div>Carregando...</div>;
      if (error) return <div>Erro: {error}</div>;
    
  return (
    <div>
        <p></p>
    </div>
  )
}

export default User