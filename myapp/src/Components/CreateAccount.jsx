import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateAccount = () => {
    const DefaultValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailId: "",
        balance: "",
        accountNumber: "",
        accountType: "",
    };

    const [ userDetails, setUserDetails ] = useState(DefaultValues);
    const [ visible, setVisible ] = useState(true);
    const [ success, setSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const handleGenerateAccountNumber = () => {
        let account_Number = "";
        const nums = "0123456789";
        while (account_Number.length < 12) {
            account_Number += Math.floor(Math.random() * nums.length);
        }
        if (account_Number.length === 12) {
            setUserDetails({ ...userDetails, accountNumber: Number(account_Number) });
            setVisible(false);
        }
    };

    const handleUserFormSubmit = async (e) => {
        e.preventDefault();

        if (
            !userDetails.firstName.trim() || !userDetails.lastName.trim() ||
            !userDetails.phoneNumber || !userDetails.emailId ||
            !userDetails.balance || !userDetails.accountNumber ||
            !userDetails.accountType
        ) {
            alert("Please Fill the required Fields!...");
            return;
        }

        if (Number(userDetails.balance) < 500) {
            alert("Initial Deposit must be at least ₹500. Please check your deposit value.");
            return;
        }

        const CheckNumber = userDetails.phoneNumber;
        const CheckFirstName = /^[A-Za-z\s]+$/.test(userDetails.firstName);
        const CheckLastName = /^[A-Za-z\s]+$/.test(userDetails.lastName);
        const CheckEmailID = /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(userDetails.emailId);
        const CheckDeposit = userDetails.balance;

        if (
            /^\d{10}$/.test(CheckNumber) &&
            CheckFirstName &&
            CheckLastName &&
            CheckEmailID &&
            /^\d+$/.test(CheckDeposit)
        ) {
            setLoading(true);
            try {
                const response = await axios.post("http://localhost:8045/api/users", userDetails);

                if (response.status === 201 || response.status === 200) {
                    setUserDetails(DefaultValues);
                    setVisible(true);
                    setSuccess(true);
                } else {
                    alert("Failed to create an account. Please try again.");
                    return;
                }
            } catch (error) {
                console.error("Error creating account:", error);
                alert("Error while creating the account. Please try again later.");
            } finally {
                setLoading(false);
            }
        } else {
            alert("Invalid input. Please check the details once again.");
        }
    };

    useEffect(() => {
        if (success) {
            const Timer = setTimeout(() => setSuccess(false), 4000);
            return () => clearTimeout(Timer);
        }
    }, [success]);

    return (
        <>  
            <div>
                <div className="relative top-24 text-white flex flex-col items-center justify-center">
                    <h1 className="font-semibold text-3xl tracking-wide">
                        Welcome New User
                    </h1>
                    <label className="relative top-10 w-1/2 text-white">
                        <select
                            name="AccountType"
                            className="w-full px-4 py-2 border rounded-lg bg-white text-center text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:cursor-pointer tracking-wide font-bold uppercase text-lg"
                            value={userDetails.accountType}
                            onChange={(e) => setUserDetails({ ...userDetails, accountType: e.target.value })}
                        >
                            <option value="">-- Select Type of Account --</option>
                            <option value="savings">Savings</option>
                            <option value="current">Current</option>
                        </select>
                    </label>
                    <form className="grid grid-cols-2 gap-14 relative top-20 w-1/2">
                        <input 
                            type="text"
                            className="text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
                            placeholder="First Name"
                            value={userDetails.firstName}
                            onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                            required
                        />
                        <input 
                            type="text"
                            className="text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
                            placeholder="Last Name"
                            value={userDetails.lastName}
                            onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                            required
                        />
                        <input 
                            type="text"
                            className="text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
                            placeholder="Phone Number"
                            value={userDetails.phoneNumber}
                            onChange={(e) => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
                            required
                            maxLength={10}
                        />
                        <input 
                            type="email"
                            className="text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
                            placeholder="E-Mail"
                            value={userDetails.emailId}
                            onChange={(e) => setUserDetails({ ...userDetails, emailId: e.target.value })}
                            required
                        />
                        <input 
                            type="text"
                            className="text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
                            placeholder="Initial Deposit (Min ₹500/-)"
                            value={userDetails.balance}
                            onChange={(e) => setUserDetails({ ...userDetails, balance: e.target.value })}
                            required
                        />
                        <input 
                            type="text"
                            className="text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none cursor-not-allowed font-semibold tracking-wider"
                            placeholder="Account Number"
                            readOnly
                            value={userDetails.accountNumber}
                            required
                        />
                    </form>
                    <button 
                        type="submit"
                        className="relative top-36 bg-green-500 w-1/6 h-12 text-xl cursor-pointer text-black font-semibold tracking-wider rounded-lg hover:bg-green-700 transition-all duration-100 transform"
                        onClick={handleUserFormSubmit}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                    {visible && (
                        <button 
                            type="button"
                            className="relative left-1/3 bottom-6 bg-yellow-500 w-1/12 h-12 text-xl font-semibold text-black rounded-lg cursor-pointer tracking-widest hover:bg-yellow-700 transition-all duration-100 transform"
                            onClick={handleGenerateAccountNumber}
                        >
                            G.A.N
                        </button>
                    )}
                    {success && (
                        <p className="text-2xl pt-2 py-2 text-green-400 font-semibold">
                            Your Account is Created Successfully 🎉
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateAccount;