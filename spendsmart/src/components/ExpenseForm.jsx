import { useState } from "react"

function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount)
    }

    addExpense(newExpense)
    setTitle("")
    setAmount("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Expense name"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />

      <button>Add Expense</button>
    </form>
  )
}

export default ExpenseForm