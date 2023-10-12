import React, { useEffect, useState } from 'react';
import { Link, router } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../common/styles/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Items } from '../../../components/ExerciseInfo/items';
import { config } from '../../../../common/config';
import useDataFetcher from '../../../hooks/useDataFetcher';

const styles = StyleSheet.create({
    container : {
        backgroundColor : COLORS.BLUE,
    },
    button_container: {
        display : 'flex',
        alignItems : 'flex-end',
        padding : 10
    },  
    button : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : COLORS.LETTUCE,
        borderRadius : 50,
        paddingVertical : 5,
        paddingHorizontal : 10
    },
    buttonText : {
        fontSize : 16,
        color : COLORS.WHITE,
        marginRight : 5
    }
});

export default function HomeScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const { data, isLoading, error, refetch} = useDataFetcher(`${config.HOST}/api/musclefunctionlog`);

    const renderItem = ({ index, item }) => {
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
                    padding : 30
                }}
                data={data.result}
                renderItem={renderItem}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </View>
    )
};
