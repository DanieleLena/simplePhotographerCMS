import { render, screen } from "@testing-library/react";
import { Contact } from "../../pages";
import { BrowserRouter } from "react-router-dom";

const MockContact = () => {
  return (
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  );
};

test("Should render 'Hi i'm lisa'", async () => {
  render(<MockContact />);
  const h1NameElement = await screen.findByTestId("name-test");
  expect(h1NameElement.textContent).toBe("Hi, I am Lisa");
});
test("Should render the image", async () => {
  render(<MockContact />);
  const h1NameElement = await screen.find("name-test");
  expect(h1NameElement.textContent).toBe("Hi, I am Lisa");
});
