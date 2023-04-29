import { useReducer } from 'react'
import { type FromLanguage, type Action, type State, type Language } from '../types'

const InitialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  userText: '',
  resultText: '',
  loading: false
}

function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === 'SET_USER_TEXT') {
    return {
      ...state,
      loading: true,
      userText: action.payload,
      resultText: ''
    }
  }

  if (type === 'SET_RESULT_TEXT') {
    return {
      ...state,
      loading: false,
      resultText: action.payload
    }
  }

  return state
}

export function useStore() {
  const [{
    fromLanguage,
    toLanguage,
    userText,
    resultText,
    loading
  }, dispatch] = useReducer(reducer, InitialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setUserText = (payload: string) => {
    dispatch({ type: 'SET_USER_TEXT', payload })
  }

  const setResultText = (payload: string) => {
    dispatch({ type: 'SET_RESULT_TEXT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    userText,
    resultText,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setUserText,
    setResultText
  }
}
