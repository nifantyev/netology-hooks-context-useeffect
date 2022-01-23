import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const List = ({ onClick }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(
          'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
        );
        const data = await result.json();
        setUsers(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleClick = (event, info) => {
    event.preventDefault();
    setSelectedId(info.id);
    onClick(info);
  };

  return isLoading ? (
    <div>Загрузка...</div>
  ) : (
    <ul>
      {users.map((o) => (
        <li
          key={o.id}
          style={o.id === selectedId ? { backgroundColor: 'blue' } : {}}
        >
          <a href="#/" onClick={(event) => handleClick(event, o)}>
            {o.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default List;
