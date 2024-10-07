import React, { useState } from 'react';
import './App.css';
import { FluentProvider, webLightTheme, Button, Text } from '@fluentui/react-components';

const words: string[] = [
  'the', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it', 'of', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'I', 'at', 'be'
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const currentWord: string = words[currentIndex];

  const handleCorrect = (): void => {
    setMessage('Great job!');
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      speakWord(words[currentIndex + 1]);
    } else {
      setMessage("You've finished all the words! Amazing work!");
    }
  };

  const handleIncorrect = (): void => {
    setMessage("That's okay, keep trying!");
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
      <div className="App">
        <header className="App-header">
          <Text as="h1" block size={600} style={{ textAlign: 'center', marginBottom: '20px' }}>✨ Sight Word Learning ✨</Text>
          <WordDisplay word={currentWord} />
          <ControlButtons
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
            onRepeat={handleRepeat}
          />
          <Text className="message" block style={{ textAlign: 'center', marginTop: '20px' }}>{message}</Text>
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
      <Text className="sight-word" size={500} style={{ display: 'inline-block', textAlign: 'center' }}>🌟 {word} 🌟</Text>
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
      <Button appearance="primary" onClick={onCorrect}>Correct</Button>
      <Button appearance="primary" onClick={onIncorrect} style={{ marginLeft: '10px' }}>Incorrect</Button>
      <Button appearance="primary" onClick={onRepeat} style={{ marginLeft: '10px' }}>Repeat</Button>
    </div>
  );
};

export default App;