import React, { useState, useEffect } from 'react';

const CreateAccount = ({ AccountsData, setAccountsData }) => {
        
    const DefaultValues = {
        FirstName: '',
        LastName:'',
        PhoneNumber:'',
        EmailId:'',
        Balance:'',
        AccountNumber:'',
        AccountType:'',
    }
    
    const [ userDetails, setUserDetails ] = useState(DefaultValues);
    const [ visible, setVisible ] = useState(true);
    const [ success, setSuccess ] = useState(false);
    
    const handleGenerateAccountNumber = () => {
        let account_Number = "";
        const nums = "0123456789";
        while( account_Number.length <   12 ){
            account_Number += Math.floor(Math.random() * nums.length);
        }
        if ( account_Number.length === 12 ){
            setUserDetails({ ...userDetails, AccountNumber: Number(account_Number)});
            setVisible(false);
        }
    }
    
    const handleUserFormSubmit = (e) =>{
        e.preventDefault();
        if ( userDetails.FirstName === " " || userDetails.AccountNumber === "" || userDetails.Balance === "" || userDetails.EmailId === "" || userDetails.LastName === "" || userDetails.PhoneNumber === ""  ) {
            alert("Please Fill the required Fields !... "); 
        }
        else if( Number(userDetails.Balance) < 500){
            alert("Initial Deposit must be 500 and Please check the deposit value once what you entered!... ");
            return;
        }
        else if( userDetails.AccountType === "" ){
            alert("Type of Account Must be Required");
            return;
        }
        else{
            const CheckNumber = String(userDetails.PhoneNumber);
            const CheckFirstName = /^[A-Za-z\s]+$/.test(userDetails.FirstName);
            const CheckLastName = /^[A-Za-z\s]+$/.test(userDetails.LastName);
            const CheckEmailID = /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(userDetails.EmailId);
            const CheckDeposit = String(userDetails.Balance);
    
            if ( /^\d{10}$/.test(CheckNumber) && CheckNumber.length === 10 && CheckFirstName && CheckLastName && CheckEmailID && /^\d+$/.test(CheckDeposit)  ){
                setAccountsData([...AccountsData, userDetails]);
                setUserDetails(DefaultValues);
                setVisible(true);
                setSuccess(true);
            }
            else{
                alert("Some thing went wrong check the details Once!...")
            }
        }
    }
    
    useEffect(() => {
        if (success){
            const Timer = setTimeout(() => setSuccess(false), 4000);
            return () => clearTimeout(Timer)
        }
    }, [success]);
    
    return (
        <>  
            <div>
                <div className='relative top-24 text-white flex flex-col items-center justify-center'>
                    <h1 className='font-semibold text-3xl tracking-wide'>
                        Welcome New User
                    </h1>
                    <label className="relative top-10 w-1/2 text-black">
                        <select
                            name="AccountType"
                            className="w-full px-4 py-2 border rounded-lg bg-white text-center text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:cursor-pointer tracking-wide font-bold uppercase text-lg"
                            value={userDetails.AccountType}
                            onChange={(e) => {setUserDetails({ ...userDetails, AccountType: e.target.value})}}
                        >
                            <option value="" className='text-lg font-semibold' >-- Select Type of Account --</option>
                            <option value="savings" className='text-lg font-semibold'>Savings</option>
                            <option value="current" className='text-lg font-semibold'>Current</option>
                        </select>
                    </label>
                    <form className='grid grid-cols-2 gap-14 relative top-20 w-1/2'>
                        <input 
                            type="text"
                            className='text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider'
                            placeholder='First Name'
                            value={userDetails.FirstName}
                            onChange={(e) => setUserDetails({ ...userDetails, FirstName: e.target.value})}
                            required
                        />
                        <input 
                            type="text"
                            className='text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider'
                            placeholder='Last Name'
                            value={userDetails.LastName}
                            onChange={(e) => setUserDetails({ ...userDetails, LastName: e.target.value})}
                            required
                        />
                        <input 
                            type="text"
                            className='text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider'
                            placeholder='Phone Number'
                            value={userDetails.PhoneNumber}
                            onChange={(e) => setUserDetails({ ...userDetails, PhoneNumber: e.target.value})}
                            required
                            maxLength={10}
                        />
                        <input 
                            type="email"
                            className='text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider'
                            placeholder='E-Mail'
                            value={userDetails.EmailId}
                            onChange={(e) => setUserDetails({ ...userDetails, EmailId: e.target.value})}
                            required
                        />
                        <input 
                            type="text"
                            className='text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider'
                            placeholder='Initial Deposit ( Min ₹500/-) '
                            value={userDetails.Balance}
                            onChange={(e) => setUserDetails({ ...userDetails, Balance: e.target.value})}
                            required
                        />
                        <input 
                            type="text"
                            className='text-xl px-2 py-2 border-b-2 bg-transparent focus:outline-none cursor-not-allowed font-semibold tracking-wider'
                            placeholder='Account Number'
                            readOnly
                            value={userDetails.AccountNumber}
                            required
                        />
                    </form>
                    <button 
                        type='submit' 
                        className='relative top-36 bg-green-500 w-1/6 h-12 text-xl cursor-pointer text-black font-semibold tracking-wider rounded-lg hover:bg-green-700 transition-all duration-100 transform'
                        onClick={handleUserFormSubmit}
                    >
                        Create Account
                    </button>
                    {visible && (
                        <button 
                            type='button'
                            className='relative left-1/3 bottom-6 bg-yellow-500 w-1/12 h-12 text-xl font-semibold text-black rounded-lg cursor-pointer tracking-widest hover:bg-yellow-700 transition-all duration-100 transform'
                            onClick={handleGenerateAccountNumber}
                        >
                            G.A.N
                        </button>
                    )}
                    {   
                        success && (
                            <p className='text-2xl pt-2 py-2 text-green-400 font-semibold'> Your Account is Created Successfully </p>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default CreateAccount