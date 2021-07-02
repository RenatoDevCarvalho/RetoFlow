import { useState, useEffect } from 'react';
import moment from 'moment';

import api from '../services/api';

import '../styles/home.scss';

interface IThread {
  id: number;
  author: string;
  created_at: Date;
  title: string;
  description: string;
  answers: number;
}

export function Home() {
  const [threads, setThreads] = useState<IThread[]>([]);

  useEffect(() => {
    loadThreads();
  }, [])

  async function loadThreads() {
    const response = await api.get("/threads");
    setThreads(response.data);
  }

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  return (
    <div className="main_container">
      {threads.map(item => (
        <div className="thread_container">
          <div className="thread_header">
            <span className="user">{item.author}</span>
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