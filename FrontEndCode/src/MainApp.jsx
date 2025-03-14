import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CreateAccount from './Components/CreateAccount';
import Transactions from './Components/Transactions';
import UpdateAccount from './Components/UpdateAccount';
import AccountHistory from './Components/AccountHistory';
import Accounts from './Components/Accounts';
import BankLogo from './assets/Logo.png';

const MainApp = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='min-h-screen bg-slate-800 text-white'>

            <nav className="bg-slate-900 p-4 shadow-md relative">
                <div className='flex justify-between items-center px-6'>
                    <div className='flex items-center space-x-2'>
                        <img src={BankLogo} alt='Bankera Logo' className='w-10 h-10' />
                        <h1 className='text-2xl font-bold tracking-wide'>Bankera</h1>
                    </div>

                    <button
                        className="md:hidden flex flex-col items-center w-10 relative cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className={`w-6 h-1 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-1 bg-white my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                        <div className={`w-6 h-1 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </button>

                    <div className='hidden md:flex space-x-10'>
                        <NavLinks />
                    </div>
                </div>

                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className='flex flex-col space-y-4 mt-4 bg-slate-900 p-4 rounded-md z-10'>
                        <NavLinks />
                    </div>
                </div>
            </nav>

            <div className="relative z-10">
                <Routes>
                    <Route path='/' element={<CreateAccount />} />
                    <Route path='/transactions' element={<Transactions />} />
                    <Route path='/update-account' element={<UpdateAccount />} />
                    <Route path='/account-history' element={<AccountHistory />} />
                    <Route path='/accounts' element={<Accounts />} />
                </Routes>
            </div>
        </div>
    );
};

const NavLinks = () => (
    <>
        <Link className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform'
            to="/"
        >
            Create Account
        </Link>
        <Link className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform'
            to="/transactions"
        >
            Transactions
        </Link>
        <Link className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform'
            to="/update-account"
        >
            Update Account
        </Link>
        <Link className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform'
            to="/account-history"
        >
            Account History
        </Link>
        <Link className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform'
            to="/accounts"
        >
            Accounts
        </Link>
    </>
);

export default MainApp;