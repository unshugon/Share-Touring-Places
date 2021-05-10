import React from "react";
import {db, storage} from "../../src/Firebase";
import printStyle from "./print.module.scss";

class Print extends React.Component {
  render() {
    const collection = db.collection("places");

    collection.orderBy("created").onSnapshot((snapshot) => {
      const printPlaces = document.getElementById("printPlaces");

      snapshot.docChanges().forEach((change) => {
        if(change.type === 'added'){
          const li = document.createElement("li");
          const img = document.createElement("img");
          const div = document.createElement("div");
          const storageRef = storage.ref();
          const imageRef = storageRef.child(`images/${change.doc.data().place}.png`);

          imageRef.getDownloadURL()
            .then((url) => {
              img.src = url;
            })
            .catch((error) => {
              switch (error.code) {
                case 'storage/object-not-found':
                  // File doesn't exist
                  break;

                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  break;

                default:
                  break;
              }
            });

            li.textContent = change.doc.data().place;

            div.appendChild(img);
            div.appendChild(li);
            printPlaces.prepend(div);
        };
      });
    });

    return(
      <div className={printStyle.container}>
        <h2 className={printStyle.title}>ツーリングスポット一覧</h2>
        <ul id="printPlaces" className={printStyle.printPlaces}></ul>
      </div>
    );
  };
}

export default Print;
