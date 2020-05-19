FROM node:lts-alpine as build
WORKDIR /app

#COPY package*.json ./
COPY . ./
RUN npm install
CMD ["npm", "start"]

#FROM nginx:1.15.12-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]
