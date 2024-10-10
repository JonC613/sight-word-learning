import React, { useState, useEffect } from 'react';
import './App.css';
import { FluentProvider, webLightTheme, Button, Text } from '@fluentui/react-components';


let words: string[] = ["is", "did", "a", "at", "got", "it", "its", "sit", "fast", "if", "off", "I", "get", "let", "tell", "had", "has", "his", "hot", "the", "cut", "full", "us", "best", "big", "but", "of", "red", "an", "and", "can", "in", "not", "on", "ran", "run", "ten", "no", "am", "him", "must", "for", "help", "pull", "stop", "up", "upon", "put", "seven", "into", "well", "went", "will", "to", "ask", "black", "drink", "pick", "like", "jump", "just", "said", "six", "yes", "you", "was"];
const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [retry, setRetry] = useState<boolean>(false);

  useEffect(() => {
    if (!document.querySelector("script[src='https://code.responsivevoice.org/responsivevoice.js?key=0fwgflrW']")) {
      loadResponsiveVoice();
    }
    shuffleWords();
  }, []);

  const shuffleWords = (): void => {
    words = words.sort(() => Math.random() - 0.5);
  };

  const loadResponsiveVoice = (): void => {
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=0fwgflrW';
    script.async = true;
    document.body.appendChild(script);
  };

  const currentWord: string = words[currentIndex];

  const handleCorrect = (): void => {
    setMessage('Great job!');
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setMessage("You've finished all the words! Amazing work!");
    }
    setRetry(false);
  };

  const handleIncorrect = (): void => {
    setMessage("That's okay, keep trying!");
    setRetry(true);
  };

  const handleRepeat = (): void => {
    setMessage('');
    speakWord(currentWord);
  };

  const speakWord = (word: string): void => {
    if ((window as any).responsiveVoice) {
      (window as any).responsiveVoice.speak(word, "US English Female");
    } else {
      console.error("ResponsiveVoice is not available.");
    }
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App" style={{ minHeight: '100vh', padding: '20px' }}>
        <header className="App-header">
          <Text as="h1" block size={800} style={{ textAlign: 'center', marginBottom: '20px', color: '#ff6347', fontFamily: 'Comic Sans MS, sans-serif', fontSize: '2em' }}>✨ Sight Word Learning Game ✨</Text>
          <WordDisplay word={currentWord} />
          <ControlButtons
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
            onRepeat={handleRepeat}
          />
          <Text className="message" block style={{ textAlign: 'center', marginTop: '20px', color: '#32cd32', fontSize: '1.5em', fontFamily: 'Comic Sans MS, sans-serif' }}>{message}</Text>
        </header>
      </div>
    </FluentProvider>
  );
};

interface WordDisplayProps {
  word: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word }) => {
  return (
    <div className="word-container" style={{ textAlign: 'center', margin: '20px 0' }}>
      <Text className="sight-word" size={900} style={{ display: 'inline-block', textAlign: 'center', color: '#1e90ff', fontSize: '3em', fontFamily: 'Comic Sans MS, sans-serif', padding: '20px', borderRadius: '15px', boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.2)', minWidth: '300px', minHeight: '150px', maxWidth: '90%', wordWrap: 'break-word' }}>🌟 {word} 🌟</Text>
    </div>
  );
};

interface ControlButtonsProps {
  onCorrect: () => void;
  onIncorrect: () => void;
  onRepeat: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ onCorrect, onIncorrect, onRepeat }) => {
  return (
    <div className="buttons" style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button appearance="primary" onClick={onCorrect} style={{ fontSize: '1.2em', padding: '10px 20px', margin: '10px', backgroundColor: '#ff6347', color: 'white', borderRadius: '10px' }}>Correct</Button>
      <Button appearance="primary" onClick={onIncorrect} style={{ fontSize: '1.2em', padding: '10px 20px', margin: '10px', backgroundColor: '#ff6347', color: 'white', borderRadius: '10px' }}>Incorrect</Button>
      <Button appearance="primary" onClick={onRepeat} style={{ fontSize: '1.2em', padding: '10px 20px', margin: '10px', backgroundColor: '#ff6347', color: 'white', borderRadius: '10px' }}>Repeat</Button>
    </div>
  );
};

export default App;