import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../../common/styles/color";

const styles = StyleSheet.create({
    container : {
        backgroundColor : COLORS.BLUE_1,
        borderRadius : 20,
        padding : 20,
        
        shadowColor: COLORS.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginBottom : 15
    },
    typeText : {
        color : COLORS.WHITE,
        fontSize : 20,
    },
    descriptionText : {
        color : COLORS.WHITE,
        fontSize : 20,
    },
    dateText : {
        color : COLORS.WHITE,
        fontSize : 16,
    }
});

export const Items = ({item}) => {
    return (
        <TouchableOpacity 
            style={styles.container}
        >
            <Text style={styles.typeText}>{item.user_id}</Text>
            <Text style={styles.typeText}>{item.exercise_type}</Text>
            <Text style={styles.dateText}>{item.created_at}</Text>
        </TouchableOpacity>
    )
}