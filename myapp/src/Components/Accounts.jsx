import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Accounts = () => {
    const [accountsData, setAccountsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [savingCount, setSavingCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:8045/api/users');
                if (response.status !== 200) {
                    setError("Failed to fetch accounts. Please try again later.");
                    return;
                }
                const data = response.data;
                setAccountsData(response.data);

                const savings = data.filter(account => account.accountType === 'savings').length;
                const current = data.filter(account => account.accountType === 'current').length;

                setSavingCount(savings);
                setCurrentCount(current);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    if (loading) {
        return <p className="text-white text-2xl text-center mt-10">Loading user accounts...</p>;
    }

    if (error) {
        return <p className="text-red-600 text-2xl text-center mt-10">{error}</p>;
    }

    return (
        <div className="mt-16 pb-12 min-h-screen text-white flex flex-col items-center top-14 px-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wider underline underline-offset-8 pb-2 text-center">
                Accounts of Bankera
            </h1>

            <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-4xl mt-6 mb-6">
                <div className="account-card bg-gradient-to-r from-green-400 to-green-600 px-6 py-4 rounded-2xl text-black cursor-pointer text-center w-full md:w-auto">
                    <p className="font-medium text-lg">
                        Savings Account: <span className="text-3xl md:text-4xl font-bold">{savingCount}</span>
                    </p>
                </div>
                <div className="account-card bg-gradient-to-r from-blue-400 to-blue-600 px-6 py-4 rounded-2xl text-black cursor-pointer text-center w-full md:w-auto">
                    <p className="font-medium text-lg">
                        Current Account: <span className="text-3xl md:text-4xl font-bold">{currentCount}</span>
                    </p>
                </div>
                <div className="account-card bg-gradient-to-r from-purple-400 to-purple-600 px-6 py-4 rounded-2xl text-black cursor-pointer text-center w-full md:w-auto">
                    <p className="font-medium text-lg">
                        Total Account: <span className="text-3xl md:text-4xl font-bold">{accountsData.length}</span>
                    </p>
                </div>
            </div>

            {accountsData.length === 0 ? (
                <p className="text-red-600 text-2xl md:text-4xl font-semibold mt-14 backdrop-blur-lg py-4 px-6 md:px-8 border-4 border-red-400 rounded-lg text-center">
                    No Accounts Have Been Created
                </p>
            ) : (
                <div className="overflow-x-auto w-full mt-4 px-2 md:px-10">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-center text-xs md:text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase text-[10px] md:text-xs tracking-wider">
                                <th className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">SL.NO</th>
                                <th className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">First Name</th>
                                <th className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">Last Name</th>
                                <th className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">Phone</th>
                                <th className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">E-Mail</th>
                                <th className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">Acc No.</th>
                                <th className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">Type</th>
                                <th className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountsData.map((person, index) => (
                                <tr key={index} className="hover:bg-green-600 hover:text-black cursor-pointer transition duration-100">
                                    <td className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">{index + 1}</td>
                                    <td className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">{person.firstName}</td>
                                    <td className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">{person.lastName}</td>
                                    <td className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">{person.phoneNumber}</td>
                                    <td className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">{person.emailId}</td>
                                    <td className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">{person.accountNumber}</td>
                                    <td className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300 capitalize">{person.accountType}</td>
                                    <td className="py-2 px-2 text-base md:py-3 md:px-4 border border-gray-300">₹ {Number(person.balance).toLocaleString('hi-IN')} /-</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Accounts;