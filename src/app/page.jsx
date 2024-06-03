'use client'

import ExpenseCategory from "@/components/ExpenseCategory"
import { currencyFormatter } from "@/lib/utils"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from "react-chartjs-2"
import { useState, useContext, useEffect } from "react"
import { financeContext } from "@/lib/store/context"
ChartJS.register(ArcElement, Tooltip, Legend)

import AddIncomeMenu from "@/components/menus/AddIncomeMenu"
import AddExpensesMenu from "@/components/menus/AddExpensesMenu"

export default function Home() {
    const [balance, setBalance] = useState(0)
    const [showAddIncomeMenu, setShowAddIncomeMenu] = useState(false)
    const [showAddExpensesMenu, setShowAddExpensesMenu] = useState(false)
    const { income, expenses } = useContext(financeContext)

    useEffect(() => {
        const newBalance = income.reduce((total, i) => {
            return total + i.amount
        }, 0) - expenses.reduce((total, e) => {
            return total + e.total
        }, 0)
        setBalance(newBalance)
    }, [income, expenses])
    return (
        <>
            <AddIncomeMenu show={showAddIncomeMenu} onClose={setShowAddIncomeMenu} />
            <AddExpensesMenu show={showAddExpensesMenu} onClose={setShowAddExpensesMenu} />

            <main className="container max-w-2xl mx-auto px-6 py-6">
                <section className="py-3">
                    <small className="text-gray-400 text-md"> My Balance</small>
                    <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
                </section>

                <section className="flex items-center gap-4 py-3">
                    <button className="btn btn-primary" onClick={() => setShowAddExpensesMenu(true)}> + Expenses </button>
                    <button className="btn btn-primary-outline" onClick={() => setShowAddIncomeMenu(true)}> + Income </button>
                </section>

                <section className="py-6">
                    <h3 className="text-2xl">My Expenses</h3>
                    <div className="flex flex-col gap-4 mt-6">
                        {expenses.map((category) => (
                            <ExpenseCategory expense={category} />
                        ))}
                    </div>
                </section>

                {/* charts  */}
                <section className="py-6">
                    <h3 className="text-2xl">Stats</h3>
                    <div className="h-1/2 mx-auto">
                        <Doughnut
                            data={{
                                labels: expenses.map((category) => category.title),
                                datasets: [
                                    {
                                        label: "Expenses",
                                        data: expenses.map((category) => category.total),
                                        backgroundColor: expenses.map((category) => category.color),
                                        borderColor: "#fff",
                                        // borderWidth: 
                                    }
                                ]
                            }}
                        />
                    </div>
                </section>
            </main>
        </>
    )
}
