import { FlatList, Pressable, Text, View } from "react-native";

function PlaceItem({place, onSelect}) {
    return (
        <Pressable onPress={onSelect}>
            <Image source={{uri: place.image}} />
            <View>
                <Text>{place.title}</Text>
                <Text>{place-address}</Text>
            </View>
        </Pressable>
    )
}

function PlacesList({places})  {
    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <PlaceItem place={item} />}
        />
    );
}

export default PlacesList;