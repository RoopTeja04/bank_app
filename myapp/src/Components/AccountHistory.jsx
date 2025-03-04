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
            setFoundedAccount(response.data || null);
        } catch (err) {
            console.error("Error fetching account:", err);
            setFoundedAccount(null);
        } finally {
            setLoading(false);
            setVisible(true);
        }
    };

    return (
        <motion.div className="relative flex flex-col items-center text-white w-screen top-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h1 className="text-3xl font-semibold tracking-wide">Account History</h1>
            <div className="w-screen flex flex-col justify-center items-center relative top-10">
                <input
                    type="text"
                    placeholder="Enter the Account Number"
                    value={searchNumber}
                    onChange={(e) => setSearchNumber(e.target.value)}
                    maxLength={12}
                    className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                />
                <button
                    onClick={handleSearch}
                    className="w-1/4 h-12 bg-yellow-500 text-black font-semibold text-2xl mt-12 rounded-lg hover:border-2 hover:bg-yellow-800 hover:border-white transition-all duration-200 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Search Account"}
                </button>

                {visible && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        {foundedAccount ? (
                            <motion.div className="relative top-8 border-white backdrop-blur-md p-6 rounded-lg">
                                <h1 className="text-4xl font-semibold tracking-widest pb-2 uppercase text-center">
                                    {`${foundedAccount.firstName} ${foundedAccount.lastName}`}
                                </h1>
                                <span className="text-lg font-light tracking-wider py-2">
                                    Account Number: <span className="text-3xl font-medium">{foundedAccount.accountNumber}</span>
                                </span>
                                <div className="grid grid-cols-2 gap-6 gap-x-14 mt-6">
                                    <span>Account Type: <span className="text-2xl font-medium">{foundedAccount.accountType}</span></span>
                                    <span>Balance: <span className="text-2xl font-medium">₹ {Number(foundedAccount.balance).toLocaleString('hi-IN')} /-</span></span>
                                    <span>Email: <span className="text-2xl font-medium">{foundedAccount.emailId}</span></span>
                                    <span>Phone: <span className="text-2xl font-medium">{foundedAccount.phoneNumber}</span></span>
                                </div>

                                {foundedAccount.transactions && foundedAccount.transactions.length > 0 ? (
                                    <div className="mt-6">
                                        <h2 className="text-2xl font-bold underline mb-4 text-center">Transaction History</h2>
                                        <ul className="bg-gray-800 p-4 rounded-md shadow-md text-white">
                                            {foundedAccount.transactions.map((transaction, idx) => (
                                                <li key={idx} className="flex justify-between px-4 py-6 border-b border-gray-600 last:border-none">
                                                    <span className="text-base font-medium text-gray-300 tracking-wider">{transaction.dateTime}</span>
                                                    <span className={`text-base font-semibold ${transaction.type === 'Debit' ? 'text-red-600' : 'text-green-600'}`}>
                                                        {transaction.type === 'Debit' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} {transaction.type}
                                                    </span>
                                                    <span className={`text-base font-medium ${transaction.type === 'Debit' ? 'text-red-600' : 'text-green-600'}`}>
                                                        ₹ {Number(transaction.amount).toLocaleString('hi-IN')} /-
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-red-600 text-2xl px-4 font-bold mt-4 py-4 border-4 border-red-400 rounded-lg text-center">
                                        No Transactions Found
                                    </p>
                                )}
                            </motion.div>
                        ) : (
                            <h1 className="text-red-600 text-4xl font-bold mt-20 py-4 px-8 border-4 border-red-400 rounded-lg">
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