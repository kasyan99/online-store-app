import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Context } from "../..";
import { deviceAPI } from "../../api/deviceAPI";
import InputContainer from "./inputs/InputContainer";
import ModalSelect from "./inputs/ModalSelect";
import SubmitBtn from "./SubmitBtn";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      mb: {
         marginBottom: theme.spacing(1),
      }
   }),
);

type Props = {
   closeModal?: () => void
}

const DeviceForm: React.FC<Props> = observer(({ closeModal }) => {

   type Inputs = {
      deviceType: string,
      deviceBrand: string,
      deviceName: string,
      devicePrice: string,
   };

   const methods = useForm<Inputs>();
   const { register, handleSubmit, formState: { errors } } = methods;
   //create device
   const onSubmit: SubmitHandler<Inputs> = data => {
      const brandId = getBrandId(data.deviceBrand).toString()
      const typeId = getTypeId(data.deviceType).toString()
      if (file) {
         addDevice(data, brandId, typeId)
      } else {
         setFileError(true)
      }
   }

   //create device on server
   const addDevice = async (data: Inputs, brandId: string, typeId: string) => {
      setIsFetching(true)
      const formData = new FormData()

      formData.append('name', `${data.deviceName}`)
      formData.append('price', `${data.devicePrice}`)
      file && formData.append('img', file)
      formData.append('brandId', brandId)
      formData.append('typeId', typeId)
      formData.append('info', JSON.stringify(info))

      await deviceAPI.createDevice(formData)
      setIsFetching(false)
      closeModal && closeModal()
   }

   const { device } = useContext(Context)

   /*Get brands and types lists for select*/
   useEffect(() => {
      deviceAPI.getTypes().then(data => device.setTypes(data.types))
      deviceAPI.getBrands().then(data => device.setBrands(data.brands))
   }, [device])

   const [file, setFile] = useState<File | null>(null)
   const [fileError, setFileError] = useState(false)
   const [info, setInfo] = useState<Array<{ title: string, descriptions: string, id: number }>>([])

   //add title and description for propery
   const addInfo = () => {
      setInfo([...info, { title: '', descriptions: '', id: Math.random() + Date.now() }])
   }
   const changeInfo = (key: string, value: string, number: number) => {
      setInfo(info.map(i => i.id === number ? { ...i, [key]: value } : i))
   }

   //remove property
   const removeInfo = (id: number) => {
      setInfo(info.filter(i => i.id !== id))
   }

   //get selected brand id
   const getBrandId = (brand: string) => {
      let brandId = -1
      device.brands.forEach(b => b.name === brand ? brandId = b._id : void 0)
      return brandId
   }

   //get selected type id
   const getTypeId = (type: string) => {
      let typeId = -1
      device.types.forEach(t => t.name === type ? typeId = t._id : void 0)
      return typeId
   }

   const classes = useStyles()

   const [isFetching, setIsFetching] = useState(false)

   return (
      <>
         {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
         <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)} >
               {/* register your input into the hook by invoking the "register" function */}
               {/*to use "register" function in "SelectModal" you should put input name and options into 'registerInput'*/}
               <ModalSelect list={device.types} labelName='Type' registerInput={{ name: 'deviceType', options: { required: 'Device type is required' } }} />
               {errors.deviceType && <span className={classes.mb} style={{ color: 'red', display: 'block' }}>{errors.deviceType.message}</span>}
               <ModalSelect list={device.brands} labelName='Brand' registerInput={{ name: 'deviceBrand', options: { required: 'Device brand is required' } }} />
               {errors.deviceBrand && <span className={classes.mb} style={{ color: 'red', display: 'block' }}>{errors.deviceBrand.message}</span>}
               <InputContainer>
                  <TextField id={'deviceName'} label={"Device Name"} variant="outlined" {...register("deviceName", { required: 'Device name is required' })} />
               </InputContainer>
               {errors.deviceName && <span className={classes.mb} style={{ color: 'red', display: 'block' }}>{errors.deviceName.message}</span>}
               <InputContainer>
                  <TextField id={'devicePrice'} label={"Device Price"} type='number' variant="outlined" {...register("devicePrice", { required: 'Device price is required' })} />
               </InputContainer>
               {errors.devicePrice && <span className={classes.mb} style={{ color: 'red', display: 'block' }}>{errors.devicePrice.message}</span>}
               {/*button that upload img*/}
               <div className={classes.mb}>
                  <Button
                     variant="outlined"
                     component="label"
                     color="primary"
                  >
                     <span>Upload Imag</span>
                     <input
                        type="file"
                        hidden
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           e.target.files && setFile(e.target.files[0]);
                           setFileError(false)
                        }}
                     />
                  </Button>
                  <span> {file?.name}</span>
               </div>
               {fileError && <span className={classes.mb} style={{ color: 'red', display: 'block' }}>Upload image</span>}

               {/* inputs for property title and descriptions*/}
               {info.map((i) => {
                  return <div className={classes.mb} key={i.id}>
                     <InputContainer>
                        <TextField
                           id={'propertyTitle' + i.id}
                           label={"Property Title"}
                           variant="outlined"
                           value={i.title}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => { changeInfo('title', e.target.value, i.id); e.target.focus() }}
                        />
                     </InputContainer>
                     <InputContainer>
                        <TextField
                           id={'propertyDescription' + i.id}
                           label={"Property Description"}
                           variant="outlined"
                           value={i.descriptions}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeInfo('descriptions', e.target.value, i.id)}
                        />
                     </InputContainer>
                     <Button variant='outlined' color='secondary' onClick={() => removeInfo(i.id)}>Remove Property</Button>
                  </div>
               })}

               {/*button that creates inputs for property title and descriptions*/}
               <Button variant='outlined' color="primary" onClick={addInfo} className={classes.mb}>Add New Property</Button>

               <SubmitBtn isFetching={isFetching} />
            </form>
         </FormProvider>
      </>
   );
})

export default DeviceForm