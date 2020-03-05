import firebase from '../Firebase/firebase';

export const addComment = (user, description, productId) => (dispatch) => {
    const date = new Date(Date.now()).toLocaleString();

    const newComment = {
        user,
        description,
        date,
        rating: 4
    }

    console.log(newComment, "new new")

    firebase.database().ref("models/" + productId + "/comments").push(newComment)
};
