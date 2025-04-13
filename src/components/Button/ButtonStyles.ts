import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 50
    },
    button: {
        backgroundColor: '#4c22ee',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16
    },
    buttonContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row"
    },
    btnIcon:{
        width: 25, 
        height: 25
    }
});
