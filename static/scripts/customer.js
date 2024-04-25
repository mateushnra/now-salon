import FilterForm from "./modules/filterForm.js";
import FeedbackForm from "./modules/feedbackForm.js";

const filterCustomerList = new FilterForm('#actionCustomerForm', '#search-input', '#search-button', '#edit-button', '#delete-button');
const feedbackForm = new FeedbackForm('#deletedItemMessage')

filterCustomerList.init();
feedbackForm.init();