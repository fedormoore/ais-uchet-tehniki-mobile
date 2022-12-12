import React, {FC, useEffect, useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Scanner:FC = () => {

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    let handleBarCodeScanned: ({type, data}: { type: any; data: any }) => void;
    handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        alert(data);


        fetch('http://192.168.68.114:8080/api/v1/scanner/' + data, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => null);

    };

    if (hasPermission === null) {
        return <Text>Запрос разрешения камеры</Text>;
    }
    if (hasPermission === false) {
        return <Text>Нет доступа к камере</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            {scanned && <Button title={'Сканировать еще раз'} onPress={() => setScanned(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Scanner;