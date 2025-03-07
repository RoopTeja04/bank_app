import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import axios from 'axios';

const Transactions = () => {
    const defaultTransferValues = {
        FromAccountNumber: '',
        ToAccountNumber: '',
    };

    const defaultTransferAmount = {
        Amount: '',
    };

    const [transferAccountNumbers, setTransferAccountNumbers] = useState(defaultTransferValues);
    const [TransferAmount, setTransferAmount] = useState(defaultTransferAmount);
    const [fromAccount, setFromAccount] = useState(null);
    const [toAccount, setToAccount] = useState(null);
    const [visible, setVisible] = useState(false);

    const handleTransfer = async (e) => {
        e.preventDefault();

        const fromAccountNum = transferAccountNumbers.FromAccountNumber.trim();
        const toAccountNum = transferAccountNumbers.ToAccountNumber.trim();

        if (!fromAccountNum || !toAccountNum) {
            alert("enter the fields first!...");
            return;
        }
        else if (fromAccountNum === toAccountNum) {
            alert('From and To Account Numbers are the same. Transfer is not allowed.');
            return;
        }
        else if (fromAccountNum.length !== 12) {
            alert(`${fromAccountNum} InValid Number. Please check the number once!...`);
            return;
        }
        else if (toAccountNum.length !== 12) {
            alert(`${toAccountNum} InValid Number. Please check the number once!...`);
            return;
        }

        try {
            const foundedFromAccount = await axios.get(`http://localhost:8045/api/users/${fromAccountNum}`);
            const foundedToAccount = await axios.get(`http://localhost:8045/api/users/${toAccountNum}`);

            setTransferAmount(defaultTransferAmount)
            setFromAccount(foundedFromAccount.data);
            setToAccount(foundedToAccount.data);
            setVisible(true);
        }
        catch (err) {
            if (!fromAccountNum) {
                alert(`From Account Number ${fromAccountNum} doesn't exist!`);
                return;
            }
            else {
                alert(`To Account Number ${toAccountNum} doesn't exist!`);
                return;
            }
        }

        alert('Accounts validated. You can proceed with the transfer.');
    };

    const handleAmount = async (e) => {
        e.preventDefault();

        if (!TransferAmount.Amount || isNaN(TransferAmount.Amount) || TransferAmount.Amount <= 0) {
            alert('Enter a valid transfer amount!');
            return;
        }

        if (Number(fromAccount.balance) >= Number(TransferAmount.Amount)) {

            fromAccount.balance = Number(fromAccount.balance) - Number(TransferAmount.Amount);
            toAccount.balance = Number(toAccount.balance) + Number(TransferAmount.Amount);

            try {
                const responseFromAccount = await axios.put(`http://localhost:8045/api/updatebalances-from/${fromAccount.accountNumber}/${toAccount.accountNumber}/${TransferAmount.Amount}`, fromAccount);
                const responseToAccount = await axios.put(`http://localhost:8045/api/updatebalances-to/${toAccount.accountNumber}/${fromAccount.accountNumber}/${TransferAmount.Amount}`, toAccount);
                setTransferAccountNumbers(defaultTransferValues);
                setTransferAmount(defaultTransferAmount);
                setFromAccount(null);
                setToAccount(null);
                console.log(fromAccount, toAccount);
                alert('Amount transferred successfully!...');
                setVisible(false);
                return;
            }
            catch (err) {
                alert('network error!... Please try again.');
                return;
            }
        } else {
            alert('Insufficient balance in From Account!');
        }
    };

    const SwapAccountNumber = () => {
        setTransferAccountNumbers({
            FromAccountNumber: transferAccountNumbers.ToAccountNumber,
            ToAccountNumber: transferAccountNumbers.FromAccountNumber,
        });
    };

    return (
        <>
            <div className="text-white bg-[#020d2] h-screen flex flex-col items-center pt-20 md:pt-20 w-full px-4 md:px-0">
                <h1 className="text-3xl font-semibold tracking-wide text-center">Money Transfer</h1>
                <div className="flex flex-col md:flex-row justify-center relative top-16 space-y-6 md:space-y-0 md:space-x-10 px-4 w-full">
                    <motion.input
                        type="text"
                        value={transferAccountNumbers.FromAccountNumber}
                        onChange={(e) =>
                            setTransferAccountNumbers({
                                ...transferAccountNumbers,
                                FromAccountNumber: e.target.value,
                            })
                        }
                        placeholder="From Account Number"
                        maxLength={12}
                        className="text-xl px-4 py-2 w-full md:w-1/4 text-center border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
                        whileFocus={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                    <div className='flex flex-row items-center justify-center'>
                        <SwapHorizRoundedIcon
                            className="relative top-1 text-5xl border-4 border-white rounded-full px-2 cursor-pointer"
                            fontSize=''
                            onClick={SwapAccountNumber}
                        />
                    </div>

                    <motion.input
                        type="text"
                        value={transferAccountNumbers.ToAccountNumber}
                        onChange={(e) =>
                            setTransferAccountNumbers({
                                ...transferAccountNumbers,
                                ToAccountNumber: e.target.value,
                            })
                        }
                        placeholder="To Account Number"
                        maxLength={12}
                        className="text-xl px-4 py-2 w-full text-center md:w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
                        whileFocus={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <motion.button
                    type="button"
                    onClick={handleTransfer}
                    className="relative top-28 h-14 border-white border-2 w-2/3 md:w-1/6 cursor-pointer text-xl font-bold tracking-wider rounded-xl px-6 py-2 bg-blue-700 text-white hover:bg-blue-500 hover:text-black hover:border-black transition duration-300"
                    whileHover={{ scale: 1.1 }}
                >
                    Search Account
                </motion.button>
                {visible && (
                    <motion.div
                        className="flex flex-col relative items-center top-32 py-2 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.input
                            type="text"
                            value={TransferAmount.Amount}
                            onChange={(e) =>
                                setTransferAmount({ ...TransferAmount, Amount: e.target.value })
                            }
                            placeholder="Enter the Amount ₹ 1 /-"
                            className="text-xl px-4 py-2 w-80 text-center md:w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
                            whileFocus={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.button
                            type="button"
                            onClick={handleAmount}
                            className="h-14 relative top-10 bg-green-600 w-2/3 md:w-1/6 text-xl font-bold text-black tracking-wider rounded-xl hover:bg-green-900 cursor-pointer transition duration-500"
                            whileHover={{ scale: 1.1 }}
                        >
                            Transfer Amount
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Transactions;
