import { connectionSource } from "../../config/ormconfig";
import { Candidate } from "../../entities/Candidate";

interface ICandidateDelete {
  candidate_id: string;
}
class DeleteCandidateService {
  async execute({candidate_id}:ICandidateDelete) {

      const candidateRepository = connectionSource.getRepository(Candidate);

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

      return await candidateRepository.delete(candidate_id)
            .then(f => {
                console.log(f);
                var messagmsgeDelete = {
                  message:"Registro excluido com sucesso"
                }
            
                return messagmsgeDelete;
                
            }, err => {
              throw new Error("Erro na exclusão"+err);
            });
  }
}

export { DeleteCandidateService };
