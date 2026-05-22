const frontendUrls = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : [];

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'https://vertex-digital-alpha.vercel.app',
    'https://www.yasasrepairshop.com',
    'https://yasasrepairshop.com',
    ...frontendUrls
].filter(Boolean);


module.exports = allowedOrigins;