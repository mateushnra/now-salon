import FilterForm from "./modules/filterForm.js";
import FeedbackForm from "./modules/feedbackForm.js";

const filterEmployeeList = new FilterForm('#actionEmployeeForm', '#search-input', '#search-button', '#edit-button', '#delete-button');
const feedbackForm = new FeedbackForm('#deletedItemMessage')

filterEmployeeList.init();
feedbackForm.init();