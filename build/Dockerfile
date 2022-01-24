FROM node:14-alpine3.14 as builder

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN  npm run build --prod

FROM nginx:1.17.1-alpine as deploy

COPY --from=builder /app/build/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/onemedical /usr/share/nginx/html

COPY --from=builder /app/dist/index.html /usr/share/nginx/html/index.template

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/index.template > /usr/share/nginx/html/index.html && exec nginx -g 'daemon off;'"]

