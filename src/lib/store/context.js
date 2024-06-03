'use client'

import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { useState, createContext, useEffect } from "react";

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {},
    addExpenseItem: async () => {},
    addCategory: async () => {},
});

export default function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])

    const addCategory = async (category) => {
        try {
            const collectionRef = collection(db, 'expenses')

            const docSnap = await addDoc(collectionRef, {
               ...category,
               items: [], 
            })

            setExpenses(prevExpenses => {
                return [
                    ...prevExpenses,
                    {
                        id: docSnap.id,
                        items: [],
                        ...category,
                    }
                ]
            })
        } catch {

        }
    }

    const addExpenseItem = async (expenseCategoryId, newExpense) => {
        const docRef = doc(db, 'expenses', expenseCategoryId)

        try {
            await updateDoc(docRef, {...newExpense})

            setExpenses(prevState => {
                const updatedExpenses = [...prevState]

                const foundIndex = updatedExpenses.findIndex(expense => {
                    return expense.id === expenseCategoryId
                })

                updatedExpenses[foundIndex] = {id: expenseCategoryId, ...newExpense}

                return updatedExpenses;
            })

        } catch (error) {
            throw error
        }
    }

    const addIncomeItem = async (newIncome) => {
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
            throw error
        }
    }

    const removeIncomeItem = async (id) => {
        const docRef = doc(db, 'income', id)
        try {
            await deleteDoc(docRef)
        } catch (error) {
            console.log(error.message)
            throw error
        }

        setIncome(prevIncome => {
            return prevIncome.filter(i => i.id !== id)
        })
    }
    const values = { income, expenses, addIncomeItem, removeIncomeItem, addExpenseItem, addCategory }

    useEffect(() => {

        const getIncomeData = async () => {
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

        const getExpensesData = async () => {
            const collectionRef = collection(db, 'expenses')
            const docsSnap = await getDocs(collectionRef)
    
            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    // debitedAt: new Date(doc.data().debitedAt.toMillis()),
                }
            })
            setExpenses(data)
        }

        getIncomeData()
        getExpensesData()
        
    }, [])

    return (
        <financeContext.Provider value={values}>
            {children}
        </financeContext.Provider>
    )
}
