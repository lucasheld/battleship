# battleship
The game battleship in react

## Contributors
- Lucas Held - 35022624
- Keanu Stückrad - 35198923
- Gianluca Voss - 35197942
- Patrick Michla - 35206231

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
