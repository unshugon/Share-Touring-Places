import React from "react";
import firebase, { places, auth } from "../../Firebase";
import sendStyle from "./send.module.scss";
import loadImage from "blueimp-load-image";

class Send extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      place: "",
      description: "",
      image: null,
      blob: null,
    }
  };

  handleChangeFile = async (event) => {
    const { files } = event.target;
    const canvas = await loadImage(files[0], {
      maxWidth: 450,
      canvas: true,
    });
    canvas.image.toBlob((blob) => {
      this.setState({blob: blob});
    }, files[0].type);
    if (this.state.blob != null) {

    }
  };

  handleFormChange = (event) => {
    const inputValue = event.target.value;
    this.setState({place: inputValue});
  };

  handleDescChange = (event) => {
    const inputValue = event.target.value;
    this.setState({description: inputValue});
  };

  handleUpload = (tOrF) => {
    return this.props.handleUpload(tOrF);
  }

  render() {
    const putPlace = document.getElementById("putPlace");
    const putDescription = document.getElementById("putDescription");
    const putImage = document.getElementById("putImage");
    const homeState = this.props;

    const onSubmit = (event) => {
      event.preventDefault();
      const doneUpload = () => this.handleUpload(false);
      const startUpload = () => this.handleUpload(true);

      if(putPlace.value === "" || putImage.value === ""){
        putPlace.focus();
        return;
      };

      startUpload();

      let imageRef = firebase.storage().ref().child(`images/${this.state.place}_${this.state.description}.jpg`);
      const uploadTask = imageRef.put(this.state.blob);

      uploadTask.on('state_changed', snapshot =>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;

          default:
            break;
        };
      }, function (error) {
        console.log(error);
      }, function () {
        doneUpload();
        uploadTask.snapshot.ref.getDownloadURL().then(() => {
          places.add({
            place: putPlace.value,
            description: putDescription.value,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            user: auth.currentUser.uid
          })
          .then(() => {
            putPlace.value = "";
            putDescription.value = "";
            putPlace.focus();
          })
          .catch(error => {
            console.log(error);
          })
        });
      });
    };

  return(
      <div className={sendStyle.container}>
        おすすめスポットを投稿
        <form onSubmit={onSubmit}>
          <textarea
            id="putPlace"
            className={sendStyle.putPlace}
            value={this.state.place}
            onChange={(event) => this.handleFormChange(event)}
            placeholder="地名を入力..."
          />
          <br/>
          <textarea
            id="putDescription"
            className={sendStyle.putDescription}
            value={this.state.description}
            onChange={(event) => this.handleDescChange(event)}
            placeholder="おすすめポイントを入力..."
          />
          <br/>
          <label htmlFor="putImage" className={sendStyle.putImageLabel}>
            {this.state.blob == null ? '画像を選択' : '画像を変更'}
          </label>
          <input
            id="putImage"
            className={sendStyle.putImage}
            type="file"
            accept="image/*"
            onChange={(event) => this.handleChangeFile(event)}
          />
          <br/>
          <label htmlFor="submit" className={sendStyle.submitLabel}>
            {homeState.progress ? 'Uploading...' : '投稿'}
          </label>
          <button id="submit" className={sendStyle.submit}></button>
        </form>
      </div>
    );
  }
}

export default Send;
