FROM alpine:latest AS builder

RUN apk add --no-cache tar

COPY ./src /app/src

RUN mkdir -p /app/dist && tar -czf /app/dist/dist.tar.gz -C /app/src .


FROM nginx:alpine

COPY --from=builder /app/dist/dist.tar.gz /tmp/dist.tar.gz

RUN tar -xzf /tmp/dist.tar.gz -C /usr/share/nginx/html

RUN rm /tmp/dist.tar.gz

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]