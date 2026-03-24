import { useState, useEffect } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Summary from "./components/Summary"
import Chart from "./components/Chart"


function About() {
  return (
    <div className="about-card">
      <h2>About</h2>
      <p>
        SpendSmart is a simple budget tracking web application designed to help users manage
        their daily spending. It allows users to quickly add expenses, view a list of their
        spending, and see their total expenses and remaining balance in one place.
      </p>
      <p>
        SpendSmart is built with React and focuses on providing a clean and easy-to-use
        interface so users can track their finances without complicated tools. The goal of the
        app is to help students and young professionals become more aware of their spending
        habits and make better budgeting decisions.
      </p>
    </div>
  )
}

function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!name || !email || !message) return
    setSent(true)
    setName(""); setEmail(""); setMessage("")
  }

  return (
    <div className="contact-card">
      <h2>Contact US</h2>
      <p className="contact-intro">
        Thank you for using SpendSmart! If you have any questions, feedback, or suggestions,
        we would love to hear from you. You can reach us by email or by filling out the contact form below.
      </p>
      <p className="contact-email">
        Email: <a href="mailto:support@spendsmart.com">support@spendsmart.com</a>
      </p>

      <p className="contact-form-title">Contact Form</p>

      {sent ? (
        <p className="contact-sent">✓ Message sent! We'll get back to you soon.</p>
      ) : (
        <div className="contact-form">
          <div className="contact-field">
            <label>Name</label>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="contact-field">
            <label>Email</label>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="contact-field">
            <label>Message</label>
            <textarea placeholder="Send Message" value={message} onChange={e => setMessage(e.target.value)} />
          </div>
          <button className="btn-send" onClick={handleSend}>Send</button>
        </div>
      )}

      <p className="contact-note">
        Our team will review your message and respond as soon as possible. We appreciate your
        feedback and are always looking for ways to improve SpendSmart.
      </p>
    </div>
  )
}

function App() {
  // Load expenses from localStorage on first render
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("spendsmart-expenses")
    return saved ? JSON.parse(saved) : []
  })

  // Load budget from localStorage
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("spendsmart-budget")
    return saved ? Number(saved) : 1000
  })

  const [page, setPage] = useState("Dashboard")
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [editingBudget, setEditingBudget] = useState(false)
  const [budgetInput, setBudgetInput] = useState(budget)

   // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("spendsmart-expenses", JSON.stringify(expenses))
  }, [expenses])

  // Save budget to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("spendsmart-budget", budget)
  }, [budget])

  const addExpense = (expense) => {
    setExpenses([...expenses, expense])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

   const editExpense = (updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp))
  }

   const saveBudget = () => {
    const parsed = parseFloat(budgetInput)
    if (!isNaN(parsed) && parsed > 0) {
      setBudget(parsed)
      localStorage.setItem("spendsmart-budget", parsed)
    }
    setEditingBudget(false)
  }

  // Get unique categories from expenses for filter dropdown
  const usedCategories = ["All", ...new Set(expenses.map(exp => exp.category))]

  // Filter and search expenses
  const filteredExpenses = expenses
    .filter(exp => filterCategory === "All" || exp.category === filterCategory)
    .filter(exp => exp.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand">SpendSmart</span>
        <div className="navbar-links">
          <button
            className={page === "Dashboard" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("Dashboard")}
          >Dashboard</button>
          <button
            className={page === "About" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("About")}
          >About</button>
          <button
            className={page === "Contact" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("Contact")}
          >Contact</button>
        </div>
      </nav>

      <div className="app-container">
        {page === "Dashboard" && (
          <>
            <div className="page-header">
              <h1>SpendSmart</h1>
              {editingBudget ? (
                <div className="budget-edit">
                  <input
                    type="number"
                    value={budgetInput}
                    onChange={e => setBudgetInput(e.target.value)}
                    className="budget-input"
                  />
                  <button onClick={saveBudget}>Save</button>
                  <button className="btn-cancel" onClick={() => setEditingBudget(false)}>Cancel</button>
                </div>
              ) : (
                <button className="btn-edit-budget" onClick={() => { setEditingBudget(true); setBudgetInput(budget) }}>
                  Edit Budget
                </button>
              )}
            </div>
 
            <Summary expenses={expenses} budget={budget} />
 
            <Chart expenses={expenses} />
 
            <ExpenseForm addExpense={addExpense} />
 
            {/* Search and Filter */}
            <div className="search-filter">
              <input
                className="search-input"
                placeholder="🔍 Search expenses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                className="filter-select"
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
              >
                {usedCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
 
            <ExpenseList
              expenses={filteredExpenses}
              deleteExpense={deleteExpense}
              editExpense={editExpense}
            />
          </>
        )}
        {page === "About" && <About />}
        {page === "Contact" && <Contact />}
      </div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} SpendSmart. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App