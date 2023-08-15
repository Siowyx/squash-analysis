import axios from "axios";

export default axios.create({
  baseURL:
    "https://us-east-1.aws.data.mongodb-api.com/app/squash-analysis-aqdzi/endpoint",
  headers: { "Content-Type": "application/json" },
});
