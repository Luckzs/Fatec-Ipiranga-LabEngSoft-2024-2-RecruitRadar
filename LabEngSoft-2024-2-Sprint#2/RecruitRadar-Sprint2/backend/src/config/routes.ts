
import { Router } from 'express';

import {
    CreateCandidateExperienceController,
} from '../controllers/Candidate/CandidateExperience/CreateCandidateExperienceController';
import {
    DeleteCandidateExperienceController,
} from '../controllers/Candidate/CandidateExperience/DeleteCandidateExperienceController';
import {
    ListCandidateExperienceController,
} from '../controllers/Candidate/CandidateExperience/ListCandidateExperienceController';
import {
    UpdateCandidateExperienceController,
} from '../controllers/Candidate/CandidateExperience/UpdateCandidateExperienceController';
import {
    CreateCandidateLanguageController,
} from '../controllers/Candidate/CandidateLanguage/CreateCandidateLanguageController';
import {
    DeleteCandidateLanguageController,
} from '../controllers/Candidate/CandidateLanguage/DeleteCandidateLanguageController';
import { ListCandidateLanguageController } from '../controllers/Candidate/CandidateLanguage/ListCandidateLanguageController';
import {
    UpdateCandidateLanguageController,
} from '../controllers/Candidate/CandidateLanguage/UpdateCandidateLanguageController';
import {
    CreateCandidateObjectiveController,
} from '../controllers/Candidate/CandidateObjective/CreateCandidateObjectiveController';
import {
    DeleteCandidateObjectiveController,
} from '../controllers/Candidate/CandidateObjective/DeleteCandidateObjectiveController';
import {
    ListCandidateObjectiveController,
} from '../controllers/Candidate/CandidateObjective/ListCandidateObjectiveController';
import {
    UpdateCandidateObjectiveController,
} from '../controllers/Candidate/CandidateObjective/UpdateCandidateObjectiveController';
import { CreateCandidateSkillController } from '../controllers/Candidate/CandidateSkill/CreateCandidateSkillController';
import { DeleteCandidateSkillController } from '../controllers/Candidate/CandidateSkill/DeleteCandidateSkillController';
import { ListCandidateSkillController } from '../controllers/Candidate/CandidateSkill/ListCandidateSkillController';
import { UpdateCandidateSkillController } from '../controllers/Candidate/CandidateSkill/UpdateCandidateSkillController';
import { CreateCandidateStudyController } from '../controllers/Candidate/CandidateStudy/CreateCandidateStudyController';
import { DeleteCandidateStudyController } from '../controllers/Candidate/CandidateStudy/DeleteCandidateStudyController';
import { ListCandidateStudyController } from '../controllers/Candidate/CandidateStudy/ListCandidateStudyController';
import { UpdateCandidateStudyController } from '../controllers/Candidate/CandidateStudy/UpdateCandidateStudyController';
import { CreateCandidateController } from '../controllers/Candidate/CreateCandidateController';
import { DeleteCandidateController } from '../controllers/Candidate/DeleteCandidateController';
import { ListCandidatesController } from '../controllers/Candidate/ListCandidatesController';
import { UpdateCandidateController } from '../controllers/Candidate/UpdateCandidateController';
import { CreateExperienceController } from '../controllers/Experience/CreateExperienceController';
import { DeleteExperienceController } from '../controllers/Experience/DeleteExperienceController';
import { ListExperienceController } from '../controllers/Experience/ListExperienceController';
import { UpdateExperienceController } from '../controllers/Experience/UpdateExperienceController';
import { CreateLanguageController } from '../controllers/Language/CreateLanguageController';
import { DeleteLanguageController } from '../controllers/Language/DeleteLanguageController';
import { ListLanguageController } from '../controllers/Language/ListLanguageController';
import { UpdateLanguageController } from '../controllers/Language/UpdateLanguageController';
import { CreateMatchController } from '../controllers/Match/CreateMatchController';
import { DeleteMatchController } from '../controllers/Match/DeleteMatchController';
import { ListMatchController } from '../controllers/Match/ListMatchController';
import { UpdateMatchController } from '../controllers/Match/UpdateMatchController';
import { CreateSkillController } from '../controllers/Skill/CreateSkillController';
import { DeleteSkillController } from '../controllers/Skill/DeleteSkillController';
import { ListSkillController } from '../controllers/Skill/ListSkillController';
import { UpdateSkillController } from '../controllers/Skill/UpdateSkillController';
import { CreateStudyController } from '../controllers/Study/CreateStudyController';
import { DeleteStudyController } from '../controllers/Study/DeleteStudyController';
import { ListStudyController } from '../controllers/Study/ListStudyController';
import { UpdateStudyController } from '../controllers/Study/UpdateStudyController';
import { AuthenticateUserController } from '../controllers/User/AuthenticateUserController';
import { CreateUserController } from '../controllers/User/CreateUserController';
import { DeleteUserController } from '../controllers/User/DeleteUserController';
import { ListUsersController } from '../controllers/User/ListUsersController';
import { UpdateUserController } from '../controllers/User/UpdateUserController';
import { CreateUserStatusController } from '../controllers/User/UserStatus/CreateUserStatusController';
import { DeleteUserStatusController } from '../controllers/User/UserStatus/DeleteUserStatusController';
import { ListUsersStatusController } from '../controllers/User/UserStatus/ListUsersStatusController';
import { UpdateUserStatusController } from '../controllers/User/UserStatus/UpdateUserStatusController';
import { CreateVacancyController } from '../controllers/Vacancy/CreateVacancyController';
import { DeleteVacancyController } from '../controllers/Vacancy/DeleteVacancyController';
import { ListVacancyController } from '../controllers/Vacancy/ListVacancyController';
import { UpdateVacancyController } from '../controllers/Vacancy/UpdateVacancyController';
import {
    CreateVacancyExperienceController,
} from '../controllers/Vacancy/VacancyExperience/CreateVacancyExperienceController';
import {
    DeleteVacancyExperienceController,
} from '../controllers/Vacancy/VacancyExperience/DeleteVacancyExperienceController';
import { ListVacancyExperienceController } from '../controllers/Vacancy/VacancyExperience/ListVacancyExperienceController';
import {
    UpdateVacancyExperienceController,
} from '../controllers/Vacancy/VacancyExperience/UpdateVacancyExperienceController';
import { CreateVacancyLanguageController } from '../controllers/Vacancy/VacancyLanguage/CreateVacancyLanguageController';
import { DeleteVacancyLanguageController } from '../controllers/Vacancy/VacancyLanguage/DeleteVacancyLanguageController';
import { ListVacancyLanguageController } from '../controllers/Vacancy/VacancyLanguage/ListVacancyLanguageController';
import { UpdateVacancyLanguageController } from '../controllers/Vacancy/VacancyLanguage/UpdateVacancyLanguageController';
import { CreateVacancySkillController } from '../controllers/Vacancy/VacancySkill/CreateVacancySkillController';
import { DeleteVacancySkillController } from '../controllers/Vacancy/VacancySkill/DeleteVacancySkillController';
import { ListVacancySkillController } from '../controllers/Vacancy/VacancySkill/ListVacancySkIllController';
import { UpdateVacancySkillController } from '../controllers/Vacancy/VacancySkill/UpdateVacancySkillController';
import { CreateVacancyStudyController } from '../controllers/Vacancy/VacancyStudy/CreateVacancyStudyController';
import { DeleteVacancyStudyController } from '../controllers/Vacancy/VacancyStudy/DeleteVacancyStudyController';
import { ListVacancyStudyController } from '../controllers/Vacancy/VacancyStudy/ListVacancyStudyController';
import { UpdateVacancyStudyController } from '../controllers/Vacancy/VacancyStudy/UpdateVacancyStudyController';
import { ensureAdmin } from '../midleware/ensureAdmin';
import { ensureAuthenticated } from '../midleware/ensureAuthenticated';
import { FindCandidateController } from '../controllers/Candidate/FindCandidateController';
import { ForgotPasswordController } from '../controllers/User/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/User/ResetPasswordController';

const autenticationUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController   = new ResetPasswordController();

const createUserStatusController = new CreateUserStatusController();
const listUsersStatusController = new ListUsersStatusController();
const updateUserStatusController = new UpdateUserStatusController();
const deleteUserStatusController = new DeleteUserStatusController();

const createCandidateController = new CreateCandidateController();
const findCandidateController = new FindCandidateController();
const updateCandidateController = new UpdateCandidateController();
const deleteCandidateController = new DeleteCandidateController();
const listCandidatesController = new ListCandidatesController();

const createCandidateStudyController = new CreateCandidateStudyController();
const listCandidateStudyController = new ListCandidateStudyController();
const updateCandidateStudyController = new UpdateCandidateStudyController();
const deleteCandidateStudyController = new DeleteCandidateStudyController();

const createCandidateObjectiveController = new CreateCandidateObjectiveController();
const listCandidateObjectiveController = new ListCandidateObjectiveController();
const updateCandidateObjectiveController = new UpdateCandidateObjectiveController();
const deleteCandidateObjectiveController = new DeleteCandidateObjectiveController();

const createCandidateExperienceController = new CreateCandidateExperienceController();
const listCandidateExperienceController = new ListCandidateExperienceController();
const updateCandidateExperienceController = new UpdateCandidateExperienceController();
const deleteCandidateExperienceController = new DeleteCandidateExperienceController();

const createCandidateSkillController = new CreateCandidateSkillController();
const listCandidateSkillController = new ListCandidateSkillController();
const updateCandidateSkillController = new UpdateCandidateSkillController();
const deleteCandidateSkillController = new DeleteCandidateSkillController();

const createCandidateLanguageController = new CreateCandidateLanguageController();
const listCandidateLanguageController = new ListCandidateLanguageController();
const updateCandidateLanguageController = new UpdateCandidateLanguageController();
const deleteCandidateLanguageController = new DeleteCandidateLanguageController();

const createStudyController = new CreateStudyController();
const listStudyController = new ListStudyController();
const updateStudyController = new UpdateStudyController();
const deleteStudyController = new DeleteStudyController();

const createSkillController = new CreateSkillController();
const listSkillController = new ListSkillController();
const updateSkillController = new UpdateSkillController();
const deleteSkillController = new DeleteSkillController();

const createLanguageController = new CreateLanguageController();
const listLanguageController = new ListLanguageController();
const updateLanguageController = new UpdateLanguageController();
const deleteLanguageController = new DeleteLanguageController();

const createExperienceController = new CreateExperienceController();
const listExperienceController = new ListExperienceController();
const updateExperienceController = new UpdateExperienceController();
const deleteExperienceController = new DeleteExperienceController();

const createMatchController = new CreateMatchController();
const listMatchController = new ListMatchController();
const updateMatchController = new UpdateMatchController();
const deleteMatchController = new DeleteMatchController();

const createVacancyController = new CreateVacancyController();
const listVacancyController = new ListVacancyController();
const updateVacancyController = new UpdateVacancyController();
const deleteVacancyController = new DeleteVacancyController();

const createVacancyExperienceController = new CreateVacancyExperienceController();
const listVacancyExperienceController = new ListVacancyExperienceController();
const updateVacancyExperienceController = new UpdateVacancyExperienceController();
const deleteVacancyExperienceController = new DeleteVacancyExperienceController();

const createVacancyLanguageController = new CreateVacancyLanguageController();
const listVacancyLanguageController = new ListVacancyLanguageController();
const updateVacancyLanguageController = new UpdateVacancyLanguageController();
const deleteVacancyLanguageController = new DeleteVacancyLanguageController();

const createVacancySkillController = new CreateVacancySkillController();
const listVacancySkillController = new ListVacancySkillController();
const updateVacancySkillController = new UpdateVacancySkillController();
const deleteVacancySkillController = new DeleteVacancySkillController();

const createVacancyStudyController = new CreateVacancyStudyController();
const listVacancyStudyController = new ListVacancyStudyController();
const updateVacancyStudyController = new UpdateVacancyStudyController();
const deleteVacancyStudyController = new DeleteVacancyStudyController();

const router = Router();

//--------------------------------------AUTHENTICATION  & POST-------------------------------------------------
router.post("/login", autenticationUserController.handle);
router.post("/users", createUserController.handle);
router.post("/forgot_password", forgotPasswordController.handle);
router.put("/reset_password/:tmpToken", resetPasswordController.handle);

router.post("/vacancy", createVacancyController.handle);

router.use(ensureAuthenticated)
router.post("/candidate", createCandidateController.handle);
router.post("/candidate/study", createCandidateStudyController.handle);
router.post("/candidate/objective", createCandidateObjectiveController.handle);
router.post("/candidate/experience", createCandidateExperienceController.handle);
router.post("/candidate/skill", createCandidateSkillController.handle);
router.post("/candidate/language", createCandidateLanguageController.handle);

router.post("/match", createMatchController.handle);

router.post("/VacancyExperience", createVacancyExperienceController.handle);
router.post("/VacancyLanguage", createVacancyLanguageController.handle);
router.post("/VacancySkill", createVacancySkillController.handle);
router.post("/VacancyStudy", createVacancyStudyController.handle);
//--------------------------------------GET-------------------------------------------------
router.get("/users", listUsersController.handle);

router.get("/candidates", listCandidatesController.handle);
router.get("/candidate/:email", findCandidateController.handle);
router.get("/CandidateStudy", listCandidateStudyController.handle);
router.get("/CandidateObjective", listCandidateObjectiveController.handle);
router.get("/CandidateExperience", listCandidateExperienceController.handle);
router.get("/CandidateSkill", listCandidateSkillController.handle);
router.get("/CandidateLanguage", listCandidateLanguageController.handle);

router.get("/match", listMatchController.handle);

router.get("/vacancy", listVacancyController.handle);
router.get("/VacancyExperience", listVacancyExperienceController.handle);
router.get("/VacancyLanguage", listVacancyLanguageController.handle);
router.get("/VacancySkill", listVacancySkillController.handle);
router.get("/VacancyStudy", listVacancyStudyController.handle);

//--------------------------------------PUT-------------------------------------------------
router.put("/users", updateUserController.handle);

router.put("/candidate", updateCandidateController.handle);
router.put("/candidate/study/:email", updateCandidateStudyController.handle);
router.put("/candidate/objective", updateCandidateObjectiveController.handle);
router.put("/candidate/experience/:email", updateCandidateExperienceController.handle);
router.put("/candidate/skill/:email", updateCandidateSkillController.handle);
router.put("/candidate/language/:email", updateCandidateLanguageController.handle);

router.put("/match", updateMatchController.handle);

router.put("/vacancy", updateVacancyController.handle);
router.put("/VacancyExperience", updateVacancyExperienceController.handle);
router.put("/VacancyLanguage", updateVacancyLanguageController.handle);
router.put("/VacancySkill", updateVacancySkillController.handle);
router.put("/VacancyStudy", updateVacancyStudyController.handle);

//--------------------------------------(DELETE)-------------------------------------------------
router.delete("/user/:id", deleteUserController.handle);

router.delete("/candidate/:id", deleteCandidateController.handle);
router.delete("/candidate/study/:id", deleteCandidateStudyController.handle);
router.delete("/candidate/objective/id", deleteCandidateObjectiveController.handle);
router.delete("/candidate/experience/:id", deleteCandidateExperienceController.handle);
router.delete("/candidate/skill/:id", deleteCandidateSkillController.handle);
router.delete("/candidate/language/:id", deleteCandidateLanguageController.handle);

//--------------------------------------ADMIN ACTIVITIES(PARAMETERS)-------------------------------------------------

router.use(ensureAdmin)
router.post("/usersStatus", createUserStatusController.handle);

router.get("/study", listStudyController.handle);
router.get("/skill", listSkillController.handle);
router.get("/language", listLanguageController.handle);
router.get("/experience", listExperienceController.handle);
router.get("/usersStatus", listUsersStatusController.handle);

router.put("/study", updateStudyController.handle);
router.put("/skill", updateSkillController.handle);
router.put("/language", updateLanguageController.handle);
router.put("/experience", updateExperienceController.handle);
router.put("/usersStatus", updateUserStatusController.handle);

router.delete("/usersStatus/:id", deleteUserStatusController.handle);

router.delete("/study/:id", deleteStudyController.handle);
router.delete("/skill/:id", deleteSkillController.handle);
router.delete("/language/:id", deleteLanguageController.handle);
router.delete("/experience/:id", deleteExperienceController.handle);

router.delete("/match/:id", deleteMatchController.handle);

router.delete("/vacancy/:id", deleteVacancyController.handle);
router.delete("/VacancyExperience/:id", deleteVacancyExperienceController.handle);
router.delete("/VacancyLanguage/:id", deleteVacancyLanguageController.handle);
router.delete("/VacancySkill/:id", deleteVacancySkillController.handle);
router.delete("/VacancyStudy/:id", deleteVacancyStudyController.handle);

export { router };
