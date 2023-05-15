const {
  uploadBytes,
  getDownloadURL,
  ref,
  uploadString,
} = require("firebase/storage");
const { firebaseStorage } = require("../config/firebaseDb.js");

const uploadImg = async (data) => {
  const storageRef = ref(
    firebaseStorage,
    "images/" + `${data.body.id}` + `.${data.files.imageUrl.mimetype.slice(6)}`
  );
  console.log(
    "images/" + data.body.id + `.${data.files.imageUrl.mimetype.slice(6)}`
  );

  return uploadString(
    storageRef,
    data.files.imageUrl.data.toString("base64"),
    "base64"
  )
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .catch((error) => {
      console.error();
    });
};

module.exports = { uploadImg };
