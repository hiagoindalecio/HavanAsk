import { Link, useHistory } from 'react-router-dom';

import '../../styles/auth.scss';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';

export function NewRoom() {
    const { user } = useAuth();
    
    const [newRoom, setNewRoom] = useState('');

    const history = useHistory();

    async function handleCreateRoom(event: FormEvent) {
      event.preventDefault();

      if (newRoom.trim() === '')
        return;
      
      const roomRef = database.ref('rooms');

      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id
      });

      history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
      <div id="page-auth">
        <aside>
        <img src="https://cdn.havan.com.br/assets/images/hlabs-w.svg" alt="Ilustração do Havan Labs" className="havan-labs" />
        </aside>
        <main>
          <div className="main-content">
            <div className="logo-img">
              <img src="https://cdn.havan.com.br/assets/images/logo-havan-slim-b.svg" alt="HavanAsk" />
              <h1 className="ask-logo">ASK</h1>
            </div>
            <h3>{user?.name}</h3>
            <h2>Criar uma nova sala</h2>
            <form onSubmit={handleCreateRoom}>
              <input
                type="text" 
                placeholder="Digite o código da sala"
                onChange={event => setNewRoom(event.target.value)}
                value={newRoom}
              />
              <Button type="submit">
                Criar sala
              </Button>
            </form>
            <p>
                Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
            </p>
          </div>
        </main>
      </div>
    )
}