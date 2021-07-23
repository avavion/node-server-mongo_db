import express from "express";
import fileUpload from "express-fileupload";

import dotenv from "dotenv";
import morgan from 'morgan';
import mongoose from "mongoose";
import router from "./router.js";

const app = express();

dotenv.config({
    path: "config.env"
})

const PORT = process.env.PORT || 8080;

// Регистрируем загрузчик файлов
app.use(fileUpload({}));

// Логирование всех запросов на сервер для разрбаотчика
app.use(morgan("dev"));

// Парсер ответов в формате JSON
app.use(express.json());

// Разрешаем северу отдачу статических файлов
app.use(express.static("static"));

// Регистрируем роутер
app.use("/api", router);

// URL для подключения к базе данных
const DATABASE_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nk9n9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

async function startApp() {
    try {
        await mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/`);
        })
    } catch (error) {
        console.error(error)
    }
}
startApp();