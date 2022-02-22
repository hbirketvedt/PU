import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import IngredientList from "../ingredientList";
import ingredientList from "../ingredientList";


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
let ingredients = ["agurk", "tomat", "salat"]

test('the shopping list has milk on it', () => {
    render(<IngredientList ingredients={ingredients}/>, container)
    expect(container.textContent).toContain("Ingredienser:");
    expect(container.textContent).toContain("agurk");
    expect(container.textContent).toContain("tomat");
    expect(container.textContent).toContain("salat");
});




