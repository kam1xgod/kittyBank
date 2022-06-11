# You can see some comments here. I left them for myself - so I can back to this repo and refresh my memory.

# Dockerfile providing info ONLY for app image. It doesn't manage services like database and can't start back- and frontend at once.
# Check ./docker-compose.yml file for further info.

# Getting image from dockerhub (https://hub.docker.com/) with needed version of java for our container.
# Don't use original images, use "alpine" one instead. They're much lightweighted.
FROM openjdk:17-jdk-alpine3.14
# Adding jar file in our image with name "backend.jar"
COPY /target/finalProject-0.0.1-SNAPSHOT.jar .
# Creating entrypoint - basically starting jar file inside of image.
ENTRYPOINT ["java", "-jar", "finalProject-0.0.1-SNAPSHOT.jar"]

# With GitLab you can easily start this app via container registry. Just make push to repo and go to Container Registry, copy command (second, I believe) - and u're good to go.
# One thing to mention - don't forget to specify app you want to add to registry. For example, here I don't have subfoler for backend, only for frontend, but if I had one for back -
# Thing would be a little bit complicated. Just add subfoler to command you've just copied and add version like "example:1.0.0".
# And then just copy last command and push.
