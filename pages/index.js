import React from 'react';
import { useRouter } from 'next/router';// hook do Next.js para rotas

import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-30%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();
              // router.push(`/quiz?name=${name}`);
              router.push(`/quiz/self___Levi___${name}`);
              // eslint-disable-next-line no-console
              console.log('Indo para a página do quiz');

              // router manda para a próxima página
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(evento) => {
                  // state
                  setName(evento.target.value);
                }}
                placeholder="Fala seu nome aí..."
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Vamos começar ${name}${name ? '?' : ''}`}
              </Button>
              <Widget.Warning>
                <p data-disabled={name.length === 0}>Warning: Insira um nome para continuar!</p>
              </Widget.Warning>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-30%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, userName] = linkExterno.replace('https://', '')
                  .replace('.vercel.app/', '')
                  .split('.');
                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      data-disabled={name.length === 0}
                      href={name.length === 0 ? '/' : `/quiz/${projectName}___${userName || ''}___${name}`}
                    >
                      {`${userName || ''}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.4, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-30%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Levi-Magny/aluraQuiz" />
    </QuizBackground>
  );
}
