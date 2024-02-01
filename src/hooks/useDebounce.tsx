import { useEffect, useState } from "react";

export default function useDebounce<T>(val: T, delay = 350) {
    const [debouncedVal, setDebouncedVal] = useState<T>(val)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedVal(val)
        }, delay)

        return () => clearTimeout(timeout)
    }, [val, delay])

    return debouncedVal
}