import { createContext, useState } from "react";

// Create Context
export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Learn Context API",
      content: "Context API helps avoid prop drilling in React.",
      date: "2026-06-03",
    },
  ]);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};