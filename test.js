import { Selector } from "testcafe";

fixture`Basic easy`.page`localhost:8080`;

test("My first test", async (t) => {
  await t
    .typeText("#name", "Boni")
    .typeText("#birth", "2001")
    .click("#submit_btn");
});
