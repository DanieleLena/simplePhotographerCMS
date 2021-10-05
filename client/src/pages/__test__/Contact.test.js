import { render, screen } from "@testing-library/react";
import { Contact } from "../../pages";
import {BrowserRouter} from "react-router-dom";

const MockContact = () => {
    return (
        <BrowserRouter>
        <Contact />
        </BrowserRouter>
    )
}




test("Should render 'Hi i'm lisa", async () => {
  render(<MockContact />);
  const h1NameElement = await screen.findByTestId("contactTest");
  expect(h1NameElement).toBeInTheDocument();
});
