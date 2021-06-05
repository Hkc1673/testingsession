import { render, screen } from '@testing-library/react';
import App from '../App';

test('Logo must have src and alt attribute', () => {
 render(<App/>);
 screen.debug();

 const logo = screen.getByRole("img");
 expect(logo).toHaveAttribute("src", "clarusway_logo.png")
});
