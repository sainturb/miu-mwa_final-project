FROM node:16 as builder
WORKDIR /src
COPY . /src/
RUN npm install --quite && npm run build


FROM nginx:1.21.0
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/dist/client /usr/share/nginx/html
