// whatever is related to server configuration
const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config({ path: `${__dirname}/config.env` });

const DBURL = process.env.DB_URL.replace('<password>', process.env.PASSWORD);

mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true


}).then(() => {
    console.log('connected successfully')
}).catch((err) => {
    console.log(err)
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('server is runing on', 'http://localhost:' + PORT);
});
