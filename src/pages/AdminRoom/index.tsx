import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import '../Room/styles.scss';

import { RoomCodeProps } from '../../types/types';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import { useRoom } from '../../hooks/useRoom';

import { database } from '../../services/firebase';

export function AdminRoom() {
  const params = useParams<RoomCodeProps>();
  const history = useHistory();
  const { title, questions } = useRoom(params.roomId);

  async function handleEndroom() {
    await database.ref(`rooms/${params.roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  async function handleDeleteQuestionById(questionId: string) {
    if(window.confirm('Tem certeza que deseja excluir a pergunta?')) {
      await database.ref(`rooms/${params.roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string, isAnswered?: boolean) {
    await database.ref(`rooms/${params.roomId}/questions/${questionId}`).update({
      isAnswered: isAnswered ? false : true
    });
  }

  async function handleHighlightQuestion(questionId: string, isHighlighted?: boolean) {
    await database.ref(`rooms/${params.roomId}/questions/${questionId}`).update({
      isHighlighted: isHighlighted ? false : true
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          
          <div>
            <RoomCode roomId={params.roomId} />
            <Button isOutlined onClick={handleEndroom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {
            questions.length > 0 && // O && indica apenas o if sem o else
              <span>{questions.length} {questions.length > 1 ? ' perguntas' : ' pergunta'}</span>
          }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content} 
                author={question.author} 
                id={question.id} 
                isAnswered={question.isAnswered} 
                isHighlighted={question.isHighlighted}
              >
                <button
                  type="button"
                  onClick={() => {handleCheckQuestionAsAnswered(question.id, question.isAnswered)}}
                >
                  <img src={checkImg} alt="Marcar pergunta como respondida" />
                </button>
                {!question.isAnswered &&
                  <button
                    type="button"
                    onClick={() => {handleHighlightQuestion(question.id, question.isHighlighted)}}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                }
                <button
                  type="button"
                  onClick={() => {handleDeleteQuestionById(question.id)}}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}