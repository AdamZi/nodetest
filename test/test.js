import { Selector } from "testcafe";

fixture`Basic easy`.page`localhost:8080`;

test("My first test", async (t) => {
  const name = "Boni"
  await t
    .typeText("#name", name)
    .typeText("#birth", "2001")
    .click("#submit_btn")
    .expect(Selector('.dog:nth-child(2) .dog-name').innerText)
    .eql(name);
});
