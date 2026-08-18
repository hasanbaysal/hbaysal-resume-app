# 1. Aşama: Uygulamayı Derleme (Build)
FROM node:22-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Projeni build et
RUN npm run build 

# 2. Aşama: Nginx ile Statik Olarak Sunma
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
