import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from './services/api';
import './App.css'

interface IParticipant {
  id: string;
  name: string;
  email: string;
}

interface IRawParticipant {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface IDrawnParticipants {
  participant: IRawParticipant;
  drawn_participant: IRawParticipant;
}

const App: React.FC = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [participantToEdit, setParticipantToEdit] = useState<IParticipant>({} as IParticipant);
  const [drawnParticipants, setDrawnParticipants] = useState<IDrawnParticipants[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [updateFormData, setUpdateFormData] = useState({ name: '', email: '' });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/participants');

      if (response.data) {
        setParticipants(response.data);
      }
    }

    loadData();
  }, []);

  function inputsContentChanges(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function updateInputsContentChanges(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  }

  async function handleAddParticipant(event: FormEvent) {
    event.preventDefault();

    if (formData.name === '' || formData.email === '') {
      alert('Você deve preencher o nome e o e-mail para cadastrar!');
      return;
    }

    try {
      const response = await api.post('/participants', formData);

      if (response.data) {
        setParticipants([...participants, response.data]);

      }
    } catch (error) {
      alert(error.response.data.message);
    }

    const formElement = event.target as HTMLFormElement;

    formElement.reset();
  }

  async function handleDeleteParticipant(id: string) {
    try {
      await api.delete(`/participants/${id}`);

      setParticipants(state => state.filter(participant => participant.id !== id));
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function handleDrawParticipants() {
    try {
      const response = await api.post('/draw');

      if (response.data) {
        setDrawnParticipants(response.data);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function handleEditParticipant(participant: IParticipant) {
    setParticipantToEdit(participant);
    setOpenModal(true);
  }

  async function handleUpdateParticipant(event: FormEvent) {
    event.preventDefault();

    try {
      console.log(participantToEdit.id, updateFormData);
      const response = await api.patch(`/participants/${participantToEdit.id}`, updateFormData);

      if (response.data) {
        setParticipants(state => {
          const updatedParticipantIndex = state.findIndex(participant => participant.id === response.data.id);

          state[updatedParticipantIndex] = response.data;

          return state;
        });

        setParticipantToEdit({} as IParticipant);

        setOpenModal(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <div id="app">
        <header>
          <h1>Amigo Secreto</h1>
        </header>
        <main>
          <div className="description">
            <p>
              Aqui iremos fazer o cadastro de todos os participantes do amigo secreto desse ano!
            </p>
            <p>
              E cada participante irá receber um e-mail com a pessoa sorteada para mantermos o sigilo.
            </p>
          </div>

          <form onSubmit={handleAddParticipant}>
            <h2>Cadastro de participantes</h2>

            <div>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                placeholder="Nome e Sobrenome"
                onChange={inputsContentChanges}
              />
            </div>

            <div>
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="O melhor e-mail"
                onChange={inputsContentChanges}
              />
            </div>

            <button type="submit">Cadastrar</button>
          </form>

          <div className="participants">
            {participants.length
              ? (<h2>Participantes cadastrados</h2>) 
              : (<h2>Nenhum participante cadastrado</h2>)
            }

            {participants.map(participant => (
              <div
                className="participant-card"
                key={participant.id}
              >
                <div>
                  <h3>{participant.name}</h3>
                </div>

                <div className="card-data">
                  <span>Email</span>
                  <strong>{participant.email}</strong>
                </div>

                <div className="card-buttons">
                  <button onClick={() => handleEditParticipant(participant)}>Editar</button>
                  <button onClick={() => handleDeleteParticipant(participant.id)}>Excluir</button>
                </div>
              </div>
            ))}

            <div className="draw-button">
              <button onClick={handleDrawParticipants}>Sortear</button>
            </div>

            <div className="draw-list">
              <h2>Resultado do sorteio</h2>

              <div className="draw-list-grid">
                {drawnParticipants.map(drawnParticipant => (
                  <li key={drawnParticipant.participant.id}>
                    <strong>{drawnParticipant.participant.name}</strong>
                    <span> tirou </span>
                    <strong>{drawnParticipant.drawn_participant.name}</strong>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </main>

        <div id="modal" style={{ opacity: openModal ? '1' : '0', visibility: openModal ? 'visible' : 'hidden' }}>
          <h1>Editando {participantToEdit.name}</h1>

          <form onSubmit={handleUpdateParticipant}>
            <div>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                placeholder="Nome e Sobrenome"
                defaultValue={participantToEdit.name}
                onChange={updateInputsContentChanges}
              />
            </div>

            <div>
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="O melhor e-mail"
                defaultValue={participantToEdit.email}
                onChange={updateInputsContentChanges}
              />
            </div>

            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setOpenModal(false)}>Fechar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;