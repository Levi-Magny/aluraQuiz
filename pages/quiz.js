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
        <img alt="Loading" src={db.loadingImg} />
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
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const questionName = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasSelected = selectedAlternative !== undefined;
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
            setIsConfirmed(true);
            setTimeout(() => {
              setIsConfirmed(false);
              onSubmit();
            }, 1 * 2000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            // Ídice de cada alternativa - para ser usado pela label e na seleção.
            const alternativeId = `alternative___${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionName}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
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
// hook para alteração do estado da página (Loading, Quiz ou Result)
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  // hook para alteração da questão atual
  const [currentQuestion, setcurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

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
