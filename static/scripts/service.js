import FilterForm from "./modules/filterForm.js";
import FeedbackForm from "./modules/feedbackForm.js";

const filterServiceList = new FilterForm('#actionServiceForm', '#search-input', '#search-button', '#edit-button', '#delete-button');
const feedbackForm = new FeedbackForm('#deletedItemMessage')

filterServiceList.init();
feedbackForm.init();