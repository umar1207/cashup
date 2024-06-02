'use client'

import ExpenseCategory from "@/components/ExpenseCategory"
import Menu from "@/components/Menu"
import { currencyFormatter } from "@/lib/utils"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from "react-chartjs-2"
import { useState, useRef, useEffect } from "react"
ChartJS.register(ArcElement, Tooltip, Legend)

import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"

import {FaRegTrashAlt} from 'react-icons/fa'

const DUMMY_DATA = [
    {
        id: 1,
        title: "Entertainment",
        total: 500,
        colour: "#ff0000"
    },
    {
        id: 2,
        title: "Groceries",
        total: 1000,
        colour: "#00ff00"
    },
    {
        id: 3,
        title: "Transport",
        total: 200,
        colour: "#0000ff"
    },
    {
        id: 4,
        title: "Health",
        total: 300,
        colour: "#000000"
    }
]

export default function Home() {
    const [income, setIncome] = useState([])
    console.log(income)
    const [showAddIncomeMenu, setShowAddIncomeMenu] = useState(false)
    const [showAddExpenseMenu, setShowAddExpenseMenu] = useState(false)
    const amountRef = useRef()
    const descriptionRef = useRef()

    const addIncomeHandler = async (e) => {
        e.preventDefault()

        const newIncome = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            debitedAt: new Date()
        }

        const collectionRef = collection(db, 'income')

        try {
            const docSnap = await addDoc(collectionRef, newIncome)

            setIncome(prevIncome => {
                return [
                    ...prevIncome,
                    {
                        id: docSnap.id,
                        ...newIncome
                    },
                ]
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteIncomeEntryHandler = async (id) => {
        const docRef = doc(db, 'income', id)
        try {
            await deleteDoc(docRef)
        } catch (error) {
            console.log(error.message)
        }

        setIncome(prevIncome => {
            return prevIncome.filter(i => i.id !== id)
        })
    }

    useEffect(() => {
        // get data from firebase

        const getIncome = async () => {
            const collectionRef = collection(db, 'income')
            const docsSnap = await getDocs(collectionRef)
           
            const incomeData = docsSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    debitedAt: new Date(doc.data().debitedAt.toMillis()),
                }
            })
            setIncome(incomeData)
        }

        getIncome()
        
    }, [])
    return (
        <>
            <Menu menuIsOpen={showAddIncomeMenu} setMenuOpen={setShowAddIncomeMenu}>
                <form onSubmit={addIncomeHandler} className="input-field">
                    <div className="input-field">
                        <label htmlFor="amount">Income Amount</label>
                        <input type="number" min={0} step={5} ref={amountRef} placeholder="Enter Income Amount" required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <input type="text" ref={descriptionRef} placeholder="Enter Income Description" required />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Entry
                    </button>
                </form>

                <div className="flex flex-col gap-4 mt-6">
                    <h3 className="text-2xl font-bold">Income History</h3>
                    {income.map(i => (
                        <div key={i.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">{i.description}</p>
                                <small className="text-xs">{i.debitedAt.toISOString()}</small>
                            </div>
                            <div>
                                <p className="flex items-center gap-3">{currencyFormatter(i.amount)}
                                <button onClick={()=>{deleteIncomeEntryHandler(i.id)}} className="btn btn-danger-outline">
                                    <FaRegTrashAlt />
                                </button>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Menu>
            <Menu menuIsOpen={showAddExpenseMenu} setMenuOpen={setShowAddExpenseMenu}>
                <h3>Expenses</h3>
            </Menu>

            <main className="container max-w-2xl mx-auto px-6 py-6">
                <section className="py-3">
                    <small className="text-gray-400 text-md"> My Balance</small>
                    <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
                </section>

                <section className="flex items-center gap-4 py-3">
                    <button className="btn btn-primary" onClick={() => setShowAddExpenseMenu(true)}> + Expenses </button>
                    <button className="btn btn-primary-outline" onClick={() => setShowAddIncomeMenu(true)}> + Income </button>
                </section>

                <section className="py-6">
                    <h3 className="text-2xl">My Expenses</h3>
                    <div className="flex flex-col gap-4 mt-6">
                        {DUMMY_DATA.map((category) => (
                            <ExpenseCategory key={category.id} title={category.title} amount={category.total} colour={category.colour} />
                        ))}
                    </div>
                </section>

                {/* charts  */}
                <section className="py-6">
                    <h3 className="text-2xl">Stats</h3>
                    <div className="w-1/2 h-1/2 mx-auto">
                        <Doughnut
                            data={{
                                labels: DUMMY_DATA.map((category) => category.title),
                                datasets: [
                                    {
                                        label: "Expenses",
                                        data: DUMMY_DATA.map((category) => category.total),
                                        backgroundColor: DUMMY_DATA.map((category) => category.colour),
                                        borderColor: "#fff",
                                        borderWidth: 3
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
