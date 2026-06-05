import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NoteContext = createContext();

// Default Export - This helps Vite Fast Refresh
const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, setNotes, fetchNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;