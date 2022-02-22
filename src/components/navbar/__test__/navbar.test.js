import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Navbar from "../navbar";
import {BrowserRouter} from "react-router-dom";
import App from "../../../App";



beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


let container = null;

it("navigates home when you click the logo", () => {
  // in a real test a renderer like "@testing-library/react"
  // would take care of setting up the DOM elements
  const root = document.createElement('div');
  document.body.appendChild(root);

  // Render app
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );

  // Interact with page
  act(() => {
    // Find the link (perhaps using the text content)
    const goHomeLink = document.getElementById("profilePage");
    // Click it
    //   console.log(goHomeLink)
    goHomeLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Check correct page content showed up
  expect(document.body.textContent).toBe('Home Profile PageAdd new recipeOppskrifterOppskriftshefteSpar tid, bruk oppskriftshefte når du handler.Logg innOpprett konto');
});




