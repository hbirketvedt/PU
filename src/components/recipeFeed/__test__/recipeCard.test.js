// import React from "react";
// import {render, unmountComponentAtNode} from "react-dom";
// import RecipeCard from "../recipeCard.js";
// import "firebase/storage";
// import {
//     assertFails,
//     assertSucceeds,
//     initializeTestEnvironment,
//     RulesTestEnvironment,
// } from "@firebase/rules-unit-testing"
// import fs from "fs"
// import {act} from "@testing-library/react";
//
//
// const testEnv = async () => {
//     await initializeTestEnvironment()
//     //     projectId: "demo-project-1234",
//     //     firestore: {
//     //         rules: fs.readFileSync("firestore.rules", "utf8"),
//     //     },
//     // });
// }
//
// beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });
//
// afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });
//
//
// let container = null;
// let id = "hfdjsahfjkdsahjkf"
// let title = "hamburger"
// let description = "Dette er en fin oppskrift på hamburgere"
// let imageUrl = "hmburger.jpeg"
// let time = "2 timer"
// let portions = "4"
//
//
// test('Tests that recipeCard renders correct props', () => {
//     testEnv()
//
//     act(() => {
//
//         render(<RecipeCard
//             id={id}
//             title={title}
//             description={description}
//             imageUrl={imageUrl}
//             time={time}
//             portions={portions}
//             style={{margin: "10rem"}}
//         />, container)
//     })
//
//     // console.log(container.textContent)
//
//     // expect(container.textContent).toContain("Ingredienser:");
//     // expect(container.textContent).toContain("agurk");
//     // expect(container.textContent).toContain("tomat");
//     // expect(container.textContent).toContain("salat");
// });
//

test("dummy", () => {
    console.log("hei")
})
