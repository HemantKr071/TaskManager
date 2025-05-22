
FROM node:18-alpine


WORKDIR /app


COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

RUN npm run build


RUN npm install -g serve


EXPOSE 5173

# Command 
CMD ["serve", "-s", "dist", "-l", "5173"]
