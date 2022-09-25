import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import App from '../App';

//  Will probably throw 'useHref() may be used only in the context of a <Router> component.' warning/error but will still run tests
// for now just ignore...

test('displays author title on homepage', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const title = screen.getByText(/Authors/i);
  expect(title).toBeInTheDocument();
});
