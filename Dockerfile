FROM alpine:latest

RUN apk add --no-cache unzip curl

WORKDIR /app

RUN curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.22.9/pocketbase_0.22.9_linux_amd64.zip -o pb.zip \
 && unzip pb.zip \
 && rm pb.zip \
 && chmod +x pocketbase

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]