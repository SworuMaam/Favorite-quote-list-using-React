import React, { useState, useEffect } from 'react';

function App() {
  // Initialize state
  const [quotes, setQuotes] = useState(() => {
    const savedQuotes = localStorage.getItem('quotes');
    return savedQuotes ? JSON.parse(savedQuotes) : [];
  });
  const [newQuote, setNewQuote] = useState('');
  const [author, setAuthor] = useState('');

  // Sync with local storage
  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Add a new quote
  const addQuote = () => {
    if (newQuote.trim() && author.trim()) {
      setQuotes([...quotes, { text: newQuote, author }]);
      setNewQuote('');
      setAuthor('');
    }
  };

  // Delete a quote by index
  const deleteQuote = (index) => {
    setQuotes(quotes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Favorite Quotes</h1>
      
      <div className="flex flex-col md:flex-row mb-4 w-full max-w-md">
        <input
          type="text" value={newQuote} onChange={(e) => setNewQuote(e.target.value)} placeholder="Type your favorite quote"
          className="p-2 border border-gray-300 rounded-t-md md:rounded-l-md md:rounded-t-none focus:outline-none focus:border-blue-500 mb-2 md:mb-0"
        />
        <input
          type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Quoter's name"
          className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addQuote}
          className="bg-blue-500 text-white px-4 rounded-b-md md:rounded-r-md md:rounded-b-none hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md">
        {quotes.map((quote, index) => (
          <li
            key={index}
            className="flex flex-col md:flex-row justify-between items-start p-4 bg-white shadow-md rounded-md mb-2"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">“{quote.text}”</p>
              <p className="text-gray-500">- {quote.author}</p>
            </div>
            <button
              onClick={() => deleteQuote(index)}
              className="text-red-500 hover:text-red-700 mt-2 md:mt-0"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
