import { useMemo, useReducer, useEffect } from "react"

export function useQueryParams(initialState) {
  const initState = useMemo(() => {
    const url = new URLSearchParams(window.location.search)
    if(url.size === 0) return initialState

    return Object.fromEntries(url)
  },[]) 

  const [queryObject, updateQuery] = useReducer((state, current) => ({...state,...current}), initState)

  const onChangeQuery = (value) => {
    console.log('change query')
    let data = {...queryObject, ...value}

    updateQuery(data)
    dispatchEvent(new CustomEvent('filter', {detail: data }))
  }

  useEffect(() => {
    const filterEvent = (e) => {
      let data = {}
  
      Object.entries(e.detail)
        .forEach(([key, value]) => {
          if(value.length > 0) data[key] = value
        } )

      const url = new URLSearchParams(data)
      const urlString = url.size > 0 ? `/search?${url.toString()}` : '/'
      window.history.pushState({}, '', urlString)
    } 
    
    window.addEventListener('filter', filterEvent )

    return () => {
      window.removeEventListener('filter', filterEvent)
    }  
  }, [])

  const urlParams = new URLSearchParams(window.location.search)
  const queryUrl = urlParams.size > 0 ?  {...initialState, ...Object.fromEntries(urlParams)} : initialState

  console.log('update url', window.location)

  return { queryUrl, onChangeQuery, queryObject }
}