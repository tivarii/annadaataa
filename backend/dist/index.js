"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import cookieParser from 'cookie-parser';
const db_1 = require("./db/db");
dotenv_1.default.config({
    path: './.env/'
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
}));
// app.use(cookieParser())
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.static('public/temp'));
const port = process.env.PORT || 5000;
(0, db_1.connectDB)();
app.get("/", (req, res) => {
    res.json({
        msg: "hello you are on Home",
        url: process.env.MONGODB_URL,
    });
});
app.listen(port);
