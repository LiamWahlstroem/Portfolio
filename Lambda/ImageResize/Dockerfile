FROM public.ecr.aws/lambda/nodejs:18

COPY package*.json ./
RUN npm i

COPY index.js ${LAMBDA_TASK_ROOT}

CMD ["index.handler"]
