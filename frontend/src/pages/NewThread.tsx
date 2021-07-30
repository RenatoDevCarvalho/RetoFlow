import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import api from '../services/api';

import '../styles/newThread.scss';

interface IThread {
  title?: string;
  description?: string;
  user?: IUser;
}

interface IUser {
  id: number;
}

export function NewThread() {
  const history = useHistory();
  const [thread, setThread] = useState<IThread>();

  const { signed, user } = useAuth();

  useEffect(() => {
    if (!signed) {
      history.push('/');
      return;
    }

    if (user)
      setThread({ ...thread, user: { ...thread?.user, id: user?.id } })

  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await api.post('/threads', thread)
      history.push('/');
    } catch {
      console.log("Deu ruim");
    }
  }

  function updateThread(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setThread({ ...thread, [e.target.name]: e.target.value });
  }

  return (
    <form className="new_thread_container">
      <span>Titulo da sua pergunta</span>
      <input
        type="text"
        name="title"
        value={thread?.title}
        className="new_thread_title"
        placeholder="Titulo"
        onChange={event => updateThread(event)}
      />
      <span>Descrição da pergunta (opcional)</span>
      <textarea
        name="description"
        value={thread?.description}
        className="new_thread_description"
        placeholder="descrição"
        onChange={event => updateThread(event)}
      />
      <button type="submit" onClick={handleSubmit}>Enviar pergunta</button>
    </form>
  )
}