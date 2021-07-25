import { FormEvent, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';


import logoImg from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
    id: string
}

// Record: Indica que é um objeto que retorna chave(string) e valor(objeto).
export function AdminRoom() {
    const { user } = useAuth();
    const history = useHistory();

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');

    const { questions, title } = useRoom(roomId);
    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Você tem certeza que deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }// alert para confirmar
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/');
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />

                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                    
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                    {/*&&: if then(sem else) */}
                </div>
                <div className="question-list">
                {
                        questions.map((question) => {
                            return (
                                <Question
                                    key={question.id}
                                    // Key é o valor único da pergunta
                                    //Algoritmo de reonciliação

                                    content={question.content}
                                    author={question.author}
                                >   
                                    <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImage} alt="remover pergunta" />
                                    </button>
                                </Question>
                            );
                        })
                    }

                </div>
           </main>
        </div>
    );
}