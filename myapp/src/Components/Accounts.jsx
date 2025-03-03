import React, { useState, useEffect } from 'react'

const Accounts = ({ AccountsData }) => {
        
    const [savingCount, setSavingCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);

    useEffect(() => {
        const savingsAccount = AccountsData.filter(Account => Account.AccountType === "savings");
        const currentAccount = AccountsData.filter(Account => Account.AccountType === "current");

        setSavingCount(savingsAccount.length);
        setCurrentCount(currentAccount.length);
    }, [AccountsData]);

    return (
        <div className="relative text-white flex flex-col items-center top-14">
            <h1 className="text-3xl font-semibold tracking-wider underline underline-offset-8 pb-2">
                Accounts of Bankera
            </h1>
            <div className="flex justify-around w-full max-w-4xl mt-6 mb-6">
                <div className="account-card bg-gradient-to-r from-green-400 to-green-600 px-6 py-4 rounded-2xl text-black cursor-pointer">
                    <p className="font-medium text-lg px-4">
                        Savings Account: <span className="text-4xl font-bold">{savingCount}</span>
                    </p>
                </div>
                <div className="account-card bg-gradient-to-r from-blue-400 to-blue-600 px-6 py-4 rounded-2xl text-black cursor-pointer">
                    <p className="font-medium text-lg px-4">
                        Current Account: <span className="text-4xl font-bold">{currentCount}</span>
                    </p>
                </div>
                <div className="account-card bg-gradient-to-r from-purple-400 to-purple-600 px-6 py-4 rounded-2xl text-black cursor-pointer">
                    <p className="font-medium text-lg px-4">
                        Total Account: <span className="text-4xl font-bold">{AccountsData.length}</span>
                    </p>
                </div>
            </div>
            {  AccountsData.length === 0 ? (
                <p className="text-red-600 text-4xl font-semibold mt-14 backdrop-blur-lg py-4 px-8 border-4 border-red-400 rounded-lg">
                    No Accounts Has Been Created
                </p>
            ) : (
            <div className="overflow-x-auto w-full mt-4 pl-10 pr-10">
            <table className="table-auto border-collapse border border-gray-300 w-full text-center text-sm">
                <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase text-xs tracking-wider">
                    <th className="py-3 px-4 border border-gray-300 text-base">SL.NO</th>
                    <th className="py-3 px-4 border border-gray-300 text-base">First Name</th>
                    <th className="py-3 px-4 border border-gray-300 text-base">Last Name</th>
                    <th className="py-3 px-4 border border-gray-300 text-base">Phone Number</th>
                    <th className="py-3 px-4 border border-gray-300 text-base">E-Mail ID</th>
                    <th className="py-3 px-4 border border-gray-300 text-base">Account Number</th>
                    <th className="py-3 px-4 border border-gray-300 text-base">Account Type</th>
                    <th className="py-3 px-4 border border-gray-300 text-base">Balance</th>
                </tr>
                </thead>
                <tbody>
                {AccountsData.map((person, index) => (
                    <tr key={index} className={`$ {index % 2 === 0 ? "bg-transparent" : "bg-transparent"} hover:bg-green-600 hover:text-black cursor-pointer transition duration-100`}>
                    <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{index + 1}</td>
                    <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.FirstName}</td>
                    <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.LastName}</td>
                    <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.PhoneNumber}</td>
                    <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.EmailId}</td>
                    <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.AccountNumber}</td>
                    <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.AccountType}</td>
                    <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">₹ {Number(person.Balance).toLocaleString('hi-IN')} /-</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            )}
        </div>
    );

}

export default Accounts