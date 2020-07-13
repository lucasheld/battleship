# battleship
The game battleship in react

## Usage
To deploy the application in production, you can use the prebuild docker image.
```shell script
docker run --rm -p 80:80 lucasheld/battleship
```

Alternatively, you can deploy it directly on the host.
```shell script
npm install -g serve
npm run build
serve -s build
```
