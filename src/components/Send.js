import React from "react";
import firebase, {places} from "../../src/Firebase";
import sendStyle from "./send.module.scss";

class Send extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      place: "", 
      image: "", 
      progress: ""
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

      places.add({
        place: putPlace.value, 
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(doc => {
        putPlace.value = "";
        putPlace.focus();
      })
      .catch(error => {
        console.log(error);
      });

      let imageRef = firebase.storage().ref().child(`images/${this.state.place}.png`);
      imageRef.put(this.state.image);
    };
  return(
      <div>
        位置情報
        <form onSubmit={onSubmit}>
          <textarea
          id="putPlace"
          value={this.state.place}
          onChange={(event) => {handleFormChange(event)}}
          />
          <label htmlFor="putImage" className={sendStyle.selectImage}>
            <br/>
            画像を選択
            <br/>
            <input
            id="putImage"
            className={sendStyle.putImage}
            type="file"
            onChange={(event) => handleImage(event)}
            />
          </label>
          <button className={sendStyle.submit}>送信</button>
        </form>
      </div>
    );
  }
}

export default Send;
