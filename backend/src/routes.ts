import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ParticipantController from './controllers/ParticipantController';
import DrawController from './controllers/DrawController';

const routes = Router();
const participantController = new ParticipantController();
const drawController = new DrawController();

routes.get('/participants', participantController.index);

routes.patch('/participants/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  },
}), participantController.update);

routes.delete('/participants/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  }
}), participantController.delete);

routes.post('/participants', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }
}), participantController.create);

routes.post('/draw', drawController.index);

export default routes;