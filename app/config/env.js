const env = process.env.NODE_ENV || 'development';

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3500;

let baseUrl = `http://localhost:${port}`;
if (env === 'production') {
    baseUrl = 'http://your-production-domain.com'
}
else if (env === 'test') {
    baseUrl = 'http://your-test-domain.com'
}

module.exports = {
    host,
    port,
    baseUrl
}