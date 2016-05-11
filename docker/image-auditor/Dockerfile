FROM node:4.3.1

MAINTAINER Pascal Sekley <pascal.sekley@heig-vd.ch>

COPY src /opt/app/

RUN npm install ip

ENTRYPOINT ["node", "/opt/app/auditor.js"]
