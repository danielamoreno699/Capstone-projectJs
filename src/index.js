import "./main.scss";
import { getTrendingData } from "./cardGenerator";
import { displayComment, handleSubmit } from "./popup.js";

getTrendingData();
displayComment()
const form = document.getElementById('submit')
form.addEventListener('submit', handleSubmit);