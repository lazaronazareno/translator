import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useEffect } from 'react'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/Textarea'
import { translate } from './services/translate'
import { SwapArrowsIcon } from './components/Icons'

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

  useEffect(() => {
    if (userText === '') return

    translate({ text: userText, fromLanguage, toLanguage })
      .then((result) => {
        if (result === null || result === undefined) return
        setResultText(result)
      })
      .catch(() => { setResultText('Error') })
  }, [userText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h1>Translate</h1>
      <Row>
        <Col>
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
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
            <TextArea
              type={SectionType.To}
              value={resultText}
              onChange={setResultText}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
