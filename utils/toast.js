import toast from "react-hot-toast"

export const success = (message) => {
    toast.success(message, {
        duration: 1000,
        icon: '👏',
        style: {
            paddingRight: '10px',
            paddingLeft: '10px',
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    })
}

export const error = (message) => {
    toast.error(message, {
        duration: 1000,
        style: {
            paddingRight: '10px',
            paddingLeft: '10px',
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    })
}