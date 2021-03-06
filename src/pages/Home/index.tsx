import { useHistory } from 'react-router-dom';
import microsoftIconImg from '../../assets/images/microsoft-icon.svg';

import '../../styles/auth.scss';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';

export function Home() {
    const history = useHistory();
    const { signWithGoogle, user } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    function handleCreateRoom() {
      if(!user) {
        signWithGoogle().then((response) => {
          if(response)
            history.push('/rooms/new');
          else
            alert('Falha no login!');
        })
      }
      else
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
      event.preventDefault();

      if (roomCode.trim() === '')
        return;

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      if (!roomRef.exists()) {
        alert('A sala não existe');
        return;
      }

      if (roomRef.val().endedAt) {
        alert('Sala já encerrada!');
        setRoomCode('');
        return;
      }

      history.push(`/rooms/${roomCode}`);
    }

    return (
      <div id="page-auth">
        <aside>
          <img src="https://cdn.havan.com.br/assets/images/hlabs-w.svg" alt="Ilustração do Havan Labs" className="havan-labs" />
          <strong>Crie salas de Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>
        <main>
          <div className="main-content">
            <div className="logo-img">
              <img src="https://cdn.havan.com.br/assets/images/logo-havan-slim-b.svg" alt="HavanAsk" />
              <h1 className="ask-logo">ASK</h1>
            </div>
            
            {/*<button onClick={handleCreateRoom} className="create-room google-button">
              <img src={googleIconImg} alt="Logo da Google" />
              Crie sua sala com o Google
            </button>*/}
            <button onClick={handleCreateRoom} className="create-room microsoft-button">
              <img src={microsoftIconImg} alt="Logo da Microsoft" />
              Crie sua sala com a Microsoft
            </button>
            <div className="separator">ou entre em uma sala</div>
            <form onSubmit={handleJoinRoom}>
              <input 
                type="text" 
                placeholder="Digite o código da sala"
                onChange={event => setRoomCode(event.target.value)}
                value={roomCode}
              />
              <Button type="submit">
                Entrar na sala
              </Button>
            </form>
          </div>
        </main>
      </div>
    )
}