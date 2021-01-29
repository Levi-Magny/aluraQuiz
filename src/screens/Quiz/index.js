/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
// import db from '../../../db.json';
import Widget from '../../components/Widget';
import AlternativeForm from '../../components/AlternativeForm';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArow';

function ResultWidget({ results, userName }) {
  const countRightAns = results.filter((x) => x).length;
  return (
    <Widget>
      <Widget.Header>
        RESULTADO:
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src="https://i.pinimg.com/originals/25/7d/3a/257d3afd123f2b88a6832067819596ef.gif"
      />
      <Widget.Content>
        <p>{ `${userName}, você acertou ${countRightAns} ${countRightAns > 1 ? 'Questões' : 'Questão'}!` }</p>
        {results.map((result, index) => (
          <Widget.Result
            key={`result__${result}`}
            data-correct={result}
          >
            <p>{`QUESTÃO ${index + 1}: ${result === true ? 'Resposta Certa!' : 'Resposta Errada!'}`}</p>
          </Widget.Result>
        ))}
      </Widget.Content>
    </Widget>
  );
}

function LoadWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando ...
      </Widget.Header>

      <Widget.Content>
        <img
          alt="Loading"
          src="../../../25.gif"
        />
      </Widget.Content>
    </Widget>
  );
}
// Função que gera o widget de questão
function QuestionWidget({
  questionIndex, // ídice da questão
  question, // Objeto question
  totalQuestions, // total de questões
  onSubmit, // função para atualizar questão
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [rightAlternative, setRightAlternative] = React.useState(undefined);
  const questionName = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativeForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsConfirmed(true);
            setRightAlternative(true);
            setTimeout(() => {
              addResult(isCorrect);
              setRightAlternative(undefined);
              setIsConfirmed(false);
              setSelectedAlternative(undefined);
              onSubmit();
            }, 1 * 2000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            // Ídice de cada alternativa - para ser usado pela label e na seleção.
            const alternativeId = `alternative___${alternativeIndex}`;
            const isSelected = selectedAlternative === alternativeIndex;
            const AlternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-isselected={isSelected}
                data-status={isConfirmed && isSelected && AlternativeStatus}
                data-right={isConfirmed && alternativeIndex === question.answer && rightAlternative}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={questionName}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={isSelected}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          {/* {<pre>
            {JSON.stringify(question, null, 4)}
          </pre>} */}
          <Button type="submit" disabled={!hasSelected}>
            Confirmar
          </Button>
          {isConfirmed && isCorrect && <p>Cê é bom mermo!</p>}
          {isConfirmed && !isCorrect && <p>Erroooooou!</p>}
        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz({ externalQuestions, externalBg }) {
// hook para alteração do estado da página (Loading, Quiz ou Result)
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  // hook para alteração da questão atual
  const [currentQuestion, setcurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const router = useRouter();
  const nameUser = router.query;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  // hook que indica para o react que será usado um efeito (no caso, atualizar o statePage)
  React.useEffect(() => {
    // ao iniciar a página, o app espera 1s antes de mudar o estado
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  // ******** ciclo de vida do React ******** \\
  // Nasce === didMount
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount

  // função que muda o estado da questão quando o botão 'próxima' é apertado
  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    // Se não for a última questão
    if (nextQuestion < totalQuestions) {
      // incrementa o ídice da questão
      setcurrentQuestion(nextQuestion);
    } else {
      // se não muda o estado da tela para mostrar o resultado.
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            questionIndex={questionIndex}
            question={question}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadWidget />}

        {screenState === screenStates.RESULT
        && <ResultWidget results={results} userName={nameUser.name} />}
      </QuizContainer>
    </QuizBackground>
  );
}
