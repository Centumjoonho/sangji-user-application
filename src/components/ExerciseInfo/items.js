import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../../common/styles/color";
import { Badge } from "../Badge";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.BLUE_1,
        borderRadius: 20,
        padding: 20,

        shadowColor: COLORS.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginBottom: 15
    },
    typeText: {
        color: COLORS.WHITE,
        fontSize: 22,
    },
    descriptionText: {
        color: COLORS.WHITE,
        fontSize: 20,
    },
    dateText: {
        color: COLORS.WHITE,
        fontSize: 16,
    }
});

const exerciseTypeMapper = (type) => {
    switch (type) {
        case 'latpulldown':
            return '랫 풀 다운';
        case 'seatedrow':
            return '시티드 로우';
        case 'blatpulldown':
            return '비하인드 넥 풀다운';
        case 'chestpress':
            return '체스트 프레스';
        default:
            return type;
    }
}

export const Items = ({ item }) => {



    return (
        <TouchableOpacity
            style={styles.container}
        >
            <Badge type={item.type} style={{ marginBottom: 5 }} />
            <Text style={[styles.typeText, { marginBottom: 5 }]}>{item.user_id}</Text>
            <Text style={[styles.typeText, { marginBottom: 10 }]}>{exerciseTypeMapper(item.exercise_type.split(' | ')[0])} | {item.exercise_type.split(' | ')[1]} </Text>
            <Text style={styles.dateText}>{item.datetime_str}</Text>
        </TouchableOpacity>
    )
}