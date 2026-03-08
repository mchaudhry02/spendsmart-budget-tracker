function Summary({ expenses }) {

  const total = expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  )

  return (
    <div>
      <h3>Total Spent: ${total}</h3>
      <h3>Remaining Balance: ${1000 - total}</h3>
    </div>
  )
}

export default Summary