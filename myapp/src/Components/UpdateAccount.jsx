import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const UpdateAccount = () => {
    const [searchAccountNumber, setSearchAccountNumber] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [edit, setEdit] = useState(false);
    const [updatedAccount, setUpdatedAccount] = useState(null);

    const handleSearchAccountNumber = async (e) => {
        e.preventDefault();

        if (!searchAccountNumber.trim()) {
            alert("enter the fields first!...");
            return;
        }
        
        try{
            const response = await axios.get(`http://localhost:8045/api/users/${searchAccountNumber}`);

            if(response.status === 200){
                setSearchResult(response.data);
                setUpdatedAccount(response.data)
            }
            return;
        }
        catch(err){
            setSearchResult("Account Not Found!...");
            return;
        }

    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAccount((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateAccount = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.put(`http://localhost:8045/api/update/users/${searchAccountNumber}`, updatedAccount);
            console.log(response);
            setSearchResult(updatedAccount);
            setEdit(false);
        }
        catch(err){
            alert("Failed to update account. Please try again.");
        }
    
    };

    return (
        <div className='text-white relative top-14 flex flex-col items-center w-full'>
            <motion.h1
                className="text-3xl font-semibold tracking-wide"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Update Details
            </motion.h1>

            <motion.form
                className='flex flex-col w-full items-center justify-center mt-14 space-y-6'
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <input
                    type='text'
                    placeholder='Enter Account Number'
                    value={searchAccountNumber}
                    onChange={(e) => setSearchAccountNumber(e.target.value)}
                    minLength={12}
                    className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                />
                <button
                    onClick={handleSearchAccountNumber}
                    type="submit"
                    className='border-2 border-white w-1/6 h-12 text-2xl font-semibold tracking-wide rounded-xl backdrop-blur-lg transition-all duration-200 ease-linear cursor-pointer'
                >
                    Search
                </button>
            </motion.form>

            {searchResult && (
                <>
                    {typeof searchResult === 'string' ? (
                        <motion.p
                            className="text-red-600 mt-10 text-4xl backdrop-blur-xl px-20 py-8 rounded-md border-2 border-red-600 capitalize"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {searchResult}
                        </motion.p>
                    ) : edit ? (
                        <>
                            <motion.form
                                className="grid grid-cols-2 mt-16 gap-x-11 gap-y-10"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <label className='flex flex-col'>
                                    First Name
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={updatedAccount.firstName}
                                        onChange={handleUpdateChange}
                                        required
                                        className="text-xl px-4 py-2 w-full border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                                    />
                                </label>
                                <label className='flex flex-col'>
                                    Last Name
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={updatedAccount.lastName}
                                        onChange={handleUpdateChange}
                                        required
                                        className="text-xl px-4 py-2 w-full border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                                    />
                                </label>
                                <label className='flex flex-col'>
                                    Phone Number
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={updatedAccount.phoneNumber}
                                        onChange={handleUpdateChange}
                                        maxLength={10}
                                        required
                                        className="text-xl px-4 py-2 w-full border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                                    />
                                </label>
                                <label className='flex flex-col'>
                                    Email
                                    <input
                                        type="email"
                                        name="emailId"
                                        value={updatedAccount.emailId}
                                        onChange={handleUpdateChange}
                                        required
                                        className="text-xl px-4 py-2 w-full border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                                    />
                                </label>
                            </motion.form>
                            <motion.button
                                type="submit"
                                onClick={handleUpdateAccount}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 mt-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Update
                            </motion.button>
                        </>
                    ) : (
                        <motion.div
                            className="grid grid-cols-2 mt-16 gap-y-4 backdrop-blur-lg p-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className='text-base'>First Name: <span className="font-semibold text-2xl tracking-wide">{searchResult.firstName}</span></p>
                            <p className='text-base'>Last Name: <span className="font-semibold text-2xl tracking-wide">{searchResult.lastName}</span></p>
                            <p className='text-base'>Phone Number: <span className="font-semibold text-2xl tracking-wide">{searchResult.phoneNumber}</span></p>
                            <p className='text-base'>E-Mail ID: <span className="font-semibold text-2xl tracking-wide">{searchResult.emailId}</span></p>
                            <motion.button
                                onClick={() => setEdit(true)}
                                className="bg-blue-400 text-black px-4 py-2 rounded-lg w-1/2 text-xl font-semibold hover:bg-blue-700 hover:text-white relative top-8 transition-all duration-200"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Edit
                            </motion.button>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default UpdateAccount;
