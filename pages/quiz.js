/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
// import { useRouter } from 'next/router';// hook do Next.js para rotas

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

function LoadWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando ...
      </Widget.Header>

      <Widget.Content>
        Loading ...
      </Widget.Content>
    </Widget>
  );
}
// Função que gera o widget de questão
function QuestionWidget({
  questionIndex,
  question,
  totalQuestions,
  onSubmit,
}) {
  const questionName = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
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
        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative___${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionName}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          {/* {<pre>
            {JSON.stringify(question, null, 4)}
          </pre>} */}
          <Button>
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setcurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
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
    <QuizBackground backgroundImage={db.bg2}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            questionIndex={questionIndex}
            question={question}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}
        {screenState === screenStates.LOADING && <LoadWidget />}

        {screenState === screenStates.RESULT && <div> Você acertou X questões, Parabéns</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
