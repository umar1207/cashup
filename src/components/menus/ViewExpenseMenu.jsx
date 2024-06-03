import Menu from '@/components/Menu'

function ViewExpenseMenu ({show, onClose, expense}){
    return (
        <Menu menuIsOpen={show} setMenuOpen={onClose}>
            <div className="flex items-center justify-between">
                <h2 className='text-4xl'>{expense.title}</h2>
                <button className='btn btn-danger'>Delete</button>
            </div>
        </Menu>
    )
}
export default ViewExpenseMenu