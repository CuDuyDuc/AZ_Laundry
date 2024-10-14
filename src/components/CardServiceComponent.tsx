import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import SectionComponent from './SectionComponent';
import TextComponent from './TextComponent';
import COLORS from '../assets/colors/Colors';
import { FONTFAMILY } from '../../assets/fonts';

interface CardServiceProps {
    icon: any; 
    title: string;
    storesCount: number;
    onPress?: () => void;
}

const CardServiceComponent = (props: CardServiceProps) => {

    const { icon, title, storesCount, onPress } = props;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <SectionComponent styles={styles.iconContainer}>
                <Image source={icon} style={styles.icon} />
            </SectionComponent>
            <TextComponent text={title} color={COLORS.HEX_BLACK} size={16} font={FONTFAMILY.montserrat_bold} styles={styles.title} />
            <TextComponent text={`${storesCount} Stores`} color={COLORS.HEX_LIGHT_GREY} size={14} styles={styles.storesCount} />
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120, 
        height: 120,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    iconContainer: {
        backgroundColor: '#F0F4FF',
        borderRadius: 50,
        padding: 12,
        marginBottom: 8,
    },
    icon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    title: {
        textAlign: 'center',
        marginBottom: 4,
    },
    storesCount: {
        textAlign: 'center',
    },
});

export default CardServiceComponent