import { useState } from "react"

export const useField = (type) => {

    const initialValue = ''

    const [value, setValue] = useState(initialValue)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => setValue(initialValue)

    return {
        inputfields: {
            value,
            type,
            onChange
        },
        reset
    }
}