# Future implementations which I could do to improve the project.
- Making the steps, ingredients and (maybe images) drag and droppable https://v7.material.angular.io/cdk/drag-drop/overview

- CRUD NGRX
- ENTITY Simple state management
- Different way to impliment images
- refactoring the code


# Recipe Book FE Dev with simple json backend

- [Prompt](#prompt)
  * [Suggestions](#suggestions)
- [Mockups](#mockups)
- [User Stories](#user-stories)
- [Install Dependencies](#install-dependencies)
  * [API](#api)
  * [Client](#client)
- [Starting](#starting)
  * [API](#api-1)
    + [Port](#port)
    + [Commands](#commands)
  * [Client](#client-1)
    + [Port](#port-1)
    + [Commands](#commands-1)
- [API Documentation](#api-documentation)

---

## Intention
Create a simple Angular application that allows Users to Create, View (Read), Update and Delete Recipes.
Add a implentation of NGRX on top of it to store and move data. 

### Suggestions
* In an effort to save time, I am using a Component or UI Library such as [Angular Material](https://material.angular.io/).
* Trying to structure my Angular Components in a way that aids in the speed of development.
* Please feel free to ask any questions if you come across anything interesting!

## Mockups

![Recipe Book Mockups](./mockups/exported-freehand.png.png)

There are some rough mockups that you can see, if you wish, found [here](https://projects.invisionapp.com/freehand/document/ytJybhBLO?origin=v7).

Additionally, there is a single static image of the mockups located at `./mockups`

## User Stories
In `./user-stories` you'll find a number of Markdown (`.md`) files detailing the behaviors that are expected from this challenge.

Check them out [here](./user-stories/index.md).

## Install Dependencies
### API
```bash
cd ./api && yarn
```
or
```bash
cd ./api && npm i
```

### Client
```bash
cd ./client && yarn
```
or
```bash
cd ./client && npm i
```

## Starting
### API
The API for this homework assignment is a very simple JSON file based API, driven by `json-server`. In order to work with the API you'll have to ensure that both the API and Client servers are running simultaneously.

#### Port
The API uses `localhost:4199`, but you can override this in `./api/json-server.json`.

#### Commands

```bash
# From ./api
yarn start
```
or
```bash
# From ./api
npm run start
```

### Client
I started with a simple boiler plate for the application from here `./client`.

#### Port
Default port of `localhost:4200` is used here, but you can override if necessary in any of the typical Angular-y ways.

#### Commands
```bash
# From ./client
yarn start
```
or
```bash
# From ./client
npm run start
```

## API Documentation
(https://www.npmjs.com/package/json-server). There you will find information on how to:

- `GET` a Collection Request
- `GET`, `PUT`, `POST`, and `DELETE` a single entity 
- Filter
- Paginate
- Sort
- Slice
- Full-text search

