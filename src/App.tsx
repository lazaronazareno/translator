import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useEffect } from 'react'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/Textarea'
import { translate } from './services/translateCohere'
import { ClipBoardIcon, SpeakerIcon, SwapArrowsIcon } from './components/icons'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const {
    fromLanguage,
    toLanguage,
    userText,
    resultText,
    loading,
    setResultText,
    setUserText,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage
  } = useStore()

  const debounceUserText = useDebounce(userText, 800)

  useEffect(() => {
    if (debounceUserText === '') return

    translate({ text: debounceUserText, fromLanguage, toLanguage })
      .then((result) => {
        if (result === null || result === undefined) return
        console.log(result)
        setResultText(result.generations[0].text)
      })
      .catch(() => { setResultText('Error') })
  }, [debounceUserText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(resultText).catch(() => { })
  }

  const handleSpeak = () => {
    const utterence = new SpeechSynthesisUtterance(resultText)
    utterence.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterence)
  }

  return (
    <Container fluid>
      <h1>Cohere Translate</h1>
      <Row className="justify-content-center">
        <Col sm={4}>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />
            <TextArea
              type={SectionType.From}
              value={userText}
              onChange={setUserText}
              loading={loading}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <SwapArrowsIcon />
          </Button>
        </Col>
        <Col sm={4}>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
            <div className='text-area-container'>
              <TextArea
                type={SectionType.To}
                value={resultText}
                onChange={setResultText}
                loading={loading}
              />
              <div className='button-container'>
                <Button
                  variant='link'
                  onClick={handleClipboard}
                >
                  <ClipBoardIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleSpeak}
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
      <span><strong>Note: </strong> Limited to 5 translates per minute.</span>
    </Container>
  )
}

export default App
