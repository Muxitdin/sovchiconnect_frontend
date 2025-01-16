import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Verification() {
    const { auth, isLoggedIn } = useSelector(state => state.auth);

    const navigate = useNavigate()
    const handleVerification = () => {
        if (isLoggedIn) {
            navigate('/user/profile')
            document.location.reload()
            return;
        }
        navigate('/signin')
    }

    return (
        <div className='h-full w-full flex flex-col gap-6 light:bg-primary light:text-primary-foreground items-center justify-center'>
            <h1 className='text-[64px] font-bold'>Verification Page</h1>
            <p className='text-[#999] text-center'>A verification link has been emailed to you. <br />Please check your inbox</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleVerification}>Done</button>
        </div>
    )
}

export default Verification