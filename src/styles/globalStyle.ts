import { StyleSheet } from "react-native";
import COLORS from "../assets/colors/Colors";
import { FONTFAMILY } from "../../assets/fonts";

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },
    text: {
        fontFamily: FONTFAMILY.montserrat_regular,
        fontSize: 16,
        color: COLORS.HEX_LIGHT_GREY
    },
    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.AZURE_BLUE,
        paddingHorizontal: 10,
        height: 56,
        flexDirection: 'row'
    },
    shadow: {
        backgroundColor: COLORS.WHITE,
        flex: 1,
        marginRight: 7,
        shadowColor: 'rgba(0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5
    },
    section: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    }, 
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    shadowCard: {
        backgroundColor: COLORS.WHITE,
        marginRight: 7,
        shadowColor: 'rgba(0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5
    },
    card:{
        borderRadius:8
    }
})