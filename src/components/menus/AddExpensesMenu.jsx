import Menu from '@/components/Menu'
import { useState, useContext, useRef } from 'react';
import { financeContext } from '@/lib/store/context';
import { v4 as uuidv4 } from 'uuid';

function AddExpensesMenu({ show, onClose }) {
    const [expenseAmount, setExpenseAmount] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [showAddExpense, setShowAddExpense] = useState(false)

    const { expenses, addExpenseItem, addCategory } = useContext(financeContext)

    const titleRef = useRef()
    const colorRef = useRef()

    const addExpenseItemHandler = async () => {

        const expense = expenses.find((e) => {
            return e.id === selectedCategory;
        });

        console.log(expense);

        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    creditedAt: new Date(),
                    id: uuidv4(),
                },
            ],
        };

        try {
            await addExpenseItem(selectedCategory, newExpense);

            console.log(newExpense);
            setExpenseAmount("");
            setSelectedCategory(null);
            onclose();
        } catch (error) {
            console.log(error.message);
        }
    };

    const addCategoryHandler = async () => {
        const title = titleRef.current.value;
        const color = colorRef.current.value;

        try {
            await addCategory({ title, color, total: 0 })
            setShowAddExpense(false)
        } catch {
            console.log('Error adding category');
        }
    }

    return (
        <Menu menuIsOpen={show} setMenuOpen={onClose}>
            <div className="flex flex-col gap-4">
                <label htmlFor="">Enter an Amount</label>
                <input type="number" min={0.01} step={0.01} placeholder='Enter an expense amount' value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                />
            </div>

            {expenseAmount > 0 && (
                <div className='flex flex-col gap-4 mt-6'>
                    <div className='flex items-center justify-between'>
                        <h3 className="text-2xl">Select Expense Category</h3>
                        <button onClick={() => {
                            setShowAddExpense(true)
                        }} className='text-lime-300'>+ New Category</button>
                    </div>

                    {showAddExpense && (
                        <>
                            <div className='hidden md:flex items-center justify-between'>
                                <input type="text"
                                    placeholder='Search for a category'
                                    className="py-2 bg-slate-200 rounded-3xl"
                                    ref={titleRef}
                                />

                                <label>Pick a Color</label>
                                <input type="color" className="w-24 h-10 py-2 px-4" ref={colorRef} />
                                <button onClick={addCategoryHandler} className='btn btn-primary-outline'>Create</button>
                                <button onClick={() => {
                                    setShowAddExpense(false)
                                }} className='btn btn-danger'>Cancel</button>
                            </div>
                            <div className='md:hidden flex flex-col gap-4'>
                                <div className='flex items-center justify-center gap-4'>
                                    <input type="text"
                                        placeholder='Search for a category'
                                        className="py-2 bg-slate-200 rounded-3xl"
                                        ref={titleRef}
                                    />
                                    <div className='flex items-center gap-2'>
                                        <label>Pick Color</label>
                                        <input type="color" className="w-20 h-10 py-2 px-4" ref={colorRef} />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-center'>
                                    <button onClick={addCategoryHandler} className='btn btn-primary-outline'>Create</button>
                                    <button onClick={() => {
                                        setShowAddExpense(false)
                                    }} className='btn btn-danger'>Cancel</button>
                                </div>
                            </div>

                        </>
                    )}
                    {expenses.map((expense) => {
                        return (
                            <button
                                key={expense.id}
                                onClick={() => {
                                    setSelectedCategory(expense.id)
                                }}
                            >
                                <div
                                    style={{ boxShadow: expense.id === selectedCategory ? '1px 1px 4px' : 'none' }}
                                    className='flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-[25px] h-[25px] rounded-full'
                                            style={{ backgroundColor: expense.color }}
                                        />
                                        <h4>{expense.title}</h4>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            )}

            {expenseAmount > 0 && selectedCategory && (
                <button className='btn btn-primary mt-6' onClick={addExpenseItemHandler}>
                    Add Expense
                </button>

            )}
        </Menu>
    )
}

export default AddExpensesMenu;