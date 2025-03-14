import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from 'axios';

const AccountHistory = () => {
    const [searchNumber, setSearchNumber] = useState('');
    const [foundedAccount, setFoundedAccount] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchNumber.trim()) {
            alert("Please enter an account number!");
            return;
        }

        setLoading(true);
        setVisible(false);

        try {
            const response = await axios.get(`http://localhost:8045/api/users/${searchNumber}`);
            const transactiosResponse = await axios.get(`http://localhost:8045/api/transactions`);
            const Transactions = transactiosResponse.data.filter((account) => (account.transactionsType.toUpperCase() === "DEBIT" && account.fromAccountNumber === searchNumber) || (account.transactionsType.toUpperCase() === "CREDIT" && account.toAccountNumber === searchNumber));
            setTransactions(Transactions);
            setFoundedAccount(response.data || null);
            setSearchNumber("");
        } catch (err) {
            console.error("Error fetching account:", err);
            setFoundedAccount(null);
        } finally {
            setLoading(false);
            setVisible(true);
        }

    };

    return (
        <motion.div className="flex flex-col items-center text-white mt-20 min-h-screen pb-14 px-4 sm:px-8 overflow-x-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-center">Account History</h1>
            <div className="w-full flex flex-col justify-center items-center relative top-10 px-4">
                <input
                    type="text"
                    placeholder="Enter the Account Number"
                    value={searchNumber}
                    onChange={(e) => setSearchNumber(e.target.value)}
                    maxLength={12}
                    className="text-lg sm:text-xl px-4 py-2 w-full sm:w-1/2 md:w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                />
                <button
                    onClick={handleSearch}
                    className="w-2/3 md:w-1/4 h-12 bg-yellow-500 text-black font-semibold text-lg sm:text-2xl mt-6 sm:mt-12 rounded-lg hover:border-2 hover:bg-yellow-800 hover:border-white transition-all duration-200 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Search Account"}
                </button>

                {visible && (
                    <motion.div className="w-full min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        {foundedAccount ? (
                            <motion.div className="border-white backdrop-blur-md p-6 rounded-lg w-full">
                                <h1 className="text-3xl sm:text-4xl font-semibold tracking-widest pb-2 uppercase text-center">
                                    {`${foundedAccount.firstName} ${foundedAccount.lastName}`}
                                </h1>
                                <span className="text-sm sm:text-lg font-light tracking-wider py-2 block text-center">
                                    Account Number: <span className="text-xl sm:text-3xl font-medium">{foundedAccount.accountNumber}</span>
                                </span>
                                <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-4 md:mt-4 sm:gap-6 text-center">
                                    <span className='text-sm sm:text-lg font-light tracking-wider block text-center'>Account Type: <span className="text-2xl sm:text-2xl font-medium">{foundedAccount.accountType}</span></span>
                                    <span className='text-sm sm:text-lg font-light tracking-wider block text-center'>Balance: <span className="text-2xl sm:text-2xl font-medium"> ₹ {Number(foundedAccount.balance).toLocaleString('hi-IN')} /-</span></span>
                                </div>

                                {transactions && transactions.length > 0 ? (
                                    <div className="mt-8 w-full">
                                        <h2 className="text-lg sm:text-2xl font-bold underline mb-4 text-center">Transaction History</h2>

                                        <div className="overflow-x-auto w-full bg-gray-800 rounded-md shadow-md text-white">
                                            <table className="min-w-full text-sm sm:text-base text-center border-collapse">

                                                <thead className="bg-gray-700">
                                                    <tr className="text-gray-300">
                                                        <th className="py-3 px-4 border-b border-gray-600 whitespace-nowrap">Date & Time</th>
                                                        <th className="py-3 px-4 border-b border-gray-600 whitespace-nowrap">Transaction Type</th>
                                                        <th className="py-3 px-4 border-b border-gray-600 whitespace-nowrap">Account Number</th>
                                                        <th className="py-3 px-4 border-b border-gray-600 whitespace-nowrap">Money (₹)</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {transactions.map((transaction, idx) => (
                                                        <tr key={idx} className={`border-gray-600 ${idx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-700'}`}>
                                                            <td className="py-4 px-4 text-gray-200 whitespace-normal break-words">
                                                                {new Date(transaction.transactionsDate).toLocaleString('en-US', {
                                                                    weekday: 'short',
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </td>

                                                            <td className={`py-4 px-4 font-semibold ${transaction.transactionsType === 'DEBIT' ? 'text-red-500' : 'text-green-600'}`}>
                                                                {transaction.transactionsType === 'DEBIT' ? <ArrowUpwardIcon className="inline-block" /> : <ArrowDownwardIcon className="inline-block" />}
                                                                {transaction.transactionsType}
                                                            </td>

                                                            <td className="py-4 px-4 font-medium text-gray-200 break-all">
                                                                {transaction.transactionsType === 'DEBIT' ? transaction.toAccountNumber : transaction.fromAccountNumber}
                                                            </td>

                                                            <td className={`py-4 px-4 font-semibold ${transaction.transactionsType === 'DEBIT' ? 'text-red-500' : 'text-green-600'}`}>
                                                                ₹ {Number(transaction.transferAmount).toLocaleString('hi-IN')} /-
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-red-600 text-lg sm:text-2xl px-4 font-bold mt-4 py-4 border-4 border-red-400 rounded-lg text-center">
                                        No Transactions Found
                                    </p>
                                )}
                            </motion.div>
                        ) : (
                            <h1 className="text-red-600 text-2xl sm:text-4xl font-bold mt-20 py-4 px-8 border-4 border-red-400 rounded-lg text-center">
                                No account found with this Account Number.
                            </h1>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>

    );
};

export default AccountHistory;