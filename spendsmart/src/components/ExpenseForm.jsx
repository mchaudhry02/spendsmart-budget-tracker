import { useState } from "react"

const CATEGORIES = ["Food", "Transport", "Entertainment", "Health", "Shopping", "Other"]

function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !amount) return

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category
    }

    addExpense(newExpense)
    setTitle("")
    setAmount("")
    setCategory("Food")
  }

  return (
    <div className="form-section">
      <h3 className="section-title">Add Expense</h3>
      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          placeholder="Expense Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          {CATEGORIES.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  )
}

export default ExpenseForm