import React from 'react';
import InputContainer from './InputContainer';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFormContext, RegisterOptions, FieldValues, } from "react-hook-form";

type Props = {
   labelName: string
   registerInput: { name: string, options?: RegisterOptions<FieldValues> }
   list: Array<any>
}

const ModalSelect: React.FC<Props> = ({ labelName, list, registerInput }) => {
   const { register } = useFormContext()

   return <InputContainer>
      <>
         <InputLabel id={'device' + labelName}>{labelName}</InputLabel>
         <Select
            labelId={'device' + labelName}
            id={'device' + labelName}
            label={labelName}
            defaultValue=''
            {...register(registerInput.name, { ...registerInput.options })}
         >
            {list.map(item => <MenuItem key={item?.id + item?.name} value={item?.name}>{item?.name}</MenuItem>)}
         </Select>
      </>
   </InputContainer>
}

export default ModalSelect