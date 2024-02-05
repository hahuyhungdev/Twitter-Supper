# Docker Overview

Docker is an open platform for developing, shipping, and running applications. It enables the separation of applications from infrastructure, allowing for rapid software delivery. Docker facilitates managing infrastructure in the same way as applications. By leveraging Docker's methodologies for shipping, testing, and deploying code, delays between writing code and running it in production are significantly reduced.

## The Docker Platform

Docker provides the ability to package and run an application in a loosely isolated environment called a container. This isolation and security allow for running many containers simultaneously on a given host. Containers are lightweight and contain everything needed to run the application, independent of the host's installed environment. Docker offers tools and a platform to manage the lifecycle of containers:

- Develop applications and supporting components in containers.
- Use containers as the unit for distributing and testing applications.
- Deploy applications in production environments as containers or orchestrated services, working the same across local data centers, cloud providers, or hybrid setups.

## Use Cases for Docker

### Fast, Consistent Delivery of Applications

Docker streamlines the development lifecycle by enabling developers to work in standardized environments using local containers. This is especially beneficial for continuous integration and continuous delivery (CI/CD) workflows.

#### Example Scenario:

- Developers write and share code using Docker containers.
- Applications are pushed to test environments and undergo automated and manual testing.
- Bugs are fixed in the development environment and redeployed for testing and validation.
- Deploying updates to production is as simple as pushing an updated image.

### Responsive Deployment and Scaling

Docker's container-based platform allows for highly portable workloads. Containers can run on a developer's local laptop, physical or virtual machines in a data center, cloud providers, or a mix of these environments. Docker's portability and lightweight nature make it easy to scale applications and services dynamically in near real time.

### Running More Workloads on the Same Hardware

Docker is a lightweight and efficient alternative to hypervisor-based virtual machines, making it suitable for high-density environments and smaller deployments. With Docker, you can achieve more with less resources, optimizing server capacity.

---

Docker's architecture and containerization technology have made it an indispensable tool in modern software development and deployment strategies, enabling organizations to build, deploy, and manage applications more effectively.

## Key Aspects of Docker

### Containerization

- Docker enables "containerization", packaging an application along with its environment and dependencies into an independent container. This ensures consistent application performance across different environments.

### Docker Images and Docker Containers

- **Docker Image**: A read-only template containing the application and its environment. Images serve as the basis for creating containers.
- **Docker Container**: An executable entity created from a Docker image. Containers run applications in an isolated environment.

### Docker Hub

- A service registry for Docker, hosting both public and private Docker images. It's akin to GitHub for code but for Docker images. You can upload (push), download (pull), and share Docker images.

### Docker Compose

- A tool for defining and running multi-container Docker applications. Utilize a YAML file to configure your services, and with a single command, create and start all the services from your configuration.

### Networking in Docker

- Docker allows the creation of separate networks for containers, facilitating the management of communication between containers and between a container and external networks.

### Volume and Storage

- Docker offers storage solutions that allow flexible data storage and management, including Docker volumes, bind mounts, and tmpfs mounts.

### Dockerfile

- A text file containing all commands, in order, needed to build a Docker image. The Dockerfile defines the application's environment, including software installation, configuration, and environment variables.

### Orchestration

- In production environments, Docker is often used with orchestration tools like Kubernetes or Docker Swarm for managing, automating deployment, scaling, and application management.

# Lệnh docker

### Thông tin docker

```bash
docker version
```

### Show các image

```bash
docker image ls
```

### Xóa image

```bash
docker image rm HASH
```

### Show các container đang chạy (thêm `-a` để show luôn bị dừng)

```bash
docker container ls
# hoặc cái này cũng được
docker ps
```

### Dừng container

```bash
docker container stop HASH
```

### Xóa container

```bash
docker container rm HASH
```

### Build Image từ `Dockerfile`. `duoc/nodejs:v2` là tên image, đặt tên theo cú pháp `USERNAME/TÊN_IMAGE:TAG`

```bash
docker build --progress=plain -t duoc/nodejs:v2 -f Dockerfile.dev .
# hoặc
docker build -t hahuyhungdev .
```

Nếu muốn chỉ định file `Dockerfile` nào đó thì thêm `-f` và đường dẫn tới file đó.

Thi thoảng sẽ có thể gặp lỗi do cache, vậy thì thêm `--no-cache` vào

```bash
docker build --progress=plain -t dev/twitter:v2 -f Dockerfile.dev .
```

### Tạo và chạy container dựa trên image

```bash
docker container --name <nameIMG> run -dp PORT_NGOAI:PORT_TRONG_DOCKER <TEN_IMAGE>
```

ví dụ

```bash
docker container run -dp 4000:4000 dev/twitter:v2
# hoặc
docker run --name tweet -it -p 3001:3001 --env-file .env.production hahuyhungdev
```

Nếu muốn mapping folder trong container và folder ở ngoài thì thêm `-v`. Cái này gọi là volume.

```bash
docker run --name tweet_volumes -dp 3001:3001 -v C:/Users/Huy.Hung/Documents/github/tweet-supper/uploads:/app/uploads --env-file .env.production hahuyhungdev
```

### Show log của container

```bash
docker logs -f HASH_CONTAINER
```

### Truy cập vào terminal của container

```bash
docker exec -it HASH_CONTAINER sh
```

Muốn thoát ra thì gõ `exit`

### Để chạy các câu lệnh trong `docker-compose.yml` thì dùng lệnh. Đôi khi cache lỗi thì thêm `--force-recreate --build`

```bash
docker-compose up
```

## Lệnh khác

Dừng và xóa hết tất cả container đang chạy

```bash
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)
```

Thêm chế độ tự động khởi động lại container khi reboot server. Trong trường hợp đã có container từ trước thì dùng

```bash
docker update --restart unless-stopped HASH_CONTAINER
```

Còn chưa có container thì thêm vào câu lệnh `docker run` option là `--restart unless-stopped`

```bash
docker run -dp 3000:3000 --name twitter-clone --restart unless-stopped -v ~/twitter-clone/uploads:/app/uploads duthanhduoc/twitter:v4
```
