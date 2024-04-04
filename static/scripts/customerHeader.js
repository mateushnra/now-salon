import AuthCustomer from './modules/authCustomer.js';
import Modal from './modules/modal.js';
import DropDownMenu from './modules/dropDownMenu.js';
import MenuMobile from './modules/menuMobile.js';

const authCustomer = new AuthCustomer('#form-login-customer', '#email-login', '#password-login', '#error-login', '#error-email-login', '#error-password-login');

const modal = new Modal('#form-login-customer', '#btnOpen', '#btnClose', '#modalWrapper');

const dropDownMenu = new DropDownMenu('#user-container', '#button-dropdown', '#dropdown-list')

const dropDownMenuMobile = new MenuMobile('#header-container', '#button-hamburger', '#dropdown-menu-mobile-primary', '#dropdown-menu-mobile-secondary')

authCustomer.init();
modal.init();
dropDownMenu.init();
dropDownMenuMobile.init();