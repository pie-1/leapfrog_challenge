import { useState, useRef, useEffect } from 'react';

const TextInput = ({ onAddText, onCancel }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddText(text.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-2xl border border-[#333] w-96">
        <h3 className="text-white font-medium mb-4">Add Text</h3>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text here..."
            className="w-full p-3 bg-[#2a2a2a] text-white rounded-lg border border-[#444] focus:outline-none focus:border-[#4a9eff]"
          />
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#333] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-[#3a8eef] transition"
            >
              Add Text
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextInput;