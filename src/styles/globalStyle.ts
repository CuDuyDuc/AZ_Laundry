import { StyleSheet } from "react-native";
import COLORS from "../assets/colors/Colors";
import { FONTFAMILY } from "../../assets/fonts";

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHISPER_GRAY
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
        shadowColor: 'rgba(0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5
    },
    card: {
        borderRadius: 8
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },lineView: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    shadowCardTop: {
        backgroundColor: COLORS.WHITE,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {
            width: 0,
            height: -10, // Negative value to cast shadow upwards
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 10,
    },
    dotGreenActive: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        bottom: 0,
        right: 0,
    },
    dotGreenActiveChatBox: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        bottom: 0,
        left: 25,
    },
    dotBlue: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.AZURE_BLUE,
        bottom: 0,
        right: 0,
    },
    styleSection:{
        backgroundColor:COLORS.WHITE, 
        marginTop:5, 
        borderRadius:15, 
        paddingTop:15
    },
})