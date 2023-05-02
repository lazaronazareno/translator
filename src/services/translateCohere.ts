import { SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types'
import axios from 'axios'

const apiKey: string = import.meta.env.VITE_COHERE_API_KEY

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: `Bearer ${apiKey}`
  }
}

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const requestOptions = {
    ...options,
    url: 'https://api.cohere.ai/v1/generate',
    data: {
      max_tokens: 300,
      return_likelihoods: 'NONE',
      model: 'command-xlarge-nightly',
      temperature: 0.9,
      prompt: `Translates ${text} from ${fromCode} to ${toCode}. Just give the answer`
    }
  }

  return await axios.request(requestOptions).then(res => {
    return res.data
  })
    .catch((error) => {
      console.error(error)
    })
}
