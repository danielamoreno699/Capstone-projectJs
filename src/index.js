import "./main.scss";
import { displayComment, handleSubmit } from "./popup.js";
displayComment()
const form = document.getElementById('submit')
form.addEventListener('submit', handleSubmit);