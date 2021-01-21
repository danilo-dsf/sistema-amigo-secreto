import Participant from "model/Participant";
import { getRepository } from "typeorm";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateParticipantService {
  async execute({ id, name, email }: IRequest): Promise<Participant> {
    const participantsRepository = getRepository(Participant);

    const participant = await participantsRepository.findOne(id);

    if (!participant) {
      throw new Error('Participante não encontrado!');
    }

    const checkParticipantEmailExists = await participantsRepository.findOne({
      where: { email },
    });

    if (checkParticipantEmailExists && checkParticipantEmailExists.id !== id) {
      throw new Error('Esse endereço de e-mail já está em uso!');
    }

    participant.name = name;
    participant.email = email;

    await participantsRepository.save(participant);

    return participant;
  }
}

export default UpdateParticipantService;