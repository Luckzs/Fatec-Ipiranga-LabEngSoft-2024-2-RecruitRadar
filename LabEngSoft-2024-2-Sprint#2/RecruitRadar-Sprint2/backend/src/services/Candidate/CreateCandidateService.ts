
import { connectionSource } from "../../config/ormconfig";
import { User } from "../../entities/User";
import { Candidate } from "../../entities/Candidate";


interface ICandidateRequest {
    CPF: string;
    full_name: string;
    sex: string;
    pcd: boolean;
    birth_date: Date;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    distance_radius: number;
    user_id: string;
}

class CreateCandidateService {
  async execute({ CPF, full_name, sex, pcd, birth_date, address, city, state, postal_code, distance_radius, user_id }: ICandidateRequest) {

    const candidateRepository = connectionSource.getRepository(Candidate);
    const usersRepository = connectionSource.getRepository(User);

    if (!CPF || !full_name || !sex ||  pcd === undefined || pcd === null || !birth_date || !address || !city || !state || !postal_code || !distance_radius || !user_id) {
      throw new Error("Invalid data");
    }

    //TODO: Verificar se o CPF é válido
    if (!CPF) {
      throw new Error("É necessário informar o CPF");
    }

    const candidateAlreadyExists = await candidateRepository.findOne(
      { where: { CPF } },
    );

    if (candidateAlreadyExists) {
      throw new Error("Candidato já existe");
    }

    const UserExists = await usersRepository.findOne({ where: { email:user_id } });
    if (!UserExists) {
      throw new Error("User dont exists");
    }

    user_id = UserExists.user_id;
    
    const candidate = candidateRepository.create({
      CPF,
      full_name,
      sex,
      pcd,
      birth_date,
      address,
      city,
      state,
      postal_code,
      distance_radius,
      user_id
    });
    await candidateRepository.save(candidate);

    return candidate;
  }
}
export { CreateCandidateService };