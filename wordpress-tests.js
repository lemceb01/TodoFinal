import { Selector } from 'testcafe';

fixture ('WordPress tests')
.page("http://localhost:5173/");

test("Add new todo", async t => {
    await t
    .typeText(Selector('#todo-input'), 'Learn TestCafe')
    .click(Selector("#submit-button"))
    .expect(Selector('.todo-list li').withText('Learn TestCafe').exists).ok();
})