import React from "react";
import firebase, {places} from "../../src/Firebase";
import sendStyle from "./send.module.scss";

class Send extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      place: "", 
      image: "",
      progress: "画像を選択"
    }
  };

  render() {
    const handleFormChange = (event) => {
      const inputValue = event.target.value;
      this.setState({place: inputValue});
    };

    const handleImage = (event) => {
      const inputImage = event.target.files[0];
      this.setState({image: inputImage});
    };

    const putPlace = document.getElementById("putPlace");
    const putImage = document.getElementById("putImage");
    
    const onSubmit = (e) => {
      e.preventDefault();

      if(putPlace.value === "" || putImage.value === ""){
        putPlace.focus();
        return;
      };

      this.setState({progress: "アップロード中..."});
      const doneUpload = () => {this.setState({progress: "画像を選択"})};

      let imageRef = firebase.storage().ref().child(`images/${this.state.place}.png`);
      const uploadTask = imageRef.put(this.state.image);

      uploadTask.on('state_changed', snapshot =>{
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;

          default:
            break;
        };
      }, function (error) {
        console.log(error);
      }, function () {
        doneUpload();
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          places.add({
            place: putPlace.value, 
            created: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            putPlace.value = "";
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
          onChange={(event) => {handleFormChange(event)}}
          placeholder="地名を入力..."
          />
          <br/>
          <label htmlFor="putImage" className={sendStyle.putImageLabel}>
            {this.state.progress}
          </label>
          <input
          id="putImage"
          className={sendStyle.putImage}
          type="file"
          onChange={(event) => handleImage(event)}
          />
          <br/>
          <label htmlFor="submit" className={sendStyle.submitLabel}>投稿</label>
          <button id="submit" className={sendStyle.submit}></button>
        </form>
      </div>
    );
  }
}

export default Send;
