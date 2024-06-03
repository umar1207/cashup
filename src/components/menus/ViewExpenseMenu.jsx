'use client'

import Menu from '@/components/Menu'
import { currencyFormatter } from '@/lib/utils'
import { FaTrashAlt } from 'react-icons/fa'
import { useContext } from 'react'
import { financeContext } from '@/lib/store/context'
function ViewExpenseMenu({ show, onClose, expense }) {

    const { deleteExpenseItem, deleteExpenseCategory } = useContext(financeContext)
    const deleteExpenseItemHandler = async (item) => {
        try {
            const updatedItems = expense.items.filter(i => i.id !== item.id)

            const updatedExpense = {
                items: [...updatedItems],
                total: expense.total - item.amount
            }

            await deleteExpenseItem(updatedExpense, expense.id)
        } catch {
            console.log('Error deleting item');
        }
    }

    const deleteExpenseHandler = async () => {
        try {
            await deleteExpenseCategory(expense.id)
        } catch {
            console.log('Error deleting expense');
        }
    }
    return (
        <Menu menuIsOpen={show} setMenuOpen={onClose}>
            <div className="flex items-center justify-between">
                <h2 className='text-4xl'>{expense.title}</h2>
                <button onClick={deleteExpenseHandler} className='btn btn-danger'>Delete</button>
            </div>

            <div>
                <h3 className='my-4 text-2xl'>Expense History</h3>
                {expense.items.map(item => {
                    return (
                        <div key={item.id} className='flex items-center justify-between'>
                            <div className='flex flex-cols space-x-2 text-lime-400'>
                                <small>{item.creditedAt.toMillis ? new Date(item.creditedAt.toMillis()).toLocaleDateString() : item.creditedAt.toLocaleDateString()}</small>
                                <small>{item.creditedAt.toMillis ? new Date(item.creditedAt.toMillis()).toLocaleTimeString() : item.creditedAt.toLocaleTimeString()}</small>
                            </div>
                            <div className='flex flex-cols space-x-2'>
                                <small>{currencyFormatter(item.amount)}</small>
                                <button onClick={()=> {
                                    deleteExpenseItemHandler(item)
                                }}>
                                    <small><FaTrashAlt /></small>
                                </button>

                            </div>
                        </div>
                    )
                })}
            </div>
        </Menu>
    )
}
export default ViewExpenseMenu