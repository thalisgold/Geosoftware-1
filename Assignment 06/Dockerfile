FROM node:latest
ENV NODE_ENV=production
ENV PORT=3000
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]