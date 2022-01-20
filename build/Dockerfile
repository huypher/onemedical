FROM node:14-alpine3.14 as builder

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN  npm run build --prod

FROM nginx:1.17.1-alpine as deploy

COPY --from=builder /app/build/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/onemedical /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
