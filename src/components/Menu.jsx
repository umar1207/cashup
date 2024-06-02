import { Children } from "react"

function Menu({menuIsOpen, setMenuOpen, children}) {
    return (
        <div
            style={{ 
                transform: menuIsOpen ? "translateY(0)" : "translateY(-100%)"
             }}
            className="absolute top-0 left-0 w-full h-full p-2 z-10 transition-all duration-1000"
            >
            <div className="container max-w-2xl mx-auto h-[80vh] rounded-3xl bg-slate-800 py-6 px-4 overflow-y-auto">
                <button className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600"
                    onClick={() => setMenuOpen(false)}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    )
}

export default Menu