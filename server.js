// TEST001/server.js
import dotenv from 'dotenv';
dotenv.config(); // 최상단에서 환경 변수 로드

import startSharedServer from './common/server.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3004;

console.log(`> [System] Starting TEST001 on port ${PORT}...`);
console.log(`> [System] JWT Secret Loaded: ${process.env.JWT_SECRET ? process.env.JWT_SECRET.substring(0, 4) + '****' : 'NOT FOUND'}`);

// 공통 서버 실행
startSharedServer(__dirname, PORT);
