import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { deviceAPI } from "../../api/deviceAPI";
import InputContainer from "./inputs/InputContainer";
import SubmitBtn from "./SubmitBtn";

const BrandForm = () => {
   const [isFetching, setIsFetching] = useState(false)

   type Inputs = {
      brand: string,
   }

   const addBrand = async (brandName: string) => {
      setIsFetching(true)
      await deviceAPI.createBrand({ name: brandName })
      resetField('brand')
      setIsFetching(false)
   }

   const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = data => addBrand(data.brand)

   const maxLength = 15

   return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
         {/* register your input into the hook by invoking the "register" function */}
         <InputContainer>
            <TextField id={'Brand'} label={"Brand"} variant="outlined" {...register("brand", { required: true, maxLength })} />
         </InputContainer>

         {errors.brand && <span style={{ color: 'red' }}>{errors.brand.type === 'maxLength' ? `Max length is ${maxLength}` : errors.brand.message}</span>}


         <SubmitBtn isFetching={isFetching} />

      </form>
   );
}

export default BrandForm