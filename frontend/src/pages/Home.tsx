import { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import api from '../services/api';

import '../styles/home.scss';

interface IThread {
  id: number;
  created_at: Date;
  title: string;
  description: string;
  answers: number;
  user: IUser;
}

interface IUser {
  id: number;
  username: string;
}

export function Home() {
  const [threads, setThreads] = useState<IThread[]>([]);
  const { signed } = useAuth();
  const history = useHistory();

  useEffect(() => {
    loadThreads();
  }, [])

  async function loadThreads() {
    const response = await api.get("/threads");
    setThreads(response.data);
  }

  function handleQuestion() {
    if (signed) {
      history.push('/threads/new');
    }
    else {
      history.push('/login');
    }
  }

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  return (
    <div className="main_container">
      <div className="question">
        <button onClick={handleQuestion}>
          {signed ? "Faça uma pergunta" : "Faça login para enviar uma pergunta"}
        </button>
      </div>
      {threads.map(item => (
        <div className="thread_container" key={item.id}>
          <div className="thread_header">
            <span className="user">{item.user.username}</span>
            <span className="date">{formatDate(item.created_at)}</span>
          </div>
          <div className="thread_body">
            <span className="title">{item.title}</span>
            <span className="desc">{item.description}</span>
          </div>
          <div className="thread_footer">
            <span className="answer">{item.answers} Respostas</span>
          </div>
        </div>
      ))}
    </div>
  );
}