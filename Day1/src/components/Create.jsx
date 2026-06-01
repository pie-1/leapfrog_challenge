import {nanoid} from 'nanoid';
import { useState } from 'react';

const Create = ({todos,settodos}) => {
    const[title, settitle] = useState("");
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(!title.trim()) return;       // If the title is empty or contains only whitespace, do not add a new todo

        const newTodo = {
            id : nanoid(),
            title,
            isCompleted : false
        };
        settodos([...todos, newTodo]);  // Spread operator is used to create a new array with the existing todos and the new todo
        settitle("");                   // Clear the input field after adding a new todo
    }
  return (
    <div className="w-1/2 text-white">
      <h1 className="text-6xl font-light leading-tight">
        Set <span className="text-red-400">Reminders</span>
        <br />
        for tasks
      </h1>

      <form onSubmit={submitHandler} className="mt-20">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full bg-transparent border-b
            border-gray-500
            py-3
            text-xl
            outline-none
            text-gray-200
            placeholder:text-gray-400
          "
        />

        <button
          type="submit"
          className="mt-12 border border-gray-400
            px-10
            py-4
            text-xl
            hover:bg-white
            hover:text-black
            transition-all
          "
        >
          Create Todo
        </button>
      </form>        
    </div>
  )
}

export default Create