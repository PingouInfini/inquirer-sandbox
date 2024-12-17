FROM node:lts

WORKDIR /app

COPY dockerdist/*.* /app
RUN mkdir /app/inventories
COPY dockerdist/inventories /app/inventories
RUN mkdir /app/lib
COPY dockerdist/lib /app/lib

RUN npm install inquirer

ENTRYPOINT ["tail", "-f", "/dev/null"]
