import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import axios from "axios"

jest.mock("axios");

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

test("fetches stories from an API and display them", async() => {
  const stories = [
    {objectID:"1", title:"Hello", url:"http"},
    {objectID:"2", title:"React", url:"http"},
  ]

  const search = ""

  const promise = Promise.resolve({data: { hits: stories}})
  axios.get.mockImplementationOnce(() => promise);
  await expect(promise).resolves.toEqual({data: { hits: stories}});

  userEvent.click(
    screen.getByRole("button", {
      name:/go to news/i,
    })
  );
  expect(axios.get).toHaveBeenCalledWith(`http://hn.algolia.com/api/v1/search?query=${search}`,
);
const items = await screen.findAllByRole("listitem");
expect(items).toHaveLength(2);
});


