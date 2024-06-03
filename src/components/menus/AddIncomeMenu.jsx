'use client'

import { useRef, useContext } from "react"
import { currencyFormatter } from "@/lib/utils"

import Menu from "@/components/Menu"

import { financeContext } from "@/lib/store/context"
import { authContext } from "@/lib/store/authContext"

import {FaRegTrashAlt} from 'react-icons/fa'

function AddIncomeMenu({ show, onClose}) {
    const amountRef = useRef()
    const descriptionRef = useRef()
    const { income, addIncomeItem, removeIncomeItem } = useContext(financeContext)

    const { user } = useContext(authContext);

    const addIncomeHandler = async (e) => {
        e.preventDefault()

        const newIncome = {
            amount: +amountRef.current.value,
            description: descriptionRef.current.value,
            debitedAt: new Date(),
            uid: user.uid,
        }
        try {
            await addIncomeItem(newIncome)
            amountRef.current.value = ""
            descriptionRef.current.value = ""
        }
        catch (error) {
            console.log(error.message)
        }

    }

    const deleteIncomeEntryHandler = async (id) => {
        try {
            await removeIncomeItem(id)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Menu menuIsOpen={show} setMenuOpen={onClose}>
            <form onSubmit={addIncomeHandler} className="input-field">
                <div className="input-field">
                    <label htmlFor="amount">Income Amount</label>
                    <input type="number" min={0} step={0.01} ref={amountRef} placeholder="Enter Income Amount" required />
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
                                <button onClick={() => { deleteIncomeEntryHandler(i.id) }} className="btn btn-danger-outline">
                                    <FaRegTrashAlt />
                                </button>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Menu>
    )
}

export default AddIncomeMenu