const nextConfig = {
async headers() {
    return [
    {
        source: "/api/:path*",
        headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" }, // Replace with your frontend URL
        { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
    },
    ];
},
async rewrites() {
    return [
    {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*",
    },
    ];
},
};

export default nextConfig;