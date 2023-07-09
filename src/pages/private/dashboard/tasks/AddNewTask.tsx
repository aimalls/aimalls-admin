import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonRow, IonSelect, IonSelectOption, IonTextarea, IonToggle } from "@ionic/react";
import { FC, useState } from "react";
import AddCustomField, { tCustomField } from "../../../../components/custom-field/AddCustomField";
import { TaskReward, iTask, saveNewTaskToAPI } from "../../../../requests/task.request";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useHistory } from "react-router";

export interface iProps {}
export const AddNewTask: FC<iProps> = (props): JSX.Element => {

    const navigation = useHistory();

    const [customFields, setCustomFields] = useState<tCustomField[]>([])

    const [taskTitle, setTaskTitle] = useState("")
    const [taskReward, setTaskReward] = useState<TaskReward>()
    const [taskDescription, setTaskDescription] = useState("")
    const [taskActiveStatus, setTaskActiveStatus]  = useState<boolean>(true)

    const setFields = <TItem extends tCustomField>(field: TItem) => {
        setCustomFields((current) => {
            return [...current, field];
        })
    }

    const handleChangeTaskRewardCurrency = (currency: string) => {
        let current = {...taskReward} as TaskReward;
        current.currency = currency
        setTaskReward(current)
    }

    const handleChangeTaskRewardAmount = (amount: number) => {
        let current = {...taskReward} as TaskReward;
        current.amount = amount
        setTaskReward(current)
    }


    const handleChangeTaskActiveStatus = () => {
        setTaskActiveStatus(c => c = !c)
    }
    

    const submitNewTask = async () => {
        let task = {
            taskTitle,
            taskReward,
            taskDescription,
            customFields,
            taskActiveStatus
        } as iTask

        try {
            const data = await saveNewTaskToAPI(task)
            console.log(data)
            navigation.push("/dashboard/tasks")
        } catch (error) {
            console.log(error)
        }
        console.log(task)
    }

    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        Add New Task
                        { taskActiveStatus }
                    </IonCol>
                    <IonCol size="12">
                        <IonToggle checked={taskActiveStatus} onIonChange={(e) => handleChangeTaskActiveStatus()}>Task Active</IonToggle>
                    </IonCol>
                    <IonCol size="12">
                        <IonInput
                            value={taskTitle}
                            onIonChange={(val) => setTaskTitle(val.detail.value!)}
                            type="text"
                            label="Task Title"
                            label-placement="floating"
                            placeholder='Enter task title'
                            fill="outline"
                        ></IonInput>
                    </IonCol>
                    
                    <IonCol size="12" sizeMd="4">
                        <IonSelect label="Currency" fill="outline" value={taskReward?.currency} onIonChange={(e) => handleChangeTaskRewardCurrency(e.detail.value)}>
                            <IonSelectOption value="AIT">AIToken</IonSelectOption>
                            <IonSelectOption value="USD">USDT</IonSelectOption>
                            <IonSelectOption value="GCash">GCash</IonSelectOption>
                        </IonSelect>
                    </IonCol>
                    <IonCol size="12" sizeMd="8">
                        <IonInput
                            value={taskReward?.amount}
                            onIonChange={(val) => handleChangeTaskRewardAmount(+val.detail.value!)}
                            type="text"
                            label="Reward"
                            label-placement="floating"
                            placeholder='Enter reward amount'
                            fill="outline"
                        ></IonInput>
                    </IonCol>

                    <IonCol size="12" style={{ position: 'relative' }}>
                        <span style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Task Description:</span>
                        <ReactQuill theme="snow" style={{ height: '200px', marginBottom: '70px' }} value={taskDescription} onChange={setTaskDescription} />
                    </IonCol>
                    { customFields?.map((field, index) => (
                        field?.fieldType == 'text' ? (
                            <IonCol key={index} size="12">
                                <IonInput {...field} disabled />
                            </IonCol>
                        ) : field?.fieldType == 'textarea'  ?
                        (
                            <IonCol key={index} size="12">
                                <IonTextarea {...field} />
                            </IonCol>
                        ) : field?.fieldType == 'select' ? (
                            <IonCol key={index} size="12">
                                <IonSelect {...field}>
                                    {field.options.map((option, index) => (
                                        <IonSelectOption key={`select-option-${index}`} value={option.value}>{option.label}</IonSelectOption>   
                                    ))}
                                </IonSelect>
                            </IonCol>
                        ) : field?.fieldType == 'file' ? (
                            <IonCol size="12" key={index}>
                                <input type={ field.type } accept="image/*" placeholder={field.placeholder} />
                            </IonCol>
                        ) : null
                    )) }
                    <IonCol size="12">
                        <IonButton id="open-custom-dialog">Add Custom Field</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="12" style={{ display: 'flex', justifyContent: 'end' }}>
                        <IonButton onClick={() => submitNewTask()}>Submit</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <AddCustomField onAdd={setFields} />
        </IonContent>
    )
};
export default AddNewTask;