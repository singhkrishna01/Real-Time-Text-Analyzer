import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State variables for text input, word count, character count, search and replace strings, and highlighted text
  const [text, setText] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  // useEffect to update word and character counts whenever text changes
  useEffect(() => {
    // Calculate unique word count
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    setUniqueWordCount(uniqueWords.size);

    // Calculate character count excluding spaces and punctuation
    const characters = text.replace(/[^a-zA-Z0-9]/g, '');
    setCharacterCount(characters.length);
  }, [text]);

  // Function to handle replacing all instances of searchString with replaceString
  const handleReplaceAll = () => {
    // Create regex for search and replace
    const regex = new RegExp(`\\b${searchString}\\b`, 'g');
    const newText = text.replace(regex, replaceString);
    setText(newText);

    // Highlight the new replaced word
    const highlightRegex = new RegExp(`\\b${replaceString}\\b`, 'g');
    const highlighted = newText.replace(highlightRegex, `<span class="highlight">${replaceString}</span>`);
    setHighlightedText(highlighted);
  };

  // Copy functionality for the textarea
  const handleCopy = () => {
    const textarea = document.getElementById('txtarea');
    const text = textarea.value;
    navigator.clipboard.writeText(text);
  };

  // Copy functionality for the highlighted text
  const handleCopy1 = () => {
    const textarea = document.querySelector('.highlighted-text');
    const text = textarea.innerText; // Use innerText to get the text content
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="main-container">
      <h1>Real Time Text Analysis and String Replacement</h1>
      <div className="container">
        <div className="box">
          {/* Textarea for user input */}
          <textarea id="txtarea" style={{ marginRight: '1rem' }}
            rows={18}
            cols={90}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text here..."
          />
          {/* Div to display highlighted text */}
          <div
            className="highlighted-text"
            dangerouslySetInnerHTML={{ __html: highlightedText.replace(/\n/g, '<br/>') }}
          />
        </div>
        <div className="butt">
          <div className="btn">
            {/* Button to copy original text */}
            <button onClick={handleCopy}>Copy</button>
          </div>
          <div className="btn">
            {/* Button to copy highlighted text */}
            <button onClick={handleCopy1}>Copy</button>
          </div>
        </div>
        <div className="stats">
          {/* Displaying unique word and character counts */}
          <p>Unique Words: {uniqueWordCount}</p>
          <p>Character Count: {characterCount}</p>
        </div>
        <div className="replace">
          {/* Input fields for search and replace strings */}
          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search String"
          />
          <input
            type="text"
            value={replaceString}
            onChange={(e) => setReplaceString(e.target.value)}
            placeholder="Replace With"
          />
          {/* Button to trigger replace all functionality */}
          <button onClick={handleReplaceAll}>Replace All</button>
        </div>
      </div>
    </div>
  );
};

export default App;
 