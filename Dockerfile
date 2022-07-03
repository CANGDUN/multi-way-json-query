FROM node:16.15.1-slim AS builder
COPY . /root
WORKDIR /root
RUN npm install \
  && npm run build

FROM nginx:1.23.0
COPY --from=builder /root/build /usr/share/nginx/html
