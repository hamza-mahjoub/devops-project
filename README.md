# devops-project
<div id="top"></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#testing-tools">Testing Tools</a></li>
        <li><a href="#containerization-solution">Containerization Solution</a></li>
        <li><a href="#orchestration-solution">Orchestration Solution</a></li>
        <li><a href="#provisioning-solution">Provisioning Solution</a></li>
        <li><a href="#monitoring-solution">Monitoring Solutions</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Devops</a>
      <ul>
        <li><a href="#observability">Observability</a></li>
        <li><a href="#automation">Automation</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#ci-cd-pipeline">CI/CD pipeline</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The project

This project reprsents a discovery application for tv shows and movies using the movie database data and it contains principles of deployment,
automation and observibility.   

It uses the **monorepo** strategy:    

1- **Tv-Show-App**: The front end application that will be exposed to the users.  
2- **api-gateway**: the interceptor tier in the cluster (responsible for routing, monitoring and security ).  
3- **auth-service**: a service that handles authentification and users.  
4- **devops project files**: different files to track the current progress.   
5- **microstacks**: terraform files to initiate the infrastructure of the project.  
6- **tv-show-backend**: the core of the application (crud functions to the TMDB).  

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [NestJs](https://nestjs.com/), the progressive Node.js framework for building server-side applications.
* [AzureCosmosMongoDb](https://www.azure.microsoft.com/fr-fr), the no SQL database.
* [NPM](https://www.npmjs.com/) as package manager.

### Testing Tools
* [JEST](https://jestjs.io/fr/), a quality testing framework.

### Containerization Solution
* [Docker](https://www.docker.com/), a solution for building,sharing and running application images.

### Orchestration Solution
* Kubernetes, a solution for orchestrating containers.

### Provisioning Solution
* [Terraform](https://www.terraform.io/), a solution for provisioning, changing, and versioning resources on any environment.

### Monitoring Solution
* Prometheus.
* [ArgoCd](https://argo-cd.readthedocs.io/en/stable/) declarative, GitOps continuous delivery tool for Kubernetes.
* [Signoz](https://signoz.io/) Monitoring your application using OpenTelemetry.


<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

In order to run this project and extend its functionalities you need to follow some few steps : 

### Prerequisites

* Make sure that Node.js (>= 10.13.0, except for v13) is installed on your operating system. ( [Download Here](https://nodejs.org/en/download/))
* Make sure that Docker is installed.
* Make sure that Helm and terraform are installed.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/hamza-mahjoub/devops-project.git
   ```
##### If you want to build on top of the project   

2. Install NPM packages under each project
   ```sh
   npm install
   ```
2.1 Add a **.env** file for required projects
   ```sh
   CONNECTION_STRING="MongoDb connection string" # for auth-service
   TMDB_API= "api" for tv-app-backend project
   TMDB_API_KEY= "key"  # for tv-app-backend project
   ...
   ```
 2.2 run all projects, ensure that all ports are well set and enjoy!   
 
##### Or if you want to use docker   
 
 3. make sure you have docker installed.
 
 3.1. pull the images : 
 ``` sh
 docker pull hamzamahjoub/project-service-image-name # service names are in workflows
 ```
 
 3.2 run the following docker run command:  
 ``` sh
 sudo docker run -d -p 3000:3000 --name nestjs-template hamzamahjoub/nestjs-template
 ```
##### Or if you want to use terraform and helm   

4. make sure you have terraform and helm installed.   

4.1 make sure you have an azure account and a valid connection   
4.2 run the following terrafom commands in **each microstack**:   
 ``` sh
 terraform init
 terraform apply
 ```
4.3 run the following _helm_ command   
 ``` sh
 helm install "service_name" .
 ```
<p align="right">(<a href="#top">back to top</a>)</p>

## Devops   

This project implement the principles of observability, automation and deployment like so:   

### Observebalitiy       

#### 1- Metrics   

I used `prometheus` and and `prom-client` in nestJs to expose infra related metrcis (cpu, mem,...) and http metrics (number of requests,..). Thes metrcis were easy
to implement due to the interceptors logic in nestjs.   

**Business logic metrics** : i used business related metrcis which denotes the type of tvs/movies frequently requested from users.Basically whenever a specific 
ressource is required (tv/airing_today or tv/popular) the metric will be updated accordingly. We can thus track the total number of requests by show type and by nature 
( airing_today, popular,...).   

#### 2- Logs

I used the implemented `Logger` logic in nestjs and just added a request id and user ip address as well as different levels of logs.   

#### 3- Traces   

For tracing i used Signoz that will automatically detects the request and the modules that it went through as well as holding the same request id. The tracing is implemented in the api-gateway.

### Automation       

#### 1- Microstacks    

The goal of microstacks is to create a well isolated and maintainable infrastructure layers.   

1. **First Stack: kubernetes-cluster**: This stack takes care of provisioning the kubernetes cluster for the entire project. ( a possible enhancement is to add the 
database provisioning).   

2.  **Second Stack: Vm**: this stack takes care of provisioning a virtual macchine for our front end application along aside all the needed components (network interface,
public ip, installing docker...).   

3. **Third Stack: Gitops**: This section takes care of installing our monitoring tools using the kubernetes provider and helm provider. it will create a specific namespace 
for these tools (prometheus, argocd, signoz).   

#### 2- Deployment

To automate the deployment, I used a Helm Chart for it which will be used by Argo CD for deployment. when a change is detected in the values.yaml chart in thhis repo, it will automatically synchronize 
the web app thus resulting in automated deployment.

the `values.yaml` file is set to be generic and empowers scalability and maintenability. the tv-show-backend chart example:

``` sh
deployment:
  name: tv-show-backend-deployment
  namespace: back-office-ns
  label: tv-show-backend
  replicas: 3
service:
  name: tv-show-backend-service
image:
  name: tv-show-backend
  tag: latest
dnsutils:
  sleepTimeout: 3600
http:
  name: backend-port
  port: 3001
```
#### 3- Multi-environment setup

we can use multi-environments by specifying the lables in the deployments and services as well as in selectors.    
This can be used to match pods to deployments or a deployment to a service not only by the app name but with the version.    

### Automation   

A pipeline is configured to build and deploy the docker images when changes come up.

#### Deployment strategy

I will use the A/B testing deployment strategy since it fits my needs:    

1- Zero downtime when deploying.   
2- Ability to test on a real traffic.   
3- **Targetted Users**: in fact this api will be public to use and the idea is to provide a new version when breaking changes happen as well as keep the old one 
going to give the depending apps the time to migrate to the new version.   


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage   
Navigate to where the front-end app is served.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Tests EXAMPLES -->
## Tests
- you can run all the tests of a project at once using 
```sh
   npm run test
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## CI/CD pipeline
The project pipeline code can be found under `.github/workflows` and its structured accroding to each project.    
for example the front end app is as follows  
![image](https://user-images.githubusercontent.com/60366675/172243779-f30071f0-844f-4ea3-9c46-0d3b3f67236f.png)

### First phase
At first two jobs will run in parrallel:  
- One will take care of [eslint](https://eslint.org/) to make sure that code is clean and homogeneous.
- The other will run the tests via commande `npm run test`.
``` yaml
name: Test then deploy frontend Workflow
on:
  push:
    paths:
      - "Tv-Show-App/**"
jobs:
  Test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "16"
      - name: frontend-project-commands
        run: |
          cd ./Tv-Show-App
          npm install
          npm test
  Package:
    runs-on: ubuntu-latest
    needs:
      - Test
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1
      - name: "Create .env file"
        run: |
          cd Tv-Show-App
          touch .env
          echo REACT_APP_BACKEND_URL=api-gateway-service.front-office-ns >> .env
          echo REACT_APP_BACKEND_PORT=80 >> .env
      - name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: ./Tv-Show-App
          file: Tv-Show-App/dockerfile
          push: true
          tags: ${{ secrets.DOCKER_HUB_USERNAME }}/tvshowappfront:latest
```
### Second phase
This part of the pipeline is **packaging** and depends on the two other tests via this code snippet:  
```yaml
  needs:
     - Test
     - eslint
```
We will build our poject, create a [Docker](https://www.docker.com/) image then login to our docker hub and push the image.

### Third phase
This part of the pipeline is **deployment** and depends on the packaging phase. The project is deployed on an [Azure](https://azure.microsoft.com/fr-fr) Ubuntu instance.  
It follows these steps:  
1- Login to the instance via **ssh**.  
2- Shut down the running container.  
3- Pull the new released image.  
4- Launch a new container via `docker run` commande with port and name of the container specification.  

<p align="right">(<a href="#top">back to top</a>)</p>  

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Hamza Mahjoub - mahjoubhamza036@gmail.com

Project Link: [https://github.com/hamza-mahjoub/devops-project.git](https://github.com/hamza-mahjoub/devops-project.git)

<p align="right">(<a href="#top">back to top</a>)</p>



