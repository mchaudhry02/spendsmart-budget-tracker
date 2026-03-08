function ExpenseItem({ expense, deleteExpense }) {
  return (
    <li className="expense-item">
      <div className="expense-left">
        <span className="expense-name">{expense.title}</span>
        {expense.category && (
          <span className="expense-category">{expense.category}</span>
        )}
      </div>
      <div className="expense-right">
        <span className="expense-amount">${expense.amount.toFixed(2)}</span>
        <button className="btn-delete" onClick={() => deleteExpense(expense.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default ExpenseItem