require('dotenv').config();
const app = require('./server');

console.log(process.env.TEST);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
