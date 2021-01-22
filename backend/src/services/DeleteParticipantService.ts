import AppError from "errors/AppError";
import Participant from "model/Participant";
import { getRepository } from "typeorm";

interface IRequest {
  id: number;
}

class DeleteParticipantService {
  async execute({ id }: IRequest): Promise<void> {
    const participantsRepository = getRepository(Participant);

    const checkParticipantExists = await participantsRepository.findOne(id);

    if (!checkParticipantExists) {
      throw new AppError('Esse participante não existe.');
    }

    await participantsRepository.delete(id);

    return;
  }
}

export default DeleteParticipantService;