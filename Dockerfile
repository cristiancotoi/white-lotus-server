FROM mhart/alpine-node:latest

ENV NPM_CONFIG_LOGLEVEL info

EXPOSE 8080

## Add $HOME/node_modules/.bin to the $PATH, allowing user to make npm scripts
## available on the CLI without using npm's --global installation mode
## This image will be initialized with "npm run $NPM_RUN"
## See https://docs.npmjs.com/misc/scripts, and your repo's package.json
## file for possible values of NPM_RUN
#ENV NODEJS_VERSION=6 \
#    NPM_RUN=start \
#    NPM_CONFIG_PREFIX=$HOME/.npm-global \
#    PATH=$HOME/node_modules/.bin/:$HOME/.npm-global/bin/:$PATH
#
ENV SUMMARY="White Lotus Server" \
    DESCRIPTION="Chinese astrology and numerology" \
    MONGO_ADDR="mongo"
#
#LABEL summary="$SUMMARY" \
#      description="$DESCRIPTION" \
#      io.k8s.description="$DESCRIPTION" \
#      io.k8s.display-name="Node.js $NODEJS_VERSION" \
#      io.openshift.expose-services="8080:http" \
#      io.openshift.tags="builder,nodejs,nodejs$NODEJS_VERSION" \
#      com.redhat.dev-mode="DEV_MODE:false" \
#      com.redhat.deployments-dir="/opt/app-root/src" \
#      com.redhat.dev-mode.port="DEBUG_PORT:5858" \
#      com.redhat.component="rh-nodejs6-docker" \
#      name="rhscl/nodejs-6-rhel7" \
#      version="6" \
#      release="14.1"
#
#RUN yum repolist > /dev/null && \
#    yum install -y yum-utils && \
#    yum-config-manager --disable \* &> /dev/null && \
#    yum-config-manager --enable rhel-server-rhscl-7-rpms && \
#    yum-config-manager --enable rhel-7-server-rpms && \
#    yum-config-manager --enable rhel-7-server-optional-rpms && \
#    INSTALL_PKGS="rh-nodejs6 rh-nodejs6-npm rh-nodejs6-nodejs-nodemon nss_wrapper" && \
#    ln -s /usr/lib/node_modules/nodemon/bin/nodemon.js /usr/bin/nodemon && \
#    yum install -y --setopt=tsflags=nodocs $INSTALL_PKGS && \
#    rpm -V $INSTALL_PKGS && \
#    yum clean all -y
#
## Copy the S2I scripts from the specific language image to $STI_SCRIPTS_PATH
#COPY ./s2i/bin/ $STI_SCRIPTS_PATH
#
## Copy extra files to the image.
#COPY ./root/ /
#
## Drop the root user and make the content of /opt/app-root owned by user 1001
#RUN chown -R 1001:0 /opt/app-root && chmod -R ug+rwx /opt/app-root
#USER 1001
#
## Set the default CMD to print the usage of the language image
#CMD $STI_SCRIPTS_PATH/usage
#

# Create white-lotus directory
#RUN mkdir -p /usr/src/white-lotus
#WORKDIR /usr/src/white-lotus

# Install white-lotus dependencies
#COPY package.json /usr/src/white-lotus/

# Bundle white-lotus source
#COPY . /usr/src/white-lotus
#RUN npm install

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
COPY . /opt/app

CMD [ "node", "start.js" ]