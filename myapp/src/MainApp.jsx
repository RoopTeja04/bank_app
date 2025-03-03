import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CreateAccount from './Components/CreateAccount';
import Transactions from './Components/Transactions';
import UpdateAccount from './Components/UpdateAccount';
import AccountHistory from './Components/AccountHistory';
import Accounts from './Components/Accounts';

const MainApp = () => {

    const [ AccountsData, setAccountsData ] = useState([]) || null;

    return (
        <>
            <div className='relative min-h-screen'>
                <div className='absolute inset-0 bg-gradient-to-br from-gray-600 via-blue-800 to-gray-500 bg-center w-full z-0 min-h-screen'></div>
                <div className="absolute inset-0 bg-opacity-45 z-0 min-h-screen"></div>

                <div className='relative text-white font-All-Font tracking-wider z-10'>
                    <div className='flex flex-row items-center pt-4 px-8 justify-between'>
                        <div className='flex items-center cursor-pointer'>
                            <h1 className='text-4xl pl-2 font-semibold tracking-wide'>Bankera</h1>
                        </div>
                        <div className='flex pt-4 pr-6 space-x-10'>
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
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <Routes>
                        <Route path='/' element={<CreateAccount AccountsData = {AccountsData} setAccountsData={setAccountsData} />} />
                        <Route path='/transactions' element={<Transactions AccountsData = {AccountsData} setAccountsData={setAccountsData} />} />
                        <Route path='/update-account' element={<UpdateAccount AccountsData = {AccountsData} setAccountsData={setAccountsData} />} />
                        <Route path='/account-history' element={<AccountHistory AccountsData = {AccountsData} />} /> 
                        <Route path='/accounts' element={<Accounts AccountsData = {AccountsData} />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default MainApp;