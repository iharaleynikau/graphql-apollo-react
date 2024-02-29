import { useEffect, useState } from 'react';
import { Input, Button, Spin } from 'antd';
import './App.css';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../query/user';
import { CREATE_USER } from '../../mutations/user';

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [inputValues, setInputValues] = useState({
    username: '',
    age: 0
  });
  const [users, setUsers] = useState([]);

  const [newUser] = useMutation(CREATE_USER);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  const onChangeInput = event => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const getAll = event => {
    event.preventDefault();
    refetch();
  };

  const addUser = event => {
    event.preventDefault();
    const { username, age } = inputValues;
    console.log(username, age);

    newUser({
      variables: {
        input: {
          username,
          age
        }
      }
    }).then(({ data }) => {
      console.log(data);
    });
  };

  return (
    <div className="main">
      <Spin spinning={loading}>
        <div className="main__content-wrapper">
          <Input
            onChange={onChangeInput}
            name="username"
            value={inputValues.username}
            style={{ marginBottom: '30px' }}
          />
          <Input onChange={onChangeInput} name="age" value={inputValues.age} type="number" />
          <div className="button-container">
            <Button onClick={addUser} style={{ marginRight: '15px' }}>
              Create
            </Button>
            <Button onClick={getAll}>Get</Button>
          </div>
          <div className="data-container">
            {users.map(user => {
              return (
                <div className="data-block" key={user.id}>
                  <span>
                    {user.username}, {user.age}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default App;
