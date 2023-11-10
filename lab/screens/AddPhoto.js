import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ImagePicker from "../components/Camera/ImagePicker";
import { Colors } from "../components/util/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPhoto = ({ navigation }) => {
    const [photoTitle, setPhotoTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState();

    function imageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    async function savePhotoHandler() {
        const newPhoto = {
            title: photoTitle,
            image: selectedImage
        };

        try {
            const jsonValue = await AsyncStorage.getItem('photos');
            const photos = jsonValue != null ? JSON.parse(jsonValue) : [];

            photos.push(newPhoto);

            const updatedJsonValue = JSON.stringify(photos);
            await AsyncStorage.setItem('photos', updatedJsonValue);

            navigation.navigate("AllPhotos", { photo: newPhoto });
        } catch (e) {
            console.error("Error saving the photo", e);
        }
    }

    return (
        <View style={styles.view}>
            <TextInput
                label="Photo Title"
                value={photoTitle}
                mode="outlined"
                onChangeText={setPhotoTitle}
            />
            <ImagePicker onImageChange={imageHandler} />
            <Button
                style={styles.btn}
                buttonColor={Colors.primary700}
                textColor={Colors.white}
                mode="elevated"
                onPress={savePhotoHandler}>
                Add Photo
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        marginTop: 16,
        marginHorizontal: 16,
        alignContent: "center",
    },
    btn: {
        marginTop: 32
    }
})

export default AddPhoto;
