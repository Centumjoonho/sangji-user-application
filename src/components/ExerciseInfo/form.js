import { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { COLORS } from "../../../common/styles/color";
import { datatimeToISOString } from "../../../common/utils";
import { RequireAsterisk } from "../Text/RequireAsterisk";
import { config } from "../../../common/config";
import { ExerciseInfoAPI } from "../../../common/api/ApiBase";
import { integerValidation, notBlankValication, stringValidation } from "../../../common/validation/formValidation";
import { NormalAlert } from "../Alert/Alert";
import { useSession } from "../../../common/ctx";


const styles = StyleSheet.create({
    input: {
        borderColor: COLORS.WHITE,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: COLORS.WHITE,
        fontSize: 16
    },
    text: {
        color: COLORS.WHITE,
        fontSize: 20,
        marginBottom: 10,
    },
    formContainer: {
        marginBottom: 30
    },
    datetimeContainer: {
        flexDirection: 'row'
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
        paddingHorizontal: 15
    },
    buttonText: {
        fontSize: 22,
        color: COLORS.WHITE,
        marginRight: 5
    },
});

const FIELDS_NAME_MAPPING = {
    'date': '운동 일시',
    'exercise': '운동',
    'repetition': '횟수'
};

export const Form = ({ onPressConfirm }) => {
    const [date, setDate] = useState(new Date());
    const [exercise, setExercise] = useState();
    const [repetition, setRepetition] = useState();
    const { session } = useSession();

    useEffect(() => {
        console.log("세션확인");
        console.log(session);
    })


    const fieldsValidations = {
        'date': [notBlankValication],
        'exercise': [stringValidation],
        'repetition': [notBlankValication, integerValidation],
    };

    const keyValueMapping = {
        'date': date,
        'exercise': exercise,
        'repetition': repetition
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const formValidation = () => {
        let isPass = true;
        Object.keys(fieldsValidations).forEach((k) => {
            const validations = fieldsValidations[k];
            const value = keyValueMapping[k];

            for (let i = 0; i < validations.length; i++) {
                const resultCode = validations[i](value);

                if (resultCode != 'P') {
                    // when validation is not success.
                    NormalAlert(`아래 항목에 문제가 있습니다.\n[${FIELDS_NAME_MAPPING[k]}] ${resultCode}`);
                    isPass = false;
                    break;
                }
            }

            if (!isPass) return;
        });

        return isPass;
    }

    const addForm = async () => {

        try {
            const validationResult = formValidation();

            if (!validationResult) return;

            const fd = new FormData();
            fd.append('date', datatimeToISOString(date));
            fd.append('exercise', exercise);
            fd.append('repetition', repetition);
            fd.append('username', session);

            const response = await ExerciseInfoAPI.post(fd, {});

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    NormalAlert("성공적으로 생성되었습니다.", onPressConfirm);
                }
            } else {
                NormalAlert("서버에 문제가 발생했습니다.")
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <View style={styles.formContainer}>
                <Text style={styles.text}>운동 <RequireAsterisk /></Text>
                <Picker
                    style={{
                        color: COLORS.WHITE,
                    }}
                    dropdownIconColor={COLORS.WHITE}
                    selectedValue={exercise}
                    onValueChange={(itemValue, itemIndex) =>
                        setExercise(itemValue)
                    }>
                    <Picker.Item label="랫 풀 다운" value="latpulldown" />
                    <Picker.Item label="비하인드 넥 풀 다운" value="blatpulldown" />
                    <Picker.Item label="시티드 로우" value="seatedrow" />
                    <Picker.Item label="체스트 프레스 " value="chestpress" />
                </Picker>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.text}>운동 일시 <RequireAsterisk /></Text>
                <View style={styles.datetimeContainer}>
                    <Text
                        style={[styles.text, { marginRight: 5 }]}
                        onPress={showDatepicker}>{datatimeToISOString(date, 'date')}</Text>
                    <Text
                        style={styles.text}
                        onPress={showTimepicker}>{datatimeToISOString(date, 'time')}</Text>
                </View>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.text}>횟수 <RequireAsterisk /></Text>
                <TextInput
                    placeholder={"운동 횟수"}
                    placeholderTextColor={COLORS.WHITE}
                    onChangeText={(value) => setRepetition(value)}
                    value={repetition}
                    keyboardType={"number-pad"}
                    style={styles.input} />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={addForm}
            >
                <Text style={styles.buttonText}>추가하기</Text>
            </TouchableOpacity>
        </>
    )
}