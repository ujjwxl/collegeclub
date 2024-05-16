import React from 'react'
import { useState,useEffect } from 'react';

const TypingPlaceholderInput = ({placeholderText}) => {
    const [placeholder, setPlaceholder] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typingText, setTypingText] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        const currentText = placeholderText[currentIndex];
        if (typingText.length < currentText.length) {
          setTypingText(currentText.substring(0, typingText.length + 1));
        } else {
          clearInterval(interval);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderText.length);
          setTypingText('');
        }
      }, 180);
  
      return () => clearInterval(interval);
    }, [currentIndex, placeholderText, typingText]);
  
    useEffect(() => {
      setPlaceholder(typingText);
    }, [typingText]);
  
    return <input type="text" placeholder={`try searching for ${placeholder}`} />;
}

export default TypingPlaceholderInput
