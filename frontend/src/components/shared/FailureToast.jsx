import React from 'react'

const FailureToast = ({toastMessage}) => {
    return (
        <div className="fixed top-20 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
            ❌ {toastMessage}
        </div>
    )
}

export default FailureToast;