<h1 align="center">ArrowFlix</h1>
<h5 align="center">An OTT platform practise project mostly inspired fromm Netflix</h5>

[![Banner.png](https://i.postimg.cc/76yXRRxL/Banner.png)](https://postimg.cc/WDXMFXqR)

<br/>

## 🎯 About

The goal was to code a functional website with beautifull animation and learn the technologies on the way. The whole site is inspired from netflix design and i have taken many references and code examples from other github repos. <br/>

I have added a very small admin panel with a few functionality, integrated login to learn express and database. There is nothing fancy. <br/>

## ▶️ Demo

Here you can find the live demo site
- [Client](http://103.142.80.19/)
- [Admin Panel](http://103.142.80.19/admin)

Just sign in anonymously to see the panel

## :sparkles: Features

:heavy_check_mark: &nbsp;&nbsp; Custom Video Player with netflix like functionality<br />
:heavy_check_mark: &nbsp;&nbsp; Display Movies from database that is added from the admin panel<br />
:heavy_check_mark: &nbsp;&nbsp; Search by movie title<br />
:heavy_check_mark: &nbsp;&nbsp; Category related page with infinite scroll<br />
:heavy_check_mark: &nbsp;&nbsp; Detail modal with movie informations<br />
:heavy_check_mark: &nbsp;&nbsp; Admin panel to add or remove movies<br />
:heavy_check_mark: &nbsp;&nbsp; Automatic data fetch from TMDb api using TMDb id and populate the form<br />
:heavy_check_mark: &nbsp;&nbsp; Loading Skeleton<br />
:heavy_check_mark: &nbsp;&nbsp; Responsive Layout<br />

## :rocket: Technologies

- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Tailwind Css](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Query](https://redux-toolkit.js.org/)
- [SwiperJS](https://swiperjs.com/react)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Formik](https://formik.org/) 
- [Express JS](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## 📸 Screenshots

<h1 align="center">Home Page</h1>
[![Home.png](https://i.postimg.cc/bNKnLtYy/Home.png)](https://postimg.cc/4mQnxnhq)
<br/>

<h1 align="center">Detailed Modal</h1>
[![Modal.png](https://i.postimg.cc/zBXH3w7j/Modal.png)](https://postimg.cc/DWHwMXtJ) 
<br/>

<h1 align="center">Custom Player</h1>
[![Player.png](https://i.postimg.cc/fLLkMzWq/Player.png)](https://postimg.cc/67kB0NvC)
<br/>

<h1 align="center">Auto Upload</h1>
[![TMDbupload.png](https://i.postimg.cc/1zYVnnd1/TMDbupload.png)](https://postimg.cc/XZdYtJ3s) 
<br/>

<h1 align="center">Search Function</h1>
[![Search.png](https://i.postimg.cc/Jzrsp5VW/Search.png)](https://postimg.cc/svLfXSgn)
<br/>

## 👨🏻‍💻 Run Locally

- Install [mongodb](https://www.mongodb.com/) if you don't have it already and create a database named `arrowflix`.

- Clone the project

```bash
  git clone https://github.com/muhon9/arrow-flix.git
```

- Go to the project directory

```bash
  cd arrowflix
```

- Install dependencies

```bash
  npm install
```

```bash
  npm run install-dependencies
```

- All the dependency of client && server will be installed

- This project has two part

- Create an empty `.env` file in `/server`, copy `/server/.env.example` contents into it, and fill in your necessary setings

```
# Url of mongodb
MONGODB_URL =mongodb://127.0.0.1:27017/arrowflix

# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=2
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30
# Number of minutes after which a reset password token expires
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
# Number of minutes after which a verify email token expires
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10
```

- Create another empty `.env` file in `/client`, copy `/client/.env.sample` contents into it, and fill in your necessary setings

```
REACT_APP_TMDB_API_KEY=put your tmdb api key here
React_APP_BACKEND_ROOT =http://localhost:8000/api
REACT_APP_PROD_PORT =8001
```

- Request an API key from TMDB and them add it to the .env file

- Go to root directory /arrowflix and run development server

```bash
  npm run dev
```

- You can run the frontend and backend seperately if you want


## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.
<br/>

## What's missing?

There are a lot of things missing. It is not a production ready project. I have learned a lot of thing during the development

## Contact for any help

`sultan.al.muhon@gmail.com`

