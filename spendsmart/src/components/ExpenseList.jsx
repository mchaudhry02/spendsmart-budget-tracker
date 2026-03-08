import ExpenseItem from "./ExpenseItem"

function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="list-section">
      <h3 className="section-title">Expense List</h3>
      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add one above!</p>
      ) : (
        <ul className="expense-list">
          {expenses.map(exp => (
            <ExpenseItem
              key={exp.id}
              expense={exp}
              deleteExpense={deleteExpense}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList