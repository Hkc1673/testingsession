import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<App />);
});

test("Logo must have src and alt attribute", () => {
  //  render(<App/>);
  screen.debug();

  const logo = screen.getByRole("img");
  expect(logo).toHaveAttribute("src", "clarusway_logo.png");
  expect(logo).toHaveAttribute("alt", "Clarusway");
});

test("header renders with correct text", () => {
  // render(<App/>);
  const headerElement = screen.getByText("Clarusway News App");
  // expect(headerElement).toBeInTheDocument()
  expect(headerElement.textContent).toBe("Clarusway News App");
});

test("search text and button text should be in app", () => {
  const searchElement = screen.getByText(/Search/);
  expect(searchElement).toBeInTheDocument();

  const buttonText = screen.getByText(/Go to news/);
  expect(buttonText).toBeInTheDocument();
});

test("input contains initial value", () => {
  const inputElement = screen.getByTestId("input");
  expect(inputElement).toHaveValue("");
});

test("test input change", () => {
  const inputElement = screen.getByTestId("input");
  expect(inputElement).toHaveValue("");
  userEvent.type(inputElement,"")
})

test("should display a text before loading data", () => {
  const loading = screen.getByTestId("loading");
  expect(loading).toBeInTheDocument("No news....");
});
