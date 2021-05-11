import { render, screen } from "@testing-library/react";
import List from "./List";

const setup = (previousResponse) => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    json: async () => {
      return {
        next: "http://swapi.dev/api/people/?page=3",
        previous: previousResponse,
        results: [
          {
            name: "Luke Skywalker",
            gender: "male",
            url: "http://swapi.dev/api/people/1/",
          },
        ],
      };
    },
  });
  const element = render(<List />);
  return element;
};

describe("List Component", () => {
  test("Renders characters if request succeeds", async () => {
    setup(null);
    const renderedText = await screen.findByText("Luke Skywalker");
    expect(renderedText).toBeInTheDocument();
  });

  test("Renders Next button", async () => {
    setup(null);
    const renderedText = await screen.findByText("Next");
    expect(renderedText).toBeInTheDocument();
  });

  test("Renders Previous button", async () => {
    setup("http://swapi.dev/api/people/?page=1");
    const renderedText = await screen.findByText("Previous");
    expect(renderedText).toBeInTheDocument();
  });

  test("Does not render Previous button", () => {
    setup(null);
    const renderedText = screen.queryByText("Previous");
    expect(renderedText).toBeNull();
  });
});
