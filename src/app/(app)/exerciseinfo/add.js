import { Stack, router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Form } from '../../../components/ExerciseInfo/form';
import { COLORS } from '../../../../common/styles/color';

const styles = StyleSheet.create({
    container : {
        padding : 20,
        backgroundColor : COLORS.BLUE
    }
});

export default function AddScreen() {
    const onPressConfirm = () => {
        if (router.canGoBack){
            router.back();
        }
    }

    return (
        <ScrollView
            style={styles.container}
        >
            <Form 
                onPressConfirm={onPressConfirm}
            />
        </ScrollView>
    )
};
