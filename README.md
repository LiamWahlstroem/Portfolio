# Portfolio

This Repository contains my Personal Portfolio, as well as my photography Portfolio. They are treated as seperate Websites. They were built using Next.js and Tailwind. The project runs on Vercel, MongoDB Atlas and AWS.

# Development set-up
To run this project locally Node.js and NPM are required. A local MongoDB database and an AWS account are also required for the photography portfolio.

Additionally following environment variables are required to be able to run the project properly:

- **DB_USER**: Username for the MongoDB database
- **DB_PASSWORD**: Password for the MongoDB database
- **DB_URI**: The URL with the name of the MongoDB database
- **JWT_SECRET**: The secret for creating the JWT tokens
- **AWS_ACCESS_KEY_ID**: Access key ID for the AWS SDK
- **AWS_SECRET_ACCESS_KEY**: The secret key for the AccessKey for the AWS SDK
- **S3_BUCKET**: The name of the S3 bucket used to store all images
- **CLOUDFRONT_DOMAIN**: The cloudfront Domain which is used to access the images stored in the S3 bucket

1. Run command `npm i` to install dependencies
2. Start project with command `npm run dev`.
