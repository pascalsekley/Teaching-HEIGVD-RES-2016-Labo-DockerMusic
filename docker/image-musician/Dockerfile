FROM node:4.3.1

MAINTAINER Pascal Sekley <pascal.sekley@heig-vd.ch>

COPY src /opt/app/

RUN npm install uuid

ENTRYPOINT ["node", "/opt/app/musician.js"]

