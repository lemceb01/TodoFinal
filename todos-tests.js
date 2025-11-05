import { Selector } from 'testcafe';

fixture ('Todos tests')
.page("http://localhost:5174/?");

test("Add new todo", async t => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    const yyyy2 = dayAfter.getFullYear();
    const mm2 = String(dayAfter.getMonth() + 1).padStart(2, '0');
    const dd2 = String(dayAfter.getDate()).padStart(2, '0');
    const dateStr2 = `${yyyy2}-${mm2}-${dd2}`;
    

    await t
    .typeText(Selector('#todo-input'), 'Vacuum the house')
    .typeText(Selector('#todo-date'), dateStr, { replace: true })
    .click(Selector('button[type="submit"]')) 
    .expect(Selector('.todo-list li').withText('Vacuum the house').exists).ok()

    .typeText(Selector('#todo-input'), 'Clean the dishes')
    .typeText(Selector('#todo-date'), dateStr2, { replace: true })
    .click(Selector('button[type="submit"]'))
    .expect(Selector('.todo-list li').withText('Vacuum the house').exists).ok()
    .expect(Selector('.todo-list li').count).gte(2)

    // click the first todo's Complete/Undo button (select by the todo text)
    .click(Selector('.todo-list li').withText('Vacuum the house').find('.toggle-btn'))

    // assert the first todo is visually marked completed (inline style contains line-through)
    .expect(Selector('.todo-list li').withText('Vacuum the house').find('span').getAttribute('style')).contains('line-through')


  // switch to "Completed" filter and verify the completed todo appears there
    .click(Selector('#show-completed'))
    .expect(Selector('.todo-list li').withText('Vacuum the house').exists).ok()
    // the not-completed todo should not be in the completed list
    .expect(Selector('.todo-list li').withText('Clean the dishes').exists).notOk()

    // switch to "Active" filter and verify the completed todo is not present and the other is
    .click(Selector('#show-active'))
    .expect(Selector('.todo-list li').withText('Vacuum the house').exists).notOk()
    .expect(Selector('.todo-list li').withText('Clean the dishes').exists).ok()

      .click(Selector('#show-all'))
    .click(Selector('.todo-list li').withText('Clean the dishes').find('.remove-btn'))
    .expect(Selector('.todo-list li').withText('Clean the dishes').exists).notOk()
    .expect(Selector('.todo-list li').count).eql(1);
})