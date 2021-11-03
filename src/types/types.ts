import { ReactNode } from "react"

export type AuthContextData = {
  signWithGoogle(): Promise<boolean>;
  user: User | null;
}

export type User = {
  id: string,
  name: string | null,
  avatar: string | null
}

export type RoomCodeProps = {
  roomId: string;
}

export type FirebaseQuestion = Record<string, { // Record é basicamente um objeto pro React
  author: {
    avatar: string;
    name: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

export type QuestionFormat = {
  id: string;
  author: {
    avatar: string;
    name: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export type QuestionProps = {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  children?: ReactNode;
}