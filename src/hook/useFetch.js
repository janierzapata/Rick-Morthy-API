import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const montado = useRef(true)
    const [state, setstate] = useState({ data: null, loading: true, error: null })


    useEffect(() => {

        return () => {
            montado.current = false
        }
    }, [])
 
    useEffect(() => {

        setstate({ data: null, loading: true, error: null })

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (montado.current) {
                    setstate({
                        loading: false,
                        error: null,
                        data
                    })
                }
            })
    }, [url])

    return state;
}
