//Firebase Imports
const { firebaseDb } = require("../config/firebaseDb.js");
const { set, ref } = require("firebase/database");
const axios = require("axios");
const { uploadImg } = require("./firebaseStorage.js");

//Express Imports
const express = require("express");

//Initialize Router
const router = express.Router();

//Function to push to database
const writeUserData = async (data) => {
  let res;
  //Upload Image and get the url
  uploadImg(data).then((result) => {
    set(ref(firebaseDb, "users/" + data.body.id), {
      name: data.body.name,
      desc: data.body.desc,
      url: data.body.url,
      imageUrl: result,
      defaultUrl: data.body.defaultUrl,
    });
  });
};

//GET Spotify data
router.get("/:url", (req, res) => {
  console.log("GET request heard");
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "client_credentials",
      client_id: "cc9a130d544a47568886b3a3ce10cce1",
      client_secret: process.env.SPOTIFY_KEY,
    },
  }).then((authData) => {
    axios({
      method: "get",
      url: "https://api.spotify.com/v1/playlists/" + req.params.url,
      headers: {
        Authorization: "Bearer " + authData.data.access_token,
      },
    }).then((playlistData) => {
      res.send(playlistData.data);
    });
  });
});

//POST router on /new
router.post("/new", (req, res) => {
  console.log("POST req heard");
  writeUserData(req).then((data) => {});
});

module.exports = router;
