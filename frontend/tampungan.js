const access_token = localStorage.access_token;
const [dateStart, setStart] = useState("");
const [dateEnd, setEnd] = useState("");

const toDateFormat = new Date();
let year = toDateFormat.getFullYear();
let month = toDateFormat.getMonth() + 1;
let date = toDateFormat.getDate() + 1;
if (month < 10) month = "0" + month.toString();
if (date < 10) date = "0" + date.toString();
let minDate = year + "-" + month + "-" + date;

let date1 = new Date(dateStart);
// console.log(dateStart);
let date2 = new Date(dateEnd);
let diff_inTime = date2.getTime() - date1.getTime();
let diff_inDays = diff_inTime / (1000 * 3600 * 24);
