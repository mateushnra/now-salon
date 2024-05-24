import ValidateSchedule from "./modules/validateSchedule.js";
import FeedbackForm from "./modules/feedbackForm.js";

const feedbackForm = new FeedbackForm('.successMessage')

const validateScheduleForm = new ValidateSchedule('#createScheduleForm', '#idEmployee','#idService', '#scheduleDate', '#scheduleHour', '#status', '#cancellationReasonContainer', '#whoCanceledContainer', '#error-employee', '#error-service', '#error-scheduleDate', '#error-scheduleHour', '#error-observation');

validateScheduleForm.init();
feedbackForm.init();