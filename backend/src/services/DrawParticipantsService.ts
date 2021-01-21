import Participant from "model/Participant";
import { getRepository } from "typeorm";
import SendEmailToParticipantsService from "./SendEmailToParticipantsService";

interface IDrawnParticipants {
  participant: Participant;
  drawn_participant: Participant;
}

class DrawParticipantsService {
  async execute(): Promise<void> {
    const sendEmailToParticipants = new SendEmailToParticipantsService();
    const participantsRepository = getRepository(Participant);

    const allParticipants = await participantsRepository.find();

    if (!allParticipants) {
      throw new Error('Nenhum participante encontrado.');
    }

    if (allParticipants.length < 3) {
      throw new Error('Não há participantes suficientes para iniciar o sorteio.');
    }

    const shuffledParticipants = shuffleParticipants(allParticipants);

    let drawnParticipants: IDrawnParticipants[] = [];

    shuffledParticipants.map((participant, index) => {
      if (shuffledParticipants.indexOf(participant) === shuffledParticipants.length - 1) {
        drawnParticipants.push({
          participant,
          drawn_participant: shuffledParticipants[0],
        });
      } else {
        drawnParticipants.push({
          participant,
          drawn_participant: shuffledParticipants[index + 1],
        });
      }
    });

    sendEmailToParticipants.execute(drawnParticipants);
  }
}

function shuffleParticipants(allParticipants: Participant[]): Participant[] {
  // Randomize array in-place using Durstenfeld shuffle algorithm
  // Fonte: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = allParticipants.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = allParticipants[i];
    allParticipants[i] = allParticipants[j];
    allParticipants[j] = temp;
  }

  return allParticipants;
}

export { DrawParticipantsService, IDrawnParticipants };