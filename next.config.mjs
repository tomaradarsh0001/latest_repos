/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["192.168.0.62"],
        // domains: ["127.0.0.1:8000"], // Add the hostname(s) of your images here
        unoptimized: true
    },
    async rewrites() {
        return [
            // First address for API routes starting with /api/v1
            {
                source: "/api/:path*",
                destination:
                    "http://edharti.eu-north-1.elasticbeanstalk.com/api/:path*"
                // source: "/api/:path*",
                // destination: "http://192.168.0.62:30/api/:path*"
            },
            // Second address for API routes starting with /api/v2
            {
                source: "/api/:path*",
                destination:
                    "http://ec2-13-39-110-15.eu-west-3.compute.amazonaws.com/api/:path*"
                // source: "/api/:path*",
                // destination: "http://127.0.0.1:8002/api/:path*"
            }
        ];
    },
    compiler: {
        styledComponents: {
            cssProp: true
        }
    },
    reactStrictMode: false
};

export default nextConfig;
