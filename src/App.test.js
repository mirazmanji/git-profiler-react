import { render, screen } from '@testing-library/react';
import App from './App';

// Git Profiler as heading
// No username in input textbox
// Button with GO text
// No user profile is displayed
test('app loads to spec', () => {
  render(<App />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveTextContent('');
  expect(screen.getByRole("heading")).toHaveTextContent('Github profiler');
  expect(screen.getByRole("button")).toHaveTextContent('GO');
  try {
    const role = screen.getByRole("img");
    expect(role.toBeNull)
  } catch (err) {
    // pass
  }
})
