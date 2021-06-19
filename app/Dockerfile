FROM nginx:stable-alpine
COPY ./html /usr/share/nginx/html
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY conf/pastaeriso.com.crt /etc/nginx/pastaeriso.com.crt
COPY conf/pastaeriso.com.key /etc/nginx/pastaeriso.com.key
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
