# 1. Aşama: Uygulamayı Derleme (Build)
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Projeni build et (çıktı klasörün 'dist', 'build' veya 'out' olabilir, projene göre burayı düzelt)
RUN npm run build 

# 2. Aşama: Nginx ile Statik Olarak Sunma
FROM nginx:alpine
# Builder aşamasındaki statik dosyaları nginx'e aktarıyoruz
# "/app/dist" yazan yeri senin build klasörüne göre değiştir (örn: /app/build)
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
