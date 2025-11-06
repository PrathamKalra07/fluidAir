import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

type orderLink={
    items:Record<string,any> | null;
    backToDetails:Function;
}

export default function OrderLineItems({items,backToDetails}:orderLine) {


    return(
        <>
            <View><Text>Order Line ITEmS</Text></View>
        </>
    );
}