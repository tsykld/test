import { useEffect, useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const [todos, setToDos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleInputChange = (event) => {
    setInputValue(capitalizeFirstLetter(event.target.value))
  }

  const addToDo = () => {
    if (inputValue.trim()) {
        setToDos([...todos, {text: inputValue.trim(), completed: false}]);
        setInputValue('')
    }
  }

  const toggleToDo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setToDos(updatedTodos);
  }

  const deleteToDo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setToDos(updatedTodos);
  }


  const tabs = () => {
    switch (activeTab) {
      case 1: 
        return (
          <div>
            <div className='flex mb-6'>
              <input 
                type='text'
                placeholder='add details'
                value={inputValue}
                onChange={handleInputChange}
                className='pl-3 pr-48 mr-12 border rounded-lg'
              />
              <button onClick={addToDo} className='text-white bg-blue-700 px-8 py-3.5 rounded-lg'>Add</button>
            </div>
            <ul>
                  {todos.map((todo, index) => (
                      <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
                          <input type='checkbox' checked={todo.completed} onChange={() => toggleToDo(index)} className='mr-3'/>
                          {todo.text}
                      </li>
                  ))}
              </ul>
          </div>
        );
      case 2: 
        return (
          <div>
            <div className='flex mb-6'>
              <input 
                type='text'
                placeholder='add details'
                value={inputValue}
                onChange={handleInputChange}
                className='pl-3 pr-48 mr-12 border rounded-lg'
              />
              <button onClick={addToDo} className='text-white bg-blue-700 px-8 py-3.5 rounded-lg'>Add</button>
            </div>
            <ul>
              {todos.filter(todo => !todo.completed).map((todo, index) => (
                <li key={index}>
                  <input type='checkbox' checked={todo.completed} onChange={() => toggleToDo(index)} className='mr-3'/>
                  {todo.text}
                </li>
              ))}
            </ul>
          </div>
        )
      case 3:
        return (
          <div>
            <ul className='mb-7'>
              {todos.filter(todo => todo.completed).map((todo, index) => (
                <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
                  <input type='checkbox' checked={todo.completed} onChange={() => toggleToDo(index)} className='mr-3'/>
                  <span className='mr-80'>{todo.text}</span>
                  <button onClick={() => deleteToDo(index)}><FontAwesomeIcon icon={faTrash} /></button>
                </li>
              ))}
            </ul>
            <button className='bg-red-500 text-white px-7 py-3.5 border rounded-md text-xs float-right' onClick={() => setToDos([])}><FontAwesomeIcon icon={faTrash} /> Delete All</button>
          </div>
        )
      default:
        return null;
    }
  }

  return (
    <div className='max-w-md md:max-w-xl mx-auto'>

      <p className='text-center text-3xl font-bold my-7'>#todo</p>

      <div className='border-b-2 mb-4 flex justify-around'>
        <button 
          className={`py-2 px-4 ${activeTab === 1 ? 'border-b-4 border-blue-700 text-black' : 'none'}`}
          onClick={() => setActiveTab(1)}>
            All
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 2 ? 'border-b-4 border-blue-700 text-black' : 'none'}`}
          onClick={() => setActiveTab(2)}
        >
           Active
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 3 ? 'border-b-4 border-blue-700 text-black' : 'none'}`}
          onClick={() => setActiveTab(3)}
        >
           Completed
        </button>
      </div>

      <div className="p-4">
        {tabs(activeTab)}
      </div>

    </div>
  );
}

export default App;
