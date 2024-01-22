import React, { useEffect, useState } from 'react';
import { Link, router } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../common/styles/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Items } from '../../../components/ExerciseInfo/items';
import { config } from '../../../../common/config';
import useDataFetcher from '../../../hooks/useDataFetcher';
import { useSession } from '../../../../common/ctx';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BLUE,
    },
    button_container: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.LETTUCE,
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.WHITE,
        marginRight: 5
    }
});

export default function HomeScreen() {
    const { signIn, signOut, session } = useSession();
    const [refreshing, setRefreshing] = useState(false);
    const { data, isLoading, error, refetch } = useDataFetcher(`${config.HOST}/api/musclefunctionlog?username=${session}`);

    useEffect(() => {
        console.log()
    })
    //  item -> values
    // {"created_at": "2024-01-17T07:52:00",
    //  "datetime": "2024-01-17T07:52:00", 
    //  "datetime_str": "2024-01-17 07:52",
    //  "excericse": "latpulldown",
    //  "exercise_type": "latpulldown | 100회", 
    //  "repetition": 100, 
    //  "type": "outdoor", 
    //  "user": "null", 
    //  "user_id": "null"}

    const renderItem = ({ index, item }) => {
        console.log(item)
        return (
            <Items
                item={item}
            />
        )
    }

    const onRefresh = () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }

    const onPress = () => {
        router.push('/exerciseinfo/add');
    }


    return (
        <View style={styles.container}>
            <View style={styles.button_container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text style={styles.buttonText}>운동 이력 추가</Text>
                    <Ionicons name="add-circle-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList
                contentContainerStyle={{
                    padding: 30
                }}
                data={data.result}
                renderItem={renderItem}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </View>
    )
};
