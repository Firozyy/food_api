import app from "./app.js"
import dbconnection from "./config/dbContion.js"
dbconnection()
app.listen(process.env.Port, () => {
    console.log(`server is running port ${process.env.Port}`);
})