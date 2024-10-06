import { connectionSource } from '../../config/ormconfig';
import { Candidate } from '../../entities/Candidate';

interface ICandidateRequest {
  candidate_id: string;
  //CPF?
  //full_name: string;
  //sex: string;
  //pcd: boolean;
  //birthdate?
  address: string;
  city: string;
  state: string;
  postal_code: string;
  distance_radius: number;
  //user_id: string;
}

class UpdateCandidateService {
  async execute(profileLocation: ICandidateRequest) {

    const candidateRepository = connectionSource.getRepository(Candidate);

    const { candidate_id, address, city, state, postal_code, distance_radius } = profileLocation;

    if (!candidate_id) {
      throw new Error("Invalid data");
    }

    const candidateAlreadyExists = await candidateRepository.findOne({
      where: {
        candidate_id,
      },
    });

    if (!candidateAlreadyExists) {
      throw new Error("Candidato não existe");
    }

    candidateAlreadyExists.address = address || candidateAlreadyExists.address;
    candidateAlreadyExists.city = city || candidateAlreadyExists.city;
    candidateAlreadyExists.state = state || candidateAlreadyExists.state;
    candidateAlreadyExists.postal_code = postal_code || candidateAlreadyExists.postal_code;
    candidateAlreadyExists.distance_radius = distance_radius || candidateAlreadyExists.distance_radius;
    candidateAlreadyExists.updated_at = new Date();

    try {
      await candidateRepository.save(candidateAlreadyExists); // Use `save` para aplicar as mudanças

      return {
        message: "Registro atualizado com sucesso",
      };

    } catch (err) {
      throw new Error("Erro na atualização");
    }

  }
}

export { UpdateCandidateService };