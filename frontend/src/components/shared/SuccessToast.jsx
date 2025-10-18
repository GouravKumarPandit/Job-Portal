import React from 'react'

const SuccessToast = ({toastMessage}) => {
    return (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            ✅ {toastMessage}
        </div>
    )
}

export default SuccessToast;