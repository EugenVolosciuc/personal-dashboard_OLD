import ExpensesCard from '../components/Widgets/Expenses/ExpensesCard.component'
import NotesCard from '../components/Widgets/Notes/NotesCard.component'
import TodosCard from '../components/Widgets/Todos/TodosCard.component'

export const widgetList = [
    {
        title: 'Todos',
        component: TodosCard
    },
    {
        title: 'Expenses',
        component: ExpensesCard
    },
    {
        title: 'Notes',
        component: NotesCard
    }
]