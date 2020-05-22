const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

let likes = 0;

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs: [techs], likes };

  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found!"});
  }

  const { likes } = repositories[repositoryIndex];

  repositoryUpdated =  { id, title, url, techs: [techs], likes };

  repositories[repositoryIndex] =  repositoryUpdated;

  return response.json(repositoryUpdated);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!"});
  };

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!"});
  };

  likes++;

  const { title, url, techs } = repositories[repositoryIndex];

  repositoryUpdated =  { id, title, url, techs, likes };

  repositories[repositoryIndex] = repositoryUpdated;

  return response.json({ message: `Liked ${likes}`});

});

module.exports = app;
