import React, { useState, useEffect } from 'react';
import './App.css';
import { FluentProvider, webLightTheme, Button, Text } from '@fluentui/react-components';

let words: string[] = [
  'is','off','got','had','did','the','fast','it','a','I','cut','at','let','his','sit','full','get','us','tell','its','has','if','hot'
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [retry, setRetry] = useState<boolean>(false);

  useEffect(() => {
    shuffleWords();
  }, []);

  const shuffleWords = (): void => {
    words = words.sort(() => Math.random() - 0.5);
  };

  const currentWord: string = words[currentIndex];

  const handleCorrect = (): void => {
    setMessage('Great job!');
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      speakWord(words[currentIndex + 1]);
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
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App" style={{ minHeight: '100vh', padding: '20px' }}>
        <header className="App-header">
          <Text as="h1" block size={800} style={{ textAlign: 'center', marginBottom: '30px', color: '#ff6347', fontFamily: 'Comic Sans MS, sans-serif' }}>✨ Sight Word Learning Game ✨</Text>
          <WordDisplay word={currentWord} />
          <ControlButtons
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
            onRepeat={handleRepeat}
          />
          <Text className="message" block style={{ textAlign: 'center', marginTop: '30px', color: '#32cd32', fontSize: '2em', fontFamily: 'Comic Sans MS, sans-serif' }}>{message}</Text>
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
    <div className="word-container" style={{ textAlign: 'center', margin: '40px 0' }}>
      <Text className="sight-word" size={900} style={{ display: 'inline-block', textAlign: 'center', color: '#1e90ff', fontSize: '5em', fontFamily: 'Comic Sans MS, sans-serif', padding: '50px', borderRadius: '15px', boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.2)', minWidth: '600px' }}>🌟 {word} 🌟</Text>
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
    <div className="buttons" style={{ textAlign: 'center', marginTop: '30px' }}>
      <Button appearance="primary" onClick={onCorrect} style={{ fontSize: '1.5em', padding: '15px 25px', margin: '10px', backgroundColor: '#ff6347', color: 'white', borderRadius: '10px' }}>Correct</Button>
      <Button appearance="primary" onClick={onIncorrect} style={{ fontSize: '1.5em', padding: '15px 25px', margin: '10px', backgroundColor: '#ff6347', color: 'white', borderRadius: '10px' }}>Incorrect</Button>
      <Button appearance="primary" onClick={onRepeat} style={{ fontSize: '1.5em', padding: '15px 25px', margin: '10px', backgroundColor: '#ff6347', color: 'white', borderRadius: '10px' }}>Repeat</Button>
    </div>
  );
};

export default App;