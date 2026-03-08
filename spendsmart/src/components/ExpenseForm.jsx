import { useState, useEffect } from "react"


function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

   useEffect(() => {
   fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories")
        return res.json()
      })
      .then((data) => {
        // Grab the top 15 categories with English names only
        const fetchedCategories = data.tags
          .filter((tag) => tag.name && !tag.name.includes(":"))
          .slice(0, 15)
          .map((tag) => tag.name)

        setCategories(fetchedCategories)
        setCategory(fetchedCategories[0])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

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
          {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}</option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  )
}

export default ExpenseForm