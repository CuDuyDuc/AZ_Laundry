import React, {useRef, useState} from 'react';
import {TipModel} from '../model/tip_model';
import BottomSheetComponent from './BottomSheetComponent';
import CardTipCompnent from './CardTipCompnent';
import ContainerComponent from './ContainerComponent';

const ParentComponent = () => {
  const [selectedTip, setSelectedTip] = useState<TipModel | null>(null);
  const bottomSheetRef = useRef<any>(null);

  const handlePressItem = (item: TipModel) => {
    setSelectedTip(item);
    bottomSheetRef.current?.toggleBottomSheet();
  };

  return (
    <ContainerComponent>
      <CardTipCompnent onPress={handlePressItem} />
      <BottomSheetComponent ref={bottomSheetRef} selectedTip={selectedTip} />
    </ContainerComponent>
  );
};

export default ParentComponent;
