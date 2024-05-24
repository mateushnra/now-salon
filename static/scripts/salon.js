import PhoneFormatter from "./modules/phoneFormatter.js";
import EditSalon from "./modules/editSalon.js";

const editSalonPhoneFormatter = new PhoneFormatter('#phone')
const editSalon = new EditSalon('#editSalonForm', '#name', '#phone', '#email', '#status', '#address', '#neighborhood', '#cityState', '#timeOpen', '#timeClose', '#daysWeekOpen', '#containerDaysCheckList', '#error-name', '#error-phone', '#error-email', '#error-address', '#error-neighborhood', '#error-cityState', '#error-timeOpen', '#error-timeClose')

editSalonPhoneFormatter.init();
editSalon.init();