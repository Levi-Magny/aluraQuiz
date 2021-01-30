/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
// import { useRouter } from 'next/router';
// import db from '../../../db.json';
import Lottie from 'react-lottie';
import { motion } from 'framer-motion';
import animationData from '../../../public/loading2.json';
import Widget from '../../components/Widget';
import AlternativeForm from '../../components/AlternativeForm';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArow';

const ResultMessage = {
  INITIAL: ['Calculando...', 'https://media4.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif'],
  FAIL: ['Você falhou com esse quiz!!!', 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/28/1531498449-giphy-36.gif?resize=480:*'],
  NOTBAD: ['Você é quase um Jovem Titã!!!', 'https://i.pinimg.com/originals/30/8c/b1/308cb15b423a6588910ee97f61969c2d.gif'],
  SUCCESS: ['Você foi eleito membro efetivo da Liga da Justiça', 'https://31.media.tumblr.com/tumblr_m9blkdPyBr1rd1k88o1_500.gif'],
};

function ResultWidget({ results, userName }) {
  // const countRightAns = results.filter((x) => x !== 0).length;
  const Score = Math.floor(results.reduce((score, weight) => score + weight, 0) * 100);
  const [[scoreMessage, scoreAnimation], setScoreMessage] = React.useState(ResultMessage.INITIAL);

  React.useEffect(() => {
    // ao iniciar a página, o app espera 1s antes de mudar o estado
    if (Score > 90) {
      setScoreMessage(ResultMessage.SUCCESS);
    } else if (Score >= 60) {
      setScoreMessage(ResultMessage.NOTBAD);
    } else {
      setScoreMessage(ResultMessage.FAIL);
    }
  }, []);

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        RESULTADO:
      </Widget.Header>
      <Widget.Result>
        <h2>{scoreMessage}</h2>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={scoreAnimation}
        />
      </Widget.Result>
      <Widget.Content>
        <p>{ `${userName}, você fez ${Score} ${(Score > 1 || Score === 0) ? 'Pontos' : 'Ponto'}!` }</p>
        {results.map((result, index) => (
          <Widget.Result
            as={motion.label}
            transition={{ delay: (index) / 10, duration: 0.4 }}
            variants={{
              show: { opacity: 1, x: '0' },
              hidden: { opacity: 0, x: '-30%' },
            }}
            initial="hidden"
            animate="show"
            key={`result__${result}`}
            data-correct={result > 0}
          >
            <p>{`QUESTÃO ${index + 1}: ${result > 0 ? 'Resposta Certa!' : 'Resposta Errada!'}`}</p>
          </Widget.Result>
        ))}
      </Widget.Content>
    </Widget>
  );
}

function LoadWidget() {
  const [animationState, setAnimationState] = React.useState({
    isStopped: true, isPaused: true,
  });

  React.useEffect(() => {
    setAnimationState({ isStopped: false, isPaused: false });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Widget>
      <Widget.Header>
        Carregando ...
      </Widget.Header>

      <Widget.Content>
        <Lottie
          options={defaultOptions}
          height={100}
          width={200}
          isStopped={animationState.isStopped}
          isPaused={animationState.isPaused}
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
                // as="label"
                as={motion.label}
                transition={{ delay: (alternativeIndex) / 15, duration: 0.2 }}
                variants={{
                  show: { opacity: 1, x: '0' },
                  hidden: { opacity: 0, x: '-30%' },
                }}
                initial="hidden"
                animate="show"
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

export default function Quiz({
  externalQuestions,
  externalBg,
  playerName,
}) {
// hook para alteração do estado da página (Loading, Quiz ou Result)
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  // hook para alteração da questão atual
  const [currentQuestion, setcurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const nameUser = playerName;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      (result ? (questionIndex + 1) / 10 : 0),
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
        && <ResultWidget results={results} userName={nameUser} />}
      </QuizContainer>
    </QuizBackground>
  );
}
