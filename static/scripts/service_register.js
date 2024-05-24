import ValidateService from "./modules/validateFormService.js";
import FeedbackForm from "./modules/feedbackForm.js";

const feedbackForm = new FeedbackForm('.successMessage')
const validateFormService = new ValidateService('#createServiceForm', '#name', '#description', '#status', '#estimatedTime', '#price', '#error-name', '#error-description', '#error-estimatedTime', '#error-price')

validateFormService.init();
feedbackForm.init();