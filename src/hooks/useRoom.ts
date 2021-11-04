import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { FirebaseQuestion, QuestionFormat } from "../types/types";
import { useAuth } from "./useAuth";
import { useQuery } from 'react-query';

export function useRoom(roomId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionFormat[]>([]);
  const [title, setTitle] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      setLoading(true);
      const parsedQuestions = Object.entries(room.val().questions as FirebaseQuestion ?? {}).map(([key, value]) => { // Object.entries transforma um objeto em um array de arrays (matriz) 
        return {                                                                                                     //sendo [key, value] para cada valor
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      });

      setTitle(room.val().title ?? '');
      setQuestions(parsedQuestions);
      setLoading(false);
    });
    
    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return { questions, title, loading };
}