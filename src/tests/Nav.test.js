import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import NavComponent from '../components/NavComponent';

//  Will probably throw 'useHref() may be used only in the context of a <Router> component.' warning/error but will still run tests
// for now just ignore...

//  No need to test any more than this as the app does not include both ever, 
// the app only toggles including search and home 

test('displays home when included and does not display search', () => {
  render(
    <Router>
      <NavComponent includeHome={true} includeSearch={false} />
    </Router>
  );
  const nav = screen.getByTestId('nav-text-1')
  expect(nav.textContent).toBe('Home');
  expect(screen.queryByTestId('nav-text-2')).toBeNull();
});

test('Does not display Home and displays search', () => {
    render(
      <Router>
        <NavComponent includeHome={false} includeSearch={true} />
      </Router>
    );
    expect(screen.queryByTestId('nav-text-1')).toBeNull();
    const nav = screen.getByTestId('nav-text-2')
    expect(nav.textContent).toBe('Search');
});