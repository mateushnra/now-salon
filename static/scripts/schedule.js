import FilterForm from "./modules/filterForm.js";
import FeedbackForm from "./modules/feedbackForm.js";

const filterScheduleList = new FilterForm('#actionScheduleForm', '#search-input', '#search-button', '#edit-button', '#delete-button');
const feedbackForm = new FeedbackForm('#deletedItemMessage')

filterScheduleList.init();
feedbackForm.init();