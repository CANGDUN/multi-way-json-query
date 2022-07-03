import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(() => cleanup());

describe('App component', () => {
  test('renders App component', () => {
    render(<App />);
    screen.debug();
  });
});
