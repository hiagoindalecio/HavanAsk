import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';
import { RoomCodeProps } from '../types/types';
import { RoomCode } from './RoomCode';

export function Room() {
  const params = useParams<RoomCodeProps>();
  const [newQuestion, setNewQuestion] = useState('');
  const user = useAuth().user;

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('Você precisa estar autenticado!');
    }

    const question = {
      content: newQuestion,
      autor : {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${params.code}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <RoomCode code={params.code} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala Teste</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {
              !user ? 
                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
              :
                <div className='user-info'>
                  <img src={user.avatar as string} alt="Profile" />
                  <span>{user.name}</span>
                </div>
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}