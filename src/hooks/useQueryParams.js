import { useMemo, useReducer, useEffect } from "react"

export function useQueryParams(initialState) {
  const initState = useMemo(() => {
    const url = new URLSearchParams(window.location.search)
    if(url.size === 0) return initialState

    return Object.fromEntries(url)
  },[]) 

  const [queryObject, updateQuery] = useReducer((state, current) => ({...state,...current}), initState)

  const onChangeQuery = (value) => {
    let data = {...queryObject, ...value}

    updateQuery(data)
    dispatchEvent(new CustomEvent('DANIEL', {detail: data }))
  }

  useEffect(() => {
    const danielEvent = (e) => {
      let data = {}
  
      Object.entries(e.detail)
        .forEach(([key, value]) => {
          if(value.length > 0) data[key] = value
        } )

      const url = new URLSearchParams(data)
      const urlString = url.size > 0 ? `/?${url.toString()}` : '/'
      window.history.pushState({}, '', urlString)
    } 
    
    window.addEventListener('DANIEL', danielEvent )

    return () => {
      window.removeEventListener('DANIEL', danielEvent)
    }  
  }, [])

  const url = new URLSearchParams(queryObject)
  const queryUrl = url.size > 0 ?  {...initialState, ...Object.fromEntries(url)} : initialState

  return { queryUrl, onChangeQuery, queryObject }
}