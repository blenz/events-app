FROM node:11.10.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PORT=80
CMD ["npm", "run", "start"]