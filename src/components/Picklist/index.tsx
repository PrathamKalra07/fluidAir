import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'react-native';

export default function Picklist() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('recent');
  const [items, setItems] = useState([
    { label: 'Most Recent', value: 'recent' },
    { label: 'Price: Low to High', value: 'lowToHigh' },
    { label: 'Price: High to Low', value: 'highToLow' },
  ]);

  return (
    <View  className='z-50' >
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{ borderColor: '#c5c5c5',borderRadius: 20,backgroundColor:'#e3e3e3'}}
        dropDownContainerStyle={{ borderColor: '#c5c5c5',borderRadius: 20, padding:5 }}
        selectedItemContainerStyle={{
          backgroundColor: '#e3e3e3', // light reddish background
          borderRadius: 20
        }}
        itemSeparator
        itemSeparatorStyle={{
            height: 4, // adds spacing between items
            backgroundColor:'white'
        }}
      />
    </View>
  );
}
