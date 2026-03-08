import { useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Summary from "./components/Summary"

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
  const [expenses, setExpenses] = useState([])
  const [page, setPage] = useState("Dashboard")

  const addExpense = (expense) => {
    setExpenses([...expenses, expense])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

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
            <h1>SpendSmart</h1>
            <Summary expenses={expenses} />
            <ExpenseForm addExpense={addExpense} />
            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
          </>
        )}
        {page === "About" && <About />}
        {page === "Contact" && <Contact />}
      </div>
    </div>
  )
}

export default App