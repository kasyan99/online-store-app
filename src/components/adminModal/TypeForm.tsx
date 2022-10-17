import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { deviceAPI } from "../../api/deviceAPI";
import InputContainer from "./inputs/InputContainer";
import SubmitBtn from "./SubmitBtn";

const TypeForm = () => {
   const [isFetching, setIsFetching] = useState(false)

   type Inputs = {
      type: string,
   }

   const addType = async (typeName: string) => {
      setIsFetching(true)
      await deviceAPI.createType({ name: typeName })
      resetField('type')
      setIsFetching(false)
   }

   const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = data => addType(data.type);

   const maxLength = 15
   return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)} data-testid='typeform'>
         {/* register your input into the hook by invoking the "register" function */}
         <InputContainer>
            <TextField id={'Type'} label={"Type"} variant="outlined" {...register("type", { required: 'This field is required', maxLength: maxLength })} data-testid='type input' />
         </InputContainer>

         {errors.type && <span style={{ color: 'red' }}>{errors.type.type === 'maxLength' ? `Max length is ${maxLength}` : errors.type.message}</span>}
         <SubmitBtn isFetching={isFetching} />
      </form>
   );
}

export default TypeForm