import AppError from "errors/AppError";
import Participant from "model/Participant";
import { getRepository } from "typeorm";

class FindAllParticipants {
  async execute(): Promise<Participant[]> {
    const participantsRepository = getRepository(Participant);

    const participants = participantsRepository.find();

    if (!participants) {
      throw new AppError('Nenhum participante cadastrado.');
    }

    return participants;
  }
}

export default FindAllParticipants;